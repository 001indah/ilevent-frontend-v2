import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface UserProfile {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    picture: string;
    coins?: number;
}

const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';

const ProfilePage = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/users/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProfile(response.data.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
            toast({
                title: "Error",
                description: "Failed to fetch profile. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!profile) return;

        setIsUpdating(true);
        try {
            const response = await axios.put(
                `${BASE_URL}/api/v1/users/profile`,
                {
                    name: profile.name,
                    phone: profile.phone,
                    picture: null, // Add this line to match the DTO request
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setProfile(response.data.data);
            toast({
                title: "Success",
                description: "Profile updated successfully",
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!profile) {
        return <div className="flex justify-center items-center h-screen">Failed to load profile</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <Card className="max-w-3xl mx-auto bg-white shadow-xl">
                <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarImage
                            className="object-cover object-center"
                            src={profile.picture || "https://images.pexels.com/photos/634021/pexels-photo-634021.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                            alt="Profile Picture"
                        />
                        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl font-bold">{profile.name}</CardTitle>
                    <p className="text-gray-500">{profile.email}</p>
                    {profile.coins !== undefined && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">Coin Balance</p>
                            <p className="text-xl font-bold">{profile.coins}</p>
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                            <TabsTrigger value="history">History</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile" className="mt-4">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isUpdating}>
                                    {isUpdating ? 'Updating...' : 'Save Changes'}
                                </Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="upcoming" className="mt-4">
                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="font-bold">Summer Music Festival</h3>
                                    <p className="text-sm text-gray-500">August 15, 2024</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="history" className="mt-4">
                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="font-bold">{`New Year's Eve Party`}</h3>
                                    <p className="text-sm text-gray-500">December 31, 2023</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfilePage