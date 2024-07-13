'use client'
import { useState, useEffect } from 'react';

const useCarousel = (items: any, autoSlideInterval: number = 5000) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    };

    const setSlide = (index: number) => {
        setActiveIndex(index);
    };

    return {
        activeIndex,
        prevSlide,
        nextSlide,
        setSlide
    };
};

export default useCarousel;
