
"use client"; // Menunjukkan penggunaan mode atau konfigurasi spesifik untuk klien atau aplikasi

import { useAuth } from "@/context/AuthContext"; // Mengimpor hook useAuth dari AuthContext untuk mengelola status autentikasi
import { useRouter } from "next/navigation"; // Mengimpor useRouter dari next/navigation untuk pengelolaan navigasi Next.js
import { useEffect } from "react"; // Mengimpor useEffect dari React untuk melakukan efek samping pada komponen

// Komponen ProtectedRouteDashboard menerima children (konten yang dibungkus) dan route (rute halaman yang ingin diakses)
const ProtectedRouteDashboard = ({ children, route }: { children: React.ReactNode, route: string }) => {
    const { isAuthenticated, currentUser, isLoading } = useAuth(); // Mengambil status autentikasi, data pengguna, dan loading dari useAuth
    const router = useRouter(); // Mendapatkan instance router Next.js untuk navigasi

    useEffect(() => {
        // Efek samping untuk menentukan pengalihan halaman berdasarkan status autentikasi, peran pengguna, dan loading
        if (!isLoading) { // Jika proses loading sudah selesai
            if (!isAuthenticated) { // Jika pengguna belum terautentikasi
                router.push('/sign-in'); // Arahkan ke halaman login
            } else if (currentUser?.role !== 'ORGANIZER') { // Jika pengguna terautentikasi tetapi bukan organizer
                router.push('/'); // Arahkan ke halaman utama
            } else { // Jika pengguna terautentikasi dan memiliki peran sebagai organizer
                router.push(`/${route}`); // Arahkan ke halaman sesuai dengan route yang diberikan
            }
        }
    }, [isLoading, isAuthenticated, currentUser, route, router]); // Bergantung pada isLoading, isAuthenticated, currentUser, route, dan router

    // Menampilkan pesan "Loading..." jika masih dalam proses loading atau pengguna belum terautentikasi atau tidak memiliki peran sebagai organizer
    if (isLoading || !isAuthenticated || currentUser?.role !== 'ORGANIZER') {
        return <p>Loading...</p>;
    }

    // Mengembalikan konten children jika tidak dalam proses loading dan pengguna terautentikasi serta memiliki peran sebagai organizer
    return <>{children}</>;
};

export default ProtectedRouteDashboard; // Ekspor komponen ProtectedRouteDashboard untuk digunakan di aplikasi
