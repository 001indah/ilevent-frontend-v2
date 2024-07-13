import React from 'react'
import Link from 'next/link'

const page = () => {
    return (
        <div>
            dashboard
            <Link href="/organizer/dashboard/invoices">
                Invoices
            </Link>
        </div>
    )
}

export default page
