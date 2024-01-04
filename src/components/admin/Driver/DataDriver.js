import React, { useState } from "react";
import {
  Table,
  Container,
  Modal,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function DataDrivers() {
  const drivers = JSON.parse(sessionStorage.getItem("drivers"));
  const [showModal, setShowModal] = useState(false);
  const [motorData, setMotorData] = useState({
    merk: "",
    tahun: "",
    platNomor: "",
    warna: "",
  });

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [showMotorImageModal, setShowMotorImageModal] = useState(false);
  const [selectedMotorImage, setSelectedMotorImage] = useState(null);

  const handleShowMotorImageModal = (motorcycle) => {
    setSelectedMotorImage(motorcycle.imageMotorcycle);
    setMotorData({
      merk: motorcycle.merk,
      tahun: motorcycle.tahun,
      platNomor: motorcycle.platNomor,
      warna: motorcycle.warna,
    });
    setShowMotorImageModal(true);
  };

  const handleHideMotorImageModal = () => {
    setShowMotorImageModal(false);
  };

  const [loading, setLoading] = useState(false);

  const handleModalClose = () => setShowModal(false);

  const handleShowModal = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMotorData({
      ...motorData,
      [name]: value,
    });
  };

  const handleShowImageModal = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleHideImageModal = () => {
    setShowImageModal(false);
  };

  const handleAddMotor = async () => {
    setLoading(true);
    const driverId = JSON.parse(sessionStorage.getItem("drivers"))._id;

    try {
      const formData = new FormData();
      formData.append("merk", motorData.merk);
      formData.append("tahun", motorData.tahun);
      formData.append("platNomor", motorData.platNomor);
      formData.append("warna", motorData.warna);
      formData.append("imageMotorcycle", motorData.imageMotorcycle);

      const response = (
        await axios.post(
          `${process.env.REACT_APP_BACKEND_API}/api/drivers/addmotor/${driverId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
      ).data;

      console.log(response);
      Swal.fire("Okay", "Tambah Motor Berhasil", "success").then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error adding motor:", error);
      Swal.fire("Error", "Error Tambah Motor", "error").then((result) => {
        window.location.reload();
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>
        <b>Data Driver</b>
      </h2>
      <Table responsive>
        <thead>
          <tr>
            <th>Nama Lengkap</th>
            <th>NIM / KTP</th>
            <th>Email</th>
            <th>No Telepon</th>
            <th>Alamat</th>
            <th>Image Motor</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {drivers ? (
            <>
              <tr>
                <td>{drivers.namaLengkap}</td>
                <td>
                  {drivers.noNIM} / {drivers.noKTP}
                </td>
                <td>{drivers.email}</td>
                <td>{drivers.noTelepon}</td>
                <td>{drivers.alamat}</td>
                <td>
                  {drivers.motorcycles.map((motorcycle) => (
                    <Button
                      variant="secondary"
                      onClick={() => handleShowMotorImageModal(motorcycle)}
                    >
                      Lihat Motor
                    </Button>
                  ))}
                </td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => handleShowImageModal(drivers.imageProfile)}
                  >
                    Lihat Gambar Profil
                  </Button>
                </td>

                <td>
                  {" "}
                  <Button variant="primary" onClick={handleShowModal}>
                    Tambah Motor
                  </Button>
                </td>
              </tr>
            </>
          ) : (
            <>
              <h1>tidak ada data</h1>
            </>
          )}
        </tbody>
      </Table>

      <Modal show={showMotorImageModal} onHide={handleHideMotorImageModal}>
        <Modal.Header closeButton>
          <Modal.Title>{motorData.merk}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={`data:image/jpeg;base64,${selectedMotorImage}`}
            alt="Gambar"
            style={{ maxWidth: "100%" }}
          />

          <p>
            <strong>Tahun:</strong> {motorData.tahun}
          </p>
          <p>
            <strong>Plat Nomor:</strong> {motorData.platNomor}
          </p>
          <p>
            <strong>Warna:</strong> {motorData.warna}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideMotorImageModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showImageModal} onHide={handleHideImageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`data:image/jpeg;base64,${selectedImage}`}
            alt="Gambar"
            style={{ maxWidth: "100%" }}
          />
          <p>
            <strong>Merk:</strong> {setMotorData}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideImageModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Motor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel controlId="merk" label="Merk" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Merk"
                name="merk"
                value={motorData.merk}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Merk is required
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="tahun" label="Tahun" className="mb-3">
              <Form.Control
                type="number"
                placeholder="Enter Tahun"
                name="tahun"
                value={motorData.tahun}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Tahun is required
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              controlId="platNomor"
              label="Plat Nomor"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter Plat Nomor"
                name="platNomor"
                value={motorData.platNomor}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Plat Nomor is required
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="warna" label="Warna" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Warna"
                name="warna"
                value={motorData.warna}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Warna is required
              </Form.Control.Feedback>
            </FloatingLabel>

            <Form.Group controlId="formMotorImage">
              <Form.Label className="ml-2">Pilih Foto Motor</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setMotorData({
                    ...motorData,
                    imageMotorcycle: e.target.files[0],
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleAddMotor} disabled={loading}>
            {loading ? "Loading..." : "Tambah Motor"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DataDrivers;
