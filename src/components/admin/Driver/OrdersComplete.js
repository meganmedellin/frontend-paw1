/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Container, Spinner } from "react-bootstrap";
import { getStatusClass } from "../../utilities/statusClass";

function OrdersComplete() {
  const [orders, setOrders] = useState([]);
  const drivers = JSON.parse(sessionStorage.getItem("drivers"));
  const driverId = drivers ? drivers._id : null;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (driverId) {
      fetchOrders();
    }
  }, [driverId]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/orders/ordersfordriver/${driverId}`
      );
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>
        <b>Complete Order</b>
      </h2>
      <Table responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pelanggan</th>
            <th>Additional Info</th>
            <th>Penjemputan</th>
            <th>Tujuan</th>
            <th>Status Order</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan="6" className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {orders.length > 0 ? (
              orders
                .filter((order) => order.statusOrder === "Selesai Order")
                .map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.pelangganName}</td>
                    <td>{order.additionalInfo}</td>
                    <td>{order.titikPenjemputan}</td>
                    <td>{order.titikTujuan}</td>
                    <td className={getStatusClass(order.statusOrder)}>
                      {order.statusOrder}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td className="text-center" colSpan="7">
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        )}
      </Table>
    </Container>
  );
}

export default OrdersComplete;
