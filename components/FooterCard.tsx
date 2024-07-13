import React from 'react';

interface CardProps {
    title: string;
    list: string[];
}

const Card: React.FC<CardProps> = ({ title, list }) => {
    return (
        <div className='p-4'>
            <h3 className='text-white font-bold text-lg mb-2'>{title}</h3>
            <ul className='text-white space-y-2'>
                {list.map((item, index) => (
                    <li key={index} className='hover:text-gray-400 transition-colors'>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Card;
