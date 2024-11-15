'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import EventCard, { EventProps } from './EventCardUpdate';
import useCarousel from '@/hooks/useCarousel';

interface EventComponentProps {
    title: string;
    link: string;
}

const Event: React.FC<EventComponentProps> = ({ title, link }) => {
    const [events, setEvents] = useState<EventProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/events');
                setEvents(response.data);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch events');
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const { activeIndex, prevSlide, nextSlide } = useCarousel(events);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className='flex justify-between items-center mt-8 pt-5 border-t border-gray-300'>
                <Link href={link}>
                    <p className='text-lg font-bold'>{title}</p>
                </Link>
                <div className='inline-flex items-center font-bold text-sm flex-wrap text-baseBlue group-hover:text-baseBlue'>
                    <Link href={link}>
                        <p>{`See all >`}</p>
                    </Link>
                </div>
            </div>
            <div className="relative">
                <div className="flex gap-2 overflow-x-auto">
                    {events.slice(0, 10).map((event: EventProps) => (
                        <Link
                            key={event.id}
                            href={`/events/${event.id}_${event.name.replace(/\s+/g, '-').toLowerCase()}`}
                        >
                            <EventCard
                                id={event.id}
                                name={event.name}
                                description={event.description}
                                date={event.date}
                                time={event.time}
                                location={event.location}
                                createdAt={event.createdAt}
                                updatedAt={event.updatedAt}
                                image={event.image}
                                isFreeEvent={event.isFreeEvent}
                                deletedAt={event.deletedAt}
                                rattingRate={event.rattingRate}
                                category={event.category}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Event;
