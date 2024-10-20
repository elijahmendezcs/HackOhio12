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
          {/* Customizing Cartesian Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />

          {/* Customizing X and Y Axis */}
          <XAxis dataKey="name" tick={{ fill: "#333" }} stroke="#333" />
          <YAxis tick={{ fill: "#333" }} stroke="#333" />

          {/* Tooltip customization */}
          <Tooltip
            wrapperStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              color: "#333",
            }}
            contentStyle={{
              backgroundColor: "#f0f0f0",
            }}
            itemStyle={{ color: "#000" }}
            labelStyle={{ color: "#555" }}
          />

          {/* Customizing Legend */}
          <Legend 
        wrapperStyle={{ top: -10 }} 
        iconType="circle" 
        align="center"  // Center the legend
        layout="horizontal" // Horizontal layout
      />

          {/* Customizing the Bar fill color */}
          <Bar
            dataKey="Kilotons"
            fill="#BB0000" // Scarlet for bar color
            barSize={30}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CustomBarChart;
