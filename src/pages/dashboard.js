import React from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { auth } from "@/components/firebase";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState,useEffect } from "react";

const Dashboard = () => {

    const [user, loading, error] = useAuthState(auth); // Use loading and error states
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  
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
  
    useEffect(() => {
      console.log(user);
    }, [user]);

    if (!user) {

        return (
          <div className="min-h-screen bg-gray-100 font-bold text-gray-700 ml-12 text-4xl mx-auto flex items-center justify-center ">
            Please Login Before Accessing this page 
            <Link href = '/home' className="bg-gray-600 mx-auto hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md" >
             Go Home
            </Link>
          </div>
          
        );
       
      }
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center mt-20">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Link href="/ownerpage">
            <div className="relative group">
              <div className="w-64 h-64 bg-cover bg-center transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 "></div>
                <img
                  src="/2.gif" // Make sure to provide the correct path to your 2.gif
                  alt="Image"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <p className="text-center mt-2 text-gray-600 font-semibold text-xl group-hover:text-black">
                OWNER
              </p>
            </div>
          </Link>
          <Link href="/user">
            <div className="relative group">
              <div className="w-64 h-64 bg-cover bg-center transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 "></div>
                <img
                  src="/1.gif"
                  alt="Image"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <p className="text-center mt-2 text-gray-600 font-semibold text-xl group-hover:text-black">
                USER
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
