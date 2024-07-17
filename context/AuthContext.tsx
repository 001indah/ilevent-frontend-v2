
// 'use client'; // Mendefinisikan mode atau konfigurasi spesifik untuk environment tertentu

// import { createContext, useState, useEffect, useContext, ReactNode } from 'react'; // Mengimpor fungsi-fungsi dasar dari React
// import { useRouter } from 'next/navigation'; // Mengimpor useRouter dari Next.js untuk routing
// import apiClient from '@/services/apiClient'; // Mengimpor client API untuk berinteraksi dengan backend
// import { User } from '@/types/User'; // Mengimpor tipe data User dari direktori tipe data
// import jwtDecode from 'jwt-decode'; // Mengimpor jwtDecode untuk mendekode token JWT

// interface AuthContextProps {
//     isAuthenticated: boolean; // Menyimpan status autentikasi pengguna
//     currentUser: User | null; // Menyimpan data pengguna saat ini atau null jika tidak ada pengguna terautentikasi
//     login: (email: string, password: string) => Promise<void>; // Fungsi untuk melakukan login pengguna
//     register: (name: string, username: string, email: string, password: string, organizer: boolean, phone: string, referralCode?: string | null) => Promise<void>; // Fungsi untuk melakukan registrasi pengguna baru
//     logout: () => void; // Fungsi untuk melakukan logout pengguna
//     getToken: () => string | null; // Fungsi untuk mendapatkan token autentikasi pengguna
//     isLoading: boolean; // Menyimpan status loading saat aplikasi melakukan proses autentikasi atau pengambilan data pengguna
// }

// interface JwtPayload {
//     scope: string; // Menyimpan informasi tambahan yang diharapkan dari payload JWT, tambahkan yang lain jika diperlukan
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined); // Membuat context untuk menyimpan state autentikasi

// // const TOKEN_KEY = 'JWT_TOKEN'; // Key untuk menyimpan token dalam localStorage
// const TOKEN_KEY = 'JWT_TOKEN'; // Key untuk menyimpan token dalam localStorage


// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // State untuk status autentikasi
//     const [currentUser, setCurrentUser] = useState<User | null>(null); // State untuk data pengguna saat ini
//     const [isLoading, setIsLoading] = useState<boolean>(true); // State untuk status loading
//     const router = useRouter(); // Mendapatkan instance dari router Next.js

//     useEffect(() => {
//         const token = getToken(); // Mendapatkan token dari localStorage
//         if (token) {
//             fetchProfile(token); // Mengambil profil pengguna jika token tersedia
//         } else {
//             setIsLoading(false); // Menghentikan loading jika tidak ada token
//         }
//     }, []);

//     // Fungsi untuk mengambil profil pengguna dari backend
//     const fetchProfile = async (token: string) => {
//         try {

//             const response = await apiClient.get(`/users/profile`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Mengirim token sebagai Authorization header
//                 },
//             });
//             setCurrentUser(response.data.data); // Mengupdate state currentUser dengan data pengguna
//             setIsAuthenticated(true); // Mengatur status autentikasi menjadi true
//         } catch (error) {
//             console.error('Failed to fetch user profile:', error); // Menangani error jika gagal mengambil profil
//             setIsAuthenticated(false); // Mengatur status autentikasi menjadi false
//             removeToken(); // Menghapus token dari localStorage
//         } finally {
//             setIsLoading(false); // Menghentikan loading setelah selesai
//         }
//     };

//     // Fungsi untuk melakukan login pengguna
//     const login = async (email: string, password: string): Promise<void> => {
//         try {
//             const response = await apiClient.post(`/auth/login`, { email, password }); // Memanggil endpoint login
//             const { token } = response.data; // Mendapatkan token dari response
//             setToken(token); // Menyimpan token ke localStorage
//             await fetchProfile(token); // Mengambil profil pengguna setelah login berhasil
//             router.push('/'); // Mengarahkan pengguna ke halaman utama setelah login
//         } catch (error) {
//             console.error('Login failed:', error); // Menangani error jika login gagal
//             throw new Error('Failed to login'); // Melemparkan error untuk ditangkap di komponen pemanggil
//         }
//     };

