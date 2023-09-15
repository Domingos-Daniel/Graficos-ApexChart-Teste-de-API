import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const ATMStatusChart = () => {
  const [data, setData] = useState({
    functional: 0,
    pending: 0,
    outOfService: 0
  });

  useEffect(() => {
    axios
      .get("https://my-json-server.typicode.com/Domingos-Daniel/api-teste/atms")
      .then((response) => {
        const atms = response.data;
        //return "<h1>Buscou</h1>";

        // Classifique os ATMs com base nas condições
        const functional = atms.filter(
          (atm) => atm.cash > 30000 && atm.integrity >= 50 && atm.coins > 1000
        ).length;

        const pending = atms.filter(
          (atm) =>
            (atm.cash > 10000 && atm.cash <= 30000) ||
            (atm.integrity < 50 && atm.integrity >= 30)
        ).length;

        const outOfService = atms.length - functional - pending;

        setData({ functional, pending, outOfService });
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
      });
  }, []);

  const options = {
    chart: {
      type: "pie",
      height: "350px",
      width: "100%"
    },
    labels: ["100% Funcional", "Pendente", "Fora de Serviço"],
    colors: ["#00e676", "#fdd835", "#ff1744"], // Cores personalizadas para cada categoria

    height: "980px",
    width: "100%"
  };

  const series = [data.functional, data.pending, data.outOfService];

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Status dos ATMs</h2>

      <div
        style={{ width: "100%", height: "200px" }}
        className="flex justify-center items-center"
      >
        <ReactApexChart options={options} series={series} type="pie" />
      </div>
    </div>
  );
};

export default ATMStatusChart;
