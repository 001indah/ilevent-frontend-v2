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
// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';
// import Search from '@/components/ui/Search'; // Assuming the Search component is in the same directory

// // ... (keep the existing interfaces)

// const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';

// const locations = ['Jakarta', 'Surabaya', 'Bandung', 'Yogyakarta', 'Bali'];
// const categories = ['Music', 'Sports', 'Arts', 'Food', 'Technology'];

// export default function SearchPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [events, setEvents] = useState<Event[]>([]);
//     const [location, setLocation] = useState("");
//     const [category, setCategory] = useState("");
//     const [isFreeEvent, setIsFreeEvent] = useState<boolean | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);

//     useEffect(() => {
//         const query = searchParams.get("query") || "";
//         const loc = searchParams.get("location") || "";
//         const cat = searchParams.get("category") || "";
//         const free = searchParams.get("isFreeEvent");
//         const page = parseInt(searchParams.get("page") || "1", 10) - 1; // Adjust for 0-based index

//         setLocation(loc);
//         setCategory(cat);
//         setIsFreeEvent(free === 'true' ? true : free === 'false' ? false : null);
//         setCurrentPage(page);

//         fetchEvents(query, loc, cat, free === 'true' ? true : free === 'false' ? false : null, page);
//     }, [searchParams]);

//     const fetchEvents = async (keyword: string, location: string, category: string, isFreeEvent: boolean | null, page: number) => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const params: any = {
//                 keyword,
//                 location,
//                 category,
//                 page,
//                 size: 9, // Adjust as needed
//             };
//             if (isFreeEvent !== null) {
//                 params.isFreeEvent = isFreeEvent;
//             }
//             const response = await axios.get<ApiResponse>(
//                 `${BASE_URL}/api/v1/events/filter`,
//                 { params }
//             );
//             console.log('API request URL:', response.config.url);
//             if (response.data.success && Array.isArray(response.data.data.content)) {
//                 setEvents(response.data.data.content);
//                 setTotalPages(response.data.data.totalPages);
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

//     const handleFilterChange = (filterType: string, value: string) => {
//         const params = new URLSearchParams(searchParams.toString());
//         params.set(filterType, value);
//         params.set('page', '1'); // Reset to first page on filter change
//         router.push(`?${params.toString()}`);
//     };

//     const handlePageChange = (newPage: number) => {
//         const params = new URLSearchParams(searchParams.toString());
//         params.set('page', (newPage + 1).toString()); // Adjust for 1-based index in URL
//         router.push(`?${params.toString()}`);
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Search Events</h1>
//             <div className="flex space-x-2 mb-4">
//                 <Search placeholder="Search events..." />
//                 <select
//                     value={location}
//                     onChange={(e) => handleFilterChange('location', e.target.value)}
//                     className="border p-2 rounded"
//                 >
//                     <option value="">All Locations</option>
//                     {locations.map((loc) => (
//                         <option key={loc} value={loc}>{loc}</option>
//                     ))}
//                 </select>
//                 <select
//                     value={category}
//                     onChange={(e) => handleFilterChange('category', e.target.value)}
//                     className="border p-2 rounded"
//                 >
//                     <option value="">All Categories</option>
//                     {categories.map((cat) => (
//                         <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                 </select>
//                 <select
//                     value={isFreeEvent === null ? '' : String(isFreeEvent)}
//                     onChange={(e) => handleFilterChange('isFreeEvent', e.target.value)}
//                     className="border p-2 rounded"
//                 >
//                     <option value="">All Events</option>
//                     <option value="true">Free Events</option>
//                     <option value="false">Paid Events</option>
//                 </select>
//             </div>

//             {error && <p className="text-red-500 mb-4">{error}</p>}

