import React from 'react';
import Sidebar from './_components/sidebar';
// import ProtectedRoute from '@/components/ProctectedRouteScopeServer';
// import Header from './_components/Header';

const OrganizerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        // <ProtectedRoute requiredRole="ROLE_ORGANIZER">
        <div className='flex w-full'>
            {/* <p>sidebar</p> */}
            <Sidebar />
            <div className='w-full p-4 lg:p-16'>
                <p> Header This is an organizer layout</p>
                {/* <Header /> */}
                {children}
            </div>
        </div>
        // </ProtectedRoute>
    );
};

export default OrganizerLayout;