import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Table,
  Spinner,
  Modal,
  Button,
} from "react-bootstrap";
import axios from "axios";
import OrderForm from "./OrderForm";
import Swal from "sweetalert2";

function ListDriver() {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const pelanggan = JSON.parse(sessionStorage.getItem("pelanggans"));

  const [loading, setLoading] = useState(true);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMotorcycle, setSelectedMotorcycle] = useState(null);

  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMessage("Membutuhkan Proses Lebih Lama...");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!pelanggan) {
      Swal.fire({
        title: "Akses Ditolak",
        text: "Anda belum login . silahkan login terlebih dahulu ",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/loginpelanggan";
      });
      return;
    }

    if (pelanggan.status !== "Diterima") {
      Swal.fire({
        title: "Akses Ditolak",
        text: "Anda tidak terdaftar sebagai mahasiswa UIN Bandung . hubungi nomor dibawah ini ",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/";
      });
      return;
    }

    fetchDrivers();
  }, [pelanggan]);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/drivers/getalldrivers`
      );
      const driversWithMotorcycles = response.data.map((driver) => {
        const motorcycle =
          driver.motorcycles && driver.motorcycles.length > 0
            ? driver.motorcycles[0]
            : null;

        return {
          ...driver,
          motorcycle: motorcycle,
        };
      });

      setDrivers(driversWithMotorcycles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setLoading(false);
    }
  };

  const handleOrderSubmit = (orderInfo) => {
    console.log("Order Submitted:", orderInfo);
    setSelectedDriver(null);
  };

  const handleShowDriverModal = (driver) => {
    setSelectedImage(driver.imageProfile);
    setSelectedMotorcycle(driver.motorcycle);
    setShowDriverModal(true);
  };

  const handleHideDriverModal = () => {
    setShowDriverModal(false);
  };

  const handleNegotiate = (driver) => {
    const negotiatedMessage = "Hai, bisa nego harga?";

    const whatsappUrl = `https://wa.me/${
      driver.noTelepon
    }?text=${encodeURIComponent(negotiatedMessage)}`;
    window.open(whatsappUrl);
  };

  return (
    <Container>
      <div className="tampilan home">
        <Card className="mb-3 catagory-card">
          <Card.Body>
            <Card.Title className="text-center">Daftar Driver</Card.Title>

            <Table responsive>
              <thead>
                <tr>
                  <th>Nama Lengkap</th>
                  <th>Data</th>
                  <th>Order</th>
                  <th>Negosiasi</th>
                </tr>
              </thead>
              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                      <br />
                      {loadingMessage}
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {drivers.map((driver) => (
                    <tr key={driver._id}>
                      <td>{driver.namaLengkap}</td>
                      <td>
                        <Button onClick={() => handleShowDriverModal(driver)}>
                          Lihat Driver
                        </Button>
                      </td>

                      <td>
                        <Button onClick={() => setSelectedDriver(driver)}>
                          Order
                        </Button>
                      </td>

                      <td>
                        <Button onClick={() => handleNegotiate(driver)}>
                          Nego Harga
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </Table>
            {selectedDriver && (
              <OrderForm
                selectedDriver={selectedDriver}
                pelangganName={pelanggan ? pelanggan.namaLengkap : ""}
                pelangganId={pelanggan ? pelanggan._id : ""}
                onOrderSubmit={handleOrderSubmit}
              />
            )}

            <Modal show={showDriverModal} onHide={handleHideDriverModal}>
              <Modal.Header closeButton>
                <Modal.Title>Driver Details</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <img
                  src={`data:image/jpeg;base64,${selectedImage}`}
                  alt="Gambar Profil"
                  style={{ maxWidth: "50%" }}
                />
                {selectedMotorcycle ? (
                  <div>
                    <p>Merk: {selectedMotorcycle.merk}</p>
                    <p>Tahun: {selectedMotorcycle.tahun}</p>
                    <p>Plat Nomor: {selectedMotorcycle.platNomor}</p>
                    <p>Warna: {selectedMotorcycle.warna}</p>
                    <img
                      src={`data:image/jpeg;base64,${selectedMotorcycle.imageMotorcycle}`}
                      alt="Gambar Motor"
                      style={{ maxWidth: "50%" }}
                    />
                  </div>
                ) : (
                  <p>No motorcycle data available</p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleHideDriverModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default ListDriver;
