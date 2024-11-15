
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import EventCard, { EventProps } from '@/app/(main)/_components/event/EventCardUpdate';
import Pagination from './pagination';
import Search from '@/components/ui/Search';
import { useDebouncedCallback } from 'use-debounce';

const ITEMS_PER_PAGE = 30;
const API_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/events';

export interface EventListProps {
    className?: string;
}

const Event: React.FC<EventListProps> = ({ className }) => {
    const [events, setEvents] = useState<EventProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

    const fetchEvents = async (page: number, query: string) => {
        try {
            setIsLoading(true);
            const response = await axios.get(API_URL, {
                params: {
                    page: page - 1, // Backend pagination usually starts from 0
                    size: ITEMS_PER_PAGE,
                    query: query
                }
            });
            const eventsData = Array.isArray(response.data.content) ? response.data.content : response.data.events;
            if (Array.isArray(eventsData)) {
                setEvents(eventsData);
            } else {
                throw new Error('Events data is not in the expected format');
            }
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch events');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };

    const handleSearchChange = useDebouncedCallback((query: string) => {
        setSearchQuery(query);
        // setCurrentPage(1); // Reset to first page on new search
        const params = new URLSearchParams(searchParams);
        params.set('search', query);
        // params.set('page', '1');
        router.push(`?keyword=${query}&${params.toString()}`);
    }, 300);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="flex justify-center mb-4">
                <Search placeholder="Search events..." value={searchQuery} onChange={handleSearchChange} />
            </div>
            <div className={`${className} flex flex-wrap w-full gap-4 lg:gap-5 justify-center`}>
                {events.map((event: EventProps) => (
                    <Link
                        key={event.id}
                        href={`/events/${event.id}_${event.name.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                        <EventCard {...event} />
                    </Link>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(events.length / ITEMS_PER_PAGE)}
                onPageChange={handlePageChange}
            />

        </div>
    );
};

export default Event;
