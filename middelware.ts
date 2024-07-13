// export { auth as middleware } from "@/auth";


// // Penggunaan middleware dalam kode
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { auth } from '@/auth';

export async function middleware(req) {
    const token = await getToken({ req });
    if (!token) {
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*'], // Adjust paths as needed
};
