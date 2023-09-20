import React, { useState } from 'react';


const ParkingGrid = ({ landWidth, landHeight, slot }) => {
  // Car dimensions
  const carWidth = 18;
  const carHeight = 9;

  // Calculate the number of rows and columns based on land size and car size
  const numColumns = Math.floor(landWidth / carWidth);
  const numRows = Math.floor(landHeight / carHeight);

  // Initialize parking spaces with availability (true)
  const initialParkingSpaces = Array(numRows)
    .fill()
    .map(() => Array(numColumns).fill(true));

  const [parkingSpaces, setParkingSpaces] = useState(initialParkingSpaces);

  // Filter out unavailable parking spaces
  const availableParkingSpaces = parkingSpaces
    .map((row, rowIndex) =>
      row.map((isAvailable, colIndex) => ({
        isAvailable,
        row: rowIndex,
        col: colIndex,
      }))
    )
    .flat()
    .filter((space) => space.isAvailable);

  var count = 1;


  return (
<div className="grid grid-cols-6 gap-2 p-4">
  {availableParkingSpaces.map((space, index) => (
    <div
      key={index}
      className={`w-${carWidth} h-${carHeight} ${
        space.row * numColumns + space.col + 1 <= slot
          ? 'bg-red-500 cursor-pointer flex items-center justify-center rounded'
          : 'bg-green-500 cursor-pointer flex items-center justify-center rounded'
      }`}
    >
      <span className="text-white font-bold">{count++}</span>
    </div>
  ))}
</div>


  );
};

export default ParkingGrid;
