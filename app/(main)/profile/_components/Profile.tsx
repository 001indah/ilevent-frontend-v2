'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Ticket, Star, Edit3 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api'; // Mengimpor API service

// Helper function to format price
const formatPrice = (price: number) => `$${price.toFixed(2)}`;

// Interfaces
interface Ticket {
    id: string;
    event: string;
    date: string;
    price: number;
    status: 'upcoming' | 'completed';
    rating?: number;
    review?: string;
}

interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    picture: string;
    referralCode: string;
    totalPoints: number;
}

// OrderCard component
const OrderCard: React.FC<{ event: Ticket, isCompleted: boolean, onRatingChange: (id: string, rating: number) => void, onReviewChange: (id: string, review: string) => void }> = ({ event, isCompleted, onRatingChange, onReviewChange }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{event.event}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{formatPrice(event.price)}</p>
                {isCompleted && (
                    <>
                        <div>
                            <Label htmlFor="rating">Rating</Label>
                            <Input
                                id="rating"
                                type="number"
                                min="0"
                                max="5"
                                value={event.rating || 0}
                                onChange={(e) => onRatingChange(event.id, parseInt(e.target.value))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="review">Review</Label>
                            <Textarea
                                id="review"
                                value={event.review || ''}
                                onChange={(e) => onReviewChange(event.id, e.target.value)}
                            />
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

const ProfilePage: React.FC = () => {
    const { isAuthenticated, currentUser, getToken } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState<UserProfile | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const checkAuth = async () => {
            const token = getToken(); // Use the getToken function to get the token
            if (!token) {
                router.push('/sign-in');
            } else if (currentUser) {
                setProfileData(currentUser);
                setIsLoading(false);
            } else {
                await fetchProfileData(token); // Pass the token to fetchProfileData
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [currentUser]);

    const fetchProfileData = async (token: string) => {
        try {
            const response = await api.get('/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                },
            });
            setProfileData(response.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
            router.push('/sign-in');
        }
    };

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewProfilePicture(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!profileData) return;

        try {
            const formData = new FormData();
            formData.append('name', profileData.name);
            formData.append('phone', profileData.phone);
            if (newProfilePicture) {
                formData.append('picture', newProfilePicture);
            }

            const token = getToken();
            if (!token) throw new Error('No token available');
            const response = await api.put('/users/profile', formData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                },
            });

            console.log('Profile updated:', response);
            setIsEditDialogOpen(false);
            await fetchProfileData(token); // Fetch the updated profile data
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (isLoading) {
        return <div>Loading profile...</div>;
    }

    if (!profileData) {
        return <div>You need to be logged in to view this page.</div>;
    }

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
                        <AvatarImage src={profileData.picture || "/avatar.jpg"} alt={profileData.name} />
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                </div>
                <div className="text-center mt-8">
                    <h1 className="text-3xl font-bold">{profileData.name}</h1>
                    <p className="text-xl mt-2">{profileData.email}</p>
                    <p className="text-lg mt-2">Referral Code: {profileData.referralCode}</p>
                    <p className="text-2xl font-semibold mt-4">{profileData.totalPoints} Points</p>
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
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="phone" className="text-right">
                                        Phone
                                    </Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="picture" className="text-right">
                                        Picture
                                    </Label>
                                    <Input
                                        id="picture"
                                        name="picture"
                                        type="file"
                                        onChange={handleFileChange}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ProfilePage;
