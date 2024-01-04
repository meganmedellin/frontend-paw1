import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";

function RegisterPelanggan() {
  const [username, setUsername] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [noNIM, setNoNim] = useState("");
  const [noKTP, setNoKTP] = useState("");
  const [email, setEmail] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kabupatenKota, setKabupatenKota] = useState("");
  const [allProvinces, setAllProvinces] = useState([]);

  const [allCities, setAllCities] = useState([]);
  const [allKecamatan, setAllKecamatan] = useState([]);

  const [selectedKecamatan, setSelectedKecamatan] = useState("");

  const apiUrl = "https://api.binderbyte.com";
  const apiKey =
    "1e497e09cea285d56ce02eb5ce9497b55de71665ad570a6d6ddbe5daa9927324";

  async function daftarMitra() {
    if (
      !username ||
      !namaLengkap ||
      !noNIM ||
      !noKTP ||
      !email ||
      !noTelepon ||
      !password ||
      !cpassword ||
      !tempatLahir ||
      !tanggalLahir ||
      !provinsi ||
      !kabupatenKota ||
      !selectedKecamatan ||
      !alamat
    ) {
      Swal.fire(
        "Peringatan",
        "Harap isi semua kolom yang diperlukan",
        "warning"
      );
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Swal.fire("Peringatan", "Format email tidak valid", "warning");
      return;
    }

    if (!noTelepon.match(/^\d+$/)) {
      Swal.fire(
        "Peringatan",
        "Nomor telepon hanya boleh berisi angka",
        "warning"
      );
      return;
    }

    // Validasi panjang password
    if (password.length < 8) {
      Swal.fire("Peringatan", "Password harus minimal 8 karakter", "warning");
      return;
    }

    if (password !== cpassword) {
      Swal.fire("Peringatan", "Kata sandi tidak cocok", "warning");
      return;
    }

    const getNamaById = (id, dataArray) => {
      const selectedData = dataArray.find((data) => data.id === id);
      return selectedData ? selectedData.name : "";
    };

    const driver = {
      username,
      namaLengkap,
      noNIM,
      noKTP,
      email,
      noTelepon,
      password,
      cpassword,
      tempatLahir,
      tanggalLahir,
      provinsi: getNamaById(provinsi, allProvinces),
      kabupatenKota: getNamaById(kabupatenKota, allCities),
      kecamatanDesa: getNamaById(selectedKecamatan, allKecamatan),
      alamat,
    };

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/pelanggans/registerpelanggan`,
        driver
      );
      console.log(result);
      Swal.fire("Selamat", "Registrasi Berhasil", "success").then((result) => {
        window.location.href = "/loginpelanggan";
      });
    } catch (error) {
      Swal.fire("Oops", "Terjadi kesalahan", "error");
      console.error("Kesalahan registrasi:", error);
    }
  }

  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await axios.get(
          `${apiUrl}/wilayah/provinsi?api_key=${apiKey}`
        );
        setAllProvinces(response.data.value);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }

    fetchProvinces();
  }, []);

  const handleProvinsiChange = async (selectedProvinsi) => {
    setProvinsi(selectedProvinsi);
    console.log("Provinsi dipilih:", selectedProvinsi);

    const provinsi = allProvinces.find((p) => p.id === selectedProvinsi);
    if (provinsi) {
      console.log("Provinsi Name:", provinsi.name);
    }

    try {
      const responseCities = await axios.get(
        `${apiUrl}/wilayah/kabupaten?api_key=${apiKey}&id_provinsi=${selectedProvinsi}`
      );
      setAllCities(responseCities.data.value);

      setKabupatenKota("");
      setAllKecamatan([]);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleKabupatenChange = async (selectedKabupaten) => {
    setKabupatenKota(selectedKabupaten);
    console.log("Kabupaten/Kota dipilih:", selectedKabupaten);

    const kabupaten = allCities.find((c) => c.id === selectedKabupaten);
    if (kabupaten) {
      console.log("Kabupaten/Kota Name:", kabupaten.name);
    }

    try {
      const responseKecamatan = await axios.get(
        `${apiUrl}/wilayah/kecamatan?api_key=${apiKey}&id_kabupaten=${selectedKabupaten}`
      );
      setAllKecamatan(responseKecamatan.data.value);
    } catch (error) {
      console.error("Error fetching kecamatan:", error);
    }
  };

  const handleKecamatanChange = (selectedKecamatan) => {
    setSelectedKecamatan(selectedKecamatan);
    console.log("Kecamatan dipilih:", selectedKecamatan);
    const kecamatan = allKecamatan.find((k) => k.id === selectedKecamatan);
    if (kecamatan) {
      console.log("Kecamatan Name:", kecamatan.name);
    }
  };

  const [validation, setValidation] = useState({
    username: true,
    namaLengkap: true,
  });

  const getMaxDate = () => {
    const today = new Date();
    const minBirthDate = new Date(
      today.getFullYear() - 17,
      today.getMonth(),
      today.getDate() + 1
    );

    const maxDate = minBirthDate.toISOString().split("T")[0];
    return maxDate;
  };

  return (
    <Container>
      <div className="tampilanhome">
        <Row className="justify-content-md-center">
          <Col>
            <div className="bs">
              <h2 className="text-center">Daftar Pelanggan</h2>
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setValidation((prevValidation) => ({
                      ...prevValidation,
                      username: e.target.value.length > 0,
                    }));
                  }}
                />
                {!validation.username && (
                  <Form.Text className="text-danger">
                    Username wajib diisi
                  </Form.Text>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Nama Lengkap"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Nama Lengkap"
                  value={namaLengkap}
                  onChange={(e) => {
                    setNamaLengkap(e.target.value);
                    setValidation((prevValidation) => ({
                      ...prevValidation,
                      namaLengkap: e.target.value.length > 0,
                    }));
                  }}
                />
                {!validation.namaLengkap && (
                  <Form.Text className="text-danger">
                    Nama Lengkap wajib diisi
                  </Form.Text>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Nomor Induk Mahasiswa ( NIM )"
                className="mb-3"
              >
                <Form.Control
                  type="tel"
                  placeholder="Nomor Induk Mahasiswa ( NIM )"
                  value={noNIM}
                  onChange={(e) => {
                    setNoNim(e.target.value);
                    setValidation((prevValidation) => ({
                      ...prevValidation,
                      noNIM: !e.target.value || e.target.value.match(/^\d+$/),
                    }));
                  }}
                  pattern="[0-9]*"
                  minLength="15"
                  title="Input NIM dengan angka yang benar"
                />
                {!validation.noNIM && noNIM.length > 0 && (
                  <Form.Text className="text-danger">
                    Input NIM dengan angka yang benar
                  </Form.Text>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Kartu Tanda Penduduk ( KTP )"
                className="mb-3"
              >
                <Form.Control
                  type="tel"
                  placeholder="Kartu Tanda Penduduk ( KTP )"
                  value={noKTP}
                  onChange={(e) => {
                    setNoKTP(e.target.value);
                    setValidation((prevValidation) => ({
                      ...prevValidation,
                      noKTP: !e.target.value || e.target.value.match(/^\d+$/),
                    }));
                  }}
                  pattern="[0-9]*"
                  minLength="15"
                  title="Input KTP dengan angka yang benar"
                />
                {!validation.noKTP && noKTP.length > 0 && (
                  <Form.Text className="text-danger">
                    Input KTP dengan angka yang benar
                  </Form.Text>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setValidation((prevValidation) => ({
                      ...prevValidation,
                      email:
                        !e.target.value ||
                        /^\S+@\S+\.\S+$/.test(e.target.value),
                    }));
                  }}
                />
                {!validation.email && email.length > 0 && (
                  <Form.Text className="text-danger">
                    Format email tidak valid
                  </Form.Text>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="No Telepon"
                className="mb-3"
              >
                <Form.Control
                  type="tel"
                  placeholder="No Telepon"
                  value={noTelepon}
                  onChange={(e) => {
                    setNoTelepon(e.target.value);
                    setValidation((prevValidation) => ({
                      ...prevValidation,
                      noTelepon:
                        !e.target.value || e.target.value.match(/^\d+$/),
                    }));
                  }}
                  pattern="[0-9]*"
                  minLength="11"
                  title="Nomor telepon hanya boleh berisi angka"
                />
                {!validation.noTelepon && noTelepon.length > 0 && (
                  <Form.Text className="text-danger">
                    Nomor telepon hanya boleh berisi angka
                  </Form.Text>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password (minimal 8 karakter)"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  minLength="8"
                />
                {password.length > 0 && password.length < 8 && (
                  <Form.Text className="text-danger">
                    Password harus minimal 8 karakter
                  </Form.Text>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Confirm Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={cpassword}
                  onChange={(e) => {
                    setCPassword(e.target.value);
                  }}
                  minLength="8"
                />
                {cpassword.length > 0 && cpassword.length < 8 && (
                  <Form.Text className="text-danger">
                    Password harus minimal 8 karakter
                  </Form.Text>
                )}
                {cpassword !== password && (
                  <Form.Text className="text-danger">
                    Confirm Password harus sama dengan Password
                  </Form.Text>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Tempat Lahir"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Tempat Lahir"
                  value={tempatLahir}
                  onChange={(e) => {
                    setTempatLahir(e.target.value);
                  }}
                />
              </FloatingLabel>

              <Form>
                <Form.Group controlId="formtanggalLahir">
                  <Form.Control
                    type="date"
                    placeholder="Tanggal Lahir"
                    value={tanggalLahir}
                    max={getMaxDate()}
                    onKeyDown={(e) => e.preventDefault()}
                    onChange={(e) => {
                      setTanggalLahir(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formprovinsi">
                  <Form.Control
                    as="select"
                    placeholder="Provinsi"
                    value={provinsi}
                    onChange={(e) => handleProvinsiChange(e.target.value)}
                  >
                    <option value="">Pilih Provinsi</option>
                    {allProvinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formkabupaten">
                  <Form.Control
                    as="select"
                    placeholder="Kabupaten/Kota"
                    value={kabupatenKota}
                    onChange={(e) => handleKabupatenChange(e.target.value)}
                  >
                    <option value="">Pilih Kabupaten/Kota</option>
                    {allCities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formkecamatan">
                  <Form.Control
                    as="select"
                    placeholder="Kecamatan"
                    value={selectedKecamatan}
                    onChange={(e) => handleKecamatanChange(e.target.value)}
                  >
                    <option value="">Pilih Kecamatan</option>
                    {allKecamatan.map((kecamatan) => (
                      <option key={kecamatan.id} value={kecamatan.id}>
                        {kecamatan.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <FloatingLabel
                  controlId="floatingInput"
                  label="Alamat Lengkap"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Alamat Lengkap"
                    value={alamat}
                    onChange={(e) => {
                      setAlamat(e.target.value);
                    }}
                  />
                </FloatingLabel>
              </Form>
              <Button variant="primary mt-2" onClick={daftarMitra}>
                Daftar
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default RegisterPelanggan;
