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

const dummyTotalPages = 5; // Example total pages for pagination

export default function Page() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const currentPage = Number(searchParams.get('page')) || 1;
    const totalPages = dummyTotalPages; // Using dummy total pages

    return (
        <div className="w-full p-16">
            <div className="flex w-full items-center justify-between">
                <h1 className={`font-bold text-2xl`}>Ilevent</h1>
            </div>
            <div className="my-8 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
            </div>
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
    );
}
