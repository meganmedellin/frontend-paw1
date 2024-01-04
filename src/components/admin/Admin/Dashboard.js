/* eslint-disable no-unused-vars */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { LinearScale } from "chart.js";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalOrdersDiterima, setTotalOrdersDiterima] = useState(0);
  const [totalOrdersDitolak, setTotalOrdersDitolak] = useState(0);
  const [totalOrdersPending, setTotalOrdersPending] = useState(0);
  const [totalOrdersSelesai, setTotalOrdersSelesai] = useState(0);

  Chart.register(...registerables);
  Chart.register(LinearScale);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/orders/getallorders`
      );
      const data = response.data;

      setOrders(data);

      const totalOrders = data.length;
      setTotalOrders(totalOrders);

      const totalOrdersDiterima = data.filter(
        (order) => order.statusOrder === "Proses Order"
      ).length;
      setTotalOrdersDiterima(totalOrdersDiterima);

      const totalOrdersSelesai = data.filter(
        (order) => order.statusOrder === "Selesai Order"
      ).length;
      setTotalOrdersSelesai(totalOrdersSelesai);

      const totalOrdersDitolak = data.filter(
        (order) => order.statusOrder === "Ditolak"
      ).length;
      setTotalOrdersDitolak(totalOrdersDitolak);

      const totalOrdersPending = data.filter(
        (order) => order.statusOrder === "Pending"
      ).length;
      setTotalOrdersPending(totalOrdersPending);
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],

    datasets: [
      {
        label: "Total Order",
        type: "bar",
        data: [totalOrders],
        backgroundColor: "#02a0fc",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Proses",
        type: "bar",
        data: [totalOrdersDiterima],
        backgroundColor: "#fec400",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Selesai",
        type: "bar",
        data: [totalOrdersSelesai],
        backgroundColor: "#14bd96",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Ditolak",
        type: "bar",
        data: [totalOrdersDitolak],
        backgroundColor: "#f12b2c",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Pending",
        type: "bar",
        data: [totalOrdersPending],
        backgroundColor: "#696969",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h2>
        <b>Dashboard</b>
      </h2>
      <div className="laporanmasuk dashboard-box">
        <p> Masuk</p>
        <p className="angkas">{totalOrders}</p>
      </div>
      <div className="laporanditerima dashboard-box">
        <p>Diproses</p>
        <p className="angkas">{totalOrdersDiterima}</p>
      </div>
      <div className="laporanselesai dashboard-box">
        <p>Selesai</p>
        <p className="angkas">{totalOrdersSelesai}</p>
      </div>
      <div className="laporanditolak dashboard-box">
        <p>Ditolak</p>
        <p className="angkas">{totalOrdersDitolak}</p>
      </div>
      <div className="laporanpending dashboard-box">
        <p>Pending</p>
        <p className="angkas">{totalOrdersPending}</p>
      </div>
      <div className="chart-container justify-content-center">
        <h2>
          <b>Statistik Laporan</b>
        </h2>
        <div>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
