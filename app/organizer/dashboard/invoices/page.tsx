// import Pagination from './pagination';
// import Search from '@/components/ui/Search';
// import Table from '@/app/organizer/dashboard/invoices/table';
// import { CreateInvoice } from '../invoices/CreateInvoice';
// import { Suspense } from 'react';
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
// import { fetchInvoicesPages } from '@/app/lib/data';

// export default async function Page({
//     searchParams,
// }: {
//     searchParams?: {
//         query?: string;
//         page?: string;
//     };
// }) {
//     const query = searchParams?.query || '';
//     const currentPage = Number(searchParams?.page) || 1;
//     const totalPages = await fetchInvoicesPages(query);

//     return (
//         <div className="w-full">
//             <div className="flex w-full items-center justify-between">
//                 <h1 className={`font-bold text-2xl`}>Invoices</h1>
//             </div>
//             <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
//                 <Search placeholder="Search invoices..." />
//                 <CreateInvoice link="/organizer/dashboard" />
//             </div>
//             <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
//                 <Table query={query} currentPage={currentPage} />
//             </Suspense>
//             <div className="mt-5 flex w-full justify-center">
//                 {/* <Pagination totalPages={totalPages} /> */}
//                 <Pagination totalPages={totalPages} />
//             </div>
//         </div>
//     );
// }


import Pagination from '../../../../components/pagination';
import Search from '@/components/ui/Search';
import Table from '@/app/organizer/dashboard/invoices/table';
import { CreateInvoice } from './CreateInvoice';
import { Suspense } from 'react';

const dummyTotalPages = 5; // Example total pages for pagination

export default function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = dummyTotalPages; // Using dummy total pages

    return (
        <div className="w-full p-5">
            <div className="flex w-full items-center justify-between">
                <h1 className={`font-bold text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice link="/organizer/dashboard" />
            </div>
            <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
