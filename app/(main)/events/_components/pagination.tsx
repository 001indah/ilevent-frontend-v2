// components/Pagination.tsx
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center mt-10 space-x-2">
            {pages.map(page => (
                <a
                    key={page}
                    href="#"
                    onClick={() => onPageChange(page)}
                    className={`px-2 py-1 sm:px-4 sm:py-2 ml-1 mt-2 border rounded-lg ${page === currentPage ? 'ring ring-primary bg-primary/20 text-gray-600' : 'hover:bg-gray-100 text-gray-600'} focus:outline-none`}
                >
                    {page}
                </a>
            ))}
        </div>
    );
};

export default Pagination;
