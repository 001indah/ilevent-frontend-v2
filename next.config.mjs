/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // Menentukan domain-domain yang diizinkan untuk sumber gambar
        domains: ['images.pexels.com', 'images.unsplash.com', 'unsplash.com', 'source.unsplash.com', 'localhost', 'res.cloudinary.com'],
    },
    // Fungsi async untuk menangani penulisan ulang URL (rewrites)
    async rewrites() {
        return [
            {
                // Menentukan pola URL sumber yang akan ditulis ulang
                source: '/api/:path*',
                // Menentukan tujuan penulisan ulang
                destination: 'https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1:path*',
            },
        ];
    },
};

export default nextConfig;
