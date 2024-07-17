'use client';
import { useAuth } from '@/context/AuthContext';
import NavbarLogout from './Header/index';
import NavbarLogin from './Header/indexAvatar';

const Navbar = () => {
    const { isAuthenticated } = useAuth(); // Mengambil status autentikasi dari konteks
    return (
        <div>
            {isAuthenticated ? (<NavbarLogin />) : (<NavbarLogout />)}
        </div>
    );
};

export default Navbar;
