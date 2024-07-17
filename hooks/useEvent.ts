//rendering data memisahkan logika pengambilan data dari komponen
"use client"

// Mengimpor hook useState dan useCallback dari React
import { useState, useCallback } from 'react';
// Mengimpor tipe data Event dan EventValues dari file datatypes
// import { Event, EventValues } from '@/types/datatypes';
// Mengimpor instance apiClient dari file apiClient
import apiClient from '@/services/apiClient';
// Mengimpor fungsi searchEvents dan getAllEvents dari file eventService
import { searchEvents, getAllEvents } from '@/services/eventService';
// Mengimpor fungsi parseCookies dari nookies untuk mengelola cookies
import { parseCookies } from 'nookies';

// Definisi custom hook useEvent
const useEvent = () => {
    // State untuk menyimpan daftar event
    const [events, setEvents] = useState<Event[]>([]);
    // State untuk menyimpan event tunggal
    const [event, setEvent] = useState<Event | null>(null);
    // State untuk menandai loading status
    const [loading, setLoading] = useState<boolean>(false);
    // State untuk menyimpan pesan error
    const [error, setError] = useState<string | null>(null);

    // Fungsi untuk menangani error dan mengatur state error
    const handleError = (message: string) => {
        setError(message);
        setLoading(false);
    };

    // Fungsi untuk mengambil daftar event berdasarkan query params
    const fetchEvents = useCallback(async (queryParams = {}) => {
        setLoading(true);
        setError(null);
        try {
            // Mengirim permintaan GET ke endpoint /events dengan query params
            const response = await apiClient.get('/events', { params: queryParams });
            setEvents(response.data.data);
        } catch (err) {
            handleError('Failed to fetch events');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fungsi untuk mengambil semua event dengan pagination
    const fetchAllEvents = useCallback(async (page: number = 0, limit: number = 9) => {
        setLoading(true);
        setError(null);
        try {
            // Mengirim permintaan GET ke endpoint /events/search dengan params pagination
            const response = await apiClient.get('/events/search', {
                params: {
                    page,
                    size: limit,
                },
            });
            return response.data;
        } catch (err) {
            setError('Failed to fetch all events');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Fungsi untuk mengambil event yang dibuat oleh organizer
    const fetchOrganizerEvents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Mendapatkan header otorisasi
            const authHeader = getAuthHeader();
            // Mengirim permintaan GET ke endpoint /events/search dengan parameter organizer: true
            const response = await apiClient.get('/events/search', {
                headers: authHeader,
                params: { organizer: true },
            });
            console.log("event data", response.data.events);
            setEvents(response.data.events);
        } catch (err) {
            handleError('Failed to fetch organizer events');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fungsi untuk mengambil event berdasarkan kategori
    const fetchEventsByCategory = useCallback(async (category: string) => {
        setLoading(true);
        setError(null);
        try {
            // Mengirim permintaan GET ke endpoint /events/search dengan parameter category
            const response = await searchEvents({ category });
            setEvents(response.events);
        } catch (err) {
            handleError('Failed to fetch events by category');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fungsi untuk mengambil event berdasarkan ID
    const fetchEventById = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            // Mengirim permintaan GET ke endpoint /events/:id
            const response = await apiClient.get(`/events/${id}`);
            setEvent(response.data.data);
        } catch (err) {
            handleError('Failed to fetch event');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fungsi untuk mendapatkan header otorisasi dari cookie
    const getAuthHeader = () => {
        const cookies = parseCookies();
        const token = cookies['sid'];
        return { Authorization: `Bearer ${token}` };
    };

    // Fungsi untuk mengirim permintaan POST untuk membuat event baru
    const postEvent = useCallback(async (formData: any) => {
        setLoading(true);
        setError(null);
        try {
            // Mengirim permintaan POST ke endpoint /events dengan header otorisasi
            const authHeader = getAuthHeader();
            const response = await apiClient.post('/events', formData, {
                headers: {
                    ...authHeader,
                    'Content-Type': 'application/json',
                },
            });
            setEvents((prevEvents) => [...prevEvents, response.data.data]);
            return response.data.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Fungsi untuk mengunggah gambar event
    const uploadImage = useCallback(async (eventId: number, image: File) => {
        setLoading(true);
        setError(null);
        try {
            // Membuat FormData untuk mengirim file gambar
            const formData = new FormData();
            formData.append('file', image);
            // Mengirim permintaan POST ke endpoint /events/:eventId/image dengan header otorisasi dan FormData
            const response = await apiClient.post(`/events/${eventId}/image`, formData, {
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'multipart/form-data'
                },
            });
            setEvent((prevEvent) => prevEvent ? { ...prevEvent, image: response.data.image } : null);
            return response.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Fungsi untuk mengirim permintaan PUT untuk memperbarui event
    const updateEvent = async (id: number, formData: object) => {
        setLoading(true);
        try {
            // Mengirim permintaan PUT ke endpoint /events/:id dengan header otorisasi
            const response = await apiClient.put(`/events/${id}`, formData, {
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk mengambil event berdasarkan ID
    const getEvent = async (id: number) => {
        setLoading(true);
        try {
            // Mengirim permintaan GET ke endpoint /events/:id dengan header otorisasi
            const response = await apiClient.get(`/events/${id}`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk menghapus event berdasarkan ID
    const deleteEvent = async (id: number) => {
        setLoading(true);
        try {
            // Mengirim permintaan DELETE ke endpoint /events/:id dengan header otorisasi
            const response = await apiClient.delete(`/events/${id}`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Mengembalikan fungsi-fungsi dan state dari custom hook useEvent
    return {
        events,
        event,
        loading,
        error,
        postEvent,
        uploadImage,
        getEvent,
        deleteEvent,
        updateEvent,
        fetchEvents,
        fetchAllEvents,
        fetchEventById,
        fetchOrganizerEvents,
        fetchEventsByCategory,
    };
};

// Mengekspor custom hook useEvent
export default useEvent;
