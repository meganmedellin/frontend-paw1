/* eslint-disable no-unused-vars */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import {
  calculateTotalPages,
  getPaginatedData,
} from "../../utilities/pagniationTable";
import PaginationUtils from "../../utilities/PaginationUtilis";

export function ManageDrivers() {
  const [drivers, setdrivers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/drivers/getalldrivers`
      );
      setdrivers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalDrivers = drivers.length;
  const totalPages = calculateTotalPages(totalDrivers, perPage);
  const paginatedDrivers = getPaginatedData(drivers, currentPage, perPage);

  const indexOfLastDriver = currentPage * perPage;
  const indexOfFirstDriver = indexOfLastDriver - perPage;
  const currentDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver);

  return (
    <Row>
      <Col>
        <h2>
          <b>List Driver</b>
        </h2>
        <Table responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Driver</th>
              <th>Email</th>
              <th>Alamat</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentDrivers.length > 0 ? (
              currentDrivers.map((driver, index) => {
                let statusClass = "";
                switch (driver.status) {
                  case "Pending":
                    return null;
                  case "Diterima":
                    statusClass = "status-selesai";
                    break;
                  case "Ditolak":
                    statusClass = "status-ditolak";
                    break;

                  default:
                    break;
                }
                return (
                  <tr key={driver._id}>
                    <td>{index + indexOfFirstDriver + 1}</td>
                    <td>{driver.namaLengkap}</td>
                    <td>{driver.email}</td>
                    <td>{driver.alamat}</td>
                    <td className={statusClass}>{driver.status}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center" colSpan="7">
                  Tidak ada driver.
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

export default ManageDrivers;
