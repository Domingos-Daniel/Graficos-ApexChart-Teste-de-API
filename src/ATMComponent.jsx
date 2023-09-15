import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const ATMComponent = () => {
  const [atms, setATMs] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://my-json-server.typicode.com/Domingos-Daniel/api-teste/atms")
      .then((response) => response.json())
      .then((data) => {
        setATMs(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const calculateTotals = () => {
    const totalFunctional = atms.filter(
      (atm) => atm.cash > 30000 && atm.integrity >= 50 && atm.coins > 1000
    ).length;

    const totalPending = atms.filter(
      (atm) =>
        (atm.cash > 10000 && atm.cash <= 30000) ||
        (atm.integrity < 50 && atm.integrity >= 30) ||
        (atm.coins <= 1000 && atm.coins > 500)
    ).length;

    const totalUrgent = atms.length - totalFunctional;

    return {
      totalFunctional,
      totalPending,
      totalUrgent
    };
  };

  const totals = calculateTotals();

  const options = {
    chart: {
      type: "bar",
      height: 350
    },
    xaxis: {
      categories: ["Total ATMs"]
    },
    yaxis: {
      max: atms.length // Defina o máximo como o total de ATMs recebidos
    },
    colors: ["#4caf50", "#f44336", "#e6d200"]
  };

  const series = [
    {
      name: "100% Funcional",
      data: [totals.totalFunctional]
    },
    {
      name: "Pendentes",
      data: [totals.totalPending]
    },
    {
      name: "Urgentes",
      data: [totals.totalUrgent]
    }
  ];

  return (
    <div className="atm-component">
      <h2>Total de ATMs</h2>
      <ApexCharts options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ATMComponent;
