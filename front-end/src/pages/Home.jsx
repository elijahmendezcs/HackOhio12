import React from "react";
import Accordion from "../components/StepsAccordion";
import Map from "../components/Map";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DataChart from "../components/DataChart";
import { useState } from "react";
function Home() {
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
        <Map />
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
