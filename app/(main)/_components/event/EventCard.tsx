import React from 'react';
import Image from 'next/image';


export interface EventProps {
    id: number;
    imageSrc: string;
    location: string;
    date: string;
    price: string;
    discountedPrice?: string;
    discountPercentage?: number;
    title: string;
    logo?: string;
    heartIcon?: React.ReactNode;
    organizer?: string;
    organizerImg?: string;
}
const EventCard: React.FC<EventProps> = ({
    id,
    imageSrc,
    location,
    date,
    price,
    discountedPrice,
    discountPercentage,
    title,
    logo,
    heartIcon,
    organizer,
    organizerImg
}) => {



    return (
        <div className=" bg-white rounded-t-lg">
            <div className="flex justify-center">
                <div className=" h-40 lg:w-48 lg:h-48 my-2 rounded-t-lg overflow-hidden relative">
                    <Image
                        width={500}
                        height={500}
                        src={imageSrc}
                        alt={title}
                        className="object-cover w-full h-full hover:scale-125 ease-in-out duration-300"
                    />
                    <div className="absolute top-0 flex justify-between p-2 w-full">
                        {logo ? <div className="bg-white rounded-md px-2 text-baseBlue font-bold">{logo}</div> : null}
                        {heartIcon ? <div className="bg-white font-bold p-1 rounded-full text-baseBlue">{heartIcon}</div> : null}
                    </div>
                </div>
            </div>
            <div className="my-1 mx-1 w-40 lg:w-48">
                <p className="text-base font-bold">{title}</p>
                <div className="py-1 text-sm  text-gray-500 group-hover:text-baseBlue">
                    {/* <Ticket size={20} /> */}
                    <p className="text-base text-black font-bold ml-1">{price}</p>
                    <div className="flex items-center ml-1">
                        {discountedPrice && (
                            <p className="text-xs text-gray-500 line-through ml-1">{discountedPrice}</p>
                        )}
                        {discountPercentage ? (
                            <span className='text-xs font-bold ml-1 text-baseRed'>
                                {discountPercentage + "%"}
                            </span>
                        ) : null}
                    </div>

                </div>
                <div className="py-1 flex text-sm flex-wrap text-gray-900 group-hover:text-baseBlue">
                    {/* <CalendarHeart size={20} /> */}
                    <p className="flex-wrap ml-1 w-40">{date}</p>
                </div>
                <div className="py-1 flex text-sm flex-wrap text-gray-900 group-hover:text-baseBlue">
                    {/* <MapPin size={20} /> */}
                    <p className="flex-wrap ml-1 w-40">{location}</p>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
