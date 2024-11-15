

'use client';
import { useState } from 'react';
import { getToken } from '@/utils/auth';
import apiClient from '@/services/apiClient';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, User, Phone } from 'lucide-react';

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
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="profilePicture" className="text-green-400 flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Profile Picture
                </Label>
                <Input
                    id="profilePicture"
                    type="file"
                    onChange={handleFileChange}
                    className="bg-gray-700 border-green-400 text-white"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="name" className="text-green-400 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Name
                </Label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-green-400 text-white"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone" className="text-green-400 flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Phone
                </Label>
                <Input
                    id="phone"
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-green-400 text-white"
                />
            </div>
            {/* Add other input fields as needed */}
            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
            >
                Update Profile
            </Button>
        </form>
    );
};

export default ProfileUpdate;
