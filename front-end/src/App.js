import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Button from "./components/Button"; // Ensure this component is correctly set up
import Home from "./pages/Home";
import About from "./pages/About"; // Importing About page
import busImage from "./images/busImage.jpeg";

function App() {
  return (
    <Router>
      <div className="App h-screen">
        {/* Navbar Component */}
        <Navbar className="w-full fixed top-0 left-0 z-10" /> 

        {/* Main Content Section */}
        <div className="pt-16">
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center space-y-8 mt-4">
                  <img src={busImage} alt="Bus Image" className="mx-auto max-w-3xl h-auto" />
                  <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 animate-text">
                    Where2Go?
                  </h1>
                  <Button>Get Started</Button>
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