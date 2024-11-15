
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Search from '@/components/ui/Search';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ArrowRightIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alret";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';

const locations = ['Jakarta', 'Surabaya', 'Bandung', 'Yogyakarta', 'Bali'];
const categories = ['music', 'sports', 'conference', 'festival', 'workshop', 'seminar', 'film', 'arts', 'business', 'science', 'travel', 'fashion', 'Food', 'tech', 'exhibition'];

interface Ticket {
    id: number;
    nameTicket: string;
    availableSeats: number;
    priceBeforeDiscount: number;
    priceAfterDiscount: number;
}

interface Event {
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
        id: number;
        name: string;
        username: string;
    };
    tickets: Ticket[];
}

interface ApiResponse {
    success: boolean;
    data: {
        content: Event[];
        totalPages: number;
        totalElements: number;
        number: number;
        size: number;
        first: boolean;
        last: boolean;
    };
}

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [events, setEvents] = useState<Event[]>([]);
    const [location, setLocation] = useState("all");
    const [category, setCategory] = useState("all");
    const [isFreeEvent, setIsFreeEvent] = useState<string>("all");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize, setPageSize] = useState(16);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);

    useEffect(() => {
        const query = searchParams.get("query") || "";
        const loc = searchParams.get("location") || "all";
        const cat = searchParams.get("category") || "all";
        const free = searchParams.get("isFreeEvent") || "all";
        const page = parseInt(searchParams.get("page") || "1", 10) - 1;

        setLocation(loc);
        setCategory(cat);
        setIsFreeEvent(free);
        setCurrentPage(page);

        fetchEvents(query, loc, cat, free, page);
    }, [searchParams]);

    const fetchEvents = async (keyword: string, location: string, category: string, isFreeEvent: string, page: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const params: any = {
                keyword,
                page,
                size: pageSize,
            };
            if (location !== "all") params.location = location;
            if (category !== "all") params.category = category.toLowerCase();
            if (isFreeEvent !== "all") params.isFreeEvent = isFreeEvent === 'true';

            const response = await axios.get<ApiResponse>(`${BASE_URL}/api/v1/events/filter`, { params });
            if (response.data.success && Array.isArray(response.data.data.content)) {
                setEvents(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
                setTotalElements(response.data.data.totalElements);
                setCurrentPage(response.data.data.number);
                setPageSize(response.data.data.size);
                setIsFirstPage(response.data.data.first);
                setIsLastPage(response.data.data.last);
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

    const handleFilterChange = (filterType: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all') {
            params.delete(filterType);
        } else {
            params.set(filterType, value);
        }
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', (newPage + 1).toString());
        router.push(`?${params.toString()}`);
    };

    const handleSearch = (query: string) => {
        handleFilterChange('query', query);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Search Events</h1>

            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-grow">
                    <Search placeholder="Search events..." onChange={handleSearch} />
                </div>
                <Select value={location} onValueChange={(value) => handleFilterChange('location', value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map((loc) => (
                            <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={category} onValueChange={(value) => handleFilterChange('category', value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={isFreeEvent} onValueChange={(value) => handleFilterChange('isFreeEvent', value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="true">Free Events</SelectItem>
                        <SelectItem value="false">Paid Events</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(9)].map((_, index) => (
                        <Card key={index} className="flex flex-col justify-between">
                            <CardHeader>
                                <Skeleton className="h-[200px] w-full rounded-md" />
                                <Skeleton className="h-4 w-3/4 mt-2" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full mt-2" />
                                <Skeleton className="h-4 w-2/3 mt-2" />
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-10 w-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {events.length > 0 ? (
                            events.map((event) => {
                                const cheapestTicket = event.tickets.length > 0
                                    ? event.tickets.reduce((min, ticket) =>
                                        ticket.priceAfterDiscount < min.priceAfterDiscount ? ticket : min
                                    )
                                    : null;

                                const discountPercentage = cheapestTicket && cheapestTicket.priceBeforeDiscount > cheapestTicket.priceAfterDiscount
                                    ? Math.round((1 - cheapestTicket.priceAfterDiscount / cheapestTicket.priceBeforeDiscount) * 100)
                                    : 0;

                                return (
                                    <Card key={event.id} className="flex flex-col justify-between hover:scale-105 transition-transform duration-300">
                                        <Link href={`/events/${event.id}_${event.name.replace(/\s+/g, '-').toLowerCase()}`} passHref>
                                            <CardHeader className=' relative p-0'>
                                                <img src={event.image} alt={event.name} className="w-full h-48 object-cover rounded-md " />
                                                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                                                    {event.category}
                                                </Badge>
                                            </CardHeader>
                                        </Link>
                                        <CardContent className="px-4">
                                            <CardTitle className='my-4'>{event.name}</CardTitle>
                                            <p className="text-sm text-gray-600 mb-2">{event.location} - {event.date}  at: {event.time} WIB</p>
                                            <p className="text-sm mb-2">{event.description.slice(0, 50)}...</p>
                                            <div className='flex items-center justify-between'>
                                                <div>
                                                    <p className="text-sm font-semibold">{event.isFreeEvent ? 'Free Event' : 'Paid Event'}</p>
                                                    {!event.isFreeEvent && cheapestTicket && (
                                                        <div className="mt-2">
                                                            <p className="text-base font-bold">
                                                                From Rp {cheapestTicket.priceAfterDiscount.toLocaleString()}
                                                            </p>
                                                            {discountPercentage > 0 && (
                                                                <div className="flex items-center mt-1">
                                                                    <p className="text-xs text-gray-500 line-through mr-2">
                                                                        Rp {cheapestTicket.priceBeforeDiscount.toLocaleString()}
                                                                    </p>
                                                                    <Badge variant="destructive">
                                                                        {discountPercentage}% OFF
                                                                    </Badge>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <Link href={`/events/${event.id}_${event.name.replace(/\s+/g, '-').toLowerCase()}`} passHref>
                                                    <Button className="rounded-full"><ArrowRightIcon className="h-6 w-6 hover:w-8" /></Button>
                                                </Link>
                                            </div>
                                            <div className='flex items-center mt-4'>
                                                <Avatar className="w-8 h-8 mr-2">
                                                    <AvatarImage src={event.image} alt={event.organizer.name} />
                                                    <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <p className="text-sm">Organizer: {event.organizer.name}</p>
                                            </div>
                                        </CardContent>
                                        {/* <CardFooter className="p-4">

                                        </CardFooter> */}
                                    </Card>
                                );
                            })
                        ) : (
                            <p className="col-span-full text-center text-gray-500">No events found</p>
                        )}
                    </div>
                    {events.length > 0 && (
                        <div className="mt-8 flex flex-col items-center">
                            <div className="flex justify-center items-center space-x-2">
                                <Button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={isFirstPage}
                                    variant="outline"
                                >
                                    Previous
                                </Button>
                                <span className="text-sm text-gray-600">
                                    Page {currentPage + 1} of {totalPages}
                                </span>
                                <Button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={isLastPage}
                                    variant="outline"
                                >
                                    Next
                                </Button>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                Showing {currentPage * pageSize + 1} - {Math.min((currentPage + 1) * pageSize, totalElements)} of {totalElements} events
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
