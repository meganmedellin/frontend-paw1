// App.js

/* eslint-disable no-unused-vars */

import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarPageDriver from "./components/navbar/NavbarPageDriver";
import NavbarAdmin from "./components/navbar/NavbarAdmin";
import NavbarPelanggan from "./components/navbar/NavbarPelanggan";
import NavbarGuest from "./components/navbar/NavbarGuest";
import TampilanHome from "./components/TampilanHome";
import RegisterAdmin from "./components/register/RegisterAdmin";
import LoginAdmin from "./components/login/AdminLogin";
import TampilanAdmin from "./components/admin/TampilanAdmin";
import RegisterDriver from "./components/register/RegisterDriver";
import DriverLogin from "./components/login/DriverLogin";
import DriverAdmin from "./components/admin/DriverAdmin";
import RegisterPelanggan from "./components/register/RegisterPelangganScreen";
import PelangganLogin from "./components/login/PelangganLogin";
import ProfilePelanggan from "./components/profile/PelangganProfile";
import ListDriver from "./components/driver/ListDriver";

function App() {
  const pelanggans = JSON.parse(sessionStorage.getItem("pelanggans"));
  const drivers = JSON.parse(sessionStorage.getItem("drivers"));
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                {pelanggans ? (
                  <NavbarPelanggan />
                ) : drivers ? (
                  <NavbarPageDriver />
                ) : admin ? (
                  <NavbarAdmin />
                ) : (
                  <NavbarGuest />
                )}
                <Routes>
                  <Route path="/" element={<TampilanHome />} />
                  <Route path="/home" element={<TampilanHome />} />
                  <Route path="/registeradmin" element={<RegisterAdmin />} />
                  <Route path="/registerdriver" element={<RegisterDriver />} />
                  <Route
                    path="/registerpelanggan"
                    element={<RegisterPelanggan />}
                  />
                  <Route path="/loginadmin" element={<LoginAdmin />} />
                  <Route path="/loginpelanggan" element={<PelangganLogin />} />
                  <Route path="/logindriver" element={<DriverLogin />} />
                  <Route
                    path="/profilepelanggan"
                    element={<ProfilePelanggan />}
                  />

                  {/* Driver */}

                  <Route path="/listdriver" element={<ListDriver />} />
                </Routes>
              </>
            }
          />

          <Route
            path="/admindriver"
            element={
              <>
                <NavbarPageDriver />
                <DriverAdmin />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <NavbarAdmin />
                <TampilanAdmin />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