//             {isLoading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {events.length > 0 ? (
//                             events.map((event) => (
//                                 <div key={event.id} className="border rounded p-4">
//                                     <img src={event.image} alt={event.name} className="w-full h-48 object-cover mb-2" />
//                                     <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
//                                     <p className="text-gray-600 mb-2">{event.location} - {event.date} {event.time}</p>
//                                     <p className="mb-2">{event.description}</p>
//                                     <p className="font-semibold">{event.isFreeEvent ? 'Free Event' : 'Paid Event'}</p>
//                                     <p>Organizer: {event.organizer.name}</p>
//                                     {event.tickets.length > 0 && (
//                                         <div className="mt-2">
//                                             <p className="font-semibold">Tickets:</p>
//                                             <ul>
//                                                 {event.tickets.map((ticket) => (
//                                                     <li key={ticket.id}>
//                                                         {ticket.nameTicket}: Rp {ticket.priceAfterDiscount}
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     )}
//                                     {/* <Link href={`/events/${event.id}_${event.name.replace(/\s+/g, '-').toLowerCase()}`} className="text-blue-500 hover:underline mt-2 inline-block"> */}
//                                     <Link href={`/events/${event.id}`} className="text-blue-500 hover:underline mt-2 inline-block">

//                                         View Details
//                                     </Link>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No events found</p>
//                         )}
//                     </div>
//                     <div className="mt-4 flex justify-center space-x-2">
//                         <button
//                             onClick={() => handlePageChange(currentPage - 1)}
//                             disabled={currentPage === 0}
//                             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//                         >
//                             Previous
//                         </button>
//                         <span className="px-4 py-2">
//                             Page {currentPage + 1} of {totalPages}
//                         </span>
//                         <button
//                             onClick={() => handlePageChange(currentPage + 1)}
//                             disabled={currentPage === totalPages - 1}
//                             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Search from '@/components/ui/Search';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alret";

const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';

const locations = ['Jakarta', 'Surabaya', 'Bandung', 'Yogyakarta', 'Bali'];
const categories = ['Music', 'Sports', 'Arts', 'Food', 'Technology'];

interface Event {
    id: number;
    name: string;
    description: string;
    location: string;
    date: string;
    time: string;
    imageUrl: string;
    isFreeEvent: boolean;
    category: string;
    organizer: {
        id: number;
        name: string;
        username: string;
    };
    tickets: Array<{
        id: number;
        nameTicket: string;
        priceAfterDiscount: number;
    }>;
}

