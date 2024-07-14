// // pages/Event.tsx
// 'use client';
// import React, { useState } from 'react';
// import EventCard from '@/app/(main)/_components/event/EventCard';
// import { events } from '@/app/(main)/_data/eventData';
// import Pagination from './pagination';
// import Link from 'next/link';

// const ITEMS_PER_PAGE = 12;
// export interface EventListProps {
//     className?: string;
// }

// const Event: React.FC<EventListProps> = ({ className }) => {
//     const [currentPage, setCurrentPage] = useState(1);

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const currentEvents = events.slice(startIndex, startIndex + ITEMS_PER_PAGE);
//     const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

//     return (
//         <div>
//             {/* <Filters /> */}
//             <div className={`${className} flex flex-wrap w-full gap-4 lg:gap-5 justify-center`}>
//                 {currentEvents.map((event, index) => (
//                     <Link
//                         key={index}
//                         href={`/events/${event.id}_${event.title.replace(/\s+/g, '-').toLowerCase()}`}
//                     >
//                         <EventCard
//                             id={event.id}
//                             key={index}
//                             imageSrc={event.imageSrc}
//                             location={event.location}
//                             date={event.date}
//                             price={event.price}
//                             discountedPrice={event.discountedPrice}
//                             discountPercentage={event.discountPercentage}
//                             title={event.title}
//                             logo={event.logo}
//                             heartIcon={event.heartIcon}
//                         />
//                     </Link>
//                 ))}
//             </div>

//             <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//             />
//         </div>
//     );
// };

// export default Event;










// 'use client';
// import React from 'react';
// import EventCard from '@/app/(main)/_components/event/EventCardUpdate';
// import Pagination from './pagination';
// import Link from 'next/link';
// import Search from '@/components/ui/Search';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { useEvents, EventProps } from '@/app/hooks/useEvent';

// const ITEMS_PER_PAGE = 12;

// export default function EventPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const query = searchParams.get('query') || '';
//     const page = Number(searchParams.get('page')) || 1;
//     const category = searchParams.get('category') || '';
//     const location = searchParams.get('location') || '';

//     const { data, isLoading, error } = useEvents({
//         query,
//         category,
//         location,
//         page,
//         limit: ITEMS_PER_PAGE
//     });

//     const handlePageChange = (newPage: number) => {
//         const params = new URLSearchParams(searchParams.toString());
//         params.set('page', newPage.toString());
//         router.push(`?${params.toString()}`);
//     };

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {(error as Error).message}</div>;

//     return (
//         <div>
//             <div className="flex justify-center mb-4">
//                 <Search placeholder="Search events..." />
//             </div>
//             <div className="flex flex-wrap w-full gap-4 lg:gap-5 justify-center">
//                 {data?.events.map((event: EventProps) => (
//                     <Link
//                         key={event.id}
//                         href={`/events/${event.id}_${event.name.replace(/\s+/g, '-').toLowerCase()}`}
//                     >
//                         <EventCard {...event} />
//                     </Link>
//                 ))}
//             </div>
//             {data && (
//                 <Pagination
//                     currentPage={page}
//                     totalPages={data.totalPages}
//                     onPageChange={handlePageChange}
//                 />
//             )}
//         </div>
//     );
// }












// // pages / Event.tsx
// 'use client';
// import React, { useState, useEffect } from 'react';
// import EventCard from '@/app/(main)/_components/event/EventCard';
// import { events } from '@/app/(main)/_data/eventData';
// import Pagination from './pagination';
// import Link from 'next/link';
// import Search from '@/components/ui/Search';
// import { useSearchParams } from 'next/navigation';

// const ITEMS_PER_PAGE = 12;

// export interface EventListProps {
//     className?: string;
// }

// const Event: React.FC<EventListProps> = ({ className }) => {
//     const searchParams = useSearchParams();
//     const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
//     const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

//     useEffect(() => {
//         setSearchQuery(searchParams.get('query') || '');
//         setCurrentPage(Number(searchParams.get('page')) || 1);
//     }, [searchParams]);

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const filteredEvents = events.filter(event =>
//         event.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const currentEvents = filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
//     const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

//     return (
//         <div>
//             {/* <div className="flex justify-center mb-4">
//                 <Search placeholder="Search events..." />
//             </div> */}
//             <div className={`${className} flex flex-wrap w-full gap-4 lg:gap-5 justify-center`}>
//                 {currentEvents.map((event, index) => (
//                     <Link
//                         key={index}
//                         href={`/events/${event.id}_${event.title.replace(/\s+/g, '-').toLowerCase()}`}
//                     >
//                         <EventCard
//                             id={event.id}
//                             key={index}
//                             imageSrc={event.imageSrc}
//                             location={event.location}
//                             date={event.date}
//                             price={event.price}
//                             discountedPrice={event.discountedPrice}
//                             discountPercentage={event.discountPercentage}
//                             title={event.title}
//                             logo={event.logo}
//                             heartIcon={event.heartIcon}
//                         />
//                     </Link>
//                 ))}
//             </div>

//             <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//             />
//         </div>
//     );
// };

// export default Event;










// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
// import EventCard, { EventProps } from '@/app/(main)/_components/event/EventCardUpdate';
// import Pagination from './pagination';
// import Search from '@/components/ui/Search';
// import { fetchEvents } from '@/app/(redux)/actions/EventAction';
// import { RootState, AppDispatch } from '@/app/(redux)/store/store';

// const ITEMS_PER_PAGE = 12;

// export interface EventListProps {
//     className?: string;
// }

// const Event: React.FC<EventListProps> = ({ className }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { events, isLoading, error } = useSelector((state: RootState) => state.events);

//     const searchParams = useSearchParams();
//     const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
//     const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

//     useEffect(() => {
//         dispatch(fetchEvents());
//     }, [dispatch]);

//     useEffect(() => {
//         setSearchQuery(searchParams.get('query') || '');
//         setCurrentPage(Number(searchParams.get('page')) || 1);
//     }, [searchParams]);

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const filteredEvents = events.filter(event =>
//         event.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const currentEvents = filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
//     const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <div className="flex justify-center mb-4">
//                 <Search placeholder="Search events..." value={searchQuery} onChange={setSearchQuery} />
//             </div>
//             <div className={`${className} flex flex-wrap w-full gap-4 lg:gap-5 justify-center`}>
//                 {currentEvents.map((event: EventProps) => (
//                     <Link
//                         key={event.id}
//                         href={`/events/${event.id}_${event.name.replace(/\s+/g, '-').toLowerCase()}`}
//                     >
//                         <EventCard
//                             id={event.id}
//                             name={event.name}
//                             description={event.description}
//                             date={event.date}
//                             time={event.time}
//                             location={event.location}
//                             createdAt={event.createdAt}
//                             updatedAt={event.updatedAt}
//                             image={event.image}
//                             isFreeEvent={event.isFreeEvent}
//                             deletedAt={event.deletedAt}
//                             rattingRate={event.rattingRate}
//                             category={event.category}
//                         />
//                     </Link>
//                 ))}
//             </div>
//             <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//             />
//         </div>
//     );
// };

// export default Event;
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import EventCard, { EventProps } from '@/app/(main)/_components/event/EventCardUpdate';
import Pagination from './pagination';
import Search from '@/components/ui/Search';
import { useDebouncedCallback } from 'use-debounce';

const ITEMS_PER_PAGE = 30;
const API_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/events';

export interface EventListProps {
    className?: string;
}

const Event: React.FC<EventListProps> = ({ className }) => {
    const [events, setEvents] = useState<EventProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

    const fetchEvents = async (page: number, query: string) => {
        try {
            setIsLoading(true);
            const response = await axios.get(API_URL, {
                params: {
                    page: page - 1, // Backend pagination usually starts from 0
                    size: ITEMS_PER_PAGE,
                    query: query
                }
            });
            const eventsData = Array.isArray(response.data.content) ? response.data.content : response.data.events;
            if (Array.isArray(eventsData)) {
                setEvents(eventsData);
            } else {
                throw new Error('Events data is not in the expected format');
            }
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch events');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };

    const handleSearchChange = useDebouncedCallback((query: string) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to first page on new search
        const params = new URLSearchParams(searchParams);
        params.set('query', query);
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    }, 300);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="flex justify-center mb-4">
                <Search placeholder="Search events..." value={searchQuery} onChange={handleSearchChange} />
            </div>
            <div className={`${className} flex flex-wrap w-full gap-4 lg:gap-5 justify-center`}>
                {events.map((event: EventProps) => (
                    <Link
                        key={event.id}
                        href={`/events/${event.id}_${event.name.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                        <EventCard {...event} />
                    </Link>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(events.length / ITEMS_PER_PAGE)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Event;




// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import EventCard from '@/app/(main)/_components/event/EventCard';
// import { events } from '@/app/(main)/_data/eventData';
// import Pagination from './pagination';
// import Link from 'next/link';
// import SearchAndFilter from './sidebar';

// const ITEMS_PER_PAGE = 12;

// export interface EventListProps {
//     className?: string;
// }

// const Event: React.FC<EventListProps> = ({ className }) => {
//     const searchParams = useSearchParams();
//     const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
//     const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
//     const [category, setCategory] = useState(searchParams.get('category') || 'all');
//     const [location, setLocation] = useState(searchParams.get('location') || 'all');

//     useEffect(() => {
//         setSearchQuery(searchParams.get('query') || '');
//         setCategory(searchParams.get('category') || 'all');
//         setLocation(searchParams.get('location') || 'all');
//         setCurrentPage(Number(searchParams.get('page')) || 1);
//     }, [searchParams]);

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const filteredEvents = events.filter(event =>
//         event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
//         (category === 'all' || event.category === category) &&
//         (location === 'all' || event.location === location)
//     );

//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const currentEvents = filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
//     const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

//     const categories = [
//         { value: 'music', label: 'Music' },
//         { value: 'sports', label: 'Sports' },
//         { value: 'arts', label: 'Arts' },
//         { value: 'food', label: 'Food' },
//         // Add more categories as needed
//     ];

//     const locations = [
//         { value: 'jakarta', label: 'Jakarta' },
//         { value: 'surabaya', label: 'Surabaya' },
//         { value: 'bandung', label: 'Bandung' },
//         { value: 'yogyakarta', label: 'Yogyakarta' },
//         // Add more locations as needed
//     ];

//     return (
//         <div className={className}>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
//                 {currentEvents.map((event, index) => (
//                     <Link href={`/event/${event.id}`} key={index}>
//                         <EventCard {...event} />
//                     </Link>
//                 ))}
//             </div>
//             <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//             />
//         </div>
//     );
// };

// export default Event;