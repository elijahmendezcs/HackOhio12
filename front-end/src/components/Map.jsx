import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// You can set the initial map center and zoom level here
const mapContainerStyle = {
  width: '100%',
  paddingBottom: '56.25%',  // 16:9 aspect ratio (9 / 16 * 100)
  position: 'relative',
};

const mapStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

const center = {
  lat: 40.0076, // Latitude for Ohio State University
  lng: -83.0309, // Longitude for Ohio State University
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
        {/* Example of adding a marker */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;