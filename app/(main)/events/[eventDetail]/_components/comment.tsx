// pages/index.js or any other page where you want to display the articles

import React from 'react';
import Article from './commentCard';

const dummyData = [
    {
        authorName: 'Jese Leos',
        joinedDate: '2014-08-16',
        rating: 4, // Number of stars
        reviewDate: '2017-03-03',
        reviewContent: 'This is my third Invicta Pro Diver...',
        helpfulCount: 19
    },
    {
        authorName: 'Jese Leos',
        joinedDate: '2014-08-16',
        rating: 5, // Number of stars
        reviewDate: '2017-03-03',
        reviewContent: 'This is my third Invicta Pro Diver...',
        helpfulCount: 19
    },

];

const IndexPage = () => {
    return (
        <div className="container mx-auto">
            {dummyData.map((article, index) => (
                <Article
                    key={index}
                    authorName={article.authorName}
                    joinedDate={article.joinedDate}
                    rating={article.rating}
                    reviewDate={article.reviewDate}
                    reviewContent={article.reviewContent}
                    helpfulCount={article.helpfulCount}
                />
            ))}
        </div>
    );
};

export default IndexPage;
