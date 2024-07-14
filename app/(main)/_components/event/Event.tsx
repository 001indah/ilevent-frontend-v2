// components / Event.tsx
// 'use client'
// // components/Event.tsx
// import React from 'react';
// import EventCard from './EventCard';
// import useCarousel from '@/hooks/useCarousel';
// import { EventProps } from '@/app/(main)/_data/eventData';
// import Link from 'next/link';
// // import { events } from '../../data/eventData';

// interface EventComponentProps {
//     data: EventProps[];
//     title: string;
//     link: string;
// }

// const Event: React.FC<EventComponentProps> = ({ data, title, link }) => {
//     const { activeIndex, prevSlide, nextSlide } = useCarousel(data);

//     return (
//         <div>
//             <div className='flex justify-between items-center mt-8 pt-5 border-t border-gray-300'>
//                 <Link href={link}>
//                     <p className='text-lg font-bold'>{title}</p>
//                 </Link>
//                 <div className='inline-flex items-center font-bold text-sm flex-wrap text-baseBlue group-hover:text-baseBlue'>
//                     <Link href={link}>
//                         <p>{`See all >`}</p>
//                     </Link>
//                 </div>
//             </div>
//             <div className="relative">
//                 {/* <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4" onClick={prevSlide} aria-label="Previous">
//                     <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
//                         <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1L1 5l4 4" />
//                         </svg>
//                     </span>
//                 </button> */}
//                 <div className="flex gap-2 overflow-x-auto">
//                     {data.slice(0, 10).map((event, index, id) => (
//                         <Link
//                             key={index}
//                             href={`/events/${event.id}_${event.title.replace(/\s+/g, '-').toLowerCase()}`}
//                         >
//                             <EventCard
//                                 id={event.id}
//                                 key={index}
//                                 imageSrc={event.imageSrc}
//                                 location={event.location}
//                                 date={event.date}
//                                 price={event.price}
//                                 discountedPrice={event.discountedPrice}
//                                 discountPercentage={event.discountPercentage}
//                                 title={event.title}
//                                 logo={event.logo}
//                                 heartIcon={event.heartIcon}
//                             />
//                         </Link>

//                     ))}
//                 </div>
//                 {/* <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4" onClick={nextSlide} aria-label="Next">
//                     <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
//                         <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
//                         </svg>
//                     </span>
//                 </button> */}
//             </div>
//         </div>
//     );
// };

// export default Event;

// 'use client'

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Link from 'next/link';
// import EventCard, { EventProps } from './EventCardUpdate';
// import useCarousel from '@/hooks/useCarousel';
// import { fetchEvents } from '@/app/(redux)/actions/EventAction';
// import { RootState, AppDispatch } from '@/app/(redux)/store/store';

// interface EventComponentProps {
//     title: string;
//     link: string;
// }

// const Event: React.FC<EventComponentProps> = ({ title, link }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { events, isLoading, error } = useSelector((state: RootState) => state.events);

//     useEffect(() => {
//         dispatch(fetchEvents());
//     }, [dispatch]);

//     const { activeIndex, prevSlide, nextSlide } = useCarousel(events);

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <div className='flex justify-between items-center mt-8 pt-5 border-t border-gray-300'>
//                 <Link href={link}>
//                     <p className='text-lg font-bold'>{title}</p>
//                 </Link>
//                 <div className='inline-flex items-center font-bold text-sm flex-wrap text-baseBlue group-hover:text-baseBlue'>
//                     <Link href={link}>
//                         <p>{`See all >`}</p>
//                     </Link>
//                 </div>
//             </div>
//             <div className="relative">
//                 <div className="flex gap-2 overflow-x-auto">
//                     {events.slice(0, 10).map((event: EventProps) => (
//                         <Link
//                             key={event.id}
//                             href={`/events/${event.id}_${event.name.replace(/\s+/g, '-').toLowerCase()}`}
//                         >
//                             <EventCard
//                                 id={event.id}
//                                 name={event.name}
//                                 description={event.description}
//                                 date={event.date}
//                                 time={event.time}
//                                 location={event.location}
//                                 createdAt={event.createdAt}
//                                 updatedAt={event.updatedAt}
//                                 image={event.image}
//                                 isFreeEvent={event.isFreeEvent}
//                                 deletedAt={event.deletedAt}
//                                 rattingRate={event.rattingRate}
//                                 category={event.category}
//                             />
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Event;

'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import EventCard, { EventProps } from './EventCardUpdate';
import useCarousel from '@/hooks/useCarousel';

interface EventComponentProps {
    title: string;
    link: string;
}

const Event: React.FC<EventComponentProps> = ({ title, link }) => {
    const [events, setEvents] = useState<EventProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/events');
                setEvents(response.data);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch events');
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const { activeIndex, prevSlide, nextSlide } = useCarousel(events);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className='flex justify-between items-center mt-8 pt-5 border-t border-gray-300'>
                <Link href={link}>
                    <p className='text-lg font-bold'>{title}</p>
                </Link>
                <div className='inline-flex items-center font-bold text-sm flex-wrap text-baseBlue group-hover:text-baseBlue'>
                    <Link href={link}>
                        <p>{`See all >`}</p>
                    </Link>
                </div>
            </div>
            <div className="relative">
                <div className="flex gap-2 overflow-x-auto">
                    {events.slice(0, 10).map((event: EventProps) => (
                        <Link
                            key={event.id}
                            href={`/events/${event.id}_${event.name.replace(/\s+/g, '-').toLowerCase()}`}
                        >
                            <EventCard
                                id={event.id}
                                name={event.name}
                                description={event.description}
                                date={event.date}
                                time={event.time}
                                location={event.location}
                                createdAt={event.createdAt}
                                updatedAt={event.updatedAt}
                                image={event.image}
                                isFreeEvent={event.isFreeEvent}
                                deletedAt={event.deletedAt}
                                rattingRate={event.rattingRate}
                                category={event.category}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Event;