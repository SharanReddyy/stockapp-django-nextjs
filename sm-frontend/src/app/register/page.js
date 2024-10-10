// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { register } from '../../utils/api';

// export default function Register() {
//     const [email, setEmail] = useState('');
//     const [username, setUsername] = useState('');
//     const [password1, setPassword1] = useState('');
//     const [password2, setPassword2] = useState('');
//     const [error, setError] = useState(null);
//     const router = useRouter();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);

//         if (password1 !== password2) {
//             setError('Passwords do not match');
//             return;
//         }

//         try {
//             await register({ email, username, password1, password2 });
//             router.push('/login');
//         } catch (err) {
//             setError('Registration failed: ' + err.response.data.detail);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
//             <h1 className="text-2xl mb-4">Register</h1>
//             <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 className="w-full mb-4 p-2 border rounded"
//                 required
//             />
//             <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username"
//                 className="w-full mb-4 p-2 border rounded"
//                 required
//             />
//             <input
//                 type="password"
//                 value={password1}
//                 onChange={(e) => setPassword1(e.target.value)}
//                 placeholder="Password"
//                 className="w-full mb-4 p-2 border rounded"
//                 required
//             />
//             <input
//                 type="password"
//                 value={password2}
//                 onChange={(e) => setPassword2(e.target.value)}
//                 placeholder="Confirm Password"
//                 className="w-full mb-4 p-2 border rounded"
//                 required
//             />
//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
//         </form>
//     );
// }

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '../../utils/api';

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (password1 !== password2) {
            setError('Passwords do not match');
            return;
        }

        try {
            await register({ email, username, password1, password2 });
            router.push('/login');
        } catch (err) {
            if (err.response && err.response.data) {
                const errorMessages = [];
                // Collect error messages from the response
                for (const key in err.response.data) {
                    if (err.response.data[key]) {
                        errorMessages.push(`${key}: ${err.response.data[key].join(' ')}`);
                    }
                }
                setError(`Registration failed: ${errorMessages.join(' | ')}`);
            } else {
                setError('Registration failed: An unexpected error occurred.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <h1 className="text-2xl mb-4">Register</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full mb-4 p-2 border rounded"
                required
            />
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full mb-4 p-2 border rounded"
                required
            />
            <input
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                placeholder="Password"
                className="w-full mb-4 p-2 border rounded"
                required
            />
            <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm Password"
                className="w-full mb-4 p-2 border rounded"
                required
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
        </form>
                
    );
}
