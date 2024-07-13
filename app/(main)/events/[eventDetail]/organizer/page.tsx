'use client'
import React from 'react';
import EventCard from '@/app/(main)/events/[eventDetail]/_components/EventDetailCard';
import { events } from '@/app/(main)/_data/eventData';
import OrganizerCard from './OrganizerCard';
import EventList from '@/app/(main)/events/_components/eventList';


export default function OrganizerPage({ params }: { params: { idEvent: string; idCheckout: string } }) {
    return (
        <div className='p-4 lg:p-16 '>
            <h1>Organizer Page for Transaction ID: {params.idCheckout}</h1>
            <div className=' border rounded-3xl p-4 lg:p-16'>
                <p className="text-2xl font-bold">Organizer page</p>
                {/* <p className='text-sm'>Nomor tiket: {idEvent}</p> */}
                <div>
                    <OrganizerCard />
                </div>
            </div>
            <div className='mt-16'>
                <EventList />
            </div>
        </div>
    );
}
