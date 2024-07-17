// // 'use client'

// // import React from 'react';
// // import EventCard from '@/app/(main)/events/[eventDetail]/_components/EventDetailCard';
// // import { events } from '@/app/(main)/_data/eventData';

// // export default function Page({ params }: { params: { eventDetail: string } }) {
// //     const [idEvent, titleSlug] = params.eventDetail.split('_');
// //     const event = events.find((event) => event.id === Number(idEvent));

// //     if (!event) {
// //         return <div>Event tidak ditemukan</div>;
// //     }

// //     const formattedTitle = titleSlug ? titleSlug.replace(/-/g, ' ') : event.title;

// //     return (
// //         <div className='lg:px-16 p-4 '>
// //             {/* <h1>
// //                 Event {formattedTitle} detail
// //             </h1> */}
// //             <div>
// //                 <EventCard
// //                     id={event.id}
// //                     key={event.id}
// //                     imageSrc={event.imageSrc}
// //                     location={event.location}
// //                     date={event.date}
// //                     price={event.price}
// //                     discountedPrice={event.discountedPrice}
// //                     discountPercentage={event.discountPercentage}
// //                     title={event.title}
// //                     logo={event.logo}
// //                     heartIcon={event.heartIcon}
// //                 />
// //             </div>
// //         </div>
// //     );
// // }


// pages/events/[id].tsx
import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Tag, User, Ticket, Gift, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

