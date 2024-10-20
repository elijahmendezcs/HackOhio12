// RouteService.jsx
import axios from "axios";

// Function to fetch route data from the backend
export const fetchRoute = async (startLat, startLng, endLat, endLng) => {
  try {
    const response = await axios.get("http://localhost:8081/route", {
      params: {
        startLat,
        startLng,
        endLat,
        endLng,
      },
    });
    return response.data; // Return the route data
  } catch (error) {
    console.error("Error fetching route data:", error);
    throw error; // Rethrow the error so the calling function can handle it
  }
};
