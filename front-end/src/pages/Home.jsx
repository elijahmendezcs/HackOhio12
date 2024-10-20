import React, { useState, useEffect } from "react";
import Accordion from "../components/StepsAccordion";
import Map from "../components/Map";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DataChart from "../components/DataChart";
import StepsAccordion from "../components/InstructAccordion";

function Home() {
  const [routeData, setRouteData] = useState([]); // State to hold route data
  const [instructions, setInstructions] = useState([]); // State to hold instructions

  // Simulating route data coming from the Map component (could come from API)
  useEffect(() => {
    if (routeData.length > 0) {
      const allInstructions = routeData.map((route) =>
        route.instructions.map((instruction) => instruction)
      );
      setInstructions(allInstructions.flat());
    }
  }, [routeData]);

  return (
    <div className="p-6 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">The Steps:</h1>
        <Accordion />
      </div>

      <div className="text-center mt-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Find Your Nearest Bus Stop:
        </h1>
        {/* Pass setRouteData function to Map so it can update routeData */}
        <Map setRouteData={setRouteData} />
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          How clean was your trip?
        </h1>

        {/* Added margin-top to space out DataChart */}
        <div className="mt-8">
          <DataChart />
        </div>
      </div>
    </div>
  );
}

export default Home;
