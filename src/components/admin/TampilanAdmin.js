import React, { useEffect, useState } from "react";
import { Tab, Col, Nav, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Dashboard from "./Admin/Dashboard";
import ManageOrders from "./Admin/ManageOrders";
import ManageDrivers from "./Admin/ManageDrivers";
import ReportDrivers from "./Admin/ReportDrivers";
import ManagePelanggans from "./Admin/ManagePelanggan";

function Adminscreen() {
  const [showAdminContent, setShowAdminContent] = useState(false);

  useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("admin"));
    if (!admin || !admin.isAdmin) {
      Swal.fire({
        title: "Akses Ditolak",
        text: "Anda tidak memiliki izin untuk mengakses halaman ini.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/loginadmin";
      });

      return;
    }

    setShowAdminContent(true);
  }, []);

  return (
    <div className="tampilanadmin m-3">
      {showAdminContent && (
        <Tab.Container id="left-tabs-example" defaultActiveKey="dashboard">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <h2>
                  <b>Admin Panel</b>
                </h2>
                <Nav.Item>
                  <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="manageOrder">Manage Order</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="manageDriver">Manage Driver</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="managePelanggan">
                    Manage Pelanggan
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="dashboard">
                  <Dashboard />
                </Tab.Pane>
                <Tab.Pane eventKey="manageOrder">
                  <ManageOrders />
                </Tab.Pane>
                <Tab.Pane eventKey="manageDriver">
                  <ManageDrivers />
                  <ReportDrivers />
                </Tab.Pane>
                <Tab.Pane eventKey="managePelanggan">
                  <ManagePelanggans />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </div>
  );
}

export default Adminscreen;
