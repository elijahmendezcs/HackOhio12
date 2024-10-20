import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

export default function AccordionUsage() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ fontSize: '1.25rem' }} 
        >
          <Typography variant="h6">How it works! (Click Me)</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ fontSize: '1.5rem' }}> 
          First, put your location in.
        </AccordionDetails>
        <AccordionDetails sx={{ fontSize: '1.5rem' }}>
          Put in your desired final destination.
        </AccordionDetails>
        <AccordionDetails sx={{ fontSize: '1.5rem' }}>
          Click Get Route and find your ideal route!
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
