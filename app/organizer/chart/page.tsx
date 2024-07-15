// 'use client'

// import React, { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// // Data dummy untuk contoh
// const yearlyData = [
//     { name: 'Jan', value: 400 },
//     { name: 'Feb', value: 300 },
//     { name: 'Mar', value: 600 },
//     { name: 'Apr', value: 800 },
//     { name: 'May', value: 700 },
//     { name: 'Jun', value: 900 },
//     { name: 'Jul', value: 1000 },
//     { name: 'Aug', value: 1200 },
//     { name: 'Sep', value: 1100 },
//     { name: 'Oct', value: 1300 },
//     { name: 'Nov', value: 1500 },
//     { name: 'Dec', value: 1400 },
// ]

// const monthlyData = [
//     { name: 'Week 1', value: 100 },
//     { name: 'Week 2', value: 200 },
//     { name: 'Week 3', value: 150 },
//     { name: 'Week 4', value: 300 },
// ]

// const weeklyData = [
//     { name: 'Mon', value: 50 },
//     { name: 'Tue', value: 80 },
//     { name: 'Wed', value: 70 },
//     { name: 'Thu', value: 100 },
//     { name: 'Fri', value: 120 },
//     { name: 'Sat', value: 150 },
//     { name: 'Sun', value: 90 },
// ]

// const SalesChart = () => {
//     const [period, setPeriod] = useState('yearly')

//     const data = {
//         yearly: yearlyData,
//         monthly: monthlyData,
//         weekly: weeklyData,
//     }[period]

//     return (
//         <Card className="w-full bg-black text-white">
//             <CardHeader>
//                 <CardTitle className="flex justify-between items-center">
//                     Sales Overview
//                     <Select onValueChange={setPeriod} defaultValue={period}>
//                         <SelectTrigger className="w-[180px] bg-black">
//                             <SelectValue placeholder="Select period" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="yearly">Yearly</SelectItem>
//                             <SelectItem value="monthly">Monthly</SelectItem>
//                             <SelectItem value="weekly">Weekly</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <ResponsiveContainer width="100%" height={400}>
//                     <LineChart
//                         data={data}
//                         margin={{
//                             top: 5,
//                             right: 30,
//                             left: 20,
//                             bottom: 5,
//                         }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//                         <XAxis dataKey="name" stroke="#888" />
//                         <YAxis stroke="#888" />
//                         <Tooltip
//                             contentStyle={{ backgroundColor: '#333', border: 'none' }}
//                             labelStyle={{ color: '#fff' }}
//                         />
//                         <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </CardContent>
//         </Card>
//     )
// }

// export default SalesChart
// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// interface Event {
//     organizerId: number;
//     name: string;
//     description: string;
//     location: string;
//     // Add other event properties as needed
// }

// interface ApiResponse {
//     statusCode: number;
//     message: string;
//     success: boolean;
//     data: Event[];
// }

// export default function Search() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [events, setEvents] = useState<Event[]>([]); // array of event yang akan menyimpan hasil events
//     const [searchEvents, setSearchEvents] = useState<string>(""); // string yang digunakan untuk mencari event -> state yang nyimpen string yang digunakan di search bar diset di input
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         // Update searchEvents state when URL changes
//         const searchValue = searchParams.get("search") || "";
//         setSearchEvents(searchValue);
//         fetchEvents(searchValue);
//     }, [searchParams]);

//     // fetching events
//     const fetchEvents = async (search: string) => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get<ApiResponse>(
//                 'https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/events',
//                 {
//                     params: { // dikasi query params namanya search, value nya didapatkan dari search produk
//                         search: search,
//                     },
//                 }
//             );
//             if (response.data.success && Array.isArray(response.data.data)) {
//                 setEvents(response.data.data);
//             } else {
//                 setEvents([]);
//                 setError("No events found or invalid response format.");
//             }
//         } catch (error) {
//             console.error("Error fetching events:", error);
//             setError("Failed to fetch events. Please try again.");
//             setEvents([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleSearch = () => {
//         const params = new URLSearchParams(searchParams.toString());
//         params.set("search", searchEvents);
//         router.push(`?${params.toString()}`);
//     };

