import React from 'react';
// import Sidebar from './_components/Sidebar';
// import Header from './_components/Header';

const OrganizerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <p>sidebar</p>
            {/* <Sidebar /> */}
            <div className='ml-72'>
                <p> Header This is an organizer layout</p>
                {/* <Header /> */}
                {children}
            </div>
        </div>
    );
};

export default OrganizerLayout;