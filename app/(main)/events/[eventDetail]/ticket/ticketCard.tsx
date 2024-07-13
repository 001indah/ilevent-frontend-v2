import React from 'react';
// import Avatar from '@/components/ui/avatar';
import Link from 'next/link';


export interface EventProps {
    id: number;
    imageSrc: string;
    location: string;
    date: string;
    price: string;
    discountedPrice?: string;
    discountPercentage?: number;
    title: string;
    logo?: string;
    heartIcon?: React.ReactNode;
}

interface Ticket {
    id: number;
    eventId: number;
    ticketNumber: string;
    price: number;
    seat: string;
    purchaser: string;
}
const tickets: Ticket[] = [
    {
        id: 1,
        eventId: 1,
        ticketNumber: 'A123',
        price: 100000,
        seat: 'A1',
        purchaser: 'John Doe'
    },
    {
        id: 2,
        eventId: 1,
        ticketNumber: 'A124',
        price: 100000,
        seat: 'A2',
        purchaser: 'Jane Doe'
    },
    {
        id: 3,
        eventId: 2,
        ticketNumber: 'B123',
        price: 150000,
        seat: 'B1',
        purchaser: 'Alice Smith'
    }
    // Add more tickets as needed
];

const EventCard: React.FC<EventProps> = ({
    id,
    imageSrc,
    location,
    date,
    price,
    discountedPrice,
    discountPercentage,
    title,
    logo,
    heartIcon
}) => {
    const eventTickets = tickets.filter(ticket => ticket.eventId === id);

    return (
        <div className="bg-white rounded-lg">
            <div >

                <div>
                    <div className='my-4'>
                        <p className="text-3xl font-bold">{title}</p>
                        <div className="flex">
                            <p className="mr-2">Terjual </p>
                            <span className="text-gray-500">10</span>
                            <p className="mx-2 text-gray-500">•</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-2 text-yellow-500 w-5 h-auto fill-current hover:text-red-600"
                                viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                            <p className="mr-2">4.6 </p>
                            <span className="text-gray-500">(5 rating)</span>
                            <p className="mx-2 text-gray-500">•</p>
                            <p >Diskusi</p>
                            <p className="text-gray-500 mx-2">(3)</p>
                        </div>
                    </div>

                    <div className="py-3 pb-6 text-sm  text-gray-500 ">
                        <p className="text-3xl text-black font-bold ml-1">{price}</p>
                        <div className="flex items-center ml-1">
                            {discountPercentage ? (
                                <span className='text-sm font-bold ml-1 text-baseRed bg-pink-100 rounded-sm px-2'>
                                    {discountPercentage + "%"}
                                </span>
                            ) : null}
                            {discountedPrice && (
                                <p className="text-base text-gray-500 line-through ml-1">{discountedPrice}</p>
                            )}
                        </div>
                    </div>
                    <div className='my-4'>
                        <div className="">
                            <p >{date}</p>
                        </div>
                        <div className="">
                            <p >{location}</p>
                        </div>
                    </div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit...</p>
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.964418378393!2d104.09909067413892!3d1.1854215620840483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da27e2a4951e67%3A0xb4fde627f3a44477!2sNongsa%20Digital%20Park!5e0!3m2!1sen!2sid!4v1720082763106!5m2!1sen!2sid"
                            className="rounded-lg w-full h-full my-4"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps Embed"
                        />
                    </div>

                    <div className="my-4">
                        <h2 className="text-xl font-bold">Tickets</h2>
                        <ul>
                            {eventTickets.map(ticket => (
                                <li key={ticket.id} className="my-2">
                                    <p>Ticket Number: {ticket.ticketNumber}</p>
                                    <p>Price: Rp {ticket.price}</p>
                                    <p>Seat: {ticket.seat}</p>
                                    <p>Purchaser: {ticket.purchaser}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
