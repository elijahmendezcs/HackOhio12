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
  List,
  ListItem,
  Paper
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
  const [instructions, setInstructions] = useState([]); // State to store instructions

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
    setPath([]); // Clear previous path
    const { lat: startLat, lng: startLng } = fromLocation;
    const { lat: endLat, lng: endLng } = toLocation;

    try {
      const routeData = await fetchRoute(startLat, startLng, endLat, endLng); // Call the fetchRoute function
      setRouteData(routeData); // Store route data
      console.log("Route Data: ", routeData);

      // Construct path array from routeData
      const newPath = routeData.map((route) => ({
        lat: route.startLocation.lat,
        lng: route.startLocation.lng,
      }));
      setPath(newPath); // Update path state with coordinates

      // Extract instructions and other information from the routeData
      const allInstructions = routeData.map((route) => ({
        instructions: route.instructions,
        arrivalStation: route.arrivalStation,
        departureStation: route.departureStation,
        routeType: route.routeType,
      }));
      setInstructions(allInstructions); // Store instructions in state

    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  };

  return (
    <Card style={{ marginTop: 20, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Choose your destinations!
        </Typography>

        <LoadScript
          googleMapsApiKey={"AIzaSyChx_cD-7aqW-xvFenmjRVPbYpALrzBRyU"}
          libraries={libs}
        >
          <Autocomplete
            onLoad={(autocomplete) => (fromAutocompleteRef.current = autocomplete)}
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
            onLoad={(autocomplete) => (toAutocompleteRef.current = autocomplete)}
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
            sx={{
              marginRight: "8px",
              color: "#BB0000", // Text color (scarlet)
              borderColor: "#BB0000", // Border color (scarlet)
              "&:hover": {
                backgroundColor: "#ffcccc", // Light scarlet on hover
                borderColor: "#BB0000", // Keeps border scarlet on hover
              },
            }}
          >
            <AddIcon /> Zoom In
          </Button>

          <Button
            variant="outlined"
            onClick={handleZoomOut}
            sx={{
              color: "#BB0000", // Text color (gray)
              borderColor: "#BB0000", // Border color (gray)
              "&:hover": {
                backgroundColor: "#ffcccc", // Light gray on hover
                borderColor: "#808080", // Keeps border gray on hover
              },
            }}
          >
            <RemoveIcon /> Zoom Out
          </Button>
        </Box>

        {/* Route Button */}
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#BB0000", // Scarlet color
              color: "#fff", // White text
              "&:hover": {
                backgroundColor: "#4A4A4A", // Gray color for hover
              },
            }}
            onClick={handleRouteRequest}
          >
            Get Route
          </Button>
        </Box>

        <Box sx={{ marginTop: "24px" }}>
  <Typography variant="h6" gutterBottom>
    Route Information:
  </Typography>
  {instructions.length > 0 ? (
    <List sx={{ paddingLeft: "16px" }}>
      {instructions.map((item, index) => (
        <ListItem
          key={index}
          disableGutters
          sx={{
            marginBottom: "12px",
            padding: "16px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box>
            {/* Safely check if instructions exist and are an array */}
            <Typography variant="body1" sx={{ fontWeight: 500, marginBottom: "8px" }}>
              {Array.isArray(item.instructions)
                ? item.instructions.join(", ")
                : ""}
            </Typography>
            {/* Display additional information if available */}
            {item.routeType && (
              <Typography variant="body2" sx={{ color: "#666" }}>
                <strong>Route Type:</strong> {item.routeType}
              </Typography>
            )}
            {item.departureStation && (
              <Typography variant="body2" sx={{ color: "#666" }}>
                <strong>Departure Station:</strong> {item.departureStation}
              </Typography>
            )}
            {item.arrivalStation && (
              <Typography variant="body2" sx={{ color: "#666" }}>
                <strong>Arrival Station:</strong> {item.arrivalStation}
              </Typography>
            )}
          </Box>
        </ListItem>
      ))}
    </List>
  ) : (
    <Typography>No route data available yet.</Typography>
  )}
</Box>
      </CardContent>
    </Card>
  );
};

export default Map;
