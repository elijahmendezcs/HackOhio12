import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Button from "./components/Button"; // Ensure this component is correctly set up
import Home from "./pages/Home";
import About from "./pages/About"; // Importing About page
import busImage from "./images/busImage.jpeg";

function App() {
  return (
    <Router>
      <div className="App h-screen bg-gray-100">
        {/* Navbar Component */}
        <Navbar className="w-full fixed top-0 left-0 z-10 bg-gray-700" />

        {/* Main Content Section */}
        <div className="pt-16">
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center space-y-8 mt-4">
                  <img
                    src={busImage}
                    alt="Bus Image"
                    className="mx-auto max-w-3xl h-auto"
                  />
                  <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-gray-500 animate-text">
                    Where2Go?
                  </h1>

                  {/* Step-by-Step Explanation */}
                  <div className="mt-10 space-y-8 max-w-4xl text-center">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-3xl font-bold text-gray-800">
                        Step 1: Enter Your Locations
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Start by entering your current location and the destination on Ohio State University's campus.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-3xl font-bold text-gray-800">
                        Step 2: Find the Best Route
                      </h2>
                      <p className="mt-2 text-gray-600">
                        The app uses the Google Maps API and CABS data to find the optimal bus and walking routes for you.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-3xl font-bold text-gray-800">
                        Step 3: Visualize the Path
                      </h2>
                      <p className="mt-2 text-gray-600">
                        The app then shows you a visual path, highlighting the most efficient way to reach your destination.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-3xl font-bold text-gray-800">
                        Step 4: Reach Your Destination
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Follow the directions and make it to your destination with ease!
                      </p>
                    </div>

                    <Button className="bg-scarlet-500 text-white hover:bg-gray-600">
                      Get Started
                    </Button>
                  </div>
                </div>
              }
            />

            {/* About Page Route */}
            <Route path="/about" element={<About />} />

            {/* Home Page Route */}
            <Route path="/home" element={<Home />} />

            {/* Redirect all other paths to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;