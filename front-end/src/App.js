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
      <div className="App h-full bg-gray-100">
        {/* Navbar Component */}
        <Navbar className="w-full fixed top-0 left-0 z-10 bg-gray-700" />

        {/* Main Content Section */}
        <div className="pt-16">
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center space-y-8 mt-10 px-4">
                  <img
                    src={busImage}
                    alt="Bus Image"
                    className="mx-auto max-w-3xl h-auto rounded-lg shadow-lg"
                  />
                  <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-gray-500 animate-text">
                    Where2Go?
                  </h1>

                  <div className="mt-8 text-center space-y-4">
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                      Welcome to the most efficient transit solution for Ohio State University. 
                      Our app guides you step by step to find the best routes around campus. 
                    </p>
                    <div className="flex flex-col space-y-6">
                      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Step 1: Enter Your Locations</h2>
                        <p className="text-gray-600">
                          Start by entering your current location and your destination within the Ohio State University campus.
                        </p>
                      </div>
                      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Step 2: Find the Best Route</h2>
                        <p className="text-gray-600">
                          The app calls on the Google Maps API and real-time CABS data to find the most efficient mix of bus routes and walking paths.
                        </p>
                      </div>
                      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Step 3: Visualize Your Journey</h2>
                        <p className="text-gray-600">
                          We provide a clear visual path for your journey, so you can easily follow the route with minimal walking and time spent.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button className="bg-scarlet-500 text-white hover:bg-gray-600 mt-8">
                    Get Started
                  </Button>
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