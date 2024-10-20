import { Avatar, Paper } from "@mui/material";
import React from "react";
// Import images directly from the src folder
import ElijahAvatar from "../Avatars/My-Boy-Elijah.jpeg";
import JDAvatar from "../Avatars/My-Boy-JD.jpeg";
import NateAvatar from "../Avatars/My-Boy-Nate.jpg";
import MoAvatar from "../Avatars/Meeeeeee.jpeg";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

const About = () => {
  // Set the size of the avatars to the largest
  const avatarSize = 150;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="max-w-3xl p-8 bg-blue-50 rounded-lg shadow-lg mb-6">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6 underline">
          About
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed">
          We are four Ohio State University engineering students on a mission to
          make it easier for Ohio State students to navigate campus more
          efficiently. The goal of this application is to combine the Benefits
          of the Ohio State Application’s ability to track any CABS bus in real
          time with Google Maps’ ability to pick out the most optimal route and
          its ability to find any building.
        </p>

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6 underline">
          What We Used:
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed">
          Programming Languages: JavaScript, Java, HTML, CSS
        </p>
        <p className="text-lg text-gray-800 leading-relaxed">
          Technologies: React.js, Node.js, SpringBoot, PostgreSQL, Axiom, Git,
          Web Scraping Techniques, Postman, Charles
        </p>
        <p className="text-lg text-gray-800 leading-relaxed">
          Libraries: MaterialUI, Charter, Google Maps API
        </p>
      </div>

      {/* Grid for the avatars */}
      <Grid container spacing={4} className="mt-6">
        {/* Elijah */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} className="flex flex-col items-center p-4">
            <Avatar
              alt="Elijah"
              src={ElijahAvatar}
              sx={{ width: avatarSize, height: avatarSize }}
            />
            <h1 className="text-4xl font-bold text-center text-blue-700 mb-6 underline">
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
        </Grid>

        {/* Mohamed */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} className="flex flex-col items-center p-4">
            <Avatar
              alt="Mo"
              src={MoAvatar}
              sx={{ width: avatarSize, height: avatarSize }}
            />
            <h1 className="text-4xl font-bold text-center text-blue-700 mb-6 underline">
              Mohamed Chakrowf
            </h1>
            <p className="mt-2 text-center italic">
              "You miss 100% of the shots you do not take." - Mohamed
            </p>
            <Link href="https://www.linkedin.com/in/mohamed-chakrowf-2944a6228/">
              LinkedIn
            </Link>
            <Link href="https://github.com/mchakrowf">GitHub</Link>
          </Paper>
        </Grid>

        {/* JD */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} className="flex flex-col items-center p-4">
            <Avatar
              alt="JD"
              src={JDAvatar}
              sx={{ width: avatarSize, height: avatarSize }}
            />
            <h1 className="text-4xl font-bold text-center text-blue-700 mb-6 underline">
              JD Ojeda
            </h1>
            <p className="mt-2 text-center italic">
              "Surreal feeling building something amazing." - JD
            </p>
            <Link href="https://www.linkedin.com/search/results/all/?heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAADkQRdcBZXBjjKLM2OV1D1jUIIWocXF9Rnk&keywords=JD%20Ojeda&origin=ENTITY_SEARCH_HOME_HISTORY&sid=j%3A%40">
              LinkedIn
            </Link>
            <Link href="https://github.com/ojedaJD">GitHub</Link>
          </Paper>
        </Grid>

        {/* Nate */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} className="flex flex-col items-center p-4">
            <Avatar
              alt="Nate"
              src={NateAvatar}
              sx={{ width: avatarSize, height: avatarSize }}
            />
            <h1 className="text-4xl font-bold text-center text-blue-700 mb-6 underline">
              Nate Aninweze
            </h1>
            <p className="mt-2 text-center italic">
              "You're damned if you do, and you're damned if you don't" - Nate
            </p>
            <Link href="https://www.linkedin.com/in/mohamed-chakrowf-2944a6228/">
              LinkedIn
            </Link>
            <Link href="https://github.com/mchakrowf">GitHub</Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
