// import dynamic from 'next/dynamic';
// import { ReactNode } from 'react';

// interface ProtectedRouteProps {
//     children: ReactNode;
//     requiredRole: string;
// }

// // Import ProtectedRouteClient secara dinamis agar hanya di-load di sisi klien
// const ProtectedRouteClient = dynamic(() => import('./ProctectedRouteScopeClient'), {
//     ssr: false, // Disable server-side rendering
// });

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
//     return (
//         <ProtectedRouteClient requiredRole={requiredRole}>
//             {children}
//         </ProtectedRouteClient>
//     );
// };

// export default ProtectedRoute;
