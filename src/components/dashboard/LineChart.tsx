import React from "react";
import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ ids, data, fahr }) => {
  const hours = Array.from({ length: 8 }, (_, i) => i * 3 + " hours");
  const processedData = fahr
    ? Object.fromEntries(
        Object.entries(data).map(([day, values]) => [
          day,
          values.map((value) => (value !== null ? value * 1.8 + 32 : null)), // Handle null values
        ])
      )
    : data;

  const chartData = {
    labels: hours,
    datasets: Object.keys(processedData).map((key, index) => ({
      label: ids[index],
      data: processedData[key],
      borderColor: `hsl(${index * 40}, 70%, 50%)`,
    })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      title: {
        display: true,
        text: !fahr
          ? "Temperature every 3 hours in Celcius"
          : "Temperature every 3 hours in Fahrenheit",
      },
    },
    tooltips: {
      titleFontFamily: "Open Sans",
      backgroundColor: "rgba(0,0,0,0.3)",
      titleFontColor: "red",
      caretSize: 5,
      cornerRadius: 2,
      xPadding: 10,
      yPadding: 10,
      XMargin: 10,
    },
  };

  return (
    <div className="graph-container">
      <div className="aspect-ratio">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default LineChart;
