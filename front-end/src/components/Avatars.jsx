import { Avatar } from "@mui/material";
import React from "react";
// Import images directly from the src folder
import ElijahAvatar from '../Avatars/My-Boy-Elijah.jpeg';
import JDAvatar from '../Avatars/My-Boy-JD.jpeg';
import NateAvatar from '../Avatars/IMG_0949.JPG';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="max-w-3xl p-8 bg-blue-50 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6 underline">
          About
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed">
          We are four Ohio State University students on a mission to make it
          easier for Ohio State students to navigate campus more efficiently
          without wasting any time. The goal of this application is to merge the
          benefits of the Ohio State Application’s ability to track any bus in
          real time with Google Maps’ ability to pick out any building.
        </p>

        {/* Use the imported images for the Avatars */}
        <Avatar alt="Elijah" src={ElijahAvatar} />
        <Avatar alt="JD" src={JDAvatar} />
        <Avatar alt="Nate" src={NateAvatar} />
      </div>
    </div>
  );
};

export default About;