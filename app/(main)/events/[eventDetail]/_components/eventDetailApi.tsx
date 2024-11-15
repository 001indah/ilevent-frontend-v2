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
