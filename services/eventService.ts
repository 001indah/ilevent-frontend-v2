// Mengimpor tipe data EventValues dari file datatypes
// import { EventValues } from '@/types/datatypes';
// Mengimpor instance apiClient dari file apiClient
import apiClient from './apiClient';

// Fungsi untuk membuat acara baru
export const createEvent = async (event: any, token: string) => {
    try {
        // Mengirim permintaan POST ke endpoint /events dengan data acara dan header Authorization
        const response = await apiClient.post('/events', event, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // Mengembalikan data respons dari server
        return response.data;
    } catch (error) {
        // Menangani kesalahan jika permintaan gagal
        console.error('Error creating event:', error);
        throw error;
    }
};

// Fungsi untuk mengunggah gambar acara
export const uploadEventImage = async (eventId: string, file: File, token: string) => {
    try {
        // Membuat objek FormData untuk mengirim file
        const formData = new FormData();
        formData.append('file', file);

        // Mengirim permintaan POST ke endpoint /events/:eventId/image dengan FormData dan header Authorization
        const response = await apiClient.post(`/events/${eventId}/image`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        // Mengembalikan data respons dari server
        return response.data;
    } catch (error) {
        // Menangani kesalahan jika permintaan gagal
        console.error('Error uploading event image:', error);
        throw error;
    }
};

// Fungsi untuk mendapatkan acara berdasarkan ID
export const getEventById = async (eventId: string) => {
    try {
        // Mengirim permintaan GET ke endpoint /events/:eventId
        const response = await apiClient.get(`/events/${eventId}`);
        // Mengembalikan data respons dari server
        return response.data;
    } catch (error) {
        // Menangani kesalahan jika permintaan gagal
        console.error('Error getting event by Id:', error);
        throw error;
    }
};

// Fungsi untuk mencari acara berdasarkan parameter kueri
export const searchEvents = async (queryParams: { [key: string]: any }) => {
    try {
        // Mengirim permintaan GET ke endpoint /events/search dengan parameter kueri
        const response = await apiClient.get('/events/search', {
            params: queryParams,
        });
        // Mengembalikan data respons dari server
        return response.data;
    } catch (error) {
        // Menangani kesalahan jika permintaan gagal
        console.error('Error searching events:', error);
        throw error;
    }
};

// Fungsi untuk memperbarui acara
export const updateEvent = async (eventId: string, event: any, token: string) => {
    try {
        // Mengirim permintaan PUT ke endpoint /events/:eventId dengan data acara dan header Authorization
        const response = await apiClient.put(`/events/${eventId}`, event, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // Mengembalikan data respons dari server
        return response.data;
    } catch (error) {
        // Menangani kesalahan jika permintaan gagal
        console.error('Error updating event:', error);
        throw error;
    }
};

// Fungsi untuk menghapus acara
export const deleteEvent = async (eventId: string, token: string) => {
    try {
        // Mengirim permintaan DELETE ke endpoint /events/:eventId dengan header Authorization
        const response = await apiClient.delete(`/events/${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // Mengembalikan data respons dari server
        return response.data;
    } catch (error) {
        // Menangani kesalahan jika permintaan gagal
        console.error('Error deleting event:', error);
        throw error;
    }
};

// Fungsi untuk mendapatkan semua acara
export const getAllEvents = async () => {
    try {
        // Mengirim permintaan GET ke endpoint /events
        const response = await apiClient.get('/events');
        // Mengembalikan data respons dari server
        return response.data;
    } catch (error) {
        // Menangani kesalahan jika permintaan gagal
        console.error('Error fetching all events:', error);
        throw error;
    }
};
