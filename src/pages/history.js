import React from "react";
import ParkingGrid from "./trial";
import Navbar from "@/components/navbar";

const History = () => {
    // Static sample data for user's bookings
    const bookings = [
        {
            user: "user1@example.com",
            pricePerHour: 10,
            name: "Booking 1",
            address: "123 Main St",
            length: 5,
            width: 3,
            spotIndex: 1,
            ownerEmail: "owner1@example.com",
            ownerName: "Owner 1",
        },
        {
            user: "user1@example.com",
            pricePerHour: 12,
            name: "Booking 2",
            address: "456 Elm St",
            length: 4,
            width: 2,
            spotIndex: 2,
            ownerEmail: "owner2@example.com",
            ownerName: "Owner 2",
        },
        // Add more static booking data as needed
    ];

    // Filter the bookings made by the user
    const userBookings = bookings.filter((booking) => booking.user === "user1@example.com");

    return (
        <div className="bg-gray-100">
            <Navbar />
            <div className="max-w-2xl mx-auto py-8 mt-10">
                <ul className="divide-y divide-gray-200">
                    {userBookings.map((booking, index) => (
                        <li key={index} className="py-4">
                            <div className="bg-white rounded-lg shadow-lg p-4">
                                <p className="text-gray-500"><span className="font-bold">Email:</span> {booking.user} <span className="float-right">₹{booking.pricePerHour}/hr</span></p>
                                <p className="text-gray-500"><span className="font-bold">Name:</span> {booking.name}</p>
                                <p className="text-gray-500"><span className="font-bold">Address:</span> {booking.address}</p>

                                <ParkingGrid landHeight={booking.length} landWidth={booking.width} slot={booking.spotIndex} />

                                <div className="mt-4">
                                    <p className="text-gray-500"><span className="font-bold">Owner's Details:</span></p>
                                    <p className="text-gray-500"><span className="font-bold">Owner Email:</span> {booking.ownerEmail}</p>
                                    <p className="text-gray-500"><span className="font-bold">Owner Name:</span> {booking.ownerName}</p>
                                    {/* Add more owner details here if needed */}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default History;
