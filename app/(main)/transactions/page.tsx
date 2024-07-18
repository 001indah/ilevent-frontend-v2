// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useAuth } from '@/context/AuthContext';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { getToken } from '@/utils/auth';
// import apiClient from '@/services/apiClient';

// interface Ticket {
//     id: number;
//     nameTicket: string;
//     priceAfterDiscount: number;
//     availableSeats: number;
// }

// interface Voucher {
//     id: number;
//     discountCode: string;
//     discountPercentage: number;
// }

// interface PromoReferral {
//     id: number;
//     promoValueDiscount: number;
// }

// interface PriceCalculation {
//     totalAmount: number;
//     amountAfterDiscount: number;
//     pointsDiscount: number;
// }

// interface TransactionFormProps {
//     eventId: number;
//     eventName: string;
// }

// export function TransactionForm({ eventId, eventName }: TransactionFormProps) {
//     const [tickets, setTickets] = useState<Ticket[]>([]);
//     const [vouchers, setVouchers] = useState<Voucher[]>([]);
//     const [promoReferral, setPromoReferral] = useState<PromoReferral | null>(null);
//     const [selectedTickets, setSelectedTickets] = useState<{ ticketId: number; quantity: number }[]>([]);
//     const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);
//     const [usePromoReferral, setUsePromoReferral] = useState(false);
//     const [priceCalculation, setPriceCalculation] = useState<PriceCalculation | null>(null);
//     const [isCalculating, setIsCalculating] = useState(false);

//     const router = useRouter();
//     const { isAuthenticated, currentUser } = useAuth();

//     useEffect(() => {
//         if (!isAuthenticated) {
//             router.push('/sign-in');
//             return;
//         }

//         const fetchEventDetails = async () => {
//             const token = getToken();
//             if (!token) {
//                 console.error('No token found');
//                 router.push('/sign-in');
//                 return;
//             }
//             try {
//                 const response = await apiClient.get(`https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/events/${eventId}`, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 setTickets(response.data.data.tickets);
//                 setVouchers(response.data.data.vouchers);
//                 setPromoReferral(response.data.data.promoReferral);
//             } catch (error) {
//                 console.error('Failed to fetch event details:', error);
//                 if (axios.isAxiosError(error) && error.response?.status === 401) {
//                     router.push('/sign-in');
//                 }
//             }
//         };

//         fetchEventDetails();
//     }, [eventId, isAuthenticated, router]);

//     const handleTicketChange = (ticketId: number, quantity: number) => {
//         const updatedTickets = selectedTickets.filter(t => t.ticketId !== ticketId);
//         if (quantity > 0) {
//             updatedTickets.push({ ticketId, quantity });
//         }
//         setSelectedTickets(updatedTickets);
//     };

//     const calculatePrice = async () => {
//         if (!currentUser) return;
//         setIsCalculating(true);

//         // Memastikan selectedTickets tidak kosong dan memiliki quantity > 0
//         const validTickets = selectedTickets.filter(ticket => ticket.quantity > 0);

//         // Menyiapkan data voucher
//         const voucherData = selectedVoucher
//             ? [{ voucherId: selectedVoucher, quantity: 1 }]
//             : [];

//         // Menyiapkan data yang akan dikirim
//         const postData = {
//             userId: currentUser.id,
//             eventId: Number(eventId),
//             tickets: validTickets,
//             vouchers: voucherData,
//             promoReferralId: usePromoReferral && promoReferral ? promoReferral.id : null
//         };

//         console.log('Data yang akan dikirim:', postData); // Log untuk debugging

//         try {
//             const response = await axios.post<{ data: PriceCalculation }>(
//                 'https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/transaction/calculate-price',
//                 postData,
//                 { withCredentials: true }
//             );

//             console.log('Price calculation response:', response.data);

//             if (response.data && response.data.data) {
//                 setPriceCalculation(response.data.data);
//             } else {
//                 console.error('Unexpected response structure:', response.data);
//             }
//         } catch (error) {
//             console.error('Failed to calculate price:', error);
//             if (axios.isAxiosError(error) && error.response?.status === 401) {
//                 router.push('/sign-in');
//             }
//         } finally {
//             setIsCalculating(false);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!isAuthenticated) {
//             router.push('/sign-in');
//             return;
//         }
//         await calculatePrice();
//         console.log('Transaction details:', priceCalculation);
//     };

