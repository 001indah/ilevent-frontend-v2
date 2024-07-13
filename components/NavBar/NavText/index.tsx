import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface NavbarProps {
    isNavbarFixed: boolean;
    isOpen: boolean;
    handleClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isNavbarFixed, isOpen, handleClick }) => {
    const menuItems = [
        { title: "Home", href: "/" },
        { title: "About Us", href: "/AboutUs" },
        { title: "Our Teams", href: "/OurTeam" },
        { title: "Product", href: "/Service" },
        // { title: "Testimonials", href: "/Testimonials" }
    ];

    return (
        <nav className={`lg:flex lg:static lg:bg-transparent lg:max-w-full lg:h-8 lg:pt-0 lg:shadow-none lg:py-0 absolute py-5 ${isNavbarFixed ? ' bg-gray-100 text-gray-800' : 'bg-black text-white'} shadow-lg w-full h-screen top-full z-50 ease-in-out duration-500 pt-12 text-4xl font-semibold ${isOpen ? '' : 'hidden'}`}>
            <ul className='lg:flex lg:justify-between'>
                {menuItems.map((menuItem, index) => (
                    <li key={index} className="group">
                        <Link key={index} href={menuItem.href} onClick={handleClick} className="lg:flex lg:items-center text-base ml-10 border-gray-500 hover:text-hijauSedang hover:border-hijauSedang hover:font-bold">
                            {menuItem.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className='ml-8 flex gap-2 items-center justify-start m-4'>
                <Button className={`bg-transparent border font-bold border-white hover:border-none ${isNavbarFixed ? ' text-black border-black hover:bg-slate-300 hover:border' : 'hover:bg-sky-200 hover:text-black'}`}>
                    <Link href="/sign-in">
                        Sign in
                    </Link>
                </Button>
                <Button className={`bg-white border font-bold text-black hover:border-none hover:bg-sky-200 hover:text-black${isNavbarFixed ? '  hover:bg-slate-300 hover:border text-white bg-teal-600' : ''}`}>
                    <Link href="/sign-up">
                        Sign up
                    </Link>
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;




