'use client'
import React from 'react';
import Counter from './counter';
import Comments from './comment';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Rating from './rating';
import Link from 'next/link';
import Image from 'next/image'
import EventList from '../../_components/eventList';


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
    heartIcon
}) => {



    return (
        <div>
            <div className='lg:grid lg:grid-cols-[3fr,3fr,2fr] gap-8'>
                <div className=" bg-white rounded-lg">
                    <div className="justify-center">
                        <div className="w-full lg:w-full lg:h-full my-2 rounded-lg overflow-hidden relative">
                            <Image
                                width={500}
                                height={500}
                                src={imageSrc}
                                alt={title}
                                className="object-cover rounded-lg w-full h-full"
                            />
                            <div className="flex gap-4 p-2 w-full my-3 border rounded-md">
                                <p className="text-sm font-bold">Organize by:</p>
                                <Avatar>
                                    <AvatarImage
                                        className="object-cover object-center w-full h-full"
                                        src="https://images.pexels.com/photos/634021/pexels-photo-634021.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-bold">Organization</p>
                                    <p className="text-sm">25 event</p>
                                    <Link href={`/event/${id}/organizer`}>
                                        <button className="bg-black p-1 px-2 rounded-md text-white my-1">View Profile</button>
                                    </Link>
                                </div>
                            </div>
                            {/* <div className="absolute top-0 flex justify-between p-2 w-full">
                        {logo ? <div className="bg-white rounded-md px-2 text-baseBlue font-bold">{logo}</div> : null}
                        {heartIcon ? <div className="bg-white font-bold p-1 rounded-full text-baseBlue">{heartIcon}</div> : null}
                    </div> */}
                        </div>
                    </div>

                </div>
                <div>
                    <div >
                        <div className='my-4'>

                            {/* <p className="text-base font-bold">{title}</p> */}
                            <p className="text-3xl font-bold">{title}</p>
                            <div className="flex">
                                <p className="mr-2">Terjual </p>
                                <span className="text-gray-500">10</span>
                                <p className="mx-2 text-gray-500">•</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-2 text-yellow-500 w-5 h-auto fill-current hover:text-red-600"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <p className="mr-2">4.6 </p>
                                <span className="text-gray-500">(5 rating)</span>
                                <p className="mx-2 text-gray-500">•</p>

                                <p >Diskusi</p>
                                <p className="text-gray-500 mx-2">(3)</p>
                            </div>
                        </div>

                        <div className="py-3 pb-6 text-sm  text-gray-500 border-gray-300 border-b">
                            {/* <Ticket size={20} /> */}
                            <p className="text-3xl text-black font-bold ml-1">{price}</p>
                            <div className="flex items-center ml-1">
                                {discountPercentage ? (
                                    <span className='text-sm font-bold ml-1 text-baseRed bg-pink-100 rounded-sm px-2'>
                                        {discountPercentage + "%"}
                                    </span>
                                ) : null}
                                {discountedPrice && (
                                    <p className="text-base text-gray-500 line-through ml-1">{discountedPrice}</p>
                                )}
                            </div>
                        </div>
                        <div className='my-4'>
                            <div className="">
                                {/* <CalendarHeart size={20} /> */}
                                <p >{date}</p>
                            </div>
                            <div className="">
                                {/* <MapPin size={20} /> */}
                                <p >{location}</p>
                            </div>
                        </div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad rerum magnam officiis numquam dolorem, corrupti tempora quia aspernatur odio ipsam quidem, excepturi quasi blanditiis illo! Magnam itaque cum totam fuga iure? Laudantium incidunt harum commodi cum molestias ratione! Repellendus, illum a pariatur corrupti voluptatibus tempora, praesentium ullam facilis fuga sequi at aliquam libero, aspernatur alias officia quam eligendi architecto autem eaque dolorem. Illum, numquam neque? Deserunt at suscipit, modi sunt aliquam velit esse a optio molestiae accusantium doloremque dignissimos sapiente quae enim amet dolor eaque maiores quibusdam laborum dolorum. Laudantium veniam libero dolor quas voluptas voluptatibus consectetur eveniet inventore modi. Quasi, soluta doloribus tempore voluptate odio facilis est nisi autem nobis earum facere perspiciatis minus aperiam voluptates nostrum, excepturi unde ex dolorum velit labore blanditiis inventore delectus eligendi ea! Earum nulla, aliquid autem consequuntur praesentium ad quasi. Aperiam blanditiis, suscipit delectus earum facilis aut unde iure iusto hic obcaecati, necessitatibus sint repellendus perferendis recusandae debitis dignissimos fugiat magnam, laboriosam illo odio maiores. Distinctio unde excepturi consequuntur incidunt maiores sapiente, sunt cum, eaque numquam at laborum odio quidem nihil necessitatibus dolor nostrum blanditiis atque reiciendis ex inventore doloribus dolore. Libero in dolore nobis incidunt, laudantium doloremque quod at eveniet quidem error.</p>

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.964418378393!2d104.09909067413892!3d1.1854215620840483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da27e2a4951e67%3A0xb4fde627f3a44477!2sNongsa%20Digital%20Park!5e0!3m2!1sen!2sid!4v1720082763106!5m2!1sen!2sid"
                            className="rounded-lg w-full h-full my-4"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps Embed"
                        />

                        {/* <p className='my-4'>
                        Informasi Penyelenggara:

                        Nama penyelenggara
                        Kontak penyelenggara (misalnya email atau nomor telepon)
                    </p>
                    <p className='my-4'>
                        Event Review & Rating
                    </p> */}
                    </div>
                </div>
                <div>
                    <div className='p-4 rounded-lg border border-gray-300 w-full inline-block'>
                        <p className='font-bold mb-4'>Atur jumlah dan catatan</p>
                        <div className='my-2 border-b border-gray-100 py-2 flex items-center'>
                            <button className='text-base rounded-md border px-2 py-1 mr-2 hover:bg-black hover:text-white'>VIP</button>
                            <button className='text-base rounded-md border px-2 py-1 mr-2 hover:bg-black hover:text-white'>VVIP</button>
                            <button className='text-base rounded-md border px-2 py-1 mr-2 hover:bg-black hover:text-white'>Regular</button>
                        </div>
                        <div className='flex items-center'>
                            <Counter />
                            <p className='ml-4'>Stok: <span>10</span></p>
                        </div>
                        <div className="pt-6 ">
                            {/* <Ticket size={20} /> */}
                            <div className="flex items-center ml-1 text-gray-400">
                                {/* {discountPercentage ? (
                            <span className='text-base font-bold ml-1 text-baseRed bg-pink-100 rounded-sm px-2'>
                                {discountPercentage + "%"}
                            </span>
                        ) : null} */}
                                {discountedPrice && (
                                    <p className="text-xs text-gray-500 line-through ml-1 text-right w-full">{discountedPrice}</p>
                                )}
                            </div>
                            <p className="text-xl text-black font-bold ml-1 w-full text-right flex justify-between items-center"><span className='font-medium text-base text-gray-500'>Subtotal</span>{price}</p>
                        </div>
                        <Link href={`/event/${id}/ticket`}>
                            <button className="mt-5 w-full p-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-300">Pesan Sekarang</button>
                        </Link>
                        <button className="my-2 w-full p-2 border border-black rounded-lg">+ Wishlist</button>

                        {/* <Link
                    key={index}
                    href={`/event/${event.id}`}
                // className={`transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
                >
                    <button className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">Pesan Sekarang</button>
                </Link> */}
                    </div>
                </div>
            </div>
            <h1 className="text-2xl font-bold my-4 border-t border-gray-300 py-4 w-full">Event Rating & Review</h1>
            <div className='lg:grid lg:grid-cols-[1fr,2fr] gap-4 justify-between'>
                <Rating />
                <Comments />
            </div>
            <h1 className="text-2xl font-bold my-4 border-t border-gray-300 py-4 w-full">Event You May Like</h1>

            <EventList />

        </div>


    );
};

export default EventCard;