//     if (!isAuthenticated) {
//         return <div>Please log in to access this page.</div>;
//     }

//     return (
//         <form onSubmit={handleSubmit} className="space-y-6 p-16">
//             <h2 className="text-2xl font-bold">Create Transaction for {eventName}</h2>

//             <div>
//                 <h3 className="text-lg font-semibold mb-2">Select Tickets</h3>
//                 {tickets.map((ticket) => (
//                     <div key={ticket.id} className="flex items-center space-x-4 mb-2">
//                         <Label htmlFor={`ticket-${ticket.id}`}>{ticket.nameTicket}</Label>
//                         <Input
//                             id={`ticket-${ticket.id}`}
//                             type="number"
//                             min="0"
//                             max={ticket.availableSeats}
//                             onChange={(e) => handleTicketChange(ticket.id, parseInt(e.target.value))}
//                         />
//                         <span>Price: Rp {ticket.priceAfterDiscount.toLocaleString()}</span>
//                     </div>
//                 ))}
//             </div>

//             {vouchers.length > 0 && (
//                 <div>
//                     <h3 className="text-lg font-semibold mb-2">Select Voucher</h3>
//                     <Select onValueChange={(value) => setSelectedVoucher(Number(value))}>
//                         <SelectTrigger>
//                             <SelectValue placeholder="Select a voucher" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             {vouchers.map((voucher) => (
//                                 <SelectItem key={voucher.id} value={voucher.id.toString()}>
//                                     {voucher.discountCode} ({voucher.discountPercentage}% off)
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 </div>
//             )}

//             {promoReferral && (
//                 <div className="flex items-center space-x-2">
//                     <Input
//                         id="usePromoReferral"
//                         type="checkbox"
//                         checked={usePromoReferral}
//                         onChange={(e) => setUsePromoReferral(e.target.checked)}
//                     />
//                     <Label htmlFor="usePromoReferral">
//                         Use Promo Referral ({promoReferral.promoValueDiscount}% discount)
//                     </Label>
//                 </div>
//             )}

//             <Button type="submit" disabled={isCalculating}>
//                 {isCalculating ? "Calculating..." : "Calculate Price"}
//             </Button>

//             {priceCalculation && (
//                 <Card className="mt-6">
//                     <CardHeader>
//                         <CardTitle>Price Calculation</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="space-y-2">
//                             <p>
//                                 <span className="font-semibold">Total Amount:</span>
//                                 Rp {priceCalculation.totalAmount.toLocaleString()}
//                             </p>
//                             <p>
//                                 <span className="font-semibold">Amount After Discount:</span>
//                                 Rp {priceCalculation.amountAfterDiscount.toLocaleString()}
//                             </p>
//                             <p>
//                                 <span className="font-semibold">Points Discount:</span>
//                                 Rp {priceCalculation.pointsDiscount.toLocaleString()}
//                             </p>
//                         </div>
//                     </CardContent>
//                 </Card>
//             )}
//         </form>
//     );
// }
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { toast } from "@/components/ui/use-toast";
// import apiClient from '@/services/apiClient';

// interface Ticket {
//     id: number;
//     nameTicket: string;
//     priceAfterDiscount: number;
//     availableSeats: number;
// }

// interface Voucher {
//     id: number;
//     discountCode: string;
//     discountPercentage: number;
// }

// interface PromoReferral {
//     id: number;
//     promoValueDiscount: number;
// }

// interface TransactionResponse {
//     transactionId: number;
//     totalAmount: number;
//     amountAfterDiscount: number;
//     pointsDiscount: number;
//     paymentStatus: string;
//     pointsUsed: boolean;
// }

// interface TransactionFormProps {
//     eventId: number;
//     eventName: string;
// }

