import React from 'react';
import { string } from 'yup';

export interface ArticleProps {
    authorName: string
    joinedDate: string
    rating: number
    reviewDate: string
    reviewContent?: string
    helpfulCount?: number
}

const Article: React.FC<ArticleProps> = ({ authorName, joinedDate, rating, reviewDate, reviewContent, helpfulCount }) => {
    return (
        <article className="border rounded-lg p-4 mb-3">
            <div className="flex items-center mb-4">
                <img className="w-10 h-10 me-4 rounded-full" src="/carousel.png" alt="" />
                <div className="font-medium">
                    <p>{authorName} <time dateTime={joinedDate} className="block text-sm text-gray-500">Joined on {joinedDate}</time></p>
                </div>
            </div>
            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                {[...Array(rating)].map((_, index) => (
                    <svg key={index} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                ))}
                {/* <h3 className="ms-2 text-sm font-semibold text-gray-900">Thinking to buy another one!</h3> */}
            </div>
            <footer className="mb-5 text-sm text-gray-500"><p>Reviewed on {reviewDate} | Type: VIP</p></footer>
            <p className="mb-2 text-gray-500">{reviewContent}</p>
            {/* <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline">Read more</a>
            <aside>
                <p className="mt-1 text-xs text-gray-500">{helpfulCount} people found this helpful</p>
                <div className="flex items-center mt-3">
                    <a href="#" className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100">Helpful</a>
                    <a href="#" className="ps-4 text-sm font-medium text-blue-600 hover:underline">Report abuse</a>
                </div>
            </aside> */}
        </article>
    );
};

export default Article;
