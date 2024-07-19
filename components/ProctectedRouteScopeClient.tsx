// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import { getRoleFromToken } from '@/utils/auth';

// interface ProtectedRouteProps {
//     children: ReactNode;
//     requiredRole: string;
// }

// const ProtectedRoute = ({ children, requiredRole }) => {
//     const router = useRouter();
//     useEffect(() => {
//         const role = getRoleFromToken();
//         if (role !== requiredRole) {
//             router.push('/unauthorized'); // Arahkan ke halaman unauthorized jika role tidak sesuai
//         }
//     }, [router, requiredRole]);

//     return children;
// };

// export default ProtectedRoute;

// 'use client';

// import { useRouter } from 'next/router';
// import { useEffect, ReactNode } from 'react';
// import { getRoleFromToken } from '@/utils/auth';

// interface ProtectedRouteClientProps {
//     children: ReactNode;
//     requiredRole: string;
// }

// const ProtectedRouteClient: React.FC<ProtectedRouteClientProps> = ({ children, requiredRole }) => {
//     const router = useRouter();

//     useEffect(() => {
//         const role = getRoleFromToken();
//         if (role !== requiredRole) {
//             router.push('/unauthorized'); // Redirect to unauthorized page if role does not match
//         }
//     }, [router, requiredRole]);

//     return <>{children}</>;
// };

// export default ProtectedRouteClient;
