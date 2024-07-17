import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar/Navbar";
import { AuthProvider } from '@/context/AuthContext';

const OrganizerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <div className="mt-24 lg:mt-28">
                <Navbar />
                {children}
                <Footer />
            </div>
        </AuthProvider>
    );
};

export default OrganizerLayout;
