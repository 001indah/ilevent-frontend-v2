import React from 'react';
import Image from 'next/image';
import CounterInput from './counter';

const Voucher = () => {
    const voucherData = {
        type: 'VIP',
        description: 'Exclusive access to premium amenities and services.',
        price: 199.99,
        discountedPrice: 149.99,
        discountPercentage: 25,
        date: 'July 20-25, 2024',
        maxQuantity: 10,
    };

    return (
        <div className='flex flex-col sm:flex-row rounded-lg bg-teal-500 min-h-[10rem] my-2 p-4 relative'>
            <div className='absolute top-4 left-4 rounded-lg bg-white w-28 h-36 overflow-hidden'>
                <Image
                    src="/carousel.png"
                    alt="VIP"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
            </div>
            <div className='ml-0 sm:ml-32 text-white flex-grow'>
                <p className='font-bold text-xl mt-28 sm:mt-0'>{voucherData.type}</p>
                <p className='text-sm mb-2'>{voucherData.description}</p>
                <div className="flex items-center mb-2">
                    <p className="text-base font-bold mr-2">${voucherData.discountedPrice.toFixed(2)}</p>
                    {voucherData.price && (
                        <p className="text-xs text-slate-950 line-through mr-2">${voucherData.price.toFixed(2)}</p>
                    )}
                    {voucherData.discountPercentage && (
                        <span className='text-xs font-bold text-red-500 bg-white px-2 py-1 rounded'>
                            {voucherData.discountPercentage}% OFF
                        </span>
                    )}
                </div>
                <p className="text-sm mb-2">Available for {voucherData.date}</p>
                <div className='flex flex-col sm:flex-row gap-2 items-start sm:items-center'>
                    <CounterInput maxQuantity={voucherData.maxQuantity} />
                    <p className="text-sm mt-2 sm:mt-0">Stock: {voucherData.maxQuantity}</p>
                </div>
            </div>
        </div>
    );
};

export default Voucher;

