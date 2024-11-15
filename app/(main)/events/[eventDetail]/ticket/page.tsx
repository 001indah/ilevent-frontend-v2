import React from 'react'
import { events } from '@/app/(main)/_data/eventData';
import EventCard from './ticketCard';


const Page = ({ params: { idEvent, idCheckout } }: { params: { idEvent: string, idCheckout: string } }) => {
    const event = events.find((event) => event.id === Number(idEvent));
    return (
        <div className='m-4 lg:m-16 border p-4 lg:p-16 rounded-3xl'>
            ticket
          
        </div>
    );
}

export default Page

