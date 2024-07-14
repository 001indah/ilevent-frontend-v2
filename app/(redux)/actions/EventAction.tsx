import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Assuming you have these action creators in your events reducer
import { fetchEventsRequest, fetchEventsSuccess, fetchEventsFailure } from '../reducers/EventReducer';

const API_BASE_URL = 'https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1';

export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (_, { dispatch }) => {
        dispatch(fetchEventsRequest());
        try {
            const response = await axios.get(`${API_BASE_URL}/events`);
            dispatch(fetchEventsSuccess(response.data));
            return response.data;
        } catch (error: any) {
            dispatch(fetchEventsFailure(error.message));
            throw error;
        }
    }
);