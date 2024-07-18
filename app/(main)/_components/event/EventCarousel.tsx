'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';

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

interface EventCarouselProps {
    location: string;
}

const EventCarousel: React.FC<EventCarouselProps> = ({ location }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const params: any = {
                    location,
                };

                const response = await axios.get<{ success: boolean; data: { content: Event[] } }>(`${BASE_URL}/api/v1/events/filter`, { params });
                if (response.data.success && Array.isArray(response.data.data.content)) {
                    setEvents(response.data.data.content);
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

        fetchEvents();
    }, [location]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full relative">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {events.map((event) => {
                        const cheapestTicket = event.tickets.length > 0
                            ? event.tickets.reduce((min, ticket) =>
                                ticket.priceAfterDiscount < min.priceAfterDiscount ? ticket : min
                            )
                            : null;

                        const discountPercentage = cheapestTicket && cheapestTicket.priceBeforeDiscount > cheapestTicket.priceAfterDiscount
                            ? Math.round((1 - cheapestTicket.priceAfterDiscount / cheapestTicket.priceBeforeDiscount) * 100)
                            : 0;

                        return (
                            <CarouselItem key={event.id} className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-2">
                                <div className="p-1 h-full">
                                    <Card className="hover:scale-105 transition-transform duration-300 h-full">
                                        <Link href={`/events/${event.id}_${event.name.replace(/\s+/g, '-').toLowerCase()}`} passHref>
                                            <CardHeader className='relative p-0'>
                                                <img src={event.image} alt={event.name} className="w-full h-48 object-cover rounded-md " />
                                                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                                                    {event.category}
                                                </Badge>
                                            </CardHeader>
                                        </Link>
                                        <CardContent className="px-4">
                                            <CardTitle className='my-4'>{event.name}</CardTitle>
                                            <p className="text-sm text-gray-600 mb-2">{event.location} - {event.date} at {event.time} WIB</p>
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
                                    </Card>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious>
                    <Button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2">
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                </CarouselPrevious>
                <CarouselNext>
                    <Button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2">
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </CarouselNext>
            </Carousel>
        </div>
    );
};

export default EventCarousel;
