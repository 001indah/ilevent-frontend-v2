import React from 'react';
import Image from 'next/image';

interface CategoryCardProps {
    title: string;
    eventCount: number;
    imageUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, eventCount, imageUrl }) => {
    return (
        <div>
            <div className='relative w-32 h-32 my-2'>
                <Image
                    src={imageUrl}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className='rounded-lg'
                />
            </div>
            <div>
                <p className='text-sm font-bold'>{title}</p>
                <p className='text-sm text-gray-500'>{eventCount} events</p>
            </div>
        </div>
    );
}

export default CategoryCard;