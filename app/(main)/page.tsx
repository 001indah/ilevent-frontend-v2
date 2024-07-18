import React from 'react'

import Carousel from '@/app/(main)/_components/Hero/Carousel'
import Category from '@/app/(main)/_components/Category/Category'
import Event from '@/app/(main)/_components/event/Event';
// import { events, limit } from '@/app/(main)/_data/eventData';
import Transaction from '@/app/(main)/events/[eventDetail]/transaction/page';
import EventList from '@/app/(main)/events/_components/eventList';
import EventCarousel from '@/app/(main)/_components/event/EventCarousel'


const page = () => {
    return (
        <div className='w-full lg:p-16 p-4 mt-24'>
            <Carousel />
            <Category />
            <br />
            <h1 className="text-3xl font-bold mb-6">Upcoming Events in Jakarta 🔥 </h1>
            <EventCarousel location="Jakarta" />
            <br />
            <h1 className="text-3xl font-bold mb-6">Upcoming Events in Bali 🔥 </h1>
            <EventCarousel location="bali" />
            {/* <p className="text-2xl font-bold my-2">Popular Event</p>
            <EventList /> */}
            {/* <Event data={events} title={"Top Event 🔥"} link={"/events?sort=most-popular"} />
            <Event data={limit} title={"Limited Edition 🙉"} link={"/events?sort=limited-edition"} /> */}
            {/* <Transaction /> */}
        </div>
    )
}

export default page
