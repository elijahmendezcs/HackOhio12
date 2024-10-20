import { Avatar, Paper } from "@mui/material";
import React from "react";
// Import images directly from the src folder
import ElijahAvatar from "../Avatars/My-Boy-Elijah.jpeg";
import JDAvatar from "../Avatars/My-Boy-JD.jpeg";
import NateAvatar from "../Avatars/My-Boy-Nate.jpg";
import MoAvatar from "../Avatars/Meeeeeee.jpeg";
import Link from "@mui/material/Link";

const About = () => {
  const avatarSize = 150;
  const paperSize = {
    width: "300px",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    boxSizing: "border-box",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="max-w-3xl p-8 bg-white rounded-lg shadow-lg mb-6">
        <h1
          className="text-4xl font-bold text-center mb-6"
          style={{ color: "#BB0000" }} // Changed color to #BB0000
        >
          About:
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed">
          We are four Ohio State University engineering students on a mission to
          make it easier for Ohio State students to navigate campus more
          efficiently. The goal of this application is to combine the Benefits
          of the Ohio State Application’s ability to track any CABS bus in real
          time with Google Maps’ ability to pick out the most optimal route and
          its ability to find any building.
        </p>

        <h1
          className="text-4xl font-bold text-center mb-6"
          style={{ color: "#BB0000" }} // Changed color to #BB0000
        >
          What We Used:
        </h1>

        <p className="text-lg text-gray-800 leading-relaxed">
          Programming Languages: JavaScript, Java, HTML, CSS
        </p>
        <p className="text-lg text-gray-800 leading-relaxed">
          Technologies: React.js, Node.js, SpringBoot, PostgreSQL, Axios, Git,
          Web Scraping Techniques, Postman, Charles
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          Libraries: MaterialUI, Charter, Google Maps API
        </p>
        <h1
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "#BB0000" }} // Changed color to #BB0000
        >
          <Link
            href="https://github.com/elijahmendezcs/HackOhio12"
            style={{ color: "#BB0000", textDecoration: "none" }} // Removed underline
          >
            Click Me For Source Code
          </Link>
        </h1>
      </div>

      {/* Flexbox container for avatars with very little space */}
      <div className="flex flex-wrap justify-center" style={{ gap: "8px" }}>
        {/* Elijah */}
        <Paper elevation={3} style={paperSize}>
          <Avatar
            alt="Elijah"
            src={ElijahAvatar}
            sx={{ width: avatarSize, height: avatarSize }}
          />
          <h1
            className="text-4xl font-bold text-center mb-6 underline"
            style={{ color: "#BB0000" }} // Changed color to #BB0000
          >
            Elijah Mendez
          </h1>
          <p className="mt-2 text-center italic">
            "Demonstrate Greatness." - Elijah
          </p>
          <Link href="https://www.linkedin.com/in/elijahmendezcs/">
            LinkedIn
          </Link>
          <Link href="https://github.com/elijahmendezcs">GitHub</Link>
        </Paper>

        {/* Mohamed */}
        <Paper elevation={3} style={paperSize}>
          <Avatar
            alt="Mo"
            src={MoAvatar}
            sx={{ width: avatarSize, height: avatarSize }}
          />
          <h1
            className="text-4xl font-bold text-center mb-6 underline"
            style={{ color: "#BB0000" }} // Changed color to #BB0000
          >
            Mohamed Chakrowf
          </h1>
          <p className="mt-2 text-center italic">
            "You miss 100% of the shots you don't take." - Mohamed
          </p>
          <Link href="https://www.linkedin.com/in/mohamed-chakrowf-2944a6228/">
            LinkedIn
          </Link>
          <Link href="https://github.com/mchakrowf">GitHub</Link>
        </Paper>

        {/* JD */}
        <Paper elevation={3} style={paperSize}>
          <Avatar
            alt="JD"
            src={JDAvatar}
            sx={{ width: avatarSize, height: avatarSize }}
          />
          <h1
            className="text-4xl font-bold text-center mb-6 underline"
            style={{ color: "#BB0000" }} // Changed color to #BB0000
          >
            JD Ojeda
          </h1>
          <p className="mt-2 text-center italic">
            "Surreal feeling building something amazing." - JD
          </p>
          <Link href="https://www.linkedin.com/in/jd-ojeda-cse">LinkedIn</Link>
          <Link href="https://github.com/ojedaJD">GitHub</Link>
        </Paper>

        {/* Nate */}
        <Paper elevation={3} style={paperSize}>
          <Avatar
            alt="Nate"
            src={NateAvatar}
            sx={{ width: avatarSize, height: avatarSize }}
          />
          <h1
            className="text-4xl font-bold text-center mb-6 underline"
            style={{ color: "#BB0000" }} // Changed color to #BB0000
          >
            Nate Aninweze
          </h1>
          <p className="mt-2 text-center italic">
            "You're damned if you do, and you're damned if you don't." - Nate
          </p>
          <Link href="https://www.linkedin.com">LinkedIn</Link>
          <Link href="https://github.com">GitHub</Link>
        </Paper>
      </div>
    </div>
  );
};

export default About;
