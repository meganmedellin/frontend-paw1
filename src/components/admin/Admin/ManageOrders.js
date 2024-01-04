import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";

import { getStatusClass } from "../../utilities/statusClass";

import {
  calculateTotalPages,
  getPaginatedData,
} from "../../utilities/pagniationTable";
import PaginationUtils from "../../utilities/PaginationUtilis";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/orders/getallorders`
      );
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalOrders = orders.length;
  const totalPages = calculateTotalPages(totalOrders, perPage);
  const paginatedOrders = getPaginatedData(orders, currentPage, perPage);

  return (
    <Row>
      <Col>
        <h2>
          <b>Daftar Order</b>
        </h2>
        <Table responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pelanggan</th>
              <th>Pesanan</th>
              <th>Nama Driver</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order, index) => {
                const statusClass = getStatusClass(order.statusOrder);
                return (
                  <tr key={order._id}>
                    <td>{index + (currentPage - 1) * perPage + 1}</td>
                    <td>{order.pelangganName}</td>
                    <td>{order.additionalInfo}</td>
                    <td>{order.driverName}</td>
                    <td className={statusClass}>{order.statusOrder}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center" colSpan="7">
                  Tidak ada drives yang daftar.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <PaginationUtils
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Col>
    </Row>
  );
}

export default ManageOrders;
