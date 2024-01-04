/* eslint-disable react-hooks/exhaustive-deps */
// In your React component (ProfilePelanggan.js or similar)

import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";

function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const pelanggan = JSON.parse(sessionStorage.getItem("pelanggans"));

  useEffect(() => {
    if (pelanggan) {
      fetchOrderHistory();
    }
  }, [pelanggan]);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/orders/getordersbypelanggan/${pelanggan._id}`
      );
      setOrderHistory(response.data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  return (
    <Container>
      <h2>Order History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Driver Name</th>
            <th>Additional Info</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((order) => (
            <tr key={order._id}>
              <td>{order.driverId.namaLengkap}</td>
              <td>{order.additionalInfo}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default OrderHistory;
