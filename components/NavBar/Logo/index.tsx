import React from 'react';
import Image from 'next/image';
import graycycleLogo from '@/public/logoWhite.webp';
import colorsLogo from '@/public/logo.webp';

interface LogoProps {
    isNavbarFixed: boolean;
}

const Logo: React.FC<LogoProps> = ({ isNavbarFixed }) => {
    return (
        <div>
            <Image
                alt="logo"
                src={isNavbarFixed ? colorsLogo : graycycleLogo}
                height={28}
                style={{ display: 'block', margin: '16px' }}
            />
        </div>
    );
};

export default Logo;
