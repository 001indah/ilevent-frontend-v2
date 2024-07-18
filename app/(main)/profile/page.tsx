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
'use client'
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/auth';
import apiClient from '@/services/apiClient';
import ProfileUpdate from './_components/UpdateProfile';
import ProfileCard from './_components/Profile';

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
            } catch (error) {
                setError('Failed to fetch profile');
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Profile</h1>
            {profile && (
                <div>
                    <p>Name: {profile.name}</p>
                    <p>Username: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                    <p>Organizer: {profile.organizer ? 'Yes' : 'No'}</p>
                    <p>Total Points: {profile.totalPoints}</p>
                    <p>Phone: {profile.phone}</p>
                    <img src={profile.picture} alt="Profile Picture" />
                    <p>Referral Code: {profile.referralCode}</p>
                </div>
            )}
            <br />
            <br />

            <ProfileUpdate />
            {/* <ProfileCard /> */}
        </div>
    );
};

export default Profile;
