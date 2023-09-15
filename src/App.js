import React, { useEffect, useState } from "react";
import axios from "axios";
import ATMList from "./ATMList";
import ATMStatusChart from "./ATMStatusChart";
import { StatisticsChart } from "./StatisticsChart";
import ATMComponent from "./ATMComponent";

const App = () => {
  const [atms, setATMs] = useState([]);

  useEffect(() => {
    axios
      .get("https://my-json-server.typicode.com/Domingos-Daniel/api-teste/atms")
      .then((response) => {
        setATMs(response.data);
        // Resto do código para salvar no Firestore, se necessário
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
      });
  }, []);

  return (
    <div className="App flex items-center justify-center">
      {/* <ATMList atms={atms} />{" "}
       Passe os dados da API para o componente ATMList */}
      <ATMStatusChart />
      <StatisticsChart />
      <ATMComponent />
    </div>
  );
};

export default App;
