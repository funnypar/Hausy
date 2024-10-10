import "@/assets/styles/globals.css";

export const metadata = {
    title: "Hausy | Find Your Best Home",
};

const MainLayout = ({ children }) => {
    return (
        <html>
            <body>
                <div>{children}</div>
            </body>
        </html>
    );
};

export default MainLayout;
