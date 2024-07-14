// import React from 'react';
// import VoucherCard from './cardVoucher';

// const EventDetail: React.FC = () => {
//     const vouchers = [
//         { code: 'SAVE10', discount: '10%', description: 'Save 10% on your next purchase' },
//         { code: 'FREESHIP', discount: 'Free Shipping', description: 'Get free shipping on orders over $50' },
//         { code: 'BOGO', discount: 'Buy 1 Get 1', description: 'Buy one, get one free on select items' },
//     ];

//     const handleClaim = (code: string) => {
//         // Implement claim functionality here
//         console.log(`Voucher ${code} claimed`);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Event Detail</h1>
//             <div className="flex space-x-4 overflow-x-auto py-2">
//                 {vouchers.map((voucher, index) => (
//                     <VoucherCard
//                         key={index}
//                         code={voucher.code}
//                         discount={voucher.discount}
//                         description={voucher.description}
//                         onClaim={() => handleClaim(voucher.code)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default EventDetail;

// File: CouponButton.jsx
// File: CouponTicket.jsx
// File: App.jsx
// import React from 'react';
// import CouponTicket from './cardVoucher';

// const App = () => {
//     return (
//         <div className="bg-blue-600 min-h-screen flex flex-col items-center justify-center">
//             <CouponTicket title="$10" amount="McDonalds" description="Valid until 30th July 2024" company="McDonalds" />
//             <CouponTicket title="25% OFF" amount="KFC" description="Valid until 30th July 2024" company="KFC" />
//             <CouponTicket title="1 Free Coffee" amount="Starbucks" description="Valid until 30th July 2024" company="Starbucks" />
//             <CouponTicket title="Pay 1 take 2" amount="Vapiano" description="Valid until 30th July 2024" company="Vapiano" />
//         </div>
//     );
// };

// export default App;

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

