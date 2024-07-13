import React from 'react';
import Sidebar from './_components/sidebar';
// import Header from './_components/Header';

const OrganizerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex w-full'>
            {/* <p>sidebar</p> */}
            <Sidebar />
            <div className='w-full p-4 lg:p-16'>
                <p> Header This is an organizer layout</p>
                {/* <Header /> */}
                {children}
            </div>
        </div>
    );
};

export default OrganizerLayout;