import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
    id: string;
    title: string;
    // Add other event properties here
}

interface EventsState {
    events: Event[];
    isLoading: boolean;
    error: string | null;
}

const initialState: EventsState = {
    events: [],
    isLoading: false,
    error: null,
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        fetchEventsRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchEventsSuccess: (state, action: PayloadAction<Event[]>) => {
            state.isLoading = false;
            state.events = action.payload;
        },
        fetchEventsFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchEventsRequest, fetchEventsSuccess, fetchEventsFailure } = eventsSlice.actions;

export default eventsSlice.reducer;