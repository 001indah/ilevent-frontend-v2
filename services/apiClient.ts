// Mengimpor library axios
import axios from 'axios';
import { getToken } from '@/utils/auth';

// Mendapatkan URL API dari environment variable
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Membuat instance axios dengan konfigurasi tertentu
const apiClient = axios.create({
    // Menetapkan baseURL untuk semua permintaan yang dikirim menggunakan instance ini
    baseURL: API_URL,
    // Menetapkan header default untuk semua permintaan
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getToken()}`, // Add Authorization header with the token
    },
    // Menetapkan withCredentials menjadi true untuk menyertakan kredensial seperti cookie dalam permintaan lintas domain
    withCredentials: true,
});
apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Mengekspor instance axios yang telah dikonfigurasi sebagai default export
export default apiClient;
