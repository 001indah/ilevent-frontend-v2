'use client';
import { useState } from 'react';
import { getToken } from '@/utils/auth';
import apiClient from '@/services/apiClient';

const ProfileUpdate = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [profileData, setProfileData] = useState({
        name: '',
        phone: '',
        // add other profile fields as needed
    });

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = getToken();
        if (!token) {
            console.error('No token found');
            return;
        }

        const formData = new FormData();
        formData.append('profilePicture', profilePicture);
        formData.append('updateProfileDto', JSON.stringify(profileData));

        try {
            const response = await apiClient.put(
                '/users/profile/updated',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            console.log('Profile updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Profile Picture:
                    <input type="file" onChange={handleFileChange} />
                </label>
            </div>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            {/* Add other input fields as needed */}
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default ProfileUpdate;
