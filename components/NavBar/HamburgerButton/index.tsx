import React from 'react';

interface HamburgerButtonProps {
    isNavbarFixed: boolean;
    isOpen: boolean;
    handleClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isNavbarFixed, isOpen, handleClick }) => {
    return (
        <div onClick={handleClick} className='hamburger block absolute right-2 p-4 lg:hidden'>
            <span className={`w-[30px] h-[2px] my-2 block ${isNavbarFixed ? ' bg-black' : 'bg-white'}  ease-in-out duration-500 ${isOpen ? 'origin-top-left rotate-45' : ''}`}></span>
            <span className={`w-[30px] h-[2px] my-2 block ${isNavbarFixed ? ' bg-black' : 'bg-white'} ease-in-out duration-500 ${isOpen ? 'scale-0' : ''}`}></span>
            <span className={`w-[30px] h-[2px] my-2 block ${isNavbarFixed ? ' bg-black' : 'bg-white'} ease-in-out duration-500 ${isOpen ? 'origin-bottom-left -rotate-45' : ''}`}></span>
        </div>
    );
};

export default HamburgerButton;
