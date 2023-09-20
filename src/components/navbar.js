import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import Modal from 'react-modal';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <nav className="fixed top-0 left-0 w-full py-4 bg-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <p className="cursor-pointer font-bold text-2xl ml-2">SmartPark</p>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            className={`cursor-pointer transition-transform duration-300 mr-2 ease-in-out transform ${isMobileMenuOpen ? 'rotate-90' : ''
              }`}
            onClick={toggleMenu}
          >
            {isMobileMenuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 right-0 bg-white p-4 border border-gray-200 mr-2 rounded shadow">
            <Link href="/">
              <p className="cursor-pointer mb-2">Home</p>
            </Link>
            <Link href="/dashboard">
              <p className="cursor-pointer mb-2">Dashboard</p>
            </Link>
            {!user && (
              <p className="cursor-pointer mb-2" onClick={login}>
                Sign in
              </p>
            )}
            {user && (
              <p
                className="cursor-pointer mb-2"
                onClick={() => {
                  auth.signOut();
                  setIsModalOpen(false);
                }}
              >
                Sign out
              </p>

            )}
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 md:space-x-8 mr-2 items-center">
          <Link href="/">
            <p className="cursor-pointer hover:text-gray-100 hover:bg-gray-800 px-3 py-2 rounded-md ">Home</p>
          </Link>
          {user &&
            <Link href="/dashboard">
              <p className="cursor-pointer hover:text-gray-100 hover:bg-gray-800 px-3 py-2 rounded-md ">Dashboard</p>
            </Link>}

          {user ? null : (
            <button
              className="cursor-pointer px-3 py-2 rounded hover:bg-gray-900 hover:text-white transition-colors duration-300"
              onClick={login}
            >
              Sign in
            </button>
          )}

          {user && (
            <div
              className="flex items-center"
              onClick={() => setIsModalOpen(true)}
            >
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 mr-2 rounded-full cursor-pointer"
                />
              )}
            </div>
          )}

          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={{
              content: {
                width: '30%',
                height: '50%',
                margin: 'auto',
                overflow: 'auto',
              },
            }}
          >
            {user && (
              <div className="flex flex-col items-center justify-center h-full">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mb-4"
                  />
                )}
                <p className="text-xl font-semibold text-center"> <span className="text-2xl font-semibold">Hello,</span><br />{user.displayName}</p>
                <p className="text-gray-500">{user.email}</p>
                <button
                  className="cursor-pointer hover:text-white text-black py-2 px-3 mt-4 hover:bg-gray-700 transition-colors duration-300 rounded"
                  onClick={() => {
                    auth.signOut();
                    setIsModalOpen(false);
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
