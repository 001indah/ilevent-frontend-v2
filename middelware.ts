// import { NextResponse } from 'next/server';
// import { auth } from './lib/auth';

// export default auth((req) => {
//     const isLoggedIn = !!req.auth;
//     const isOnLoginPage = req.nextUrl.pathname.startsWith('/login');

//     if (isOnLoginPage) {
//         if (isLoggedIn) {
//             return NextResponse.redirect(new URL('/', req.url));
//         }
//         return null;
//     }

//     if (!isLoggedIn) {
//         return NextResponse.redirect(new URL('/login', req.url));
//     }

//     // Cek role untuk akses ke halaman organizer
//     if (req.nextUrl.pathname.startsWith('/organizer')) {
//         if (req.auth?.user?.role !== 'ORGANIZER') {
//             return NextResponse.redirect(new URL('/', req.url));
//         }
//     }

//     return null;
// });

// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };