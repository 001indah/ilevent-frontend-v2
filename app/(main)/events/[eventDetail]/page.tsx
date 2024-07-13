'use client'

import React from 'react';
import EventCard from '@/app/(main)/events/[eventDetail]/_components/EventDetailCard';
import { events } from '@/app/(main)/_data/eventData';

export default function Page({ params }: { params: { eventDetail: string } }) {
    const [idEvent, titleSlug] = params.eventDetail.split('_');
    const event = events.find((event) => event.id === Number(idEvent));

    if (!event) {
        return <div>Event tidak ditemukan</div>;
    }

    const formattedTitle = titleSlug ? titleSlug.replace(/-/g, ' ') : event.title;

    return (
        <div className='lg:px-16 p-4 '>
            {/* <h1>
                Event {formattedTitle} detail
            </h1> */}
            <div>
                <EventCard
                    id={event.id}
                    key={event.id}
                    imageSrc={event.imageSrc}
                    location={event.location}
                    date={event.date}
                    price={event.price}
                    discountedPrice={event.discountedPrice}
                    discountPercentage={event.discountPercentage}
                    title={event.title}
                    logo={event.logo}
                    heartIcon={event.heartIcon}
                />
            </div>
        </div>
    );
}