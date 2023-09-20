import React from 'react';
import Link from 'next/link';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/components/firebase';
import Navbar from '@/components/navbar';

const Home = () => {
    const [user] = useAuthState(auth);

    const googleAuth = new GoogleAuthProvider();
    const login = async () => {
        const results = await signInWithPopup(auth, googleAuth);
        const { user } = results;
        const userInfo = {
            name: user.displayName,
            email: user.email,
            image: user.photoURL
        };
        // Do something with userInfo, if needed
    };

    return (
        <div className="bg-gray-100 min-h-screen mt-10">
            <Navbar />

            <div className="container mx-auto py-8">
                <div className="bg-white p-4 md:p-8 rounded shadow-md md:w-96 mx-auto text-center">
                    <h1 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
                        Welcome to SmartPark!
                    </h1>
                    <img src="./image.gif" alt="Image description" className="mb-4 w-full" />
                    <p className="text-gray-800 text-sm md:text-base">
                        Find and reserve parking spots with ease. Whether you're a parking spot owner or a user looking for a spot, we've got you covered.
                    </p>
                    {!user ? (
                        <button
                            onClick={login}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mt-4 md:mt-6"
                        >
                            Get. Set. Parking!
                        </button>
                    ) : (
                        <Link
                            href="/dashboard"
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mt-4 md:mt-6"
                        >
                            Get to Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
