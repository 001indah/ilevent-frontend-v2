'use client'
import React from 'react';
import useCarousel from '@/hooks/useCarousel';
import carouselItems from '@/app/(main)/_data/carouselData';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Carousel: React.FC = () => {
    const { activeIndex, prevSlide, nextSlide, setSlide } = useCarousel(carouselItems);

    return (
        <div className="relative w-full lg:px-16 lg:pt-10 p-4">
            <div className="relative h-64 overflow-hidden rounded-lg md:h-[400px] lg:h-[400px]">
                {carouselItems.map((item, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                        <Image
                            src={item}
                            fill
                            style={{ objectFit: 'cover' }}
                            alt={`Slide ${index + 1}`}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-center">Welcome to Ilevent, Discover Amazing Events in Ilevent</h1>
                            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-center">Find your next adventure or create your own!</p>
                            <div className="flex gap-2 sm:space-x-4">
                                {/* <Link href="/events" className="bg-black hover:bg-gray-800 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full lg:text-lg text-xs  transition duration-300 flex items-center justify-center">
                                    Explore Now <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                                <Link href="/create-event" className="border border-white hover:bg-teal-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full lg:text-lg text-xs  transition duration-300 flex items-center justify-center">
                                    Create Your Event
                                </Link> */}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="absolute z-30 flex space-x-[6px] bottom-4 left-1/2 transform -translate-x-1/2">
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
            <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={prevSlide}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1L1 5l4 4" />
                    </svg>
                </span>
            </button>
            <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={nextSlide}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                    </svg>
                </span>
            </button>
        </div>
    );
};

export default Carousel;
