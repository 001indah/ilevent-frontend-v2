// components/ReusableMap.tsx
import React from 'react';
import Image from 'next/image';
// import Link from 'next/link';
// import { MapPin, Ticket, CalendarHeart, Heart } from 'lucide-react';

export interface EventProps {
    id: number;
    imageSrc: string;
    location: string;
    date: string;
    price: string;
    discountedPrice?: string;
    discountPercentage?: number;
    title: string;
    logo?: string;
    heartIcon?: React.ReactNode;
    organizer?: string;
    organizerImg?: string;
}
const EventCard: React.FC<EventProps> = ({
    id,
    imageSrc,
    location,
    date,
    price,
    discountedPrice,
    discountPercentage,
    title,
    logo,
    heartIcon,
    organizer,
    organizerImg
}) => {



    return (
        <div className=" bg-white rounded-t-lg">
            <div className="flex justify-center">
                <div className=" h-40 lg:w-48 lg:h-48 my-2 rounded-t-lg overflow-hidden relative">
                    <Image
                        width={500}
                        height={500}
                        src={imageSrc}
                        alt={title}
                        className="object-cover w-full h-full hover:scale-125 ease-in-out duration-300"
                    />
                    <div className="absolute top-0 flex justify-between p-2 w-full">
                        {logo ? <div className="bg-white rounded-md px-2 text-baseBlue font-bold">{logo}</div> : null}
                        {heartIcon ? <div className="bg-white font-bold p-1 rounded-full text-baseBlue">{heartIcon}</div> : null}
                    </div>
                </div>
            </div>
            <div className="my-1 mx-1 w-40 lg:w-48">
                <p className="text-base font-bold">{title}</p>
                <div className="py-1 text-sm  text-gray-500 group-hover:text-baseBlue">
                    {/* <Ticket size={20} /> */}
                    <p className="text-base text-black font-bold ml-1">{price}</p>
                    <div className="flex items-center ml-1">
                        {discountedPrice && (
                            <p className="text-xs text-gray-500 line-through ml-1">{discountedPrice}</p>
                        )}
                        {discountPercentage ? (
                            <span className='text-xs font-bold ml-1 text-baseRed'>
                                {discountPercentage + "%"}
                            </span>
                        ) : null}
                    </div>

                </div>
                <div className="py-1 flex text-sm flex-wrap text-gray-900 group-hover:text-baseBlue">
                    {/* <CalendarHeart size={20} /> */}
                    <p className="flex-wrap ml-1 w-40">{date}</p>
                </div>
                <div className="py-1 flex text-sm flex-wrap text-gray-900 group-hover:text-baseBlue">
                    {/* <MapPin size={20} /> */}
                    <p className="flex-wrap ml-1 w-40">{location}</p>
                </div>
                {/* <div>
                    <User
                        name={organizer}
                        description="Product Designer"
                        avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                        }}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default EventCard;

// import React from 'react';
// import Image from 'next/image';
// import { MapPin, Calendar, Tag, Heart, User } from 'lucide-react';
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// export interface EventProps {
//     id: number;
//     imageSrc: string;
//     location: string;
//     date: string;
//     price: string;
//     discountedPrice?: string;
//     discountPercentage?: number;
//     title: string;
//     logo?: string;
//     heartIcon?: React.ReactNode;
//     organizer?: string;
//     organizerImg?: string;
//     category: string;
//     mapsSrc: string;
// }

// const EventCard: React.FC<EventProps> = ({
//     id,
//     imageSrc,
//     location,
//     date,
//     price,
//     discountedPrice,
//     discountPercentage,
//     title,
//     logo,
//     heartIcon,
//     organizer,
//     organizerImg,
//     category,
//     mapsSrc
// }) => {
//     return (
//         <Card className="w-full max-w-sm overflow-hidden">
//             <div className="relative">
//                 <Image
//                     width={500}
//                     height={300}
//                     src={imageSrc}
//                     alt={title}
//                     className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute top-2 left-2">
//                     {logo && <Badge variant="secondary">{logo}</Badge>}
//                 </div>
//                 <div className="absolute top-2 right-2">
//                     <TooltipProvider>
//                         <Tooltip>
//                             <TooltipTrigger asChild>
//                                 <Button variant="ghost" size="icon" className="rounded-full bg-white">
//                                     <Heart className="h-4 w-4" />
//                                 </Button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                                 <p>Add to favorites</p>
//                             </TooltipContent>
//                         </Tooltip>
//                     </TooltipProvider>
//                 </div>
//                 <div className="absolute bottom-2 right-2">
//                     <Badge>{category}</Badge>
//                 </div>
//             </div>
//             <CardContent className="p-4">
//                 <h3 className="text-lg font-semibold mb-2">{title}</h3>
//                 <div className="flex items-center mb-2">
//                     <Tag className="h-4 w-4 mr-2" />
//                     <span className="font-bold">{price}</span>
//                     {discountedPrice && (
//                         <span className="text-sm text-gray-500 line-through ml-2">{discountedPrice}</span>
//                     )}
//                     {discountPercentage && (
//                         <Badge variant="destructive" className="ml-2">-{discountPercentage}%</Badge>
//                     )}
//                 </div>
//                 <div className="flex items-center mb-2">
//                     <Calendar className="h-4 w-4 mr-2" />
//                     <span className="text-sm">{date}</span>
//                 </div>
//                 <div className="flex items-center">
//                     <MapPin className="h-4 w-4 mr-2" />
//                     <span className="text-sm">{location}</span>
//                 </div>
//             </CardContent>
//             <CardFooter className="p-4 pt-0 flex justify-between items-center">
//                 {organizer && (
//                     <div className="flex items-center">
//                         <Avatar className="h-8 w-8 mr-2">
//                             <AvatarImage src={organizerImg} />
//                             <AvatarFallback>{organizer[0]}</AvatarFallback>
//                         </Avatar>
//                         <span className="text-sm font-medium">{organizer}</span>
//                     </div>
//                 )}
//                 <TooltipProvider>
//                     <Tooltip>
//                         <TooltipTrigger asChild>
//                             <Button variant="outline" size="sm">
//                                 View Map
//                             </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                             <iframe src={mapsSrc} width="300" height="200" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
//                         </TooltipContent>
//                     </Tooltip>
//                 </TooltipProvider>
//             </CardFooter>
//         </Card>
//     );
// };

// export default EventCard;