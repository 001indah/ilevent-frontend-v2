import React from 'react';
import { BackButton } from '@/components/BackButton';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-screen flex flex-col items-center justify-center p-4'>
            <p>This is an auth layout</p>
            <div className='my-4'>
                <BackButton link='/' />
            </div>
            {children}
        </div>
    );
};

export default AuthLayout;