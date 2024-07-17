// // Mengimpor apiClient dari file apiClient.js
// import apiClient from './apiClient';

// const getToken = () => localStorage.getItem('jwtToken');

// const setAuthHeader = () => {
//     const token = getToken();
//     if (token) {
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } else {
//         delete apiClient.defaults.headers.common['Authorization'];
//     }
// };

// // Fungsi untuk registrasi pengguna baru
// const register = async (name: string, username: string, email: string, password: string, organizer: boolean, phone: string, referralCode?: string | null) => {
//     // Mengirim permintaan POST ke endpoint /register dengan data pengguna baru
//     const response = await apiClient.post(`/users/register`, { name, username, email, password, organizer, phone, referralCode });
//     // Mengembalikan data respons dari server
//     return response.data;
// };

// // Fungsi untuk login pengguna
// export const login = async (email: string, password: string) => {
//     // Mengirim permintaan POST ke endpoint /login dengan email dan password pengguna
//     const response = await apiClient.post(`/auth/login`, { email, password });
//     // Mengembalikan data respons dari server
//     if (response.data.token) {
//         localStorage.setItem('jwtToken', response.data.token);
//         setAuthHeader();
//     }
//     return response.data;
// };

// // Fungsi untuk mendapatkan profil pengguna
// export const getProfile = async (token: string) => {
//     // Mengirim permintaan GET ke endpoint /profile dengan header Authorization berisi token JWT
//     // const response = await apiClient.get(`/users/profile`, {
//     //     headers: {
//     //         Authorization: `Bearer ${token}`,
//     //     },
//     // });
//     setAuthHeader();
//     const response = await apiClient.get(`/users/profile`);
//     // Mengembalikan data respons dari server
//     return response.data;
// };

// // Fungsi untuk memperbarui profil pengguna
// export const updateProfile = async (token: string, data: FormData) => {
//     try {
//         setAuthHeader();
//         // Mengirim permintaan PUT ke endpoint /settings/profile dengan header Authorization dan Content-Type
//         const response = await apiClient.put('/users/profile', data, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         // Mengembalikan data respons dari server
//         return response.data;
//     } catch (error: any) {
//         // Menangani kesalahan jika permintaan gagal
//         console.error('Profile update failed', error.response ? error.response.data : error.message);
//         throw error;
//     }
// };

// // // Fungsi untuk mengubah kata sandi pengguna
// // export const changePassword = async (token: string, currentPassword: string, newPassword: string) => {
// //     // Mengirim permintaan PUT ke endpoint /settings/password dengan header Authorization dan data kata sandi
// //     const response = await apiClient.put('/settings/password', { currentPassword, newPassword }, {
// //         headers: {
// //             Authorization: `Bearer ${token}`,
// //         },
// //     });
// //     // Mengembalikan data respons dari server
// //     return response.data;
// // };

// // Fungsi untuk logout pengguna
// export const logout = async (token: string) => {
//     setAuthHeader();
//     // Mengirim permintaan POST ke endpoint /logout dengan header Authorization
//     // const response = await apiClient.post(`/auth/logout`, {}, {
//     //     headers: {
//     //         Authorization: `Bearer ${token}`,
//     //     },
//     // });
//     const response = await apiClient.post(`/auth/logout`);
//     localStorage.removeItem('jwtToken');
//     delete apiClient.defaults.headers.common['Authorization'];
//     return response.data;
//     // Mengembalikan data respons dari server
//     return response.data;
// };

// // Menggabungkan semua fungsi ke dalam satu objek api untuk di ekspor
// const api = {
//     register,
//     login,
//     getProfile,
//     updateProfile,
//     // changePassword,
//     logout,
// };

// // Mengekspor objek api sebagai default export
// export default api;


// // Mengimpor apiClient dari file apiClient.js
// // import apiClient from './apiClient';

// // // Fungsi untuk registrasi pengguna baru
// // const register = async (name: string, username: string, email: string, password: string, organizer: boolean, phone: string, referralCode?: string | null) => {
// //     // Mengirim permintaan POST ke endpoint /register dengan data pengguna baru
// //     const response = await apiClient.post(`/users/register`, { name, username, email, password, organizer, phone, referralCode });
// //     // Mengembalikan data respons dari server
// //     return response.data;
// // };

// // // Fungsi untuk login pengguna
// // export const login = async (email: string, password: string) => {
// //     // Mengirim permintaan POST ke endpoint /login dengan email dan password pengguna
// //     // withCredentials: true memastikan cookie disertakan dalam respons
// //     const response = await apiClient.post(`/auth/login`, { email, password }, { withCredentials: true });
// //     // Mengembalikan data respons dari server
// //     return response.data;
// // };

// // // Fungsi untuk mendapatkan profil pengguna
// // export const getProfile = async () => {
// //     // Mengirim permintaan GET ke endpoint /profile
// //     // Cookie akan dikirim secara otomatis karena withCredentials: true di apiClient
// //     const response = await apiClient.get(`/users/profile`);
// //     // Mengembalikan data respons dari server
// //     return response.data;
// // };

// // // Fungsi untuk memperbarui profil pengguna
// // export const updateProfile = async (data: FormData) => {
// //     try {
// //         // Mengirim permintaan PUT ke endpoint /settings/profile dengan Content-Type multipart/form-data
// //         const response = await apiClient.put('/users/profile', data, {
// //             headers: {
// //                 'Content-Type': 'multipart/form-data',
// //             },
// //         });
// //         // Mengembalikan data respons dari server
// //         return response.data;
// //     } catch (error: any) {
// //         // Menangani kesalahan jika permintaan gagal
// //         console.error('Profile update failed', error.response ? error.response.data : error.message);
// //         throw error;
// //     }
// // };

// // // Fungsi untuk logout pengguna
// // export const logout = async () => {
// //     // Mengirim permintaan POST ke endpoint /logout
// //     // Cookie akan dikirim secara otomatis
// //     const response = await apiClient.post(`/auth/logout`);
// //     // Mengembalikan data respons dari server
// //     return response.data;
// // };

// // // Menggabungkan semua fungsi ke dalam satu objek api untuk di ekspor
// // const api = {
// //     register,
// //     login,
// //     getProfile,
// //     updateProfile,
// //     logout,
// // };

// // // Mengekspor objek api sebagai default export
// // export default api;

// Mengimpor apiClient dari file apiClient.js
import apiClient from './apiClient';
import { getToken, setToken, removeToken } from '@/utils/auth'; // Importing the updated token functions

// Function to set the Authorization header
const setAuthHeader = () => {
    const token = getToken();
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

// Fungsi untuk registrasi pengguna baru
export const register = async (name: string, username: string, email: string, password: string, organizer: boolean, phone: string, referralCode?: string | null) => {
    // Mengirim permintaan POST ke endpoint /register dengan data pengguna baru
    const response = await apiClient.post(`/users/register`, { name, username, email, password, organizer, phone, referralCode });
    // Mengembalikan data respons dari server
    return response.data;
};

// Fungsi untuk login pengguna
export const login = async (email: string, password: string) => {
    // Mengirim permintaan POST ke endpoint /login dengan email dan password pengguna
    const response = await apiClient.post(`/auth/login`, { email, password });
    // Mengembalikan data respons dari server
    if (response.data.token) {
        setToken(response.data.token); // Save token to sessionStorage
        setAuthHeader();
    }
    return response.data;
};

// Fungsi untuk mendapatkan profil pengguna
export const getProfile = async () => {
    // Mengirim permintaan GET ke endpoint /profile dengan header Authorization berisi token JWT
    setAuthHeader();
    const response = await apiClient.get(`/users/profile`);
    // Mengembalikan data respons dari server
    return response.data;
};

// Fungsi untuk memperbarui profil pengguna
export const updateProfile = async (data: FormData) => {
    try {
        setAuthHeader();
        // Mengirim permintaan PUT ke endpoint /settings/profile dengan header Authorization dan Content-Type
        const response = await apiClient.put('/users/profile', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        // Mengembalikan data respons dari server
        return response.data;
    } catch (error: any) {
        // Menangani kesalahan jika permintaan gagal
        console.error('Profile update failed', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fungsi untuk logout pengguna
export const logout = async () => {
    setAuthHeader();
    // Mengirim permintaan POST ke endpoint /logout dengan header Authorization
    const response = await apiClient.post(`/auth/logout`);
    removeToken(); // Remove token from sessionStorage
    delete apiClient.defaults.headers.common['Authorization'];
    return response.data;
};

// Menggabungkan semua fungsi ke dalam satu objek api untuk di ekspor
const api = {
    register,
    login,
    getProfile,
    updateProfile,
    logout,
};

// Mengekspor objek api sebagai default export
export default api;
