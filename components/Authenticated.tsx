// bertanggung jawab untuk memastikan pengguna telah terautentikasi sebelum mengakses halaman tertentu dalam aplikas
"use client"; // Menunjukkan penggunaan mode atau konfigurasi spesifik untuk klien

import { useAuth } from "@/context/AuthContext"; // Mengimpor hook useAuth dari AuthContext untuk mengelola status autentikasi
import { useRouter } from "next/navigation"; // Mengimpor useRouter dari next/navigation untuk pengelolaan navigasi Next.js
import { useEffect } from "react"; // Mengimpor useEffect dari React untuk melakukan efek samping pada komponen

// Komponen Authenticated menerima children (konten yang dibungkus) dan route (rute halaman yang ingin diakses)
const Authenticated = ({ children, route }: { children: React.ReactNode, route: string }) => {
    const { isAuthenticated, currentUser, isLoading } = useAuth(); // Mengambil status autentikasi, data pengguna, dan status loading dari useAuth
    const router = useRouter(); // Mendapatkan instance router Next.js untuk navigasi

    useEffect(() => {
        // Efek samping untuk menentukan pengalihan halaman berdasarkan status autentikasi dan loading
        if (!isLoading) { // Jika proses loading sudah selesai
            if (isAuthenticated) { // Jika pengguna terautentikasi
                router.push('/'); // Arahkan ke halaman utama
            } else if (currentUser?.role === 'ORGANIZER') { // Jika pengguna memiliki peran sebagai organizer
                router.push('/organizer'); // Arahkan ke dashboard
            } else { // Jika pengguna belum terautentikasi atau memiliki peran lain
                router.push(`/${route}`); // Arahkan ke halaman sesuai dengan route yang diberikan
            }
        }
    }, [isLoading, isAuthenticated, currentUser, route, router]); // Bergantung pada isLoading, isAuthenticated, currentUser, route, dan router

    // Menampilkan pesan "Loading..." jika masih dalam proses loading atau pengguna terautentikasi atau memiliki peran sebagai organizer
    if (isLoading || isAuthenticated || currentUser?.role === 'ORGANIZER') {
        return <p>Loading...</p>;
    }

    // Mengembalikan konten children jika tidak dalam proses loading dan pengguna belum terautentikasi atau memiliki peran lain
    return (
        <>
            {children}
        </>
    );
};

export default Authenticated; // Ekspor komponen Authenticated untuk digunakan di aplikasi
