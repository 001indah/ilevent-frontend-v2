// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

// export interface EventProps {
//     id: number;
//     name: string;
//     description: string;
//     date: [number, number, number];
//     time: [number, number];
//     location: string;
//     image: string;
//     isFreeEvent: boolean;
//     category: string;
//     rattingRate: number | null;
// }

// interface FetchEventsParams {
//     query?: string;
//     category?: string;
//     location?: string;
//     page?: number;
//     limit?: number;
// }

// const fetchEvents = async ({ query, category, location, page, limit }: FetchEventsParams) => {
//     const response = await api.get<{ events: EventProps[], totalPages: number }>('/events', {
//         params: { query, category, location, page, limit }
//     });
//     return response.data;
// };

// export const useEvents = (params: FetchEventsParams) => {
//     return useQuery({
//         queryKey: ['events', params],
//         queryFn: () => fetchEvents(params),
//         keepPreviousData: true
//     });
// };

import { config } from "@/constants/url";
import { Event } from "@/types/events";
import axiosInstance from "@/utils/axiosInstance";

async function getData() {
    let endpoints = config.endpoints.getAllEvents;

    try {
        const response = await axiosInstance.get(endpoints);
        return response.data;
    } catch (error) {
        console.log("Error fetching data", error);
        throw error;
    }
}

export async function getEvents() {
    const Events = (await getData()) as unknown as Event[];
    return Events;
}