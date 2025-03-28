import React from "react";
import { Chart } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My first dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(150, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

function PieChart() {
  return (
    <div className="bg-white border border-secondary">
      <Pie data={data}></Pie>
    </div>
  );
}

export default PieChart;
