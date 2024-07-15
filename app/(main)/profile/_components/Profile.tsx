'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { User, Ticket, Star, Edit3 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BackButton } from '@/components/BackButton';

// Helper function to format price
const formatPrice = (price: number) => `$${price.toFixed(2)}`;

interface Ticket {
    id: string;
    title: string;
    date: string;
    location: string;
    imageSrc: string;
    price: number;
    discountedPrice?: number;
    status: 'upcoming' | 'completed';
    rating?: number;
    review?: string;
}

// Updated OrderCard component
const OrderCard = ({ event, isCompleted, onRatingChange, onReviewChange }) => (
    <Card className="mb-6 bg-white text-black">
        <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.date} - {event.location}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center mb-4">
                <Image src={event.imageSrc} alt={event.title} width={80} height={80} className="rounded-md mr-4" />
                <div>
                    <p className="font-semibold">{event.title}</p>
                    <p>{event.date}</p>
                    <p>{event.location}</p>
                </div>
            </div>
            <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between mb-2">
                    <span>Original Price</span>
                    <span>{formatPrice(event.price)}</span>
                </div>
                {event.discountedPrice && (
                    <div className="flex justify-between mb-2 text-green-400">
                        <span>Discount</span>
                        <span>-{formatPrice(event.price - event.discountedPrice)}</span>
                    </div>
                )}
                <div className="flex justify-between font-semibold text-lg mt-2">
                    <span>Total</span>
                    <span>{formatPrice(event.discountedPrice || event.price)}</span>
                </div>
            </div>
            {isCompleted && (
                <div className="mt-4">
                    <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            <Star
                                key={star}
                                className={`h-5 w-5 cursor-pointer ${star <= (event.rating || 0) ? 'text-yellow-400' : 'text-gray-400'}`}
                                onClick={() => onRatingChange(event.id, star)}
                            />
                        ))}
                    </div>
                    <Textarea
                        placeholder="Write a review..."
                        value={event.review || ''}
                        onChange={(e) => onReviewChange(event.id, e.target.value)}
                        className="mt-2 bg-white text-black"
                    />
                    <Button className="mt-4">Submit Review</Button>
                </div>
            )}
        </CardContent>
    </Card>
);

const ProfilePage: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([
        {
            id: '1',
            title: 'Summer Music Festival',
            date: '2023-08-15',
            location: 'Central Park, NY',
            imageSrc: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            price: 150,
            discountedPrice: 120,
            status: 'upcoming'
        },
        {
            id: '2',
            title: 'Tech Conference 2023',
            date: '2023-07-20',
            location: 'Convention Center, SF',
            imageSrc: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            price: 300,
            status: 'completed',
            rating: 4
        },
        {
            id: '3',
            title: 'Comedy Night Special',
            date: '2023-09-05',
            location: 'Laugh Factory, LA',
            imageSrc: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            price: 50,
            status: 'upcoming'
        },
        {
            id: '4',
            title: 'Art Exhibition Opening',
            date: '2023-06-30',
            location: 'Metropolitan Museum, NY',
            imageSrc: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            price: 75,
            discountedPrice: 60,
            status: 'completed',
            rating: 5,
            review: 'Amazing exhibition! The artworks were breathtaking.'
        },
    ]);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleRating = (ticketId: string, rating: number) => {
        setTickets(tickets.map(ticket =>
            ticket.id === ticketId ? { ...ticket, rating } : ticket
        ));
    };

    const handleReview = (ticketId: string, review: string) => {
        setTickets(tickets.map(ticket =>
            ticket.id === ticketId ? { ...ticket, review } : ticket
        ));
    };

    return (
        <div className="bg-black text-white">
            {/* Cover Photo */}
            <div className="relative h-64 bg-gradient-to-r from-teal-500 to-teal-800">
                <Image
                    src="https://images.unsplash.com/photo-1470345961863-06d4b12d93b3?q=80&w=2064&auto=format&fit=crop"
                    alt="Cover"
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            {/* Profile Info */}
            <div className="relative px-4 py-16 sm:px-6 lg:px-8">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <Avatar className="h-32 w-32 ring-4 ring-white">
                        <AvatarImage src="/avatar.jpg" alt="User" />
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                </div>
                <div className="text-center mt-8">
                    <h1 className="text-3xl font-bold">Jane Doe</h1>
                    <p className="text-xl mt-2">jane.doe@example.com</p>
                    <p className="text-lg mt-2">Referral Code: JANE123</p>
                    <p className="text-2xl font-semibold mt-4">1250 Points</p>
                </div>
            </div>

            {/* Tickets Tabs */}
            <Tabs defaultValue="upcoming" className="w-full px-4 py-8 sm:px-6 lg:px-8">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upcoming">Upcoming Tickets</TabsTrigger>
                    <TabsTrigger value="completed">Completed Tickets</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    {tickets.filter(ticket => ticket.status === 'upcoming').map(ticket => (
                        <OrderCard
                            key={ticket.id}
                            event={ticket}
                            isCompleted={false}
                            onRatingChange={() => { }}
                            onReviewChange={() => { }}
                        />
                    ))}
                </TabsContent>
                <TabsContent value="completed">
                    {tickets.filter(ticket => ticket.status === 'completed').map(ticket => (
                        <OrderCard
                            key={ticket.id}
                            event={ticket}
                            isCompleted={true}
                            onRatingChange={handleRating}
                            onReviewChange={handleReview}
                        />
                    ))}
                </TabsContent>
            </Tabs>

            {/* Edit Profile Button */}
            <div className="fixed bottom-4 right-4">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Edit3 className="h-4 w-4 text-black" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" value="Jane Doe" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input id="email" value="jane.doe@example.com" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="avatar" className="text-right">
                                    Avatar
                                </Label>
                                <Input id="avatar" type="file" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ProfilePage;