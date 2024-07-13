// export default function OrganizerPage({ params }: { params: { idEvent: string; idCheckout: string } }) {
//     return (
//         <div>
//             <h1>Organizer Page for Transaction ID: {params.idCheckout}</h1>
//         </div>
//     );
// }

import React from 'react'
import { events } from '@/app/(main)/_data/eventData';
import EventCard from './ticketCard';


const Page = ({ params: { idEvent, idCheckout } }: { params: { idEvent: string, idCheckout: string } }) => {
    const event = events.find((event) => event.id === Number(idEvent));
    return (
        <div className='m-4 lg:m-16 border p-4 lg:p-16 rounded-3xl'>
            ticket
            {/* <Avatar alt="Remy Sharp" src="/carousel.png" /> */}
            {/* <p className="text-2xl font-bold">Tiket</p>
            <p className='text-sm'>Nomor tiket: {idEvent}</p>
            <div >
                {event && (
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
                )}
            </div> */}
        </div>
    );
}

export default Page


// import React from 'react';

// interface Checkout {
//     id: number;
//     date: string;
//     status: string;
//     totalPrice: number;
//     paymentMethod: string;
// }

// interface Event {
//     id: number;
//     title: string;
//     checkouts: Checkout[];
// }

// interface Params {
//     params: {
//         idEvent: string;
//         idCheckout: string;
//     }
// }

// const events: Event[] = [
//     {
//         id: 1,
//         title: "Event 1",
//         checkouts: [
//             {
//                 id: 1,
//                 date: "2023-07-05T14:48:00.000Z",
//                 status: "Completed",
//                 totalPrice: 100000,
//                 paymentMethod: "Credit Card"
//             },
//             {
//                 id: 2,
//                 date: "2023-07-06T15:00:00.000Z",
//                 status: "Pending",
//                 totalPrice: 150000,
//                 paymentMethod: "Bank Transfer"
//             }
//         ]
//     },
//     {
//         id: 2,
//         title: "Event 2",
//         checkouts: [
//             {
//                 id: 3,
//                 date: "2023-07-07T16:00:00.000Z",
//                 status: "Cancelled",
//                 totalPrice: 200000,
//                 paymentMethod: "PayPal"
//             }
//         ]
//     }
//     // Add more events as needed
// ];

// const Page = ({ params: { idEvent, idCheckout } }: Params) => {
//     const event = events.find((event) => event.id === Number(idEvent));
//     const checkout = event?.checkouts.find((checkout) => checkout.id === Number(idCheckout));

//     if (!event || !checkout) {
//         return null;
//     }

//     return (
//         <div className='h-[100vh] p-4'>
//             <h1 className="text-2xl font-bold">{event.title}</h1>
//             {/* <p className="text-lg">Checkout {idCheckout}</p> */}
//             {/* <p className="text-sm mt-2">Id: {checkout.id}</p> */}
//             {/* <p className="text-sm">Date: {new Date(checkout.date).toLocaleDateString()}</p> */}
//             {/* <p className="text-sm">Time: {new Date(checkout.date).toLocaleTimeString()}</p> */}
//             <p className="text-sm">Status: {checkout.status}</p>
//             <p className="text-sm">Total Price: Rp {checkout.totalPrice}</p>
//             <p className="text-sm">Payment Method: {checkout.paymentMethod}</p>
//         </div>
//     );
// }

// export default Page;

