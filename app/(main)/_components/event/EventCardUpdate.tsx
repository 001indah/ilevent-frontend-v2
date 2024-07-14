import React from 'react';
import Image from 'next/image';

export interface EventProps {
    id: number;
    name: string;
    description: string;
    date: [number, number, number];
    time: [number, number];
    location: string;
    createdAt: number;
    updatedAt: number;
    image: string;
    isFreeEvent: boolean;
    deletedAt: null | number;
    rattingRate: null | number;
    category: string;
}

const EventCard: React.FC<EventProps> = ({
    id,
    name,
    description,
    date,
    time,
    location,
    image,
    isFreeEvent,
    category
}) => {
    const formatDate = (dateArr: [number, number, number]) => {
        const [year, month, day] = dateArr;
        return new Date(year, month - 1, day).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeArr: [number, number]) => {
        const [hours, minutes] = timeArr;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-white rounded-t-lg">
            <div className="flex justify-center">
                <div className="h-40 lg:w-48 lg:h-48 my-2 rounded-t-lg overflow-hidden relative">
                    <Image
                        width={500}
                        height={500}
                        src={image}
                        alt={name}
                        className="object-cover w-full h-full hover:scale-125 ease-in-out duration-300"
                    />
                    <div className="absolute top-0 flex justify-between p-2 w-full">
                        <div className="bg-white rounded-md px-2 text-baseBlue font-bold">{category}</div>
                    </div>
                </div>
            </div>
            <div className="my-1 mx-1 w-40 lg:w-48">
                <p className="text-base font-bold">{name}</p>
                <div className="py-1 text-sm text-gray-500 group-hover:text-baseBlue">
                    <p className="text-base text-black font-bold ml-1">
                        {isFreeEvent ? 'Free' : 'Paid'}
                    </p>
                </div>
                <div className="py-1 flex text-sm flex-wrap text-gray-900 group-hover:text-baseBlue">
                    <p className="flex-wrap ml-1 w-40">{`${formatDate(date)} ${formatTime(time)}`}</p>
                </div>
                <div className="py-1 flex text-sm flex-wrap text-gray-900 group-hover:text-baseBlue">
                    <p className="flex-wrap ml-1 w-40">{location}</p>
                </div>
            </div>
        </div>
    );
};

export default EventCard;