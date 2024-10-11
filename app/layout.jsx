import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "Hausy | Find Your Best Home",
};

const MainLayout = ({ children }) => {
    return (
        <html>
            <body>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    );
};

export default MainLayout;
