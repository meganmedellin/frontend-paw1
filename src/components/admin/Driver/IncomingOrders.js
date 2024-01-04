/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Container, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { getStatusClass } from "../../utilities/statusClass";

function IncomingOrders() {
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

  const handleApproveOrder = async (orderId, pelangganId) => {
    const confirmResult = await Swal.fire({
      title: "Yakin ingin menerima order?",
      text: "Setelah diterima, order tidak dapat dibatalkan.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Terima",
      cancelButtonText: "Tidak",
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await axios.post("/api/orders/approveOrder", {
          orderId,
          pelangganId,
        });

        fetchOrders();

        Swal.fire({
          title: "Order Approved",
          text: "Order has been approved successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        console.log(fetchOrders());
        console.log(response.data);
      } catch (error) {
        console.error(error);

        Swal.fire({
          title: "Error",
          text: "Failed to approve order. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <Container>
      <h2>
        <b>Daftar Pesanan</b>
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
            <th>Terima Order</th>
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
                .filter((order) => order.statusOrder === "Pending")
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
                    <td className="col-1">
                      <button
                        className="terimakeluhan btn-success"
                        onClick={() =>
                          handleApproveOrder(order._id, order.pelangganId)
                        }
                      >
                        Terima
                      </button>
                      <button className="tolakkeluhan btn-danger">Tolak</button>
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

export default IncomingOrders;
