import { category } from "./category";

// ticket_type enum
export enum TicketType {
    VIP = "VIP",
    General = "General",
}

// types/event.ts
export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: category;
    price: number;
    available_seats: number;
    ticket_type: TicketType;
    organizer_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface ResponseGetEvent {
    totalPages: number;
    currentPage: number;
    totalElements: number;
    content: Event[];
}