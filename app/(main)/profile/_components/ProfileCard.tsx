import React from 'react'
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

const ProfilePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <Card className="max-w-3xl mx-auto bg-white shadow-xl">
                <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarImage
                            className="object-cover object-center"
                            src="https://images.pexels.com/photos/634021/pexels-photo-634021.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt="Profile Picture"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl font-bold">John Doe</CardTitle>
                    <p className="text-gray-500">john.doe@example.com</p>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">Coin Balance</p>
                        <p className="text-xl font-bold">1,250</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                            <TabsTrigger value="history">History</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile" className="mt-4">
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                                </div>
                                <Button className="w-full">Save Changes</Button>
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