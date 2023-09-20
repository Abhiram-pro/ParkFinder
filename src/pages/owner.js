import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/components/firebase';
import { ref, push, onValue } from 'firebase/database';
import Navbar from '@/components/navbar';
import Link from 'next/link';

const Owner = () => {
    const [user] = useAuthState(auth);

    const [sells, setSells] = useState([]);
    const [image, setImage] = useState('');
    const [totalParkingSpots, setTotalParkingSpots] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');

    useEffect(() => {
        if (!user) {
            return;
        }

        const parkingRef = ref(db, `users/${user.uid}/Owner`);
        onValue(parkingRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const items = Object.values(data);
                setSells(items);
            } else {
                setSells([]);
            }
        });

    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const currentUser = auth.currentUser;
        if (!currentUser) {
            return;
        }

        const sellItem = {
            email: currentUser.email,
            name: currentUser.displayName,
            totalParkingSpots,
            pricePerHour,
            address,
            contactNumber,
            length,
            width,
        };

        const parkingRef = ref(db, `users/${user.uid}/Owner`);

        // Push the sellItem to the database
        push(parkingRef, sellItem);

        // Clear the form after submission
        setImage('');
        setTotalParkingSpots('');
        setPricePerHour('');
        setAddress('');
        setContactNumber('');
        setLength('');
        setWidth('');
        
        window.alert('Submitted Successfully');

    };

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
        <div className="bg-gray-100 min-h-screen">
        <Navbar />
            <div className="container mx-auto py-8 mt-10">
                <div className="bg-white p-4 md:p-8 rounded shadow-md md:w-96 mx-auto">
                    <h1 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
                        Add a Parking Spot
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-semibold mb-1">
                                Price per Hour:
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                value={pricePerHour}
                                onChange={(e) => setPricePerHour(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-semibold mb-1">
                                Address:
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-semibold mb-1">
                                Contact Number:
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-semibold mb-1">
                                Length (units):
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-semibold mb-1">
                                Width (units):
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mt-4 w-full"
                        >
                            Add the Spot
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Owner;
