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


export interface EventCardProps extends Event {
    onClickEvent?: (eventId: number) => void;

}