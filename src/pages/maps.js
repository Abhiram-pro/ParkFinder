import { useState } from 'react';
import { loadGoogleMaps } from 'react-google-maps-loader';

const LocationSearch = ({ googleMaps }) => {
  const [address, setAddress] = useState('');
  
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSearch = async () => {
    if (address) {
      try {
        const geocoder = new googleMaps.Geocoder();
        const result = await new Promise((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === googleMaps.GeocoderStatus.OK) {
              resolve(results[0].geometry.location);
            } else {
              reject(status);
            }
          });
        });

        // Navigate to the location using the Google Maps URL
        window.location.href = `https://www.google.com/maps?q=${result.lat()},${result.lng()}`;
      } catch (error) {
        console.error('Error geocoding address:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter an address"
        value={address}
        onChange={handleAddressChange}
        className="w-64 p-2 border border-gray-300 rounded"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2 rounded">
        Search
      </button>
    </div>
  );
};

export default LocationSearch;