// export function TransactionForm({ eventId, eventName }: TransactionFormProps) {
//     const [tickets, setTickets] = useState<Ticket[]>([]);
//     const [vouchers, setVouchers] = useState<Voucher[]>([]);
//     const [promoReferral, setPromoReferral] = useState<PromoReferral | null>(null);
//     const [selectedTickets, setSelectedTickets] = useState<{ ticketId: number; quantity: number }[]>([]);
//     const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);
//     const [usePromoReferral, setUsePromoReferral] = useState(false);
//     const [usePoints, setUsePoints] = useState(false);
//     const [transactionResponse, setTransactionResponse] = useState<TransactionResponse | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const router = useRouter();
//     const { isAuthenticated, currentUser } = useAuth();

//     useEffect(() => {
//         if (!isAuthenticated) {
//             router.push('/sign-in');
//             return;
//         }

//         const fetchEventDetails = async () => {
//             try {
//                 const response = await apiClient.get(`/events/${eventId}`);
//                 setTickets(response.data.data.tickets);
//                 setVouchers(response.data.data.vouchers);
//                 setPromoReferral(response.data.data.promoReferral);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch event details:', error);
//                 setError('Failed to fetch event details. Please try again.');
//                 setLoading(false);
//                 if (axios.isAxiosError(error) && error.response?.status === 401) {
//                     router.push('/sign-in');
//                 }
//             }
//         };

//         fetchEventDetails();
//     }, [eventId, isAuthenticated, router]);

//     const handleTicketChange = (ticketId: number, quantity: number) => {
//         setSelectedTickets(prevTickets => {
//             const updatedTickets = prevTickets.filter(t => t.ticketId !== ticketId);
//             if (quantity > 0) {
//                 updatedTickets.push({ ticketId, quantity });
//             }
//             return updatedTickets;
//         });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!isAuthenticated) {
//             toast({
//                 title: "Authentication Required",
//                 description: "Please log in to create a transaction.",
//                 variant: "destructive",
//             });
//             router.push('/sign-in');
//             return;
//         }

//         setIsSubmitting(true);

//         try {
//             const response = await apiClient.post<TransactionResponse>('/transaction/create', {
//                 eventId: Number(eventId),
//                 tickets: selectedTickets,
//                 vouchers: selectedVoucher ? [{ voucherId: selectedVoucher, quantity: 1 }] : [],
//                 promoReferralId: usePromoReferral && promoReferral ? promoReferral.id : null,
//                 usePoints: usePoints
//             });

//             setTransactionResponse(response.data);
//             toast({
//                 title: "Transaction Successful",
//                 description: `Transaction ID: ${response.data.transactionId}`,
//             });
//         } catch (error) {
//             console.error('Failed to create transaction:', error);
//             toast({
//                 title: "Transaction Failed",
//                 description: "An error occurred while creating the transaction.",
//                 variant: "destructive",
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <form onSubmit={handleSubmit} className="space-y-6 p-16">
//             <h2 className="text-2xl font-bold">Create Transaction for {eventName}</h2>

//             <div>
//                 <h3 className="text-lg font-semibold mb-2">Select Tickets</h3>
//                 {tickets.map((ticket) => (
//                     <div key={ticket.id} className="flex items-center space-x-4 mb-2">
//                         <Label htmlFor={`ticket-${ticket.id}`}>{ticket.nameTicket}</Label>
//                         <Input
//                             id={`ticket-${ticket.id}`}
//                             type="number"
//                             min="0"
//                             max={ticket.availableSeats}
//                             onChange={(e) => handleTicketChange(ticket.id, parseInt(e.target.value))}
//                         />
//                         <span>Price: Rp {ticket.priceAfterDiscount.toLocaleString()}</span>
//                     </div>
//                 ))}
//             </div>

//             {vouchers.length > 0 && (
//                 <div>
//                     <h3 className="text-lg font-semibold mb-2">Select Voucher</h3>
//                     <Select onValueChange={(value) => setSelectedVoucher(Number(value))}>
//                         <SelectTrigger>
//                             <SelectValue placeholder="Select a voucher" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             {vouchers.map((voucher) => (
//                                 <SelectItem key={voucher.id} value={voucher.id.toString()}>
//                                     {voucher.discountCode} ({voucher.discountPercentage}% off)
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 </div>
//             )}

