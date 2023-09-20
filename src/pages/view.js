import { useState, useEffect } from "react";
import { auth } from "@/components/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDatabase, ref, onValue } from "firebase/database";
import ParkingGrid from "./trial";
import Navbar from "@/components/navbar";

const View = () => {
    const [owner, setOwner] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const generateUniqueBookingID = (a, b) => {
            let result = '';
            const maxLength = Math.max((a || '').length, (b || '').length);

            for (let i = 0; i < maxLength; i++) {
                if (i < (a || '').length) {
                    const charA = a[i].replace(/[^\w\s]/gi, ''); // Remove special characters
                    result += charA.replace(/\s/g, ''); // Remove spaces
                }
                if (i < (b || '').length) {
                    const charB = b[i].replace(/[^\w\s]/gi, ''); // Remove special characters
                    result += charB.replace(/\s/g, ''); // Remove spaces
                }
            }

            return result;
        };

        if (user) {
            const id = generateUniqueBookingID(user.displayName, user.email);
            console.log(id);

            // Fetch data from the database for the generated ID
            const fetchData = async () => {
                try {
                    const db = getDatabase();
                    const idRef = ref(db, `${id}`);
                    onValue(idRef, (snapshot) => {
                        const data = snapshot.val();
                        if (data) {
                            const items = Object.values(data);
                            setOwner(items);
                        } else {
                            setOwner([]);
                        }
                    });
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        }
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
        <div className="bg-gray-100">
        <Navbar />
            <div className="max-w-2xl mx-auto py-8 mt-10">
                <ul className="divide-y divide-gray-200">
                    {owner.map((item, index) => (
                        <li key={index} className="py-4">
                            <div className="bg-white rounded-lg shadow-lg p-4">
                                {/* <h2 className="text-xl font-bold text-black">Spot Index: {item.spotIndex}</h2> */}
                                <p className="text-gray-500"><span className="font-bold">Email:</span> {item.user}<p className="text-gray-500 float-right">₹{item.pricePerHour}/hr</p></p>
                                <p className="text-gray-500"><span className="font-bold">Name:</span> {item.name}</p>
                                <p className="text-gray-500"><span className="font-bold">Address:</span> {item.address}</p>




                                <ParkingGrid landHeight={item.length} landWidth={item.width} slot={item.spotIndex}/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default View;