async function getEventData(slug: string) {
    const id = slug.split('_')[0]; // Extract ID from slug
    try {
        const response = await axios.get(`https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/events/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch event:', error);
        return null;
    }
}

export default async function EventDetail({ params }: { params: { eventDetail: string } }) {
    const event = await getEventData(params.eventDetail);

    if (!event) return <div>Event not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">{event.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Organized by {event.organizer.name}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full h-64 mb-6">
                        <Image
                            src={event.image}
                            alt={event.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                            <div className="space-y-2">
                                <p className="flex items-center"><Calendar className="mr-2 h-4 w-4" /> {format(new Date(event.date), 'MMMM d, yyyy')}</p>
                                <p className="flex items-center"><Clock className="mr-2 h-4 w-4" /> {event.time}</p>
                                <p className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> {event.location}</p>
                                <p className="flex items-center"><Tag className="mr-2 h-4 w-4" /> {event.category}</p>
                            </div>
                            <Separator className="my-4" />
                            <p>{event.description}</p>

                            <Button className="mt-4">Get Your Ticket Now!!</Button>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Available Tickets</h2>
                            {event.tickets.map((ticket) => (
                                <Card key={ticket.id} className="mb-4">
                                    <CardHeader>
                                        <CardTitle>{ticket.nameTicket}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="flex items-center">
                                            <Ticket className="mr-2 h-4 w-4" />
                                            Price: <Badge variant="secondary" className="ml-2">
                                                Rp {ticket.priceAfterDiscount.toLocaleString()}
                                            </Badge>
                                            {ticket.priceBeforeDiscount !== ticket.priceAfterDiscount && (
                                                <span className="line-through text-gray-500 ml-2">
                                                    Rp {ticket.priceBeforeDiscount.toLocaleString()}
                                                </span>
                                            )}
                                        </p>
                                        <p className="flex items-center mt-2">
                                            <Users className="mr-2 h-4 w-4" />
                                            Available Seats: {ticket.availableSeats}
                                        </p>
                                        {/* <Button className="mt-4">Buy Ticket</Button> */}
                                    </CardContent>
                                </Card>
                            ))}
                            {event.vouchers.length > 0 && (
                                <div className="mt-6">
                                    <h2 className="text-xl font-semibold mb-4">Available Vouchers</h2>
                                    {event.vouchers.map((voucher) => (
                                        <Badge key={voucher.id} variant="outline" className="mr-2 mb-2">
                                            <Gift className="mr-1 h-4 w-4" />
                                            {voucher.discountCode}: {voucher.discountPercentage}% off
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            {event.promoReferral && (
                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Referral Promo</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{event.promoReferral.promoValueDiscount}% discount for referrals</p>
                                        <p>Valid until: {format(new Date(event.promoReferral.end.join('-')), 'MMMM d, yyyy')}</p>
                                        <p>Max claims: {event.promoReferral.maxClaims}</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// 'use client'

// import React from 'react';
// import EventCard from '@/app/(main)/events/[eventDetail]/_components/EventDetailCard';
// import { events } from '@/app/(main)/_data/eventData';
// import Link from 'next/link';

// export default function Page({ params }: { params: { eventDetail: string } }) {
//     const [idEvent, titleSlug] = params.eventDetail.split('_');
//     const event = events.find((event) => event.id === Number(idEvent));

//     if (!event) {
//         return <div>Event tidak ditemukan</div>;
//     }

//     const formattedTitle = titleSlug ? titleSlug.replace(/-/g, ' ') : event.title;

//     return (
//         <div className='lg:px-16 lg:py-16 p-4'>
//             <div>
//                 <EventCard
//                     id={event.id}
//                     key={event.id}
//                     imageSrc={event.imageSrc}
//                     location={event.location}
//                     date={event.date}
//                     price={event.price}
//                     discountedPrice={event.discountedPrice}
//                     discountPercentage={event.discountPercentage}
//                     title={event.title}
//                     logo={event.logo}
//                     heartIcon={event.heartIcon}
//                 />
//             </div>

//             {/* Transaction button */}
//             <Link href={`/events/${params.eventDetail}/transaction`}>
//                 <button className="mt-4 w-full p-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-300">
//                     Proceed to Transaction
//                 </button>
//             </Link>
//         </div>
//     );
// }


// 'use client'

// import React from 'react';
// import EventCard from '@/app/(main)/events/[eventDetail]/_components/EventDetailCard';
// import { events } from '@/app/(main)/_data/eventData';
// import Link from 'next/link';
// import EventDetailPage from './_components/eventDetail';
// //new
// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import Image from 'next/image';
// import { format } from 'date-fns';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';


// interface Ticket {
//     id: number;
//     nameTicket: string;
//     availableSeats: number;
//     priceBeforeDiscount: number;
//     priceAfterDiscount: number;
// }

// interface Voucher {
//     id: number;
//     discountCode: string;
//     discountPercentage: number;
//     maxUses: number;
//     used: number | null;
//     expiredAt: number[];
// }

// interface Event {
//     id: number;
//     name: string;
//     description: string;
//     location: string;
//     date: string;
//     time: string;
//     image: string;
//     isFreeEvent: boolean;
//     category: string;
//     organizer: {
//         id: number;
//         name: string;
//         username: string;
//     };
//     tickets: Ticket[];
//     vouchers: Voucher[];
// }


// const CounterInput = ({ maxQuantity, onChange }: { maxQuantity: number; onChange: (value: number) => void }) => {
//     const [count, setCount] = useState(0);

//     const handleIncrement = () => {
//         if (count < maxQuantity) {
//             setCount(count + 1);
//             onChange(count + 1);
//         }
//     };

//     const handleDecrement = () => {
//         if (count > 0) {
//             setCount(count - 1);
//             onChange(count - 1);
//         }
//     };

//     return (
//         <div className="flex items-center space-x-2">
//             <Button variant="outline" size="icon" onClick={handleDecrement}>-</Button>
//             <Input type="number" value={count} className="w-16 text-center" readOnly />
//             <Button variant="outline" size="icon" onClick={handleIncrement}>+</Button>
//         </div>
//     );
// };

// export default function Page({ params }: { params: { eventDetail: string } }) {
//     const [idEvent, titleSlug] = params.eventDetail.split('_');
//     // const event = events.find((event) => event.id === Number(idEvent));
//     const { id } = useParams();
//     const [event, setEvent] = useState<Event | null>(null);
//     const [selectedTickets, setSelectedTickets] = useState<{ [key: number]: number }>({});
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [discount, setDiscount] = useState(0);


//     useEffect(() => {
//         const fetchEvent = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/api/v1/events/${id}`);
//                 setEvent(response.data.data);
//             } catch (error) {
//                 console.error('Error fetching event:', error);
//             }
//         };

//         if (id) {
//             fetchEvent();
//         }
//     }, [id]);
//     useEffect(() => {
//         if (event) {
//             let total = 0;
//             for (const [ticketId, quantity] of Object.entries(selectedTickets)) {
//                 const ticket = event.tickets.find(t => t.id === Number(ticketId));
//                 if (ticket) {
//                     total += ticket.priceAfterDiscount * quantity;
//                 }
//             }
//             setTotalAmount(total);
//             // Apply a simple discount calculation (you may want to adjust this based on your business logic)
//             setDiscount(total * 0.1); // 10% discount for example
//         }
//     }, [event, selectedTickets]);

//     const handleTicketQuantityChange = (ticketId: number, quantity: number) => {
//         setSelectedTickets(prev => ({ ...prev, [ticketId]: quantity }));
//     };

//     if (!event) {
//         return <div>Loading...</div>;
//     }

//     const formattedTitle = titleSlug ? titleSlug.replace(/-/g, ' ') : event.title;

//     return (
//         <div className='lg:px-16 lg:py-16 p-4'>
//             <div className="container mx-auto p-4">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>{event.name}</CardTitle>
//                         <CardDescription>{event.description}</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="aspect-video relative mb-4">
//                             <Image src={event.image} alt={event.name} layout="fill" objectFit="cover" />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4 mb-4">
//                             <div>
//                                 <Label>Date</Label>
//                                 <p>{format(new Date(event.date), 'MMMM d, yyyy')}</p>
//                             </div>
//                             <div>
//                                 <Label>Time</Label>
//                                 <p>{event.time}</p>
//                             </div>
//                             <div>
//                                 <Label>Location</Label>
//                                 <p>{event.location}</p>
//                             </div>
//                             <div>
//                                 <Label>Category</Label>
//                                 <Badge>{event.category}</Badge>
//                             </div>
//                         </div>
//                         <div>
//                             <Label>Organizer</Label>
//                             <p>{event.organizer.name}</p>
//                         </div>
//                     </CardContent>
//                     <CardFooter>
//                         <div className="w-full">
//                             <h3 className="text-lg font-semibold mb-2">Tickets</h3>
//                             {event.tickets.map((ticket) => (
//                                 <div key={ticket.id} className='flex flex-col sm:flex-row rounded-lg bg-teal-500 min-h-[10rem] my-2 p-4 relative'>
//                                     <div className='absolute top-4 left-4 rounded-lg bg-white w-28 h-36 overflow-hidden'>
//                                         <Image
//                                             src="/placeholder.png" // Replace with actual ticket image if available
//                                             alt={ticket.nameTicket}
//                                             layout="fill"
//                                             objectFit="cover"
//                                             className="rounded-lg"
//                                         />
//                                     </div>
//                                     <div className='ml-0 sm:ml-32 text-white flex-grow'>
//                                         <p className='font-bold text-xl mt-28 sm:mt-0'>{ticket.nameTicket}</p>
//                                         <div className="flex items-center mb-2">
//                                             <p className="text-base font-bold mr-2">${ticket.priceAfterDiscount.toFixed(2)}</p>
//                                             {ticket.priceBeforeDiscount !== ticket.priceAfterDiscount && (
//                                                 <p className="text-xs text-slate-950 line-through mr-2">${ticket.priceBeforeDiscount.toFixed(2)}</p>
//                                             )}
//                                             {ticket.priceBeforeDiscount !== ticket.priceAfterDiscount && (
//                                                 <span className='text-xs font-bold text-red-500 bg-white px-2 py-1 rounded'>
//                                                     {Math.round((1 - ticket.priceAfterDiscount / ticket.priceBeforeDiscount) * 100)}% OFF
//                                                 </span>
//                                             )}
//                                         </div>
//                                         <div className='flex flex-col sm:flex-row gap-2 items-start sm:items-center'>
//                                             <CounterInput
//                                                 maxQuantity={ticket.availableSeats}
//                                                 onChange={(quantity) => handleTicketQuantityChange(ticket.id, quantity)}
//                                             />
//                                             <p className="text-sm mt-2 sm:mt-0">Available: {ticket.availableSeats}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}

//                             <h3 className="text-lg font-semibold mt-4 mb-2">Vouchers</h3>
//                             {event.vouchers.map((voucher) => (
//                                 <div key={voucher.id} className="bg-gray-100 p-4 rounded-lg mb-2">
//                                     <p className="font-semibold">{voucher.discountCode}</p>
//                                     <p>{voucher.discountPercentage}% off</p>
//                                     <p>Expires: {format(new Date(voucher.expiredAt[0], voucher.expiredAt[1] - 1, voucher.expiredAt[2]), 'MMMM d, yyyy')}</p>
//                                 </div>
//                             ))}

//                             <div className='mt-6'>
//                                 <p className='font-bold mb-4'>Your Order:</p>
//                                 <div className='p-4 rounded-lg bg-teal-50 w-full'>
//                                     <div className='mb-4'>
//                                         <p className='font-bold mb-2'>Adjust quantity and notes</p>
//                                     </div>
//                                     <div className='border-t pt-4'>
//                                         <div className='flex justify-between items-center mb-2'>
//                                             <p>Temporary Amount:</p>
//                                             <p className='font-bold'>${totalAmount.toFixed(2)}</p>
//                                         </div>
//                                         <div className='flex justify-between items-center mb-2'>
//                                             <p>Discount:</p>
//                                             <p className='font-bold text-green-600'>-${discount.toFixed(2)}</p>
//                                         </div>
//                                         <div className='flex justify-between items-center text-lg font-bold'>
//                                             <p>Total Amount:</p>
//                                             <p>${(totalAmount - discount).toFixed(2)}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <Button className="w-full mt-4">Proceed to Checkout</Button>
//                         </div>
//                     </CardFooter>
//                 </Card>
//             </div>
//             <div>
//                 {/* <EventDetailPage /> */}
//                 {/* <EventCard
//                     id={event.id}
//                     key={event.id}
//                     imageSrc={event.imageSrc}
//                     location={event.location}
//                     date={event.date}
//                     price={event.price}
//                     discountedPrice={event.discountedPrice}
//                     discountPercentage={event.discountPercentage}
//                     title={event.title}
//                     logo={event.logo}
//                     heartIcon={event.heartIcon}
//                 /> */}
//             </div>

//             {/* Transaction button */}
//             <Link href={`/events/${params.eventDetail}/transaction`}>
//                 <button className="mt-4 w-full p-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-300">
//                     Proceed to Transaction
//                 </button>
//             </Link>
//         </div>
//     );
// }
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import Image from 'next/image';
// import { format } from 'date-fns';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';

// interface Ticket {
//     id: number;
//     nameTicket: string;
//     availableSeats: number;
//     priceBeforeDiscount: number;
//     priceAfterDiscount: number;
// }

// interface Voucher {
//     id: number;
//     discountCode: string;
//     discountPercentage: number;
//     maxUses: number;
//     used: number | null;
//     expiredAt: number[];
// }

// interface Event {
//     id: number;
//     name: string;
//     description: string;
//     location: string;
//     date: string;
//     time: string;
//     image: string;
//     isFreeEvent: boolean;
//     category: string;
//     organizer: {
//         id: number;
//         name: string;
//         username: string;
//     };
//     tickets: Ticket[];
//     vouchers: Voucher[];
// }

// const CounterInput = ({ maxQuantity, onChange }: { maxQuantity: number; onChange: (value: number) => void }) => {
//     const [count, setCount] = useState(0);

//     const handleIncrement = () => {
//         if (count < maxQuantity) {
//             const newCount = count + 1;
//             setCount(newCount);
//             onChange(newCount);
//         }
//     };

//     const handleDecrement = () => {
//         if (count > 0) {
//             const newCount = count - 1;
//             setCount(newCount);
//             onChange(newCount);
//         }
//     };

//     return (
//         <div className="flex items-center space-x-2">
//             <Button variant="outline" size="icon" onClick={handleDecrement}>-</Button>
//             <Input type="number" value={count} className="w-16 text-center" readOnly />
//             <Button variant="outline" size="icon" onClick={handleIncrement}>+</Button>
//         </div>
//     );
// };

// const useEventDetails = (id: string | undefined) => {
//     const [event, setEvent] = useState<Event | null>(null);
//     const [error, setError] = useState<string | null>(null);

//     const fetchEvent = useCallback(async () => {
//         if (!id) return;

//         try {
//             const response = await axios.get(`${BASE_URL}/api/v1/events/${id}`);
//             setEvent(response.data.data);
//         } catch (error) {
//             console.error('Error fetching event:', error);
//             setError('Failed to fetch event details.');
//         }
//     }, [id]);

//     useEffect(() => {
//         fetchEvent();
//     }, [fetchEvent]);

//     return { event, error };
// };

// export default function EventDetailPage() {
//     const { id } = useParams();
//     const { event, error } = useEventDetails(id);
//     const [selectedTickets, setSelectedTickets] = useState<{ [key: number]: number }>({});
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [discount, setDiscount] = useState(0);

//     useEffect(() => {
//         if (event) {
//             let total = 0;
//             for (const [ticketId, quantity] of Object.entries(selectedTickets)) {
//                 const ticket = event.tickets.find(t => t.id === Number(ticketId));
//                 if (ticket) {
//                     total += ticket.priceAfterDiscount * quantity;
//                 }
//             }
//             setTotalAmount(total);
//             // Apply a simple discount calculation (you may want to adjust this based on your business logic)
//             setDiscount(total * 0.1); // 10% discount for example
//         }
//     }, [event, selectedTickets]);

//     const handleTicketQuantityChange = (ticketId: number, quantity: number) => {
//         setSelectedTickets(prev => ({ ...prev, [ticketId]: quantity }));
//     };

//     if (error) {
//         return <div>{error}</div>;
//     }

//     if (!event) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="container mx-auto p-4">
//             <Card>
//                 <CardHeader>
//                     <CardTitle>{event.name}</CardTitle>
//                     <CardDescription>{event.description}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="aspect-video relative mb-4">
//                         <Image src={event.image} alt={event.name} layout="fill" objectFit="cover" />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                         <div>
//                             <Label>Date</Label>
//                             <p>{format(new Date(event.date), 'MMMM d, yyyy')}</p>
//                         </div>
//                         <div>
//                             <Label>Time</Label>
//                             <p>{event.time}</p>
//                         </div>
//                         <div>
//                             <Label>Location</Label>
//                             <p>{event.location}</p>
//                         </div>
//                         <div>
//                             <Label>Category</Label>
//                             <Badge>{event.category}</Badge>
//                         </div>
//                     </div>
//                     <div>
//                         <Label>Organizer</Label>
//                         <p>{event.organizer.name}</p>
//                     </div>
//                 </CardContent>
//                 <CardFooter>
//                     <div className="w-full">
//                         <h3 className="text-lg font-semibold mb-2">Tickets</h3>
//                         {event.tickets.map((ticket) => (
//                             <div key={ticket.id} className='flex flex-col sm:flex-row rounded-lg bg-teal-500 min-h-[10rem] my-2 p-4 relative'>
//                                 <div className='absolute top-4 left-4 rounded-lg bg-white w-28 h-36 overflow-hidden'>
//                                     <Image
//                                         src="/placeholder.png" // Replace with actual ticket image if available
//                                         alt={ticket.nameTicket}
//                                         layout="fill"
//                                         objectFit="cover"
//                                         className="rounded-lg"
//                                     />
//                                 </div>
//                                 <div className='ml-0 sm:ml-32 text-white flex-grow'>
//                                     <p className='font-bold text-xl mt-28 sm:mt-0'>{ticket.nameTicket}</p>
//                                     <div className="flex items-center mb-2">
//                                         <p className="text-base font-bold mr-2">${ticket.priceAfterDiscount.toFixed(2)}</p>
//                                         {ticket.priceBeforeDiscount !== ticket.priceAfterDiscount && (
//                                             <p className="text-xs text-slate-950 line-through mr-2">${ticket.priceBeforeDiscount.toFixed(2)}</p>
//                                         )}
//                                         {ticket.priceBeforeDiscount !== ticket.priceAfterDiscount && (
//                                             <span className='text-xs font-bold text-red-500 bg-white px-2 py-1 rounded'>
//                                                 {Math.round((1 - ticket.priceAfterDiscount / ticket.priceBeforeDiscount) * 100)}% OFF
//                                             </span>
//                                         )}
//                                     </div>
//                                     <div className='flex flex-col sm:flex-row gap-2 items-start sm:items-center'>
//                                         <CounterInput
//                                             maxQuantity={ticket.availableSeats}
//                                             onChange={(quantity) => handleTicketQuantityChange(ticket.id, quantity)}
//                                         />
//                                         <p className="text-sm mt-2 sm:mt-0">Available: {ticket.availableSeats}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}

//                         <h3 className="text-lg font-semibold mt-4 mb-2">Vouchers</h3>
//                         {event.vouchers.map((voucher) => (
//                             <div key={voucher.id} className="bg-gray-100 p-4 rounded-lg mb-2">
//                                 <p className="font-semibold">{voucher.discountCode}</p>
//                                 <p>{voucher.discountPercentage}% off</p>
//                                 <p>Expires: {format(new Date(voucher.expiredAt[0], voucher.expiredAt[1] - 1, voucher.expiredAt[2]), 'MMMM d, yyyy')}</p>
//                             </div>
//                         ))}

//                         <div className='mt-6'>
//                             <p className='font-bold mb-4'>Your Order:</p>
//                             <div className='p-4 rounded-lg bg-teal-50 w-full'>
//                                 <div className='mb-4'>
//                                     <p className='font-bold mb-2'>Adjust quantity and notes</p>
//                                 </div>
//                                 <div className='border-t pt-4'>
//                                     <div className='flex justify-between items-center mb-2'>
//                                         <p>Temporary Amount:</p>
//                                         <p className='font-bold'>${totalAmount.toFixed(2)}</p>
//                                     </div>
//                                     <div className='flex justify-between items-center mb-2'>
//                                         <p>Discount:</p>
//                                         <p className='font-bold text-green-600'>-${discount.toFixed(2)}</p>
//                                     </div>
//                                     <div className='flex justify-between items-center text-lg font-bold'>
//                                         <p>Total Amount:</p>
//                                         <p>${(totalAmount - discount).toFixed(2)}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <Button className="w-full mt-4">Proceed to Checkout</Button>
//                     </div>
//                 </CardFooter>
//             </Card>
//         </div>
//     );
// }
