import React from 'react'
import Reviews from './_components/review'
import UpcomingTicket from './_components/completedTicket'

const page = () => {
    return (
        <div className='grid grid-cols-[1fr,1fr]'>

            <Reviews />
            <UpcomingTicket />
        </div>
    )
}

export default page
