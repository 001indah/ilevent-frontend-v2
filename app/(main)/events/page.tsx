'use client';
import Pagination from './_components/pagination';
import Search from '@/components/ui/Search';
import EventList from '@/app/(main)/events/_components/eventListApi';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchAndFilter from './_components/sidebar';
import Carousel from './_components/Carousel';

const dummyTotalPages = 5;

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
        <div >
            <Carousel />
            <div className="w-full px-16">
                <div className="flex w-full items-center justify-between">
                  
                </div>
                <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
                    <EventList />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                </div>
            </div>
        </div>
    );
}
