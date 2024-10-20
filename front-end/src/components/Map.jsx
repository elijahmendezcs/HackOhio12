import React, { useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
  Polyline,
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
import { fetchRoute } from "../service/RouteService";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.0076,
  lng: -83.0309,
};

const libs = ["places"];

const Map = () => {
  const mapRef = useRef(null);
  const fromAutocompleteRef = useRef(null);
  const toAutocompleteRef = useRef(null);
  const [fromLocation, setFromLocation] = useState(center);
  const [toLocation, setToLocation] = useState(null);
  const [routeData, setRouteData] = useState(null); // To store route data
  const [path, setPath] = useState([]); // To store polyline path

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
        setFromLocation({ lat, lng });
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
        setToLocation({ lat, lng });
      }
    }
  };

  const handleRouteRequest = async () => {
    if (!fromLocation || !toLocation) {
      console.log("Please select both start and end locations.");
      return;
    }
    setPath([]);
    const { lat: startLat, lng: startLng } = fromLocation;
    const { lat: endLat, lng: endLng } = toLocation;

    try {
      const routeData = await fetchRoute(startLat, startLng, endLat, endLng); // Call the fetchRoute function
      setRouteData(routeData); // Handle the route data
      console.log("Route Data: ", routeData);

      // Construct path array from routeData
      const newPath = [
        {
          lat: routeData[0].startLocation.lat,
          lng: routeData[0].startLocation.lng,
        },
        {
          lat: routeData[0].endLocation.lat,
          lng: routeData[0].endLocation.lng,
        },
        {
          lat: routeData[1].startLocation.lat,
          lng: routeData[1].startLocation.lng,
        },
        {
          lat: routeData[1].endLocation.lat,
          lng: routeData[1].endLocation.lng,
        },
        {
          lat: routeData[2].startLocation.lat,
          lng: routeData[2].startLocation.lng,
        },
        {
          lat: routeData[2].endLocation.lat,
          lng: routeData[2].endLocation.lng,
        },
      ];
      setPath(newPath); // Update path state with coordinates
    } catch (error) {
      console.error("Error fetching route data:", error);
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
          libraries={libs}
        >
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

          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            onLoad={(map) => {
              mapRef.current = map;
              // Center the map at OSU when it's loaded
            }}
          >
            <Marker position={fromLocation} />
            {toLocation && <Marker position={toLocation} />}
            {/* Display Polyline */}
            {path.length > 0 && (
              <Polyline path={path} options={{ strokeColor: "#FF0000" }} />
            )}
          </GoogleMap>
        </LoadScript>

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

        {/* Route Button */}
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleRouteRequest}
          >
            Get Route
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Map;
