// import { category } from "./category";

// // ticket_type enum
// export enum TicketType {
//     VIP = "VIP",
//     General = "General",
// }

// // types/event.ts
// export interface Event {
//     id: number;
//     title: string;
//     description: string;
//     date: string;
//     time: string;
//     location: string;
//     category: category;
//     price: number;
//     available_seats: number;
//     ticket_type: TicketType;
//     organizer_id: number;
//     created_at: Date;
//     updated_at: Date;
// }

// export interface ResponseGetEvent {
//     totalPages: number;
//     currentPage: number;
//     totalElements: number;
//     content: Event[];
// }

export interface Event {
    id: number;
    name: string;
    description: string;
    date: [number, number, number]; // [year, month, day]
    time: [number, number]; // [hour, minute]
    location: string;
    createdAt: number; // timestamp
    updatedAt: number; // timestamp
    image: string;
    isFreeEvent: boolean;
    deletedAt: number | null;
    rattingRate: number | null;
    category: string;
}

// Jika Anda memerlukan props tambahan untuk komponen EventCard, 
// Anda bisa membuat interface turunan seperti ini:
export interface EventCardProps extends Event {
    onClickEvent?: (eventId: number) => void;
    // Tambahkan props tambahan di sini jika diperlukan
}