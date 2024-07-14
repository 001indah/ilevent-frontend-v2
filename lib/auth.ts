// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { config } from '@/constants/url';

// export const {
//     handlers: { GET, POST },
//     auth,
//     signIn,
//     signOut,
// } = NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 username: { label: "Email", type: "text" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials) {
//                 if (!credentials?.username || !credentials?.password) return null;

//                 const baseUrl = process.env.NODE_ENV === 'production' ? config.PROD_URL : config.BASE_URL;
//                 const res = await fetch(baseUrl + config.endpoints.login, {
//                     method: 'POST',
//                     body: JSON.stringify({
//                         email: credentials.username,
//                         password: credentials.password
//                     }),
//                     headers: { "Content-Type": "application/json" }
//                 });

//                 const user = await res.json();

//                 if (res.ok && user) {
//                     return user;
//                 }
//                 return null;
//             }
//         })
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//                 token.email = user.email;
//                 token.role = user.role;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session.user.id = token.id;
//             session.user.email = token.email;
//             session.user.role = token.role;
//             return session;
//         }
//     },
//     pages: {
//         signIn: '/login',
//     },
// });