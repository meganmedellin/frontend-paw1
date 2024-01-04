/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "react-bootstrap";
import { Tab, Col, Nav, Row, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePelanggan = () => {
  return (
    <Container>
      <div className="tampilanadmin m-3">
        <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <h2>
                  <b>UINJEK</b>
                </h2>
                <Nav.Item>
                  <Nav.Link eventKey="profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="riwayat">Riwayat</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="drivers">Drivers</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="profile">
                  <Profile />
                </Tab.Pane>

                <Tab.Pane eventKey="riwayat">
                  {/* <Pengaduans />
                  <Keluhans />
                  <Driver /> */}
                  <History />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </Container>
  );
};

export default ProfilePelanggan;

export function Profile() {
  const pelanggans = JSON.parse(sessionStorage.getItem("pelanggans"));

  if (!pelanggans) {
    window.location.href = "/home";
    return null;
  }
  return (
    <div className="tampilan">
      {" "}
      <h2>Profile Page</h2>
      <p>Welcome, {pelanggans.username}!</p>
      <p>Nama Lengkap: {pelanggans.namaLengkap}</p>
      <p>NIM: {pelanggans.noNIM}</p>
      <p>KTP: {pelanggans.noKTP}</p>
      <p>Email: {pelanggans.email}</p>
      <p>No Telepon: {pelanggans.noTelepon}</p>
      <p>Tempat Lahir: {pelanggans.tempatLahir}</p>
      <p>Tanggal Lahir: {pelanggans.tanggalLahir}</p>
      <p>Alamat: {pelanggans.alamat}</p>
    </div>
  );
}

export function History() {
  const [orders, setOrders] = useState([]);
  const pelanggans = JSON.parse(sessionStorage.getItem("pelanggans"));
  const pelangganId = pelanggans ? pelanggans._id : null;

  useEffect(() => {
    if (pelangganId) {
      fetchOrders();
    }
  }, [pelangganId]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `/api/orders/historyorder/${pelangganId}`
      );
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h2>
        <b>Riwayat Order</b>
      </h2>
      <Table responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Driver</th>
            <th>Additional Info</th>
            <th>Tujuan</th>
            <th>Biaya</th>
            <th>Status Order</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.driverName}</td>
              <td>{order.additionalInfo}</td>
              <td>{order.titikTujuan}</td>
              <td>{order.harga}</td>
              <td>{order.statusOrder}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
