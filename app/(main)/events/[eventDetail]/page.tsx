import React from 'react';
import axios from 'axios';
import EventDetailClient from './_components/eventDetailClient';

export function parseSlug(slug: string): { id: string, name: string } {
    const [id, ...nameParts] = slug.split('_');
    return {
        id,
        name: nameParts.join('_').replace(/-/g, ' ')
    };
}

async function getEventData(slug: string) {
    const id = slug.split('_')[0]; // Extract ID from slug
    try {
        const response = await axios.get(`https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/events/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch event:', error);
        return null;
    }
}

export default async function EventDetail({ params }: { params: { eventDetail: string } }) {
    const event = await getEventData(params.eventDetail);

    if (!event) return <div>Event not found</div>;

    return <EventDetailClient event={event} />;
}
