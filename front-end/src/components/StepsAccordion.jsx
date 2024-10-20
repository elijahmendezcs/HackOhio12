import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionUsage() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          How it works! (Click Me)
        </AccordionSummary>
        <AccordionDetails>
          First, put your location in or click the Locate Me Button.
        </AccordionDetails>
        <AccordionDetails>
          Put in your desired final destination.
        </AccordionDetails>
        <AccordionDetails>
          Click submit and find your ideal route!
        </AccordionDetails>
      </Accordion>

      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Step 2
        </AccordionSummary>
        <AccordionDetails>
          Put in your desired final destination.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Step 3
        </AccordionSummary>
        <AccordionDetails>
          Click submit and find your ideal route!
        </AccordionDetails>
        <AccordionActions>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          />
        </AccordionActions>
      </Accordion> */}
    </div>
  );
}
