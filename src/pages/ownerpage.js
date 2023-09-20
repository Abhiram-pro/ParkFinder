import React, { useState } from "react";
import Link from 'next/link';
import Navbar from "@/components/navbar";
import { auth } from "@/components/firebase";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Modal from 'react-modal';



const OwnerPage = () => {


    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                    <Link href="/owner">
                        <div className="relative group w-full md:w-64">
                            <div className="w-full h-48 md:h-64 bg-cover bg-center transform hover:scale-105 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 "></div>
                                <img
                                    src="./book.gif"
                                    alt="Image"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <p className="text-center mt-2 text-gray-600 font-semibold text-xl group-hover:text-black">
                                PARKING LOGS
                            </p>
                        </div>
                    </Link>
                    <Link href="/view">
                        <div className="relative group w-full md:w-64">
                            <div className="w-full h-48 md:h-64 bg-cover bg-center transform hover:scale-105 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 "></div>
                                <img
                                    src="./parking_status.gif"
                                    alt="Image"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <p className="text-center mt-2 text-gray-600 font-semibold text-xl group-hover:text-black">
                                VIEW PARKING STATUS
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OwnerPage;