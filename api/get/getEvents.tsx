import { config } from "@/constants/url";
import { Event } from "@/types/events";
import axiosInstance from "@/utils/axiosInstance";

async function getData() {
    let endpoints = config.endpoints.getAllEvents;

    try {
        const response = await axiosInstance.get(endpoints);
        return response.data;
    } catch (error) {
        console.log("Error fetching data", error);
        throw error;
    }
}

export async function getEvents() {
    const Events = (await getData()) as unknown as Event[];
    return Events;
}