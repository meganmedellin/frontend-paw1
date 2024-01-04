import React, { useEffect, useState } from "react";
import { Tab, Col, Nav, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import DataDrivers from "./Driver/DataDriver";
import IncomingOrders from "./Driver/IncomingOrders";
import OrdersHistory from "./Driver/OrderHistory";
import OrdersComplete from "./Driver/OrdersComplete";

function DriverAdmin() {
  const [showAdminContent, setShowAdminContent] = useState(false);

  useEffect(() => {
    const drivers = JSON.parse(sessionStorage.getItem("drivers"));
    if (!drivers || !drivers.isDriver) {
      Swal.fire({
        title: "Akses Ditolak",
        text: "Akun Anda Belum Terverifikasi. Anda tidak memiliki izin untuk mengakses halaman ini.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/logindriver";
      });

      return;
    }

    setShowAdminContent(true);
  }, []);

  return (
    <div className="tampilanadmin m-3">
      {showAdminContent && (
        <Tab.Container id="left-tabs-example" defaultActiveKey="datadrivers">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <h2>
                  <b>Driver Report</b>
                </h2>

                <Nav.Item>
                  <Nav.Link eventKey="datadrivers">Data Driver</Nav.Link>
                  <Nav.Link eventKey="completeorder">Complete Order</Nav.Link>
                  <Nav.Link eventKey="prosesorder">Proses Order</Nav.Link>
                  <Nav.Link eventKey="incoming">Incoming Orders</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="datadrivers">
                  <DataDrivers />
                </Tab.Pane>
                <Tab.Pane eventKey="completeorder">
                  <OrdersComplete />
                </Tab.Pane>
                <Tab.Pane eventKey="prosesorder">
                  <OrdersHistory />
                </Tab.Pane>
                <Tab.Pane eventKey="incoming">
                  <IncomingOrders />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </div>
  );
}

export default DriverAdmin;
