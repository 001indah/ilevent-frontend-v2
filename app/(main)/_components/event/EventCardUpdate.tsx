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
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useRouter, usePathname } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';
// import { useDebouncedCallback } from 'use-debounce';
// import Image from 'next/image';
// import { SearchIcon, MapPin, Calendar, Tag } from 'lucide-react';

// const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';
// const ITEMS_PER_PAGE = 10;

// export interface Ticket {
//     nameTicket: string;
//     availableSeats: number;
//     priceBeforeDiscount: number;
//     priceAfterDiscount: number;
//     id: number;
// }

// export interface EventProps {
//     id: number;
//     name: string;
//     description: string;
//     location: string;
//     date: string;
//     time: string;
//     image: string;
//     isFreeEvent: boolean;
//     category: string;
//     organizer: {
//         name: string;
//         username: string;
//     };
//     tickets: Ticket[];
// }

// interface ApiResponse {
//     statusCode: number;
//     message: string;
//     success: boolean;
//     data: EventProps[];
// }

// const EventCard: React.FC<EventProps> = ({
//     id,
//     name,
//     location,
//     date,
//     time,
//     image,
//     isFreeEvent,
//     category,
//     organizer,
//     tickets
// }) => {
//     const cheapestTicket = tickets.reduce((min, ticket) =>
//         ticket.priceAfterDiscount < min.priceAfterDiscount ? ticket : min
//     );

//     const discountPercentage = Math.round((1 - cheapestTicket.priceAfterDiscount / cheapestTicket.priceBeforeDiscount) * 100);

//     return (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-64 md:w-72 lg:w-80">
//             <div className="relative h-48 sm:h-56">
//                 <Image
//                     src={image}
//                     alt={name}
//                     layout="fill"
//                     objectFit="cover"
//                     className="hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-sm font-semibold">
//                     {category}
//                 </div>
//             </div>
//             <div className="p-4">
//                 <h3 className="font-bold text-lg mb-2 truncate">{name}</h3>
//                 <div className="flex items-center mb-2">
//                     <MapPin size={16} className="text-gray-500 mr-1" />
//                     <p className="text-sm text-gray-600 truncate">{location}</p>
//                 </div>
//                 <div className="flex items-center mb-2">
//                     <Calendar size={16} className="text-gray-500 mr-1" />
//                     <p className="text-sm text-gray-600">{`${date} ${time}`}</p>
//                 </div>
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <p className="text-lg font-bold text-blue-600">
//                             {isFreeEvent ? 'Free' : `$${cheapestTicket.priceAfterDiscount.toFixed(2)}`}
//                         </p>
//                         {!isFreeEvent && discountPercentage > 0 && (
//                             <div className="flex items-center">
//                                 <p className="text-sm text-gray-500 line-through mr-1">
//                                     ${cheapestTicket.priceBeforeDiscount.toFixed(2)}
//                                 </p>
//                                 <span className="text-sm font-semibold text-red-500">
//                                     -{discountPercentage}%
//                                 </span>
//                             </div>
//                         )}
//                     </div>
//                     <div className="flex items-center">
//                         <Tag size={16} className="text-gray-500 mr-1" />
//                         <p className="text-sm text-gray-600">{cheapestTicket.nameTicket}</p>
//                     </div>
//                 </div>
//                 <div className="mt-2 text-sm text-gray-600">
//                     <p>By {organizer.name}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };