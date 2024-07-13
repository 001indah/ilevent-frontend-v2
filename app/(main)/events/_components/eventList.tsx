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

// pages/Event.tsx
'use client';
import React, { useState, useEffect } from 'react';
import EventCard from '@/app/(main)/_components/event/EventCard';
import { events } from '@/app/(main)/_data/eventData';
import Pagination from './pagination';
import Link from 'next/link';
import Search from '@/components/ui/Search';
import { useSearchParams } from 'next/navigation';

const ITEMS_PER_PAGE = 12;

export interface EventListProps {
    className?: string;
}

const Event: React.FC<EventListProps> = ({ className }) => {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

    useEffect(() => {
        setSearchQuery(searchParams.get('query') || '');
        setCurrentPage(Number(searchParams.get('page')) || 1);
    }, [searchParams]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentEvents = filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

    return (
        <div>
            {/* <div className="flex justify-center mb-4">
                <Search placeholder="Search events..." />
            </div> */}
            <div className={`${className} flex flex-wrap w-full gap-4 lg:gap-5 justify-center`}>
                {currentEvents.map((event, index) => (
                    <Link
                        key={index}
                        href={`/events/${event.id}_${event.title.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                        <EventCard
                            id={event.id}
                            key={index}
                            imageSrc={event.imageSrc}
                            location={event.location}
                            date={event.date}
                            price={event.price}
                            discountedPrice={event.discountedPrice}
                            discountPercentage={event.discountPercentage}
                            title={event.title}
                            logo={event.logo}
                            heartIcon={event.heartIcon}
                        />
                    </Link>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Event;
