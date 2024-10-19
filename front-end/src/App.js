import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Button from "./components/Button"; // Make sure this is the correct import
import Home from "./pages/Home";
import busImage from "./images/busImage.jpeg";

function App() {
  return (
    <Router>
      <div className="App h-screen">
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col items-center justify-center pt-20">
              <Navbar className="w-full fixed top-0 left-0 z-10"/>
              <img src={busImage} alt="Bus Image" className="mx-auto max-w-3xl h-auto"/>
              <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 animate-text">
                Where2Go?
              </h1>
              <Button>Get Started</Button>
            </div>
          } />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;