'use client';

import { useSearchParams } from 'next/navigation';
import { TransactionForm } from '../page';  // Sesuaikan path ini
import { useState, useEffect } from 'react';

// Utility function to parse slug
function parseSlug(slug: string): { id: string; name: string } {
    const [id, ...nameParts] = slug.split('_');
    return {
        id,
        name: nameParts.join('_').replace(/-/g, ' ')
    };
}

export default function CreateTransactionPage() {
    const searchParams = useSearchParams();
    const [pageError, setPageError] = useState<string | null>(null);
    const [eventDetails, setEventDetails] = useState<{ id: number; name: string } | null>(null);

    useEffect(() => {
        const eventIdParam = searchParams.get('eventId');
        const eventSlug = searchParams.get('eventSlug');

        if (!eventIdParam || !eventSlug) {
            setPageError('Missing event information');
            return;
        }

        const eventId = Number(eventIdParam);
        if (isNaN(eventId)) {
            setPageError('Invalid event ID');
            return;
        }

        try {
            const { name: eventName } = parseSlug(eventSlug);
            setEventDetails({ id: eventId, name: eventName });
        } catch (error) {
            console.error('Error parsing event slug:', error);
            setPageError('Error processing event information');
        }
    }, [searchParams]);

    if (pageError) {
        return <div className="p-4 text-red-500">{pageError}</div>;
    }

    if (!eventDetails) {
        return <div className="p-4">Loading event details...</div>;
    }

    return (
        <div className="p-4">
            {/* <h1 className="text-2xl font-bold mb-4">Create Transaction</h1> */}
            <TransactionForm eventId={eventDetails.id} eventName={eventDetails.name} />
        </div>
    );
}