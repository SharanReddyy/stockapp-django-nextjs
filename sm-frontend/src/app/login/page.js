// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { login } from '../../utils/api';
// import Link from 'next/link';  // Import Link from next/link

// export default function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const router = useRouter();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const response = await login({ username, password });
//             const token = response.key || response.token || response.auth_token;
            
//             if (token) {
//                 sessionStorage.setItem('token', token);  // Store the token in sessionStorage
//                 router.push('/');  // Redirect to the homepage or a protected route
//             } else {
//                 setError('Login failed: No token received.');
//             }
//         } catch (err) {
//             setError('Login failed: ' + (err.response?.data?.non_field_errors?.join(' ') || 'An error occurred.'));
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
//             <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//                 <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h1>
                
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//                         <input
//                             id="username"
//                             type="text"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             placeholder="Enter your username"
//                             required
//                             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         />
//                     </div>
                    
//                     <div>
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                         <input
//                             id="password"
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Enter your password"
//                             required
//                             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         />
//                     </div>
                    
//                     {error && <p className="text-red-500 text-sm">{error}</p>}
                    
//                     <button
//                         type="submit"
//                         className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
//                     >
//                         Login
//                     </button>
//                 </form>
                
//                 <div className="mt-6 text-center">
//                     <p className="text-sm text-gray-600">Don't have an account?</p>
//                     <Link href="/register" className="text-blue-600 hover:underline">  {/* Directly use Link without wrapping it in an <a> */}
//                         Register
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../utils/api';
import Link from 'next/link';  // Import Link from next/link

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await login({ username, password });
            const token = response.key || response.token || response.auth_token;
            
            if (token) {
                sessionStorage.setItem('token', token);  // Store the token in sessionStorage
                sessionStorage.setItem('username', username);
                router.push('/');  // Redirect to the homepage or a protected route
            } else {
                setError('Login failed: No token received.');
            }
        } catch (err) {
            setError('Login failed: ' + (err.response?.data?.non_field_errors?.join(' ') || 'An error occurred.'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    >
                        Login
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">Don't have an account?</p>
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
