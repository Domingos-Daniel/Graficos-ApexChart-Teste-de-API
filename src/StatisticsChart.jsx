import React from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

export function StatisticsChart({ data, title, color }) {
  if (!data) {
    return null; // Retorna null ou qualquer outro componente de fallback caso data seja undefined
  }

  const chartData = {
    labels: data.labels || [], // Usa um array vazio como valor padrão se data.labels for undefined
    datasets: [
      {
        label: title,
        data: data.values || [], // Usa um array vazio como valor padrão se data.values for undefined
        backgroundColor: color
      }
    ]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

StatisticsChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    values: PropTypes.arrayOf(PropTypes.number)
  }),
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
