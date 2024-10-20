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
                <div className="flex flex-col items-center justify-center space-y-8 mt--10 px-4">
                  <img
                    src={busImage}
                    alt="Bus Image"
                    className="mx-auto max-w-3xl h-auto rounded-lg shadow-lg"
                  />
                  <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-gray-500 animate-text">
                    Where2Go?
                  </h1>

                  {/* Overview Section */}
                  <div className="mt-8 text-center space-y-4 max-w-3xl mx-auto">
                    <p className="text-xl text-gray-700">
                      Welcome to Where2Go, your ultimate guide for navigating
                      the Ohio State University campus efficiently. Enter your
                      starting location and destination, and we'll provide you
                      with the best combination of walking and bus routes. Using
                      real-time CABS data and the Google Maps API, our app
                      ensures that you arrive at your destination in the most
                      efficient way possible. Visualize your journey with ease
                      and follow the optimal path that minimizes walking while
                      getting you to your destination on time.
                    </p>
                  </div>

                  <Button className="bg-scarlet-500 text-white hover:bg-gray-600 mb-8">
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
