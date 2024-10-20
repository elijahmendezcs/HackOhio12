import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";

const data = [
  {
    name: "Carbon Emissions Used",
    Kilotons: 44,
  },
  {
    name: "Carbon Emissions Saved",
    Kilotons: 34,
  },
];

const CustomBarChart = () => {
  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Carbon Emissions Overview
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" tick={{ fill: "#666" }} />
          <YAxis tick={{ fill: "#666" }} />
          <Tooltip
            wrapperStyle={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
          />
          <Legend wrapperStyle={{ top: -10 }} />
          <Bar
            dataKey="Kilotons"
            fill="#3f51b5"
            barSize={30}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CustomBarChart;