//     // Fungsi untuk melakukan registrasi pengguna baru
//     const register = async (name: string, username: string, email: string, password: string, organizer: boolean, phone: string, referralCode?: string | null) => {
//         try {
//             await apiClient.post(`/users/register`, { name, username, email, password, organizer, phone, referralCode }); // Memanggil endpoint register
//             router.push('/sign-in'); // Mengarahkan pengguna ke halaman sign-in setelah registrasi berhasil
//         } catch (error) {
//             console.error('Registration failed:', error); // Menangani error jika registrasi gagal
//             throw new Error('Failed to register'); // Melemparkan error untuk ditangkap di komponen pemanggil
//         }
//     };

//     // Fungsi untuk melakukan logout pengguna
//     const logout = async () => {
//         const token = getToken(); // Mendapatkan token dari localStorage
//         if (token) {
//             try {
//                 await apiClient.post(`/auth/logout`, {}, {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Mengirim token sebagai Authorization header
//                     },
//                 });
//             } catch (error) {
//                 console.error('Logout failed:', error); // Menangani error jika logout gagal
//             } finally {
//                 removeToken(); // Menghapus token dari localStorage
//                 setIsAuthenticated(false); // Mengatur status autentikasi menjadi false
//                 setCurrentUser(null); // Menghapus data pengguna saat ini
//                 router.push('/sign-in'); // Mengarahkan pengguna ke halaman login setelah logout
//             }
//         }
//     };

//     // Fungsi untuk mendapatkan token dari localStorage
//     const getToken = () => localStorage.getItem(TOKEN_KEY);

//     // Fungsi untuk menyimpan token ke localStorage
//     const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);

//     // Fungsi untuk menghapus token dari localStorage
//     const removeToken = () => localStorage.removeItem(TOKEN_KEY);

//     // Mengembalikan provider AuthContext dengan value sesuai state dan fungsi-fungsi yang telah didefinisikan
//     return (
//         <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout, getToken, isLoading }}>
//             {!isLoading && children} {/* Menampilkan children setelah selesai loading */}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook untuk mengakses nilai dari AuthContext
// export const useAuth = () => {
//     const context = useContext(AuthContext); // Mengambil nilai dari AuthContext menggunakan useContext
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider'); // Melemparkan error jika hook digunakan di luar AuthProvider
//     }
//     return context; // Mengembalikan nilai context
// };

// export default AuthContext; // Mengekspor default AuthContext untuk digunakan di berbagai bagian aplikasi

// 'use client';

// import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';
// import apiClient from '@/services/apiClient';
// import { User } from '@/types/User';

// interface AuthContextProps {
//     isAuthenticated: boolean;
//     currentUser: User | null;
//     login: (email: string, password: string) => Promise<void>;
//     register: (name: string, username: string, email: string, password: string, organizer: boolean, phone: string, referralCode?: string | null) => Promise<void>;
//     logout: () => void;
//     isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// const TOKEN_KEY = 'JWT_TOKEN';

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//     const [currentUser, setCurrentUser] = useState<User | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const router = useRouter();


//     // useEffect(() => {
//     //     checkAuth();
//     // }, []);
//     useEffect(() => {
//         const token = getToken(); // Get the token from localStorage
//         if (token) {
//             fetchProfile(token); // Fetch the profile if the token exists
//         } else {
//             setIsLoading(false);
//         }
//     }, []);

//     const checkAuth = async () => {
//         try {
//             const response = await apiClient.get('/users/profile');
//             setCurrentUser(response.data.data);
//             setIsAuthenticated(true);
//         } catch (error) {
//             console.error('Failed to fetch user profile:', error);
//             setIsAuthenticated(false);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const fetchProfile = async (token: string) => {
//         try {

