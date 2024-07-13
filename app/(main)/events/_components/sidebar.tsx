// 'use client'

// import React, { useState } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import {
//     Home,
//     TicketIcon,
//     CalendarDays,
//     Users,
//     BarChart3,
//     Settings,
//     Menu
// } from 'lucide-react'

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

// export function Sidebar({ className }: SidebarProps) {
//     const [open, setOpen] = useState(false)
//     const pathname = usePathname()

//     const routes = [
//         {
//             href: '/dashboard',
//             label: 'Dashboard',
//             icon: Home,
//         },
//         {
//             href: '/dashboard/tickets',
//             label: 'Tickets',
//             icon: TicketIcon,
//         },
//         {
//             href: '/dashboard/events',
//             label: 'Events',
//             icon: CalendarDays,
//         },
//         {
//             href: '/dashboard/customers',
//             label: 'Customers',
//             icon: Users,
//         },
//         {
//             href: '/dashboard/analytics',
//             label: 'Analytics',
//             icon: BarChart3,
//         },
//         {
//             href: '/dashboard/settings',
//             label: 'Settings',
//             icon: Settings,
//         },
//     ]

//     return (
//         <>
//             <Sheet open={open} onOpenChange={setOpen}>
//                 <SheetTrigger asChild>
//                     <Button
//                         variant="outline"
//                         size="icon"
//                         className="md:hidden fixed left-4 top-4 z-40"
//                     >
//                         <Menu className="h-4 w-4" />
//                     </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left" className="w-[240px] sm:w-[300px]">
//                     <div className="px-1 py-6 flex flex-col h-full">
//                         <div className="space-y-4 py-4">
//                             <div className="px-3 py-2">
//                                 <h2 className="mb-2 px-4 text-lg font-semibold">
//                                     Ticket Seller Dashboard
//                                 </h2>
//                                 <div className="space-y-1">
//                                     <NavItems routes={routes} pathname={pathname} />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </SheetContent>
//             </Sheet>
//             <nav
//                 className={cn(
//                     "hidden md:block relative",
//                     className
//                 )}
//             >
//                 <ScrollArea className="h-screen py-6 pl-8 pr-6 lg:py-8">
//                     <div className="w-[200px]">
//                         <h2 className="mb-4 px-2 text-lg font-semibold">
//                             Ticket Seller Dashboard
//                         </h2>
//                         <div className="space-y-1">
//                             <NavItems routes={routes} pathname={pathname} />
//                         </div>
//                     </div>
//                 </ScrollArea>
//             </nav>
//         </>
//     )
// }

// interface NavItemsProps {
//     routes: {
//         href: string
//         label: string
//         icon: React.ElementType
//     }[]
//     pathname: string
// }

// function NavItems({ routes, pathname }: NavItemsProps) {
//     return (
//         <>
//             {routes.map((route) => (
//                 <Button
//                     key={route.href}
//                     variant={pathname === route.href ? "secondary" : "ghost"}
//                     className="w-full justify-start"
//                     asChild
//                 >
//                     <Link href={route.href}>
//                         <route.icon className="mr-2 h-4 w-4" />
//                         {route.label}
//                     </Link>
//                 </Button>
//             ))}
//         </>
//     )
// }

import React from 'react'
import {
    Home,
    TicketIcon,
    CalendarDays,
    Users,
    BarChart3,
    Settings,
    Menu
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const sidebar = () => {
    return (
        <div className='m-4 p-4 bg-black rounded-2xl space-y-5 w-[300px] h-[100vh]'>
            <p className="mb-4 px-2 text-lg font-bold text-white">Ticket Seller Dashboard</p>
            <Button className='w-full bg-black justify-start hover:bg-slate-600'>
                <Link
                    href="/organizer"
                    className="flex items-center gap-2 "
                >
                    <Home className="h-6 w-6" /> Back
                </Link>
            </Button>
            <Button className='w-full bg-black justify-start hover:bg-slate-600'>
                <Link
                    href="/organizer/dashboard/invoices"
                    className="flex items-center gap-2 "
                >
                    <TicketIcon className="h-6 w-6" /> Invoice
                </Link>
            </Button>
            <Button className='w-full bg-black justify-start hover:bg-slate-600'>
                <Link
                    href="/organizer"
                    className="flex items-center gap-2 "
                >
                    <CalendarDays className="h-6 w-6" /> Back
                </Link>
            </Button>
            <Button className='w-full justify-start bg-black hover:bg-slate-600'>
                <Link
                    href="/organizer"
                    className="flex items-center gap-2 "
                >
                    <Users className="h-6 w-6" /> Back
                </Link>
            </Button>
            <Button className='w-full bg-black justify-start hover:bg-slate-600'>
                <Link
                    href="/organizer/chart"
                    className="flex items-center gap-2 "
                >
                    <BarChart3 className="h-6 w-6" /> Chart
                </Link>
            </Button>
            <Button className='w-full bg-black justify-start hover:bg-slate-600'>
                <Link
                    href="/organizer"
                    className="flex items-center gap-2 "
                >
                    <Settings className="h-6 w-6" /> Back
                </Link>
            </Button>


        </div>
    )
}

export default sidebar
