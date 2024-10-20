import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import Home from "./pages/Home";
import About from "./pages/About";
import busImage from "./images/busImage.jpeg"; // First imported image
import busroute from "./images/busroutes.jpeg"; // Second imported image

// Updated flipbox dimensions for larger images
const flipBoxStyle = {
  backgroundColor: "transparent",
  width: "700px", // Increased width
  height: "350px", // Increased height
  perspective: "1000px", // This gives the 3D effect
  position: "relative",
  zIndex: 1, // Ensure flipbox stays under other content
  paddingBottom: "20px", // Add padding below the flipbox
};

const flipBoxInnerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  textAlign: "center",
  transition: "transform 0.6s",
  transformStyle: "preserve-3d",
};

const flipBoxFrontStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
};

const flipBoxBackStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  transform: "rotateY(180deg)",
};

const flipBoxHoveredStyle = {
  transform: "rotateY(180deg)",
};

// FlipBox Component with inline styles
function FlipBox({ frontImage, backImage, altText }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={flipBoxStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          ...flipBoxInnerStyle,
          ...(hovered ? flipBoxHoveredStyle : {}),
        }}
      >
        <div style={flipBoxFrontStyle}>
          <img
            src={frontImage}
            alt={altText}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
        <div style={flipBoxBackStyle}>
          <img
            src={backImage}
            alt={`${altText} - Back`}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App h-full min-h-screen bg-gray-100">
        {/* Navbar Component */}
        <Navbar className="w-full fixed top-0 left-0 z-10 bg-gray-700 shadow-md" />

        {/* Main Content Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center space-y-8">
                  {/* Centered Flip Box with margin */}
                  <div className="flex justify-center items-center mb-8">
                    <FlipBox
                      frontImage={busImage}
                      backImage={busroute}
                      altText="Bus Image"
                    />
                  </div>

                  {/* Title with margin-top and z-index */}
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <h1 className="text-4xl font-bold text-center mt-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-gray-500 animate-text z-10">
                    Where2Go?
                  </h1>

                  {/* Overview Section with smaller margin */}
                  <div className="mt-4 text-center space-y-2 max-w-3xl mx-auto">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                      Welcome to Where2Go, your ultimate guide for navigating
                      the Ohio State University campus efficiently. Enter your
                      starting location and destination, and we'll provide you
                      with the best combination of walking and bus routes. Using
                      real-time CABS data and the Google Maps API, our app
                      ensures that you arrive at your destination in the most
                      efficient way possible.
                    </p>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                      Visualize your journey with ease and follow the optimal
                      path that minimizes walking while getting you to your
                      destination on time.
                    </p>
                  </div>

                  {/* Button with margin-bottom */}
                  <Button className="bg-red-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg mb-8 transition-all">
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
