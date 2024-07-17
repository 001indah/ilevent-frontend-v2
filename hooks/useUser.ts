'use client';

// Mengimpor hook useState dan useEffect dari React
import { useState, useEffect } from 'react';
// Mengimpor instance apiClient dari file apiClient
import apiClient from '@/services/apiClient';
// Mengimpor tipe data User dari file datatypes
// import { User } from '@/types/datatypes';

// Definisi custom hook useUsers
type User = any | any[]; // Mengimpor tipe data User dari file datatypes

const useUsers = (): { users: User[]; loading: boolean; error: string | null } => {
    // State untuk menyimpan daftar pengguna
    const [users, setUsers] = useState<User[]>([]);
    // State untuk menandai loading status
    const [loading, setLoading] = useState<boolean>(true);
    // State untuk menyimpan pesan error
    const [error, setError] = useState<string | null>(null);

    // Menggunakan useEffect untuk mengambil data pengguna ketika komponen dimuat
    useEffect(() => {
        // Definisi fungsi fetchUsers
        const fetchUsers = async () => {
            try {
                // Mengirim permintaan GET ke endpoint /users
                const response = await apiClient.get('/users');
                // Mengatur state users dengan data yang diterima
                setUsers(response.data);
            } catch (err) {
                // Mengatur pesan error jika permintaan gagal
                setError("Failed to fetch users");
            } finally {
                // Mengubah status loading menjadi false setelah permintaan selesai
                setLoading(false);
            }
        };

        // Memanggil fungsi fetchUsers
        fetchUsers();
    }, []); // Menjalankan efek hanya sekali saat komponen dimuat

    // Mengembalikan state dan fungsi dari custom hook useUsers
    return { users, loading, error };
};

// Mengekspor custom hook useUsers
export default useUsers;
