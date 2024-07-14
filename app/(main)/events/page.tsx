// import React from 'react'
// import EventList from '@/app/(main)/events/_components/eventList';
// import Search from '@/components/ui/Search';

// const index = () => {
//     return (
//         <div className='w-full lg:p-16 p-4 mt-24 lg:mt-20'>
//             {/* <p>This is an events home page</p>
//             <p>welcome te ilevent</p> */}
//             <EventList />
//         </div>
//     )
// }

// export default index

// pages/invoices/Page.tsx
'use client';
import Pagination from './_components/pagination';
import Search from '@/components/ui/Search';
import EventList from '@/app/(main)/events/_components/eventList';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchAndFilter from './_components/sidebar';

const dummyTotalPages = 5; // Example total pages for pagination

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


export default function Page() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const currentPage = Number(searchParams.get('page')) || 1;
    const totalPages = dummyTotalPages; // Using dummy total pages

    return (
        <div className='flex'>
            <div>
                <SearchAndFilter
                    placeholder="Search events..."
                    categories={categories}
                    locations={locations}
                />
            </div>
            <div className="w-full p-16">
                <div className="flex w-full items-center justify-between">
                    <h1 className={`font-bold text-2xl`}>Ilevent</h1>
                </div>
                {/* <div className="my-8 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Search invoices..." />
                </div> */}
                <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
                    <EventList />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    {/* <Pagination totalPages={totalPages} /> */}
                    {/* <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                /> */}
                </div>
            </div>
        </div>
    );
}

// 'use client';
// import React from 'react';
// import EventCard from '@/app/(main)/_components/event/EventCard';
// import Pagination from './_components/pagination';
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