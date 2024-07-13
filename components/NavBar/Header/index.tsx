'use client';
import React, { useState, useEffect } from 'react';
import Label from '@/components/Label';
import Logo from '@/components/NavBar/Logo';
import HamburgerButton from '@/components/NavBar/HamburgerButton';
import Navbar from '@/components/NavBar/NavText/index';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {


    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!isOpen);
    };

    const [isNavbarFixed, setIsNavbarFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsNavbarFixed(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div>
                <header className={`lg:top-8 h-16 lg:h-20 bg-black top-0 w-full flex items-center z-50 fixed ${isNavbarFixed ? 'bg-gray-100' : ''}`}>
                    <div className='w-full lg:px-4'>
                        <div className='lg:grid md:grid md:grid-cols-[1fr,4fr] lg:grid-cols-[2fr,2fr] flex items-center justify-between relative'>
                            <Logo isNavbarFixed={isNavbarFixed} />
                            <HamburgerButton isNavbarFixed={isNavbarFixed} isOpen={isOpen} handleClick={handleClick} />
                            <Navbar isNavbarFixed={isNavbarFixed} isOpen={isOpen} handleClick={handleClick} />
                        </div>
                    </div>
                </header>
                <Label />
            </div>
        </div>
    );
};

export default Header;