//             const response = await apiClient.get('/users/profile', {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Send the token in the Authorization header
//                 },
//             });
//             setCurrentUser(response.data.data);
//             setIsAuthenticated(true);
//         } catch (error) {
//             console.error('Failed to fetch user profile:', error);
//             setIsAuthenticated(false);
//             removeToken(); // Remove the token if fetching the profile fails
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // const login = async (email: string, password: string): Promise<void> => {
//     //     try {
//     //         await apiClient.post('/auth/login', { email, password });
//     //         await checkAuth();
//     //         router.push('/');
//     //     } catch (error) {
//     //         console.error('Login failed:', error);
//     //         throw new Error('Failed to login');
//     //     }
//     // };
//     const login = async (email: string, password: string): Promise<void> => {
//         try {
//             const response = await apiClient.post('/auth/login', { email, password });
//             //ectract the token from the response data
//             const token = response.data.token;
//             //save the token in local storage with key 'sid'
//             sessionStorage.setItem('sid', token);
//             //optionally, perform additional check or action after login
//             // await checkAuth();

//             // setToken(token); // Store the token in localStorage
//             setIsAuthenticated(true);
//             localStorage.setItem('authToken', token);

//             await fetchProfile(token); // Fetch the profile after successful login
//             router.push('/');
//         } catch (error) {
//             console.error('Login failed:', error);
//             throw new Error('Failed to login');
//         }
//     };

//     const register = async (name: string, username: string, email: string, password: string, organizer: boolean, phone: string, referralCode?: string | null) => {
//         try {
//             await apiClient.post('/users/register', { name, username, email, password, organizer, phone, referralCode });
//             router.push('/sign-in');
//         } catch (error) {
//             console.error('Registration failed:', error);
//             throw new Error('Failed to register');
//         }
//     };

//     // const logout = async () => {
//     //     try {
//     //         await apiClient.post('/auth/logout');
//     //     } catch (error) {
//     //         console.error('Logout failed:', error);
//     //     } finally {
//     //         setIsAuthenticated(false);
//     //         setCurrentUser(null);
//     //         router.push('/sign-in');
//     //     }
//     // };
//     const logout = async () => {
//         const token = getToken(); // Get the token from localStorage
//         if (token) {
//             try {
//                 await apiClient.post('/auth/logout', {}, {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Send the token in the Authorization header
//                     },
//                 });
//             } catch (error) {
//                 console.error('Logout failed:', error);
//             } finally {
//                 removeToken(); // Remove the token from localStorage
//                 setIsAuthenticated(false);
//                 setCurrentUser(null);
//                 router.push('/sign-in');
//             }
//         }
//     };

//     // Function to get the token from localStorage
//     const getToken = () => localStorage.getItem(TOKEN_KEY);

//     // Function to set the token in localStorage
//     const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);

//     // Function to remove the token from localStorage
//     const removeToken = () => localStorage.removeItem(TOKEN_KEY);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout, isLoading }}>
//             {!isLoading && children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

// export default AuthContext;

// 'use client';

// import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';
// import apiClient from '@/services/apiClient';
// import { User } from '@/types/User';
// import jwtDecode from 'jwt-decode';

// interface AuthContextProps {
//     isAuthenticated: boolean;
//     currentUser: User | null;
//     login: (email: string, password: string) => Promise<void>;
//     register: (name: string, username: string, email: string, password: string, organizer: boolean, phone: string, referralCode?: string | null) => Promise<void>;
//     logout: () => void;
//     isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// const TOKEN_KEY = 'sid'; // Key for sessionStorage

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//     const [currentUser, setCurrentUser] = useState<User | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const router = useRouter();

//     useEffect(() => {
//         const token = getToken(); // Get the token from sessionStorage
//         if (token) {
//             fetchProfile(token); // Fetch the profile if the token exists
//         } else {
//             setIsLoading(false);
//         }
//     }, []);

