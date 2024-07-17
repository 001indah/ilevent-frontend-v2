// Mengimpor fungsi createProxyMiddleware dari http-proxy-middleware
const { createProxyMiddleware } = require('http-proxy-middleware');

// Mengimpor framework express
const express = require('express');

// Mengimpor server Next.js
const next = require('next');

// Mendefinisikan konfigurasi proxy untuk pengembangan
const devProxy = {
    '/api': {
        // URL target untuk mem-proxy permintaan
        target: 'https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1',
        // Mengubah asal header host menjadi URL target
        changeOrigin: true,
        // Menulis ulang path dengan menghapus '/api' dari awal
        pathRewrite: {
            '^/api': '',
        },
    },
};

// Menetapkan port untuk server, default ke 3000 jika tidak ditentukan dalam variabel lingkungan
const port = process.env.PORT || 3000;

// Menentukan apakah lingkungan adalah pengembangan atau produksi
const dev = process.env.NODE_ENV !== 'production';

// Menginisialisasi aplikasi Next.js
const app = next({ dev });

// Mendapatkan penangan permintaan Next.js
const handle = app.getRequestHandler();

// Mempersiapkan aplikasi Next.js
app.prepare().then(() => {
    // Membuat server Express
    const server = express();

    // Menyiapkan middleware proxy untuk setiap konteks yang didefinisikan dalam devProxy
    Object.keys(devProxy).forEach(function (context) {
        server.use(context, createProxyMiddleware(devProxy[context]));
    });

    // Menangani semua rute lain dengan Next.js
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    // Memulai server
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Siap di http://localhost:${port}`);
    });
});