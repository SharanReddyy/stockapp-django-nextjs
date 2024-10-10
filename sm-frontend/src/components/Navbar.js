// // // src/components/Navbar.js
// // import Link from 'next/link';

// // const Navbar = () => {
// //     return (
// //         <nav className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0">
// //             <div className="flex flex-col p-4">
// //                 <Link href="/" className="text-2xl font-bold mb-6">
// //                     Stock Dashboard
// //                 </Link>
// //                 <Link href="/daily-closing-price" className="mb-4 hover:bg-gray-700 p-2 rounded">
// //                     Daily Closing Price
// //                 </Link>
// //                 <Link href="/price-change-percentage" className="mb-4 hover:bg-gray-700 p-2 rounded">
// //                     Price Change Percentage
// //                 </Link>
// //                 <Link href="/top-gainers-losers" className="hover:bg-gray-700 p-2 rounded">
// //                     Top Gainers/Losers
// //                 </Link>
// //             </div>
// //         </nav>
// //     );
// // };

// // export default Navbar;

// "use client";
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { logout } from '../utils/api';

// const Navbar = () => {
//     const router = useRouter();
//     const [authenticated, setAuthenticated] = useState(false);

//     useEffect(() => {
//         const token = sessionStorage.getItem('token');
//         setAuthenticated(!!token);
//     }, []);

//     const handleLogout = async () => {
//         const token = sessionStorage.getItem('token');
//         if (token) {
//             await logout(token);
//             sessionStorage.removeItem('token');
//             setAuthenticated(false);
//             router.push('/login');
//         }
//     };

//     if (!authenticated) {
//         return null; // Do not render Navbar if not authenticated
//     }

//     return (
//         <nav className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0">
//             <div className="flex flex-col p-4">
//                 <Link href="/" className="text-2xl font-bold mb-6">
//                     Stock Dashboard
//                 </Link>
//                 <Link href="/daily-closing-price" className="mb-4 hover:bg-gray-700 p-2 rounded">
//                     Daily Closing Price
//                 </Link>
//                 <Link href="/price-change-percentage" className="mb-4 hover:bg-gray-700 p-2 rounded">
//                     Price Change Percentage
//                 </Link>
//                 <Link href="/top-gainers-losers" className="hover:bg-gray-700 p-2 rounded">
//                     Top Gainers/Losers
//                 </Link>
//                 <button onClick={handleLogout} className="mt-6 bg-red-500 p-2 rounded">
//                     Logout
//                 </button>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


// src/components/Navbar.js
"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logout } from '../utils/api';

const Navbar = () => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const storedUsername = sessionStorage.getItem('username');
        if (token) {
            setAuthenticated(true);
            setUsername(storedUsername);
        } else {
            setAuthenticated(false);
        }
    }, []);

    const handleLogout = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            await logout(token);
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            setAuthenticated(false);
            router.push('/login');
        }
    };

    if (!authenticated) {
        return null; // Do not render Navbar if not authenticated
    }

    return (
        <nav className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0">
            <div className="flex flex-col p-4">
                <span className="text-xl font-bold mb-6">Hi, {username}!</span>
                <Link href="/" className="text-2xl font-bold mb-6">
                    Stock Dashboard
                </Link>
                <Link href="/daily-closing-price" className="mb-4 hover:bg-gray-700 p-2 rounded">
                    Daily Closing Price
                </Link>
                <Link href="/price-change-percentage" className="mb-4 hover:bg-gray-700 p-2 rounded">
                    Price Change Percentage
                </Link>
                <Link href="/top-gainers-losers" className="hover:bg-gray-700 p-2 rounded">
                    Top Gainers/Losers
                </Link>
                <button onClick={handleLogout} className="mt-6 bg-red-500 p-2 rounded">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
