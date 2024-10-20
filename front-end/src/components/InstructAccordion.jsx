import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function StepsAccordion({ routeData }) {
  return (
    <div>
      {routeData.map((route, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography>Route {index + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {route.instructions.map((instruction, idx) => (
              <Typography key={idx}>{instruction}</Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default StepsAccordion;