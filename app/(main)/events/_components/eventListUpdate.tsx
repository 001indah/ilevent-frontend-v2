
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';
import Image from 'next/image';
import { SearchIcon, MapPin, Calendar, Tag } from 'lucide-react';
import Pagination from './pagination';

const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';
const ITEMS_PER_PAGE = 10;

export interface Ticket {
    nameTicket: string;
    availableSeats: number;
    priceBeforeDiscount: number;
    priceAfterDiscount: number;
    id: number;
}

export interface EventProps {
    id: number;
    name: string;
    description: string;
    location: string;
    date: string;
    time: string;
    image: string;
    isFreeEvent: boolean;
    category: string;
    organizer: {
        name: string;
        username: string;
    };
    tickets: Ticket[];
}

interface ApiResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: EventProps[];
}

const EventCard: React.FC<EventProps> = ({
    id,
    name,
    location,
    date,
    time,
    image,
    isFreeEvent,
    category,
    organizer,
    tickets
}) => {
    const cheapestTicket = tickets.reduce((min, ticket) =>
        ticket.priceAfterDiscount < min.priceAfterDiscount ? ticket : min
    );

    const discountPercentage = Math.round((1 - cheapestTicket.priceAfterDiscount / cheapestTicket.priceBeforeDiscount) * 100);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-64 md:w-72 lg:w-80">
            <div className="relative h-48 sm:h-56">
                <Image
                    src={image}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                    {category}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg mb-2 truncate">{name}</h3>
                <div className="flex items-center mb-2">
                    <MapPin size={16} className="text-gray-500 mr-1" />
                    <p className="text-sm text-gray-600 truncate">{location}</p>
                </div>
                <div className="flex items-center mb-2">
                    <Calendar size={16} className="text-gray-500 mr-1" />
                    <p className="text-sm text-gray-600">{`${date} ${time}`}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-blue-600">
                            {isFreeEvent ? 'Free' : `$${cheapestTicket.priceAfterDiscount.toFixed(2)}`}
                        </p>
                        {!isFreeEvent && discountPercentage > 0 && (
                            <div className="flex items-center">
                                <p className="text-sm text-gray-500 line-through mr-1">
                                    ${cheapestTicket.priceBeforeDiscount.toFixed(2)}
                                </p>
                                <span className="text-sm font-semibold text-red-500">
                                    -{discountPercentage}%
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center">
                        <Tag size={16} className="text-gray-500 mr-1" />
                        <p className="text-sm text-gray-600">{cheapestTicket.nameTicket}</p>
                    </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    <p>By {organizer.name}</p>
                </div>
            </div>
        </div>
    );
};

export default function Search() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [events, setEvents] = useState<EventProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1');
        if (term) {
            params.set('keyword', term);
        } else {
            params.delete('keyword');
        }
        router.push(`${pathname}?${params.toString()}`);
    }, 300);

    useEffect(() => {
        const keyword = searchParams.get('keyword') || '';
        const category = searchParams.get('category') || '';
        const location = searchParams.get('location') || '';
        const isFreeEvent = searchParams.get('isFreeEvent') || '';

        fetchEvents(keyword, category, location, isFreeEvent);
    }, [searchParams]);

    const fetchEvents = async (keyword: string, category: string, location: string, isFreeEvent: string) => {
        setIsLoading(true);
        setError(null);
        try {
            let endpoint = `${BASE_URL}/api/v1/events`;
            const params: Record<string, string> = {};

            if (keyword) {
                endpoint = `${BASE_URL}/api/v1/events/filter`;
                params.keyword = keyword;
            }
            if (category) params.category = category;
            if (location) params.location = location;
            if (isFreeEvent) params.isFreeEvent = isFreeEvent;

            const response = await axios.get<ApiResponse>(endpoint, { params });
            console.log('API request URL:', response.config.url);

            if (response.data.success && Array.isArray(response.data.data)) {
                setEvents(response.data.data);
            } else {
                setEvents([]);
                setError("No events found or invalid response format.");
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            setError("Failed to fetch events. Please try again.");
            setEvents([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="container mx-auto px-4">
            <div className="relative flex flex-1 flex-shrink-0 mb-4">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    placeholder="Search events..."
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get('keyword')?.toString()}
                />
                <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>

            {isLoading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!isLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {events.length > 0 ? (
                        events.map((event: EventProps) => (
                            <Link
                                key={event.id}
                                href={`/events/${event.id}_${event.name.replace(/\s+/g, '-').toLowerCase()}`}
                            >
                                <EventCard {...event} />
                            </Link>
                        ))
                    ) : (
                        <p className="text-center col-span-full">No events found</p>
                    )}
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(events.length / ITEMS_PER_PAGE)}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
