import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import Swal from "sweetalert2";

import {
  calculateTotalPages,
  getPaginatedData,
} from "../../utilities/pagniationTable";
import PaginationUtils from "../../utilities/PaginationUtilis";

function ManagePelanggans() {
  const [pelanggans, setpelanggans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/pelanggans/getallpelanggans`
      );
      setpelanggans(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPelanggans = pelanggans.length;
  const totalPages = calculateTotalPages(totalPelanggans, perPage);
  const paginatedPelanggans = getPaginatedData(
    pelanggans,
    currentPage,
    perPage
  );

  const terimaPelanggan = async (pelangganid) => {
    try {
      const result = await (
        await axios.post(
          `${process.env.REACT_APP_BACKEND_API}/api/pelanggans/terimapelanggan`,
          {
            pelangganid,
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

  const tolakPelanggan = async (pelangganid) => {
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
            .post("/api/pelanggans/tolakpelanggan", {
              pelangganid,
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

  return (
    <Row>
      <Col>
        <h2>
          <b>Daftar Pelanggan</b>
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
            {paginatedPelanggans.length > 0 ? (
              paginatedPelanggans.map((pelanggans, index) => {
                return (
                  <tr key={pelanggans._id}>
                    <td>{index + (currentPage - 1) * perPage + 1}</td>
                    <td>{pelanggans.namaLengkap}</td>

                    <td>{pelanggans.noTelepon}</td>
                    <td>{pelanggans.provinsi}</td>
                    <td>{pelanggans.kabupatenKota}</td>
                    <td>{pelanggans.status}</td>

                    <td className="col-1">
                      {pelanggans.status !== "pending" && (
                        <button
                          className="terimakeluhan btn-success"
                          onClick={() => terimaPelanggan(pelanggans._id)}
                        >
                          Terima
                        </button>
                      )}
                      {pelanggans.status !== "pending" && (
                        <button
                          className="tolakkeluhan btn-danger"
                          onClick={() => tolakPelanggan(pelanggans._id)}
                        >
                          Tolak
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center" colSpan="7">
                  Tidak ada pelanggan yang daftar.
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
export default ManagePelanggans;
