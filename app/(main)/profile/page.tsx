// import React from 'react'
// import ProfileCard from '@/app/(main)/profile/_components/ProfileCard'
// import Profile from '@/app/(main)/profile/_components/Profile'

// const page = () => {
//     return (
//         <div>
//             {/* profil page */}
//             {/* <ProfileCard /> */}
//             <Profile />
//         </div>
//     )
// }

// export default page
// 'use client'
// import { useEffect, useState } from 'react';
// import { getToken } from '@/utils/auth';
// import apiClient from '@/services/apiClient';
// import ProfileUpdate from './_components/UpdateProfile';
// import ProfileCard from './_components/Profile';

// const Profile = () => {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             const token = getToken();
//             if (!token) {
//                 setError('No token found');
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await apiClient.get('/users/profile', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setProfile(response.data);
//             } catch (error) {
//                 setError('Failed to fetch profile');
//                 console.error('Error fetching profile:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProfile();
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div>
//             <h1>Profile</h1>
//             {profile && (
//                 <div>
//                     <p>Name: {profile.name}</p>
//                     <p>Username: {profile.username}</p>
//                     <p>Email: {profile.email}</p>
//                     <p>Organizer: {profile.organizer ? 'Yes' : 'No'}</p>
//                     <p>Total Points: {profile.totalPoints}</p>
//                     <p>Phone: {profile.phone}</p>
//                     <img src={profile.picture} alt="Profile Picture" />
//                     <p>Referral Code: {profile.referralCode}</p>
//                 </div>
//             )}
//             <br />
//             <br />

//             <ProfileUpdate />
//             {/* <ProfileCard /> */}
//         </div>
//     );
// };

// export default Profile;


'use client'
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/auth';
import apiClient from '@/services/apiClient';
import ProfileUpdate from './_components/UpdateProfile';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, Star, GamepadIcon, Trophy } from 'lucide-react'
import Carousel from '../events/_components/Carousel';
import UserAvatar from './_components/UserAvatar';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = getToken();
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await apiClient.get('/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
                // const userData = response.data;
                // setProfile(userData);
            } catch (error) {
                setError('Failed to fetch profile');
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 px-16">
                {profile && (
                    <Card className="mb-6 bg-gray-800 border-2 border-green-400 shadow-lg shadow-green-400/50">
                        <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500">
                            <CardTitle className="flex items-center gap-4">
                                <UserAvatar
                                    avatarUrl={profile.picture}
                                    fallback={profile.name[0]}
                                    alt="Profile Picture"
                                />
                                <div>
                                    <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
                                    <Badge className="bg-yellow-400 text-gray-900 font-bold py-1 px-3 rounded-full">
                                        {profile.organizer ? (
                                            <><Trophy className="w-5 h-5 mr-2" /> Organizer</>
                                        ) : (
                                            <><GamepadIcon className="w-5 h-5 mr-2" /> Player</>
                                        )}
                                    </Badge>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="mt-4">
                            <div className="grid grid-cols-2 gap-6">
                                <ProfileItem icon={<User className="w-6 h-6 text-green-400" />} label={profile.username} />
                                <ProfileItem icon={<Mail className="w-6 h-6 text-green-400" />} label={profile.email} />
                                <ProfileItem icon={<Phone className="w-6 h-6 text-green-400" />} label={profile.phone} />
                                <ProfileItem icon={<Star className="w-6 h-6 text-yellow-400" />} label={`Total Points: ${profile.totalPoints}`} />
                            </div>
                            <Separator className="my-6 bg-green-400" />
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2 text-green-400">Referral Code</h3>
                                <code className="bg-gray-900 p-3 rounded text-green-400 font-mono text-lg">{profile.referralCode}</code>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card className="bg-gray-800 border-2 border-blue-400 shadow-lg shadow-blue-400/50">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500">
                        <CardTitle className="text-white">Update Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ProfileUpdate />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const ProfileItem = ({ icon, label }) => (
    <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg">
        {icon}
        <span className="text-lg">{label}</span>
    </div>
);

export default Profile;
