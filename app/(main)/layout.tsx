// import Footer from '@/components/Footer';
// import Header from '@/components/Header';
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar/Header/indexAvatar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mt-24 lg:mt-32">
            {/* <p>This is a main layout (header)</p> */}
            <Navbar />
            {children}
            {/* <Footer /> */}
            <p>This is a main layout (footer)</p>
            <Footer />
        </div>
    );
};

export default MainLayout;