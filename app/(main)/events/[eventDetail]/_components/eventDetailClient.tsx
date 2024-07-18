'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Tag, User, Ticket, Gift, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function createSlug(id: string, name: string): string {
    return `${id}_${name.toLowerCase().replace(/ /g, '-')}`;
}

interface EventDetailClientProps {
    event: any; // Tipe data event seharusnya didefinisikan dengan lebih spesifik
}

export default function EventDetailClient({ event }: EventDetailClientProps) {
    const router = useRouter();

    const handleProceedToTransaction = () => {
        const slug = createSlug(event.id.toString(), event.name);
        router.push(`/transactions/create?eventId=${event.id}&eventSlug=${slug}`);
    };

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
                            <Button onClick={handleProceedToTransaction} className="mt-4">Get Your Ticket Now!!</Button>
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