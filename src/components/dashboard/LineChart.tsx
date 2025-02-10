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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const hours = Array.from({ length: 8 }, (_, i) => i * 3 + " hours");
  const processedData = fahr
    ? Object.fromEntries(
        Object.entries(data).map(([day, values]: any) => [
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
      borderWidth: 2,
      fill: false,
      hidden: index !== selectedIndex,
    })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      line: {
        tension: 0.3,
      },
    },
    plugins: {
      title: {
        display: true,
        text: !fahr
          ? "Temperature every 3 hours in Celcius"
          : "Temperature every 3 hours in Fahrenheit",
      },
      legend: {
        display: true,
        labels: {
          generateLabels: (chart) => {
            return chart.data.datasets.map((dataset, index) => ({
              text: dataset.label,
              datasetIndex: index,
              fontColor: dataset.hidden ? "gray" : "black",
            }));
          },
          font: {
            size: 20,
            weight: "bold" as "bold",
          },
          color: "black",
          padding: 15,
          boxWidth: 0,
        },
        onClick: (event, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          setSelectedIndex(index);
        },
      },
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