//             {promoReferral && (
//                 <div className="flex items-center space-x-2">
//                     <Checkbox
//                         id="usePromoReferral"
//                         checked={usePromoReferral}
//                         onCheckedChange={(checked) => setUsePromoReferral(checked as boolean)}
//                     />
//                     <Label htmlFor="usePromoReferral">
//                         Use Promo Referral ({promoReferral.promoValueDiscount}% discount)
//                     </Label>
//                 </div>
//             )}

//             <div className="flex items-center space-x-2">
//                 <Checkbox
//                     id="usePoints"
//                     checked={usePoints}
//                     onCheckedChange={(checked) => setUsePoints(checked as boolean)}
//                 />
//                 <Label htmlFor="usePoints">Use Points for Discount</Label>
//             </div>

//             <Button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? "Processing..." : "Create Transaction"}
//             </Button>

//             {transactionResponse && (
//                 <div className="mt-4">
//                     <h3 className="text-lg font-semibold">Transaction Details</h3>
//                     <p>Transaction ID: {transactionResponse.transactionId}</p>
//                     <p>Total Amount: Rp {transactionResponse.totalAmount.toLocaleString()}</p>
//                     <p>Amount After Discount: Rp {transactionResponse.amountAfterDiscount.toLocaleString()}</p>
//                     <p>Points Discount: Rp {transactionResponse.pointsDiscount.toLocaleString()}</p>
//                     <p>Payment Status: {transactionResponse.paymentStatus}</p>
//                     <p>Points Used: {transactionResponse.pointsUsed ? 'Yes' : 'No'}</p>
//                 </div>
//             )}
//         </form>
//     );
// }

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiClient from '@/services/apiClient';

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

interface TransactionResponse {
    transactionId: number;
    totalAmount: number;
    amountAfterDiscount: number;
    pointsDiscount: number;
    paymentStatus: string;
    pointsUsed: boolean;
}

interface ClientSideCalculation {
    totalAmount: number;
    discountAmount: number;
    finalAmount: number;
}

interface TransactionFormProps {
    eventId: number;
    eventName: string;
}

