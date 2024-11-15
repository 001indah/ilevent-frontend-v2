import React from 'react';

export interface ratingProps {
    ratings: number[];
}

const RatingStats: React.FC<ratingProps> = ({ ratings }) => {
    return (
        <div className="mb-4">
            <div className="flex items-center mb-2">
                {ratings.map((rating, index) => (
                    <svg key={index} className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                ))}
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{ratings.reduce((a, b) => a + b, 0) / ratings.length}</p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
            </div>
            <p className="text-sm font-medium text-gray-500 ">1,745 global ratings</p>
            {ratings.map((rating, index) => (
                <div key={index} className="flex items-center mt-2">
                    <a href="#" className="text-sm font-medium text-black  hover:underline">{5 - index} star</a>
                    <div className="w-2/4 h-2 mx-4 bg-gray-200 rounded ">
                        <div className="h-2 bg-yellow-300 rounded" style={{ width: `${rating}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 ">{rating}%</span>
                </div>
            ))}
        </div>
    );
};

export default RatingStats;
