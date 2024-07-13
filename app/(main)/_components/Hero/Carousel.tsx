'use client'
import React from 'react';
import useCarousel from '@/hooks/useCarousel';
import carouselItems from '@/app/(main)/_data/carouselData';
import Image from 'next/image';
import Link from 'next/link';

const Carousel: React.FC = () => {
    const { activeIndex, prevSlide, nextSlide, setSlide } = useCarousel(carouselItems);

    return (
        <div className="relative w-full">
            <div className="relative h-64 overflow-hidden rounded-lg md:h-[400px] lg:h-[500px]">
                {carouselItems.map((item, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                        <Image
                            src={item}
                            fill
                            style={{ objectFit: 'cover' }}
                            alt={`Slide ${index + 1}`}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="text-white text-center p-4 bg-black bg-opacity-50 rounded-lg">
                                <h2 className="text-3xl font-bold mb-2">Hot Events</h2>
                                <p className="text-xl mb-4">Big discount, book now!</p>
                                <p className="text-2xl font-semibold text-sky-300">Save up to 50% off on your first order</p>
                                <button className="mt-4 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                                    <Link href="/events">
                                        Book Now
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="absolute z-30 flex space-x-[6px] bottom-4 pl-6 transform">
                    {carouselItems.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-[6px] h-[6px] rounded-full ${activeIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                            onClick={() => setSlide(index)}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
            <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4" onClick={prevSlide} aria-label="Previous">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1L1 5l4 4" />
                    </svg>
                </span>
            </button>
            <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4" onClick={nextSlide} aria-label="Next">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                    </svg>
                </span>
            </button>
        </div>
    );
};

export default Carousel;