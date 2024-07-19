import React from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

interface UserAvatarProps {
    avatarUrl: string;
    fallback: string;
    alt: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatarUrl, fallback, alt }) => {
    return (
        <Avatar className="h-24 w-24 ring-4 ring-white">
            <AvatarImage src={avatarUrl} alt={alt} />
            <AvatarFallback className="bg-green-600 text-white text-2xl">{fallback}</AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;
