// src/app/layout.js
import Navbar from '../components/Navbar';
import '../app/globals.css';

export const metadata = {
    title: 'Stock Dashboard',
    description: 'A dashboard for stock market KPIs',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="flex">
                    <Navbar />
                    <div className=" w-full">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