//     return (
//         <div>
//             <p>Searching data using query params</p>
//             <input
//                 type="text"
//                 placeholder="Search events..."
//                 value={searchEvents}
//                 onChange={(e) => setSearchEvents(e.target.value)} // set isi sesuai yang kita ketik
//             />
//             <button onClick={handleSearch} disabled={isLoading}>
//                 {isLoading ? 'Searching...' : 'Search'}
//             </button>
//             {/* manggil searchproduct untuk mendapatkan produknya (fetch) */}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {!isLoading && !error && (
//                 <ul>
//                     {events.length > 0 ? (
//                         events.map((event) => (
//                             <li key={event.organizerId}>
//                                 <Link href={`/organizer/events/${event.organizerId}`}>
//                                     {event.name} - {event.location}
//                                 </Link>
//                                 <p>{event.description}</p>
//                             </li>
//                         ))
//                     ) : (
//                         <li>No events found</li>
//                     )}
//                 </ul>
//             )}
//         </div>
//     );
// }

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import SearchAndFilter from '@/app/(main)/events/_components/sidebar';

interface Event {
    organizerId: number;
    name: string;
    description: string;
    location: string;
    // Add other event properties as needed
}

interface ApiResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: Event[];
}

const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';

export default function Search() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [events, setEvents] = useState<Event[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [Category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    //search query
    useEffect(() => {
        const query = searchParams.get("keyword") || "";
        setSearchQuery(query);
        if (query) {
            fetchEvents(query);
        }
    }, [searchParams]);

    // fetching events by keyword
    const fetchEvents = async (keyword: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get<ApiResponse>(
                `${BASE_URL}/api/v1/events/search`,
                {
                    params: { keyword: keyword },
                }
            );
            console.log('API request URL:', `${BASE_URL}/api/v1/events/search?keyword=${encodeURIComponent(keyword)}`);
            if (response.data.success && Array.isArray(response.data.data)) {
                setEvents(response.data.data);
            } else {
                setEvents([]);
                setError("No events found or invalid response format.");
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            setError("Failed to fetch events. Please try again.");
            setEvents([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        router.push(`?keyword=${encodeURIComponent(searchQuery)}`);
    };
    const categories: FilterOption[] = [
        { value: 'All', label: 'All' },
        { value: 'music', label: 'Music' },
        { value: 'sports', label: 'Sports' },
        { value: 'arts', label: 'Arts' },
        { value: 'food', label: 'Food' },
    ];

    const locations: FilterOption[] = [
        { value: 'All', label: 'All' },
        { value: 'jakarta', label: 'Jakarta' },
        { value: 'surabaya', label: 'Surabaya' },
        { value: 'bandung', label: 'Bandung' },
        { value: 'yogyakarta', label: 'Yogyakarta' },
    ];

    return (
        <div>
            <p>Search events</p>
            <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
            <button onClick={() => router.push('/organizer/chart?keyword=jakarta')} className='bg-red-500'>Jakarta</button>
            <button onClick={() => router.push('/organizer/chart?keyword=surabaya')} className='bg-red-500'>Surabaya</button>
            <button onClick={() => router.push('/organizer/chart?keyword=medan')} className='bg-red-500'>Medan</button>
            <button onClick={() => router.push('/organizer/chart?keyword=bali')} className='bg-red-500'>Bali</button>
            <div>
                <SearchAndFilter
                    placeholder="Search events..."
                    categories={categories}
                    locations={locations}
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!isLoading && !error && (
                <ul>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <li key={event.organizerId}>
                                <img src={event.imageUrl} alt={event.name} className='w-20' />
                                <Link href={`/organizer/events/${event.organizerId}`}>
                                    {event.name} - {event.location}
                                </Link>
                                <p>{event.description}</p>
                            </li>
                        ))
                    ) : (
                        <li>No events found</li>
                    )}
                </ul>
            )}
        </div>
    );
}