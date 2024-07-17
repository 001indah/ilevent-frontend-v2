//bertanggung jawab untuk mengarahkan pengguna ke halaman login jika mereka belum terautentikasi
"use client"; // Menunjukkan penggunaan mode atau konfigurasi spesifik untuk klien

import { useAuth } from "@/context/AuthContext"; // Mengimpor hook useAuth dari AuthContext untuk mengelola status autentikasi
import { useRouter } from "next/navigation"; // Mengimpor useRouter dari next/navigation untuk pengelolaan navigasi Next.js
import { useEffect } from "react"; // Mengimpor useEffect dari React untuk melakukan efek samping pada komponen

// Komponen ProtectedRoute menerima children (konten yang dibungkus)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth(); // Mengambil status autentikasi dan loading dari useAuth
    const router = useRouter(); // Mendapatkan instance router Next.js untuk navigasi

    useEffect(() => {
        // Efek samping untuk menentukan pengalihan halaman berdasarkan status autentikasi dan loading
        if (!isLoading && !isAuthenticated) { // Jika proses loading sudah selesai dan pengguna belum terautentikasi
            router.push('/sign-in'); // Arahkan ke halaman login
        } else if (!isLoading && isAuthenticated) { // Jika proses loading sudah selesai dan pengguna sudah terautentikasi
            router.push('/'); // Arahkan ke halaman utama
        }
    }, [isLoading, isAuthenticated, router]); // Bergantung pada isLoading, isAuthenticated, dan router

    // Menampilkan pesan "Loading..." jika masih dalam proses loading atau pengguna belum terautentikasi
    if (isLoading || !isAuthenticated) {
        return <p>Loading...</p>;
    }

    // Mengembalikan konten children jika tidak dalam proses loading dan pengguna sudah terautentikasi
    return <>{children}</>;
};

export default ProtectedRoute; // Ekspor komponen ProtectedRoute untuk digunakan di aplikasi
