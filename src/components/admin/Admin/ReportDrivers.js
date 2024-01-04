import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  calculateTotalPages,
  getPaginatedData,
} from "../../utilities/pagniationTable";
import PaginationUtils from "../../utilities/PaginationUtilis";

function ReportDrivers() {
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

  const terimaDriver = async (driverid) => {
    try {
      const result = await (
        await axios.post(
          `${process.env.REACT_APP_BACKEND_API}/api/drivers/terimadriver`,
          {
            driverid,
          }
        )
      ).data;
      console.log(result);
      Swal.fire("Okay", "Driver Diterima", "success").then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  };

  const tolakDriver = async (driverid) => {
    try {
      const result = await Swal.fire({
        title: "Alasan Penolakan",
        input: "textarea",
        inputPlaceholder: "Masukkan alasan penolakan",
        showCancelButton: true,
        confirmButtonText: "Tolak",
        cancelButtonText: "Batal",
        showLoaderOnConfirm: true,
        preConfirm: (alasan) => {
          return axios
            .post("/api/drivers/tolakdriver", {
              driverid,
              alasanPenolakan: alasan,
            })
            .then((response) => {
              if (response.data === "Driver ditolak") {
                Swal.fire(
                  "Okay",
                  "Driver Ditolak dengan alasan : \n " + alasan,
                  "success"
                ).then((result) => {
                  window.location.reload();
                });
              } else {
                Swal.fire("Oops", "Something went wrong", "error");
              }
            })
            .catch((error) => {
              Swal.fire("Oops", "Something went wrong", "error");
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (result.isDismissed) {
        return;
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredDrivers = drivers.filter(
    (driver) => driver.status === "Pending"
  );

  const totalPages = calculateTotalPages(filteredDrivers.length, perPage);
  const paginatedDrivers = getPaginatedData(
    filteredDrivers,
    currentPage,
    perPage
  );

  return (
    <Row>
      <Col>
        <h2>
          <b>Daftar Driver</b>
        </h2>
        <Table responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Lengkap</th>
              <th>No Telepon</th>
              <th>Prov</th>
              <th>Kab</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDrivers.length > 0 ? (
              paginatedDrivers.map((drivers, index) => (
                <tr key={drivers._id}>
                  <td>{index + (currentPage - 1) * perPage + 1}</td>
                  <td>{drivers.namaLengkap}</td>
                  <td>{drivers.noTelepon}</td>
                  <td>{drivers.provinsi}</td>
                  <td>{drivers.kabupatenKota}</td>
                  <td>{drivers.status}</td>

                  <td className="col-1">
                    {drivers.status !== "pending" && (
                      <button
                        className="terimakeluhan btn-success"
                        onClick={() => terimaDriver(drivers._id)}
                      >
                        Terima
                      </button>
                    )}
                    {drivers.status !== "pending" && (
                      <button
                        className="tolakkeluhan btn-danger"
                        onClick={() => tolakDriver(drivers._id)}
                      >
                        Tolak
                      </button>
                    )}
                  </td>
                </tr>
              ))
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

export default ReportDrivers;
