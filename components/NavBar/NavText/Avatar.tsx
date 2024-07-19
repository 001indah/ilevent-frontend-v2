import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
    isNavbarFixed: boolean;
    isOpen: boolean;
    handleClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isNavbarFixed, isOpen, handleClick }) => {
    const { isAuthenticated, logout } = useAuth();
    const menuItems = [
        { title: "Home", href: "/" },
        { title: "Events", href: "/events" },
        { title: "Profile", href: "/profile" },
        { title: "Order", href: "/orders" },
        // { title: "Our Teams", href: "/" },
        // { title: "Logout", href: "/logout" },
        { title: "Dashboard", href: "/organizer" },
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


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage
                                className="object-cover object-center w-full h-full"
                                src="https://images.pexels.com/photos/634021/pexels-photo-634021.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <Link href="/profile">
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                <Link href="/orders">
                                    <span>Transaction</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>



            </div>
        </nav>
    );
};

export default Navbar;




