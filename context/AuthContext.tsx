// 'use client';

// import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';
// import apiClient from '@/services/apiClient';
// import { User } from '@/types/User';
// import { parseCookies, setCookie, destroyCookie } from 'nookies';

// interface AuthContextProps {
//     isAuthenticated: boolean;
//     currentUser: User | null;
//     login: (email: string, password: string) => Promise<string>;
//     register: (fullname: string, username: string, email: string, password: string, role: string, phone: string, referralCode?: string) => Promise<void>;
//     logout: () => void;
//     getToken: () => string | null;
//     isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// const TOKEN_KEY = 'JWT_TOKEN';

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//     const [currentUser, setCurrentUser] = useState<User | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const router = useRouter();

//     useEffect(() => {
//         const token = getToken();
//         if (token) {
//             fetchProfile(token);
//         } else {
//             setIsLoading(false);
//         }
//     }, []);

//     const fetchProfile = async (token: string) => {
//         try {
//             const response = await apiClient.get(`/profile`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setCurrentUser(response.data.data);
//             setIsAuthenticated(true);
//         } catch (error) {
//             console.error('Failed to fetch user profile:', error);
//             setIsAuthenticated(false);
//             removeToken();
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const login = async (email: string, password: string): Promise<string> => {
//         try {
//             const response = await apiClient.post(`/api/v1/auth/login`, { email, password });
//             const { token } = response.data;
//             setToken(token);
//             await fetchProfile(token);
//             return token;
//         } catch (error) {
//             console.error('Login failed:', error);
//             throw new Error('Failed to login');
//         }
//     };

//     const register = async (fullname: string, username: string, email: string, password: string, role: string, phone: string, referralCode?: string) => {
//         try {
//             await apiClient.post(`/api/v1/users/register`, { fullname, username, email, password, role, phone, referralCode });
//             router.push('/login');
//         } catch (error) {
//             console.error('Registration failed:', error);
//             throw new Error('Failed to register');
//         }
//     };

//     const logout = async () => {
//         const cookies = parseCookies();
//         const token = cookies[TOKEN_KEY];
//         if (token) {
//             try {
//                 await apiClient.post(`/api/v1/auth/logout`, {}, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//             } catch (error) {
//                 console.error('Logout failed:', error);
//             } finally {
//                 removeToken();
//                 setIsAuthenticated(false);
//                 setCurrentUser(null);
//                 router.push('/login');
//             }
//         }
//     };

//     const getToken = () => parseCookies()[TOKEN_KEY];

//     const setToken = (token: string) => setCookie(null, TOKEN_KEY, token, { path: '/', secure: true, sameSite: 'none' });

//     const removeToken = () => destroyCookie(null, TOKEN_KEY, { path: '/' });

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout, getToken, isLoading }}>
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
    register: (name: string, username: string, email: string, password: string, organizer: boolean, phone: string, referralCode?: string) => Promise<void>;
    logout: () => void;
    getToken: () => string | null;
    isLoading: boolean;
}
interface JwtPayload {
    scope: string;
    // Add other expected JWT payload fields here
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const TOKEN_KEY = 'JWT_TOKEN';


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (token) {
            fetchProfile(token);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchProfile = async (token: string) => {
        try {
            const response = await apiClient.get(`/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCurrentUser(response.data.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            setIsAuthenticated(false);
            removeToken();
        } finally {
            setIsLoading(false);
        }
    };
    // lokal
    const login = async (email: string, password: string): Promise<void> => {
        try {
            const response = await apiClient.post(`/auth/login`, { email, password });
            const { token } = response.data;
            setToken(token);
            await fetchProfile(token);
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Failed to login');
        }
    };

    // const login = async (email: string, password: string): Promise<void> => {
    //     try {
    //         const response = await apiClient.post<{ token: string }>('/auth/login', { email, password });
    //         const { token } = response.data;
    //         setToken(token);

    //         // Decode token
    //         const decodedToken = jwtDecode<JwtPayload>(token);

    //         // Ambil scope dari token yang sudah di-decode
    //         const userScope = decodedToken.scope;

    //         await fetchProfile(token);

    //         // Tentukan rute berdasarkan scope
    //         switch (userScope) {
    //             case 'ROLE_PERSONAL':
    //                 router.push('/');
    //                 break;
    //             case 'ROLE_ORGANIZER':
    //                 router.push('/organizer');
    //                 break;
    //             default:
    //                 router.push('/'); // Default route jika scope tidak dikenali
    //         }
    //     } catch (error) {
    //         console.error('Login failed:', error);
    //         throw new Error('Failed to login');
    //     }
    // };

    //sid
    // const login = async (email: string, password: string): Promise<void> => {
    //     try {
    //         const response = await apiClient.post(`/auth/login`, { email, password });
    //         const { token } = response.data;
    //         setToken(token);

    //         // Decode token
    //         const decodedToken: any = jwtDecode(token);

    //         // Ambil scope dari token yang sudah di-decode
    //         const userScope = decodedToken.scope;

    //         await fetchProfile(token);

    //         // Redirect berdasarkan scope
    //         if (userScope === "ROLE_PERSONAL") {
    //             router.push('/');
    //         } else if (userScope === "ROLE_ORGANIZER") {
    //             router.push('/organizer');
    //         } else {
    //             // Default redirect jika scope tidak dikenali
    //             router.push('/');
    //         }
    //     } catch (error) {
    //         console.error('Login failed:', error);
    //         throw new Error('Failed to login');
    //     }
    // };

    const register = async (name: string, username: string, email: string, password: string, organizer: boolean, phone: string, referralCode?: string | null) => {
        try {
            await apiClient.post(`/users/register`, { name, username, email, password, organizer, phone, referralCode });
            router.push('/sign-in');
        } catch (error) {
            console.error('Registration failed:', error);
            throw new Error('Failed to register');
        }
    };

    const logout = async () => {
        const token = getToken();
        if (token) {
            try {
                await apiClient.post(`/auth/logout`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (error) {
                console.error('Logout failed:', error);
            } finally {
                removeToken();
                setIsAuthenticated(false);
                setCurrentUser(null);
                router.push('/login');
            }
        }
    };

    const getToken = () => localStorage.getItem(TOKEN_KEY);
    const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
    const removeToken = () => localStorage.removeItem(TOKEN_KEY);

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout, getToken, isLoading }}>
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