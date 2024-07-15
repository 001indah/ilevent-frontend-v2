// hooks/useEvent.ts
import { getSearchEvents } from "@/api/get/searchEvents";
import { GET_EVENTS } from "@/constants/queryKey";
// import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface EventCategoryGroup {
    [key: string]: Event[];
}

interface EventMap {
    [key: number]: Event;
}

const useEvent = (keyword: string) => {
    const {
        data: events,
        isLoading,
        error,
    } = useQuery({
        queryKey: [GET_EVENTS, keyword],
        queryFn: () => getSearchEvents(keyword),
        enabled: !!keyword,
    });

    const eventMap: EventMap = useMemo(() => {
        const newMap: EventMap = {};
        if (!events) return newMap;
        events.forEach((item: Event) => {
            newMap[item.id] = item;
        });
        return newMap;
    }, [events]);

    const categories: string[] = useMemo(() => {
        if (!events) return [];
        const uniqueCategories = new Set(events.map(event => event.category));
        return Array.from(uniqueCategories);
    }, [events]);

    const eventCategoryGroup: EventCategoryGroup = useMemo(() => {
        const newGroup: EventCategoryGroup = {};
        if (!events) return newGroup;
        categories.forEach((category) => {
            const eventList = events.filter(each => each.category === category);
            newGroup[category] = eventList;
        });
        return newGroup;
    }, [categories, events]);

    return { events, eventMap, eventCategoryGroup, categories, isLoading, error };
};

export default useEvent;
