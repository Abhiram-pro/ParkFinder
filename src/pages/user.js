import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { auth } from "@/components/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from "next/link";
import { useRouter } from 'next/router';
import Navbar from "@/components/navbar";

const Buy = () => {
    const [owner, setOwner] = useState([]);
    const [filterAsc, setFilterAsc] = useState(true);
    const [user, setUser] = useAuthState(auth);
    const [searchQuery, setSearchQuery] = useState(""); // State for the search query
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const ownerRef = ref(db, 'users');
                onValue(ownerRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const users = Object.values(data);
                        const ownerArray = [];

                        users.forEach(user => {
                            const ownerData = user.Owner;
                            if (ownerData) {
                                Object.values(ownerData).forEach(item => {
                                    ownerArray.push(item);
                                });
                            }
                        });

                        setOwner(ownerArray);
                    } else {
                        setOwner([]);
                    }
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Function to filter items based on the search query
    const filteredOwner = owner.filter(item => {
        const placeInfo = `${item.name} ${item.address} ${item.email} ${item.contactNumber}`.toLowerCase();
        return placeInfo.includes(searchQuery.toLowerCase());
    });

    const handleBookClick = (item) => {
        // Navigate to the "book" page with the item's details
        router.push({
            pathname: '/book',
            query: { ...item }, // Pass the item's details as query parameters
        });
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
        <div className="bg-gray-100">
        <Navbar />
            <div className="max-w-2xl mx-auto mt-24">
                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Search for places..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />

                {filteredOwner.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {filteredOwner.map((item, index) => (
                            <li key={index} className="py-4">
                                <div className=" flex items-center justify-center">
                                    <div className="max-w-lg bg-white rounded-lg p-4 hover:shadow-lg hover:border border-black transition-all duration-50">
                                        <h2 className="text-xl font-bold text-black ml-3">
                                            {item.name}
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2"> {/* Reduced gap from gap-4 */}
                                            <div>
                                                <p className="text-gray-500 mb-2 ml-3" style={{ lineHeight: "1.2" }}>
                                                    {item.address}
                                                </p>
                                                <p className="text-gray-500 mb-2 ml-3" style={{ lineHeight: "1.2" }}>
                                                    {item.email}
                                                </p>
                                                <p className="text-gray-500 mb-2.5 ml-3" style={{ lineHeight: "1.2" }}>
                                                    {item.contactNumber}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 mb-2 mr-3 text-right" style={{ lineHeight: "1.2" }}>
                                                    Booking Price: Rs. 50
                                                </p>
                                                <p className="text-gray-500 mb-2 mr-3 text-right" style={{ lineHeight: "1.2" }}>
                                                    Price per Hour: {item.pricePerHour}
                                                </p>
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => handleBookClick(item)}
                                                        className="bg-white-500 text-right text-black p-1 mr-3 mb-1 rounded border border-black hover:bg-black hover:border-black hover:text-white transition-colors duration-300"
                                                    >
                                                        &ensp;Book&ensp;
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-4xl font-bold text-black text-center">No items available for sale</p>
                )}
            </div>
        </div>
    );
};

export default Buy;
