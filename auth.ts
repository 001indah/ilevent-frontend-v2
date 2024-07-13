import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
// untuk mengautentikasi pengguna menggunakan username dan password di NextAuth.
import Credentials from "next-auth/providers/credentials";
// ntuk mengatur dan mengelola cookie
import { cookies } from "next/headers";
// endpoint
import { config } from "./constants/url";
import { JWT } from "next-auth/jwt";

//interface hasil decode
interface DecodedToken {
    iss: string;
    iat: number; // Issued At (timestamp)
    exp: number; // Expiration Time (timestamp)
    sub: string; // Subject
    scope: string; // Scope
    userId: number; // User ID
}
//interface user
interface UserSession {
    id: string;
    email: string;
    role: string;
}
//auth
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        // kalau login porofider apa aja, kita pilih credential karena kita pake username dan password untuk login
        // Menentukan provider otentikasi, dalam hal ini menggunakan Credentials untuk mengautentikasi menggunakan username dan password.
        Credentials({
            credentials: {
                username: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" },
            },
            /**
             * Authorize the user credentials and return the user information.
             *
             * @param {Object} credentials - The user credentials.
             * @param {string} credentials.username - The user's email.
             * @param {string} credentials.password - The user's password.
             * @return {Promise<Object>} The user information.
             * @throws {Error} If the user is not found.
             */
            //method untuk autorizasi apakah username pass benar atau tidak, cara cek dengan cek endpoint login dari backend
            async authorize(credentials) {
                // Send a POST request to the login endpoint with the user credentials.
                const res = await fetch(config.BASE_URL + config.endpoints.login, {
                    // const res = await fetch(config.BASE_URL + config.endpoints.login, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.username,
                        password: credentials?.password,
                    }),
                    // Set the credentials to include cookies.
                    credentials: "include",
                });

                // If the response is not ok, return null.
                if (!res.ok) return null;

                // Parse the response body as JSON.
                const user = await res.json();

                // If the user is not found, throw an error.
                if (!user) {
                    throw new Error("User not found.");
                }

                // Set the session ID cookie.
                //nama token
                const useCookies = cookies();
                useCookies.set("sid", user.token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 3600,
                    path: "/",
                });

                // Decode the JWT token.
                const decoded = jwtDecode<DecodedToken>(user.token);

                // Return the user information.
                return {
                    id: decoded.userId,
                    email: decoded.sub,
                    role: decoded.scope,
                };
            },
        }),
    ],
    // Mengonfigurasi halaman custom untuk sign-in, dalam hal ini /sign-in.
    pages: {
        signIn: "/sign-in",
    },
    // Mengatur fungsi-fungsi jwt dan session yang dipanggil setelah otentikasi berhasil untuk mengatur token JWT dan sesi pengguna.
    callbacks: {

        async jwt({ token, user }: { token: JWT; user?: UserSession }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            session.user = {
                id: token.id,
                email: token.email,
                role: token.role,
            };
            return session;
        },
    },
});
