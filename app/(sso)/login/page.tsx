"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    // Retrieve specific query strings
    const redirectUri = searchParams.get("redirect_uri");
    const state = searchParams.get("state");
    const scope = searchParams.get("scope");
    const code = searchParams.get("code");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                redirectUri,
                state,
                scope,
                code,
            }),
        });

        if (response.ok) {
            const { redirectUrl } = await response.json();
            router.push(redirectUrl);
            router.refresh();
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}



// // pages/login.tsx
// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     // Retrieve specific query strings
//     const redirectUri = searchParams.get('redirect_uri');
//     const state = searchParams.get('state');
//     const scope = searchParams.get('scope');
//     const code = searchParams.get('code');

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const response = await fetch("/auth", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password, redirectUri, state, scope, code }),
//         });

//         if (response.ok) {
//             console.log('response.ok', response.ok)
//             // router.push("/auth/authorize?response_type=code");
//         } else {
//             alert("Invalid credentials");
//         }
//     };

//     return (
//         <div className="flex items-center justify-center h-screen bg-gray-100">
//             <form
//                 className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//                 onSubmit={handleSubmit}
//             >
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                         Email
//                     </label>
//                     <input
//                         id="email"
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//                         required
//                     />
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                         Password
//                     </label>
//                     <input
//                         id="password"
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//                         required
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// }








// import { useState } from 'react';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // Simulate a login process (replace with DB call)
//         if (email === 'user@example.com' && password === 'password123') {
//             const redirectUri = new URLSearchParams(window.location.search).get('redirect_uri');
//             window.location.href = `${redirectUri}?code=auth-code-123`;
//         } else {
//             setError('Invalid email or password');
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-50" >
//             <form className="bg-white p-6 rounded shadow" onSubmit={handleSubmit} >
//                 <h2 className="text-2xl font-bold mb-4" > Login </h2>
//                 < div >
//                     <label className="block mb-1" > Email </label>
//                     < input
//                         type="email"
//                         className="border p-2 w-full rounded"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)
//                         }
//                     />
//                 </div>
//                 < div className="mt-4" >
//                     <label className="block mb-1" > Password </label>
//                     < input
//                         type="password"
//                         className="border p-2 w-full rounded"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 {error && <p className="text-red-500 mt-2" > {error} </p>}
//                 <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// }
