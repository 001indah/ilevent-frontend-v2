import React from 'react';
import RatingStats from './ratingCard';

const dummyData = [
    [70, 17, 8, 4, 1]
];

const IndexPage = () => {
    return (
        <div className="container mx-auto">
            {/* <h1 className="text-2xl font-bold my-4">Product Ratings</h1> */}
            {dummyData.map((ratings, index) => (
                <RatingStats key={index} ratings={ratings} />
            ))}
        </div>
    );
};

export default IndexPage;
