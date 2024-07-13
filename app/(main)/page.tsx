import React from 'react'

import Carousel from '@/app/(main)/_components/Hero/Carousel'
import Category from '@/app/(main)/_components/Category/Category'
import Event from '@/app/(main)/_components/event/Event';
import { events, limit } from '@/app/(main)/_data/eventData';
import Transaction from '@/app/(main)/events/[eventDetail]/[transaction]/page';


const page = () => {
    return (
        <div className='w-full lg:p-16 p-4 mt-24'>
            <Carousel />
            <Category />
            <Event data={events} title={"Top Event 🔥"} link={"/events?sort=most-popular"} />
            <Event data={limit} title={"Limited Edition 🙉"} link={"/events?sort=limited-edition"} />
            {/* <Transaction /> */}
        </div>
    )
}

export default page
