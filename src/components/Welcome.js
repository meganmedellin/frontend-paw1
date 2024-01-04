import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcome-page">
      <div className="wrapper">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h2>Selamat Datang di </h2>
        <h1>Sistem Informasi Pengaduan Masyarakat </h1>
        <h1>Desa Kosar</h1>
        <h2 className="msk">Masuk Sebagai</h2>
        <div className="button-container">
          <Link to="/home" className="button">
            Warga
          </Link>
          <Link to="/admin" className="button">
            Pemerintah Desa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
