'use client'
import React from 'react';
import { events } from '@/app/(main)/_data/eventData';
import PointsAndPayment from './_components/PointCard';
import CouponCard from './_components/CuponCard';

// Helper function to ensure we're working with numbers
const toNumber = (value) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
};

const formatPrice = (price) => `${toNumber(price).toFixed(2)}`;

const OrderCard = ({ event }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex items-center mb-4">
            <img src={event.imageSrc} alt={event.title} className="w-20 h-20 object-cover rounded-md mr-4" />
            <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-gray-600">{event.date}</p>
                <p className="text-gray-600">{event.location}</p>
            </div>
        </div>
        <div className="border-t pt-4">

            <div className="flex justify-between mb-2">
                <span>Original Price</span>
                <span>{formatPrice(event.price)}</span>
            </div>
            {event.discountedPrice && (
                <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(toNumber(event.price) - toNumber(event.discountedPrice))}</span>
                </div>
            )}
            <div className="flex justify-between font-semibold text-lg mt-2">
                <span>Total</span>
                <span>{formatPrice(event.discountedPrice || event.price)}</span>
            </div>
        </div>
    </div>
);

export default function TransactionPage({ params }: { params: { eventDetail: string } }) {
    const [idEvent, titleSlug] = params.eventDetail.split('_');
    const event = events.find((event) => event.id === Number(idEvent));
    if (!event) {
        return <div className="text-center mt-10 text-2xl text-red-600">Event not found</div>;
    }

    const userPoints = 5000;
    const totalAmount = toNumber(event.discountedPrice || event.price);
    const couponDetails = {
        discount: 15,
        code: "SUMMER15",
        quantity: 50,
        endDate: "2024-08-31"
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Transaction</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className='grid grid-cols-[1fr,1fr] gap-2'>
                            <PointsAndPayment totalPoints={userPoints} totalAmount={totalAmount} />
                            <CouponCard
                                discount={couponDetails.discount}
                                code={couponDetails.code}
                                quantity={couponDetails.quantity}
                                endDate={couponDetails.endDate}
                            />
                            <CouponCard
                                discount={couponDetails.discount}
                                code={couponDetails.code}
                                quantity={couponDetails.quantity}
                                endDate={couponDetails.endDate}
                            />

                        </div>
                    </div>
                    <div>

                        <div >
                            <OrderCard event={event} />

                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}