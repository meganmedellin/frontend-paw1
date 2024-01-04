import React, { useState } from "react";
import { Button, Card, FloatingLabel, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const OrderForm = ({
  selectedDriver,
  pelangganName,
  pelangganId,
  onOrderSubmit,
}) => {
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [titikPenjemputan, setTitikPenjemputan] = useState("");
  const [titikTujuan, setTitikTujuan] = useState("");
  const [pembayaran, setPilihPembayaran] = useState("");
  const [spesifikPembayaran, setSpesifikPembayaran] = useState("");
  const [harga, setHarga] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOrderSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/orders/submitorder`,
        {
          driverId: selectedDriver._id,
          pelangganName,
          pelangganId,
          additionalInfo,
          titikPenjemputan,
          titikTujuan,
          pembayaran: `${pembayaran} - ${spesifikPembayaran}`,
          harga,
        }
      );

      onOrderSubmit(response.data);

      Swal.fire({
        icon: "info",
        title: "Order Berhasil",
        text: "Orderan Anda akan segera di proses",
      });

      setAdditionalInfo("");
      setTitikPenjemputan("");
      setTitikTujuan("");
      setPilihPembayaran("");
      setSpesifikPembayaran("");
      setHarga("");
    } catch (error) {
      console.error("Error submitting order:", error);
      console.error("Error haha order:", error.response.data);

      Swal.fire({
        icon: "error",
        title: "Order Gagal",
        text: "Terjadi kesalahan saat mengirim pesanan. Silakan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-3 catagory-card">
      <Card.Body>
        <Card.Title className="text-center">Order Form</Card.Title>

        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Deksripsi"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Deskripsi"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Titik Penjemputan"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Titik Penjemputan"
              value={titikPenjemputan}
              onChange={(e) => setTitikPenjemputan(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Titik Tujuan"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Titik Tujuan"
              value={titikTujuan}
              onChange={(e) => setTitikTujuan(e.target.value)}
            />
          </FloatingLabel>

          <Form.Group controlId="pembayaran">
            <Form.Label>Pembayaran</Form.Label>
            <Form.Control
              as="select"
              value={pembayaran}
              onChange={(e) => setPilihPembayaran(e.target.value)}
            >
              <option value="">Piih Pembayaran</option>
              <option value="m-banking">Mobile Banking</option>
              <option value="e-wallet">E-Wallet</option>
              <option value="cash">Cash</option>
            </Form.Control>
          </Form.Group>

          {pembayaran === "m-banking" && (
            <Form.Group controlId="spesifikPembayaran">
              <Form.Control
                as="select"
                value={spesifikPembayaran}
                onChange={(e) => setSpesifikPembayaran(e.target.value)}
              >
                <option value="">Pilih Bank</option>
                <option value="bca">BCA</option>
                <option value="bri">BRI</option>
                <option value="bjb">BJB</option>
              </Form.Control>
            </Form.Group>
          )}

          {pembayaran === "e-wallet" && (
            <Form.Group controlId="spesifikPembayaran">
              <Form.Control
                as="select"
                value={spesifikPembayaran}
                onChange={(e) => setSpesifikPembayaran(e.target.value)}
              >
                <option value="">Pilih E-Wallet</option>
                <option value="dana">DANA</option>
                <option value="gopay">GoPay</option>
                <option value="ovo">OVO</option>
              </Form.Control>
            </Form.Group>
          )}

          <FloatingLabel
            controlId="floatingInput"
            label="Harga"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Harga"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
            />
          </FloatingLabel>

          <Button
            variant="primary"
            onClick={handleOrderSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Loading...
              </>
            ) : (
              "Order Driver"
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default OrderForm;
