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
import jwtDecode from 'jwt-decode';

// Konstanta yang menyimpan kunci untuk token JWT di sessionStorage
const TOKEN_KEY = 'sid';

// Fungsi untuk mendapatkan token dari sessionStorage
export const getToken = () => {
    // Mengambil item dari sessionStorage dengan kunci TOKEN_KEY
    return sessionStorage.getItem(TOKEN_KEY);
};

// added function
// Fungsi untuk mendekode token JWT
export const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};
// Fungsi untuk mendapatkan role dari token JWT
export const getRoleFromToken = () => {
    const token = getToken(); // Ambil token dari sessionStorage
    if (!token) return null;
    const decodedToken = decodeToken(token); // Dekode token
    return decodedToken ? decodedToken.scope : null; // Kembalikan nilai scope (role)
};

// enddd




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