export function TransactionForm({ eventId, eventName, ...props }: TransactionFormProps) {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [promoReferral, setPromoReferral] = useState<PromoReferral | null>(null);
    const [selectedTickets, setSelectedTickets] = useState<{ ticketId: number; quantity: number }[]>([]);
    const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);
    const [usePromoReferral, setUsePromoReferral] = useState(false);
    const [usePoints, setUsePoints] = useState(false);
    const [transactionResponse, setTransactionResponse] = useState<TransactionResponse | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [clientSideCalculation, setClientSideCalculation] = useState<ClientSideCalculation>({
        totalAmount: 0,
        discountAmount: 0,
        finalAmount: 0
    });

    const router = useRouter();
    const { isAuthenticated, currentUser } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/sign-in');
            return;
        }

        const fetchEventDetails = async () => {
            try {
                const response = await apiClient.get(`/events/${eventId}`);
                setTickets(response.data.data.tickets);
                setVouchers(response.data.data.vouchers);
                setPromoReferral(response.data.data.promoReferral);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch event details:', error);
                setError('Failed to fetch event details. Please try again.');
                setLoading(false);
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    router.push('/sign-in');
                }
            }
        };

        fetchEventDetails();
    }, [eventId, isAuthenticated, router]);

    const calculateClientSideTotal = useMemo(() => {
        return () => {
            let total = 0;
            let discount = 0;

            selectedTickets.forEach(st => {
                const ticket = tickets.find(t => t.id === st.ticketId);
                if (ticket) {
                    total += ticket.priceAfterDiscount * st.quantity;
                }
            });

            if (selectedVoucher) {
                const voucher = vouchers.find(v => v.id === selectedVoucher);
                if (voucher) {
                    discount += total * (voucher.discountPercentage / 100);
                }
            }

            if (usePromoReferral && promoReferral) {
                discount += total * (promoReferral.promoValueDiscount / 100);
            }

            const finalAmount = Math.max(total - discount, 0);

            return {
                totalAmount: total,
                discountAmount: discount,
                finalAmount: finalAmount
            };
        };
    }, [tickets, vouchers, selectedTickets, selectedVoucher, usePromoReferral, promoReferral]);

    useEffect(() => {
        const result = calculateClientSideTotal();
        setClientSideCalculation(result);
    }, [selectedTickets, selectedVoucher, usePromoReferral, calculateClientSideTotal]);

    const handleTicketChange = (ticketId: number, quantity: number) => {
        setSelectedTickets(prevTickets => {
            const updatedTickets = prevTickets.filter(t => t.ticketId !== ticketId);
            if (quantity > 0) {
                updatedTickets.push({ ticketId, quantity });
            }
            return updatedTickets;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast({
                title: "Authentication Required",
                description: "Please log in to create a transaction.",
                variant: "destructive",
            });
            router.push('/sign-in');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await apiClient.post<TransactionResponse>('/transaction/create', {
                eventId: Number(eventId),
                tickets: selectedTickets,
                vouchers: selectedVoucher ? [{ voucherId: selectedVoucher, quantity: 1 }] : [],
                promoReferralId: usePromoReferral && promoReferral ? promoReferral.id : null,
                usePoints: usePoints
            });

            setTransactionResponse(response.data);

            if (response.data.amountAfterDiscount !== clientSideCalculation.finalAmount) {
                console.log('Server calculation differs from client estimation');
            }

            toast({
                title: "Transaction Successful",
                description: `Transaction ID: ${response.data.transactionId}`,
            });
        } catch (error) {
            console.error('Failed to create transaction:', error);
            toast({
                title: "Transaction Failed",
                description: "An error occurred while creating the transaction.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Create Transaction for {eventName}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <div>
                            {/* <img src={eventImage} alt={eventName} /> */}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Select Tickets</h3>
                            {tickets.map((ticket) => (
                                <div key={ticket.id} className="flex items-center space-x-4 mb-2">
                                    <Label htmlFor={`ticket-${ticket.id}`} className="w-1/3">{ticket.nameTicket}</Label>
                                    <Input
                                        id={`ticket-${ticket.id}`}
                                        type="number"
                                        min="0"
                                        max={ticket.availableSeats}
                                        onChange={(e) => handleTicketChange(ticket.id, parseInt(e.target.value))}
                                        className="w-1/3"
                                    />
                                    <span className="w-1/3 text-right">Price: Rp {ticket.priceAfterDiscount.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
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
                            <Checkbox
                                id="usePromoReferral"
                                checked={usePromoReferral}
                                onCheckedChange={(checked) => setUsePromoReferral(checked as boolean)}
                            />
                            <Label htmlFor="usePromoReferral">
                                Use Promo Referral ({promoReferral.promoValueDiscount}% discount)
                            </Label>
                        </div>
                    )}

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="usePoints"
                            checked={usePoints}
                            onCheckedChange={(checked) => setUsePoints(checked as boolean)}
                        />
                        <Label htmlFor="usePoints">Use Points for Discount</Label>
                    </div>

                    <div className="mt-6 p-4 bg-gray-100 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Estimated Price</h3>
                        <p>Total: Rp {clientSideCalculation.totalAmount.toLocaleString()}</p>
                        <p>Discount: Rp {clientSideCalculation.discountAmount.toLocaleString()}</p>
                        <p className="font-bold">Estimated Final Price: Rp {clientSideCalculation.finalAmount.toLocaleString()}</p>
                        <p className="text-sm text-gray-500 mt-2">* Final price may vary based on server calculation</p>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Processing..." : "Create Transaction"}
                    </Button>

                    {transactionResponse && (
                        <div className="mt-6 p-4 bg-green-100 rounded-md">
                            <h3 className="text-lg font-semibold mb-2">Transaction Details</h3>
                            <p>Transaction ID: {transactionResponse.transactionId}</p>
                            <p>Total Amount: Rp {transactionResponse.totalAmount.toLocaleString()}</p>
                            <p>Amount After Discount: Rp {transactionResponse.amountAfterDiscount.toLocaleString()}</p>
                            <p>Points Discount: Rp {transactionResponse.pointsDiscount.toLocaleString()}</p>
                            <p>Payment Status: {transactionResponse.paymentStatus}</p>
                            <p>Points Used: {transactionResponse.pointsUsed ? 'Yes' : 'No'}</p>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}