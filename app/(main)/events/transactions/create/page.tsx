'use client';

import { useSearchParams } from 'next/navigation';
import { TransactionForm } from '../page';
// import { parseSlug } from '@/lib/utils';


export function parseSlug(slug: string): { id: string, name: string } {
    const [id, ...nameParts] = slug.split('_');
    return {
        id,
        name: nameParts.join('_').replace(/-/g, ' ')
    };
}
//util end

export default function CreateTransactionPage() {
    const searchParams = useSearchParams();
    const eventId = searchParams.get('eventId');
    const eventSlug = searchParams.get('eventSlug');

    if (!eventId || !eventSlug) {
        return <div>Invalid event information</div>;
    }

    const { name: eventName } = parseSlug(eventSlug);

    return <TransactionForm eventId={eventId} eventName={eventName} />;
}