//     const fetchProfile = async (token: string) => {
//         try {
//             const response = await apiClient.get('/users/profile', {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Send the token in the Authorization header
//                 },
//             });
//             setCurrentUser(response.data.data);
//             setIsAuthenticated(true);
//         } catch (error) {
//             console.error('Failed to fetch user profile:', error);
//             setIsAuthenticated(false);
//             removeToken(); // Remove the token if fetching the profile fails
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const login = async (email: string, password: string): Promise<void> => {
//         try {
//             const response = await apiClient.post('/auth/login', { email, password });
//             const { token } = response.data;

//             // Save the token in sessionStorage
//             setToken(token);
//             setIsAuthenticated(true);

//             await fetchProfile(token); // Fetch the profile after successful login
//             router.push('/');
//         } catch (error) {
//             console.error('Login failed:', error);
//             throw new Error('Failed to login');
//         }
//     };

//     const register = async (name: string, username: string, email: string, password: string, organizer: boolean, phone: string, referralCode?: string | null) => {
//         try {
//             await apiClient.post('/users/register', { name, username, email, password, organizer, phone, referralCode });
//             router.push('/sign-in');
//         } catch (error) {
//             console.error('Registration failed:', error);
//             throw new Error('Failed to register');
//         }
//     };

//     const logout = async () => {
//         const token = getToken(); // Get the token from sessionStorage
//         if (token) {
//             try {
//                 await apiClient.post('/auth/logout', {}, {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Send the token in the Authorization header
//                     },
//                 });
//             } catch (error) {
//                 console.error('Logout failed:', error);
//             } finally {
//                 removeToken(); // Remove the token from sessionStorage
//                 setIsAuthenticated(false);
//                 setCurrentUser(null);
//                 router.push('/sign-in');
//             }
//         }
//     };

//     // Function to get the token from sessionStorage
//     const getToken = () => sessionStorage.getItem(TOKEN_KEY);

//     // Function to set the token in sessionStorage
//     const setToken = (token: string) => sessionStorage.setItem(TOKEN_KEY, token);

//     // Function to remove the token from sessionStorage
//     const removeToken = () => sessionStorage.removeItem(TOKEN_KEY);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout, isLoading }}>
//             {!isLoading && children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

// export default AuthContext;

'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/services/apiClient';
import { User } from '@/types/User';
import jwtDecode from 'jwt-decode';

interface AuthContextProps {
    isAuthenticated: boolean;
    currentUser: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, username: string, email: string, password: string, organizer: boolean, phone: string, referralCode?: string | null) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const TOKEN_KEY = 'sid'; // Key for sessionStorage

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const token = getToken(); // Get the token from sessionStorage
        if (token) {
            fetchProfile(token); // Fetch the profile if the token exists
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchProfile = async (token: string) => {
        try {
            const response = await apiClient.get('/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                },
            });
            setCurrentUser(response.data.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            setIsAuthenticated(false);
            removeToken(); // Remove the token if fetching the profile fails
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            const { token } = response.data;

            // Save the token in sessionStorage
            setToken(token);
            setIsAuthenticated(true);

            await fetchProfile(token); // Fetch the profile after successful login
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Failed to login');
        }
    };

    const register = async (name: string, username: string, email: string, password: string, organizer: boolean, phone: string, referralCode?: string | null) => {
        try {
            await apiClient.post('/users/register', { name, username, email, password, organizer, phone, referralCode });
            router.push('/sign-in');
        } catch (error) {
            console.error('Registration failed:', error);
            throw new Error('Failed to register');
        }
    };

    const logout = async () => {
        const token = getToken(); // Get the token from sessionStorage
        if (token) {
            try {
                await apiClient.post('/auth/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                    },
                });
            } catch (error) {
                console.error('Logout failed:', error);
            } finally {
                removeToken(); // Remove the token from sessionStorage
                setIsAuthenticated(false);
                setCurrentUser(null);
                router.push('/sign-in');
            }
        }
    };

    // Function to get the token from sessionStorage
    const getToken = () => sessionStorage.getItem(TOKEN_KEY);

    // Function to set the token in sessionStorage
    const setToken = (token: string) => sessionStorage.setItem(TOKEN_KEY, token);

    // Function to remove the token from sessionStorage
    const removeToken = () => sessionStorage.removeItem(TOKEN_KEY);

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout, isLoading }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
