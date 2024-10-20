import React, { useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.0076,
  lng: -83.0309,
};

const Map = () => {
  const mapRef = useRef(null);
  const fromAutocompleteRef = useRef(null);
  const toAutocompleteRef = useRef(null);
  const [fromLocation, setFromLocation] = useState(center);
  const [toLocation, setToLocation] = useState(null);

  const handleZoomIn = () => {
    if (mapRef.current) {
      const zoom = mapRef.current.getZoom();
      mapRef.current.setZoom(zoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const zoom = mapRef.current.getZoom();
      mapRef.current.setZoom(zoom - 1);
    }
  };

  const onFromPlaceChanged = () => {
    if (fromAutocompleteRef.current) {
      const place = fromAutocompleteRef.current.getPlace();

      if (place && place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        const lat = location.lat();
        const lng = location.lng();

        // Log the coordinates to the console
        console.log(`From Location - Latitude: ${lat}, Longitude: ${lng}`);
      } else {
        console.log("No geometry data available for the selected place");
      }
    }
  };

  const onToPlaceChanged = () => {
    if (toAutocompleteRef.current) {
      const place = toAutocompleteRef.current.getPlace();

      if (place && place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        const lat = location.lat();
        const lng = location.lng();

        // Log the coordinates to the console
        console.log(`To Location - Latitude: ${lat}, Longitude: ${lng}`);
      } else {
        console.log("No geometry data available for the selected place");
      }
    }
  };

  return (
    <Card style={{ marginTop: 20, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Google Maps with Autocomplete
        </Typography>

        <LoadScript
          googleMapsApiKey={"AIzaSyChx_cD-7aqW-xvFenmjRVPbYpALrzBRyU"}
          libraries={["places"]} // Ensure you load the 'places' library
        >
          {/* From Location Autocomplete Input */}
          <Autocomplete
            onLoad={(autocomplete) =>
              (fromAutocompleteRef.current = autocomplete)
            }
            onPlaceChanged={onFromPlaceChanged}
          >
            <TextField
              fullWidth
              placeholder="Enter the starting location"
              variant="outlined"
              sx={{ marginBottom: "16px" }}
            />
          </Autocomplete>

          {/* To Location Autocomplete Input */}
          <Autocomplete
            onLoad={(autocomplete) =>
              (toAutocompleteRef.current = autocomplete)
            }
            onPlaceChanged={onToPlaceChanged}
          >
            <TextField
              fullWidth
              placeholder="Enter the destination location"
              variant="outlined"
              sx={{ marginBottom: "16px" }}
            />
          </Autocomplete>

          {/* Google Map */}
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={fromLocation}
            zoom={15}
            onLoad={(map) => (mapRef.current = map)}
          >
            <Marker position={fromLocation} />
            {toLocation && <Marker position={toLocation} />}
          </GoogleMap>
        </LoadScript>

        {/* Zoom Buttons */}
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        >
          <Button
            variant="outlined"
            onClick={handleZoomIn}
            sx={{ marginRight: "8px" }}
          >
            <AddIcon /> Zoom In
          </Button>
          <Button variant="outlined" onClick={handleZoomOut}>
            <RemoveIcon /> Zoom Out
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Map;
