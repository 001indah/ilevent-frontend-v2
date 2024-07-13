// 'use client';

// import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
// import clsx from 'clsx';
// import Link from 'next/link';
// import { generatePagination } from '@/app/lib/utils';
// import { usePathname, useSearchParams } from 'next/navigation';

// export default function Pagination({ totalPages }: { totalPages: number }) {
//     const pathname = usePathname();
//     const searchParams = useSearchParams();
//     const currentPage = Number(searchParams.get('page')) || 1;

//     // ...
//     const createPageURL = (pageNumber: number | string) => {
//         const params = new URLSearchParams(searchParams);
//         params.set('page', pageNumber.toString());
//         return `${pathname}?${params.toString()}`;
//     };

// }


'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const generatePagination = (currentPage: number, totalPages: number) => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 3) {
            return [1, 2, 3, '...', totalPages - 1, totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
        }

        return [
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            totalPages,
        ];
    };

    const pages = generatePagination(currentPage, totalPages);

    return (
        <div className="flex items-center justify-center space-x-6 mt-8">
            <PaginationArrow
                direction="left"
                href={createPageURL(currentPage - 1)}
                isDisabled={currentPage <= 1}
            />

            <div className="flex items-center justify-center space-x-2">
                {pages.map((page, index) => (
                    <PaginationNumber
                        key={index}
                        href={createPageURL(page)}
                        page={page}
                        isActive={currentPage === page}
                    />
                ))}
            </div>

            <PaginationArrow
                direction="right"
                href={createPageURL(currentPage + 1)}
                isDisabled={currentPage >= totalPages}
            />
        </div>
    );
}

function PaginationNumber({
    page,
    href,
    isActive,
}: {
    page: number | string;
    href: string;
    isActive: boolean;
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center rounded-md text-sm border',
        {
            'ring ring-primary bg-primary/20 text-gray-600': isActive,
            'hover:bg-gray-100 text-gray-600': !isActive && page !== '...',
        }
    );

    return isActive || page === '...' ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    );
}

function PaginationArrow({
    href,
    direction,
    isDisabled,
}: {
    href: string;
    direction: 'left' | 'right';
    isDisabled: boolean;
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center rounded-md border',
        {
            'pointer-events-none text-gray-300': isDisabled,
            'hover:bg-gray-100 text-gray-600': !isDisabled,
        }
    );

    const icon = direction === 'left' ? (
        <ChevronLeft className="w-4 h-4" />
    ) : (
        <ChevronRight className="w-4 h-4" />
    );

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    );
}