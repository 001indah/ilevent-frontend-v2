'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/services/apiClient';
import { User } from '@/types/User';

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
