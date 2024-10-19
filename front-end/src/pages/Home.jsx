import React from "react";
import Accordion from "../components/StepsAccordion";
import Button from "@mui/material/Button";
import { BarChart } from "@mui/x-charts/BarChart";
import Map from "../components/Map"; // Import the Google Map component

function Home() {
  return (
    <div className="p-6 space-y-12">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">How It Works:</h1>
        <Accordion />
      </div>

      {/* Button Section */}
      <div className="flex justify-center space-x-4 mt-8">
        <Button variant="contained">Buses</Button>
        <Button variant="contained">Fullscreen</Button>
      </div>

      <div className="text-center mt-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Find Your Nearest Bus Stop:
        </h1>
        <Map />
      </div>

      {/* Chart Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          How clean was your trip?
        </h1>
        <div className="flex justify-center mt-6">
          <BarChart
            series={[{ data: [44, , 34] }]}
            height={290}
            xAxis={[
              {
                data: ["Carbon Emissions Used", "Carbon Emissions Saved"],
                scaleType: "band",
              },
            ]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
