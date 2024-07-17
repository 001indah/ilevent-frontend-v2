// 'use client';

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

// // const EventDetailPage: React.FC<EventDetailPageProps> = ({ id }) => {
// export default function EventDetailPage() {
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

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

interface Ticket {
    id: number;
    nameTicket: string;
    availableSeats: number;
    priceBeforeDiscount: number;
    priceAfterDiscount: number;
}

interface Voucher {
    id: number;
    discountCode: string;
    discountPercentage: number;
    maxUses: number;
    expiredAt: number[];
}

interface PromoReferral {
    id: number;
    eventsId: number;
    promoValueDiscount: number;
    start: number[];
    end: number[];
    used: number;
    maxClaims: number;
}

interface EventDetails {
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
    vouchers: Voucher[];
    promoReferral: PromoReferral;
}

const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';

export default function EventDetails() {
    const [event, setEvent] = useState<EventDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/events/10`);
                if (response.data.success) {
                    setEvent(response.data.data);
                } else {
                    setError("Failed to fetch event details.");
                }
            } catch (error) {
                console.error("Error fetching event details:", error);
                setError("An error occurred while fetching event details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEventDetails();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error || !event) {
        return <div className="text-center text-red-500">{error || "Event not found"}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="mb-8">
                <CardHeader>
                    <img src={event.image} alt={event.name} className="w-full h-64 object-cover rounded-t-lg" />
                    <CardTitle className="text-3xl font-bold mt-4">{event.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge>{event.category}</Badge>
                        <Badge variant={event.isFreeEvent ? "secondary" : "default"}>
                            {event.isFreeEvent ? "Free Event" : "Paid Event"}
                        </Badge>
                    </div>
                    <p className="text-lg mb-2">{event.description}</p>
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <div>
                            <p className="font-semibold">Date:</p>
                            <p>{event.date}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Time:</p>
                            <p>{event.time}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Location:</p>
                            <p>{event.location}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Organizer:</p>
                            <p>{event.organizer.name}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                    {event.tickets.map((ticket) => (
                        <div key={ticket.id} className="mb-4 p-4 border rounded-lg">
                            <h3 className="text-xl font-semibold">{ticket.nameTicket}</h3>
                            <p>Available Seats: {ticket.availableSeats}</p>
                            <p>Price: <span className="line-through">{ticket.priceBeforeDiscount}</span> {ticket.priceAfterDiscount} IDR</p>
                            <Button className="mt-2">Buy Ticket</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {event.vouchers.length > 0 && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Vouchers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {event.vouchers.map((voucher) => (
                            <div key={voucher.id} className="mb-2">
                                <p><strong>Code:</strong> {voucher.discountCode}</p>
                                <p><strong>Discount:</strong> {voucher.discountPercentage}%</p>
                                <p><strong>Max Uses:</strong> {voucher.maxUses}</p>
                                <p><strong>Expires:</strong> {voucher.expiredAt.join('-')}</p>
                                <Separator className="my-2" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {event.promoReferral && (
                <Card>
                    <CardHeader>
                        <CardTitle>Promo Referral</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p><strong>Discount:</strong> {event.promoReferral.promoValueDiscount}%</p>
                        <p><strong>Start Date:</strong> {event.promoReferral.start.join('-')}</p>
                        <p><strong>End Date:</strong> {event.promoReferral.end.join('-')}</p>
                        <p><strong>Used:</strong> {event.promoReferral.used} / {event.promoReferral.maxClaims}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

// export async function getEventDetailApi() {
//     const res = await fetch('https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/events')
//     const data = await res.json()


//     return data.events.map((event) => ({ id: event.slug.toString() }))


// }

// async function getData(id) {
//     const res = await fetch(`https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/events/${id}`)
//     const data = await res.json()
//     return data
// }

// export default async function eventDetailPage({ params }) {
//     const data = await getEventDetailApi(params.id)
//     return (
//         <p> title={event.name}</p>
//     )
// }
//bagus

// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'next/navigation';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Loader2 } from "lucide-react";

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
//     expiredAt: number[];
// }

// interface PromoReferral {
//     id: number;
//     eventsId: number;
//     promoValueDiscount: number;
//     start: number[];
//     end: number[];
//     used: number;
//     maxClaims: number;
// }

// interface EventDetails {
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
//     promoReferral: PromoReferral;
// }

// const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';

// export default function EventDetails() {
//     const { id } = useParams();
//     const [event, setEvent] = useState<EventDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchEventDetails = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get(`${BASE_URL}/api/v1/events/${id}`);
//                 if (response.data.success) {
//                     setEvent(response.data.data);
//                 } else {
//                     setError("Failed to fetch event details.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching event details:", error);
//                 setError("An error occurred while fetching event details.");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         if (id) {
//             fetchEventDetails();
//         }
//     }, [id]);

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <Loader2 className="h-8 w-8 animate-spin" />
//             </div>
//         );
//     }

//     if (error || !event) {
//         return <div className="text-center text-red-500">{error || "Event not found"}</div>;
//     }

//     return (
//         <div className="container mx-auto p-4">
//             <Card className="mb-8">
//                 <CardHeader>
//                     <img src={event.image} alt={event.name} className="w-full h-64 object-cover rounded-t-lg" />
//                     <CardTitle className="text-3xl font-bold mt-4">{event.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="flex flex-wrap gap-2 mb-4">
//                         <Badge>{event.category}</Badge>
//                         <Badge variant={event.isFreeEvent ? "secondary" : "default"}>
//                             {event.isFreeEvent ? "Free Event" : "Paid Event"}
//                         </Badge>
//                     </div>
//                     <p className="text-lg mb-2">{event.description}</p>
//                     <div className="grid grid-cols-2 gap-4 my-4">
//                         <div>
//                             <p className="font-semibold">Date:</p>
//                             <p>{event.date}</p>
//                         </div>
//                         <div>
//                             <p className="font-semibold">Time:</p>
//                             <p>{event.time}</p>
//                         </div>
//                         <div>
//                             <p className="font-semibold">Location:</p>
//                             <p>{event.location}</p>
//                         </div>
//                         <div>
//                             <p className="font-semibold">Organizer:</p>
//                             <p>{event.organizer.name}</p>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>

//             <Card className="mb-8">
//                 <CardHeader>
//                     <CardTitle>Tickets</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     {event.tickets.map((ticket) => (
//                         <div key={ticket.id} className="mb-4 p-4 border rounded-lg">
//                             <h3 className="text-xl font-semibold">{ticket.nameTicket}</h3>
//                             <p>Available Seats: {ticket.availableSeats}</p>
//                             <p>Price: <span className="line-through">{ticket.priceBeforeDiscount}</span> {ticket.priceAfterDiscount} IDR</p>
//                             <Button className="mt-2">Buy Ticket</Button>
//                         </div>
//                     ))}
//                 </CardContent>
//             </Card>

//             {event.vouchers.length > 0 && (
//                 <Card className="mb-8">
//                     <CardHeader>
//                         <CardTitle>Vouchers</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         {event.vouchers.map((voucher) => (
//                             <div key={voucher.id} className="mb-2">
//                                 <p><strong>Code:</strong> {voucher.discountCode}</p>
//                                 <p><strong>Discount:</strong> {voucher.discountPercentage}%</p>
//                                 <p><strong>Max Uses:</strong> {voucher.maxUses}</p>
//                                 <p><strong>Expires:</strong> {voucher.expiredAt.join('-')}</p>
//                                 <Separator className="my-2" />
//                             </div>
//                         ))}
//                     </CardContent>
//                 </Card>
//             )}

//             {event.promoReferral && (
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Promo Referral</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <p><strong>Discount:</strong> {event.promoReferral.promoValueDiscount}%</p>
//                         <p><strong>Start Date:</strong> {event.promoReferral.start.join('-')}</p>
//                         <p><strong>End Date:</strong> {event.promoReferral.end.join('-')}</p>
//                         <p><strong>Used:</strong> {event.promoReferral.used} / {event.promoReferral.maxClaims}</p>
//                     </CardContent>
//                 </Card>
//             )}
//         </div>
//     );
// }