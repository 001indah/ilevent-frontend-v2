'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Ticket {
    id: number;
    nameTicket: string;
    priceAfterDiscount: number;
    availableSeats: number;
}

interface Voucher {
    id: number;
    discountCode: string;
    discountPercentage: number;
}

interface PromoReferral {
    id: number;
    promoValueDiscount: number;
}

export function TransactionForm({ eventId, eventName }) {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [promoReferral, setPromoReferral] = useState<PromoReferral | null>(null);
    const [selectedTickets, setSelectedTickets] = useState<{ ticketId: number; quantity: number }[]>([]);
    const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);
    const [usePromoReferral, setUsePromoReferral] = useState(false);
    const [priceCalculation, setPriceCalculation] = useState<{
        totalAmount: number;
        amountAfterDiscount: number;
        pointsDiscount: number;
    } | null>(null);

    const router = useRouter();

    useEffect(() => {
        // Fetch event details, tickets, vouchers, and promo referral
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/events/${eventId}`);
                setTickets(response.data.data.tickets);
                setVouchers(response.data.data.vouchers);
                setPromoReferral(response.data.data.promoReferral);
            } catch (error) {
                console.error('Failed to fetch event details:', error);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    const handleTicketChange = (ticketId: number, quantity: number) => {
        const updatedTickets = selectedTickets.filter(t => t.ticketId !== ticketId);
        if (quantity > 0) {
            updatedTickets.push({ ticketId, quantity });
        }
        setSelectedTickets(updatedTickets);
    };

    const calculatePrice = async () => {
        try {
            const response = await axios.post('https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/transaction/calculate-price', {
                userId: 6, // This should be the actual user ID
                eventId: Number(eventId),
                tickets: selectedTickets,
                vouchers: selectedVoucher ? [{ voucherId: selectedVoucher, quantity: 1 }] : [],
                promoReferralId: usePromoReferral && promoReferral ? promoReferral.id : null
            });
            setPriceCalculation(response.data);
        } catch (error) {
            console.error('Failed to calculate price:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculatePrice();
        // Here you would typically proceed with the actual transaction
        // For now, we'll just log the calculation
        console.log('Transaction details:', priceCalculation);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold">Create Transaction for {eventName}</h2>

            <div>
                <h3 className="text-lg font-semibold mb-2">Select Tickets</h3>
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center space-x-4 mb-2">
                        <Label htmlFor={`ticket-${ticket.id}`}>{ticket.nameTicket}</Label>
                        <Input
                            id={`ticket-${ticket.id}`}
                            type="number"
                            min="0"
                            max={ticket.availableSeats}
                            onChange={(e) => handleTicketChange(ticket.id, parseInt(e.target.value))}
                        />
                        <span>Price: Rp {ticket.priceAfterDiscount.toLocaleString()}</span>
                    </div>
                ))}
            </div>

            {vouchers.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Select Voucher</h3>
                    <Select onValueChange={(value) => setSelectedVoucher(Number(value))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a voucher" />
                        </SelectTrigger>
                        <SelectContent>
                            {vouchers.map((voucher) => (
                                <SelectItem key={voucher.id} value={voucher.id.toString()}>
                                    {voucher.discountCode} ({voucher.discountPercentage}% off)
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {promoReferral && (
                <div className="flex items-center space-x-2">
                    <Input
                        id="usePromoReferral"
                        type="checkbox"
                        checked={usePromoReferral}
                        onChange={(e) => setUsePromoReferral(e.target.checked)}
                    />
                    <Label htmlFor="usePromoReferral">
                        Use Promo Referral ({promoReferral.promoValueDiscount}% discount)
                    </Label>
                </div>
            )}

            <Button type="submit">Calculate Price</Button>

            {priceCalculation && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Price Calculation</h3>
                    <p>Total Amount: Rp {priceCalculation.totalAmount.toLocaleString()}</p>
                    <p>Amount After Discount: Rp {priceCalculation.amountAfterDiscount.toLocaleString()}</p>
                    <p>Points Discount: Rp {priceCalculation.pointsDiscount.toLocaleString()}</p>
                </div>
            )}
        </form>
    );
}