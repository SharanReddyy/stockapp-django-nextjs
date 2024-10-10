// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { getUserInfo } from './api';

// export default function withAuth(Component) {
//     return function AuthenticatedComponent(props) {
//         const [loading, setLoading] = useState(true);
//         const [authenticated, setAuthenticated] = useState(false);
//         const router = useRouter();

//         useEffect(() => {
//             const token = sessionStorage.getItem('token');
//             if (!token) {
//                 router.push('/login');
//             } else {
//                 getUserInfo(token).then(() => {
//                     setAuthenticated(true);
//                     setLoading(false);
//                 }).catch(() => {
//                     sessionStorage.removeItem('token');
//                     router.push('/login');
//                 });
//             }
//         }, []);

//         if (loading) {
//             return <p>Loading...</p>;
//         }

//         if (authenticated) {
//             return <Component {...props} />;
//         }

//         return null;
//     };
// }


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo } from './api';

export default function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const [loading, setLoading] = useState(true);
        const [authenticated, setAuthenticated] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                router.push('/login');
            } else {
                getUserInfo(token).then(() => {
                    setAuthenticated(true);
                    setLoading(false);
                }).catch(() => {
                    sessionStorage.removeItem('token');
                    router.push('/login');
                });
            }
        }, []);

        if (loading) {
            return <p>Loading...</p>;
        }

        if (authenticated) {
            return <Component {...props} />;
        }

        return null;
    };
}
