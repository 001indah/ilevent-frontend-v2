// // Konstanta yang menyimpan kunci untuk token JWT di localStorage
// const TOKEN_KEY = 'jwtToken';

// // Fungsi untuk mendapatkan token dari localStorage
// export const getToken = () => {
//     // Mengambil item dari localStorage dengan kunci TOKEN_KEY
//     return localStorage.getItem(TOKEN_KEY);
// };

// // Fungsi untuk menyimpan token ke localStorage
// export const setToken = (token: string) => {
//     // Menyimpan item ke localStorage dengan kunci TOKEN_KEY dan nilai token
//     localStorage.setItem(TOKEN_KEY, token);
// };

// // Fungsi untuk menghapus token dari localStorage
// export const removeToken = () => {
//     // Menghapus item dari localStorage dengan kunci TOKEN_KEY
//     localStorage.removeItem(TOKEN_KEY);
// };

// Konstanta yang menyimpan kunci untuk token JWT di sessionStorage
const TOKEN_KEY = 'sid';

// Fungsi untuk mendapatkan token dari sessionStorage
export const getToken = () => {
    // Mengambil item dari sessionStorage dengan kunci TOKEN_KEY
    return sessionStorage.getItem(TOKEN_KEY);
};

// Fungsi untuk menyimpan token ke sessionStorage
export const setToken = (token: string) => {
    // Menyimpan item ke sessionStorage dengan kunci TOKEN_KEY dan nilai token
    sessionStorage.setItem(TOKEN_KEY, token);
};

// Fungsi untuk menghapus token dari sessionStorage
export const removeToken = () => {
    // Menghapus item dari sessionStorage dengan kunci TOKEN_KEY
    sessionStorage.removeItem(TOKEN_KEY);
};