interface ApiResponse {
    success: boolean;
    data: {
        content: Event[];
        totalPages: number;
    };
}

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [events, setEvents] = useState<Event[]>([]);
    const [location, setLocation] = useState("all");
    const [category, setCategory] = useState("all");
    const [isFreeEvent, setIsFreeEvent] = useState<string>("all");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const query = searchParams.get("query") || "";
        const loc = searchParams.get("location") || "all";
        const cat = searchParams.get("category") || "all";
        const free = searchParams.get("isFreeEvent") || "all";
        const page = parseInt(searchParams.get("page") || "1", 10) - 1;

        setLocation(loc);
        setCategory(cat);
        setIsFreeEvent(free);
        setCurrentPage(page);

        fetchEvents(query, loc, cat, free, page);
    }, [searchParams]);

    const fetchEvents = async (keyword: string, location: string, category: string, isFreeEvent: string, page: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const params: any = {
                keyword,
                page,
                size: 9,
            };
            if (location !== "all") params.location = location;
            if (category !== "all") params.category = category;
            if (isFreeEvent !== "all") params.isFreeEvent = isFreeEvent === 'true';

            const response = await axios.get<ApiResponse>(`${BASE_URL}/api/v1/events/filter`, { params });
            if (response.data.success && Array.isArray(response.data.data.content)) {
                setEvents(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
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

    const handleFilterChange = (filterType: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all') {
            params.delete(filterType);
        } else {
            params.set(filterType, value);
        }
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', (newPage + 1).toString());
        router.push(`?${params.toString()}`);
    };

    const handleSearch = (query: string) => {
        handleFilterChange('query', query);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Search Events</h1>

            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-grow">
                    <Search placeholder="Search events..." onChange={handleSearch} />
                </div>
                <Select value={location} onValueChange={(value) => handleFilterChange('location', value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map((loc) => (
                            <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={category} onValueChange={(value) => handleFilterChange('category', value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={isFreeEvent} onValueChange={(value) => handleFilterChange('isFreeEvent', value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="true">Free Events</SelectItem>
                        <SelectItem value="false">Paid Events</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(9)].map((_, index) => (
                        <Card key={index} className="flex flex-col justify-between">
                            <CardHeader>
                                <Skeleton className="h-[200px] w-full rounded-md" />
                                <Skeleton className="h-4 w-3/4 mt-2" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full mt-2" />
                                <Skeleton className="h-4 w-2/3 mt-2" />
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-10 w-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.length > 0 ? (
                            events.map((event) => (
                                <Card key={event.id} className="flex flex-col justify-between">
                                    <CardHeader>
                                        <img src={event.image} alt={event.name} className="w-full h-48 object-cover rounded-md mb-2" />
                                        <CardTitle>{event.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-2">{event.location} - {event.date} {event.time}</p>
                                        <p className="text-sm mb-2">{event.description.slice(0, 100)}...</p>
                                        <p className="text-sm font-semibold">{event.isFreeEvent ? 'Free Event' : 'Paid Event'}</p>
                                        <p className="text-sm">Organizer: {event.organizer.name}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/events/${event.id}`} passHref>
                                            <Button className="w-full">View Details</Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">No events found</p>
                        )}
                    </div>
                    <div className="mt-8 flex justify-center items-center space-x-2">
                        <Button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                            variant="outline"
                        >
                            Previous
                        </Button>
                        <span className="text-sm text-gray-600">
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <Button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                            variant="outline"
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';
// import SearchAndFilter from '@/app/(main)/events/_components/sidebar';

// interface Event {
//     organizerId: number;
//     name: string;
//     description: string;
//     location: string;
//     image: string;
//     // Add other event properties as needed
// }

// interface ApiResponse {
//     statusCode: number;
//     message: string;
//     success: boolean;
//     data: Event[];
// }

// const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';

// export default function Search() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [events, setEvents] = useState<Event[]>([]); // array of event yang akan menyimpan hasil events
//     const [searchQuery, setSearchQuery] = useState(""); // string yang digunakan untuk mencari event -> state yang nyimpen string yang digunakan di search bar diset di input
//     const [location, setLocation] = useState("");
//     const [category, setCategory] = useState("");
//     const [isFreeEvent, setIsFreeEvent] = useState<boolean | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     //search query
//     useEffect(() => {
//         const query = searchParams.get("keyword") || "";
//         const loc = searchParams.get("location") || "";
//         const cat = searchParams.get("category") || "";
//         const free = searchParams.get("isFreeEvent");

//         setSearchQuery(query);
//         setLocation(loc);
//         setCategory(cat);
//         setIsFreeEvent(free === 'true' ? true : free === 'false' ? false : null);

//         if (query || loc || cat || free !== null) {
//             fetchEvents(query, loc, cat, free === 'true' ? true : free === 'false' ? false : null);
//         }
//     }, [searchParams]);

//     // fetching events by keyword
//     const fetchEvents = async (keyword: string, location: string, category: string, isFreeEvent: boolean | null) => {
//         setIsLoading(true);
//         setError(null);
//         try {

//             const params: any = {
//                 keyword,
//                 location,
//                 category,
//             };
//             if (isFreeEvent !== null) {
//                 params.isFreeEvent = isFreeEvent;
//             }

//             const response = await axios.get<ApiResponse>(
//                 `${BASE_URL}/api/v1/events/search`,
//                 {
//                     params: { keyword: keyword }, // dikasi query params namanya search, value nya didapatkan dari search produk
//                 }
//             );
//             console.log('API request URL:', `${BASE_URL}/api/v1/events/filter?keyword=${encodeURIComponent(keyword)}`);
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
//         router.push(`?keyword=${encodeURIComponent(searchQuery)}`);
//     };
//     // const categories: FilterOption[] = [
//     //     { value: 'All', label: 'All' },
//     //     { value: 'music', label: 'Music' },
//     //     { value: 'sports', label: 'Sports' },
//     //     { value: 'arts', label: 'Arts' },
//     //     { value: 'food', label: 'Food' },
//     // ];

//     // const locations: FilterOption[] = [
//     //     { value: 'All', label: 'All' },
//     //     { value: 'jakarta', label: 'Jakarta' },
//     //     { value: 'surabaya', label: 'Surabaya' },
//     //     { value: 'bandung', label: 'Bandung' },
//     //     { value: 'yogyakarta', label: 'Yogyakarta' },
//     // ];


//     return (
//         <div>
//             <p>Search events</p>
//             <input
//                 type="text"
//                 placeholder="Search events..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)} // set isi sesuai yang kita ketik
//             />
//             <button onClick={handleSearch} disabled={isLoading}>
//                 {isLoading ? 'Searching...' : 'Search'}
//             </button>
//             <button onClick={() => router.push('/organizer/chart?keyword=jakarta')} className='bg-red-500'>Jakarta</button>
//             <button onClick={() => router.push('/organizer/chart?keyword=surabaya')} className='bg-red-500'>Surabaya</button>
//             <button onClick={() => router.push('/organizer/chart?keyword=medan')} className='bg-red-500'>Medan</button>
//             <button onClick={() => router.push('/organizer/chart?keyword=bali')} className='bg-red-500'>Bali</button>
//             <div>
//                 {/* <SearchAndFilter
//                     placeholder="Search events..."
//                     categories={categories}
//                     locations={locations}
//                 /> */}
//             </div>
//             {/* manggil searchproduct untuk mendapatkan produknya (fetch) */}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {!isLoading && !error && (
//                 <ul>
//                     {events.length > 0 ? (
//                         events.map((event) => (
//                             <li key={event.organizerId}>
//                                 <img src={event.image} alt={event.name} className='w-20' />
//                                 <Link href={`/organizer/events/${event.organizerId}`}>
//                                     {event.name} - {event.location}
//                                 </Link>
//                                 <p>{event.description}</p>
//                                 <p>{ }</p>
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
//     image: string;
//     // Add other event properties as needed
// }

// interface ApiResponse {
//     statusCode: number;
//     message: string;
//     success: boolean;
//     data: Event[];
// }

// const BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app';

// export default function Search() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [events, setEvents] = useState<Event[]>([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [location, setLocation] = useState("");
//     const [category, setCategory] = useState("");
//     const [isFreeEvent, setIsFreeEvent] = useState<boolean | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const query = searchParams.get("keyword") || "";
//         const loc = searchParams.get("location") || "";
//         const cat = searchParams.get("category") || "";
//         const free = searchParams.get("isFreeEvent");

//         setSearchQuery(query);
//         setLocation(loc);
//         setCategory(cat);
//         setIsFreeEvent(free === 'true' ? true : free === 'false' ? false : null);

//         if (query || loc || cat || free !== null) {
//             fetchEvents(query, loc, cat, free === 'true' ? true : free === 'false' ? false : null);
//         }
//     }, [searchParams]);

//     const fetchEvents = async (keyword: string, location: string, category: string, isFreeEvent: boolean | null) => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const params: any = {
//                 keyword,
//                 location,
//                 category,
//             };
//             if (isFreeEvent !== null) {
//                 params.isFreeEvent = isFreeEvent;
//             }
//             const response = await axios.get<ApiResponse>(
//                 `${BASE_URL}/api/v1/events/filter`,
//                 { params }
//             );
//             console.log('API request URL:', response.config.url);
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
//         const params = new URLSearchParams();
//         if (searchQuery) params.append('keyword', searchQuery);
//         if (location) params.append('location', location);
//         if (category) params.append('category', category);
//         if (isFreeEvent !== null) params.append('isFreeEvent', String(isFreeEvent));
//         router.push(`?${params.toString()}`);
//     };

//     return (
//         <div>
//             <p>Search events</p>
//             <input
//                 type="text"
//                 placeholder="Search events..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Location"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Category"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//             />
//             <select
//                 value={isFreeEvent === null ? '' : String(isFreeEvent)}
//                 onChange={(e) => setIsFreeEvent(e.target.value === '' ? null : e.target.value === 'true')}
//             >
//                 <option value="">All Events</option>
//                 <option value="true">Free Events</option>
//                 <option value="false">Paid Events</option>
//             </select>
//             <button onClick={handleSearch} disabled={isLoading}>
//                 {isLoading ? 'Searching...' : 'Search'}
//             </button>

//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {!isLoading && !error && (
//                 <ul>
//                     {events.length > 0 ? (
//                         events.map((event) => (
//                             <li key={event.organizerId}>
//                                 <img src={event.image} alt={event.name} className='w-20' />
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