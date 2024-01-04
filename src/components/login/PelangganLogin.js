import React, { useState } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";

function PelangganLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({
    email: true,
    password: true,
  });

  const [loading, setLoading] = useState(false);

  async function Login() {
    if (loading) return;
    if (!email || !password) {
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

    if (password.length < 8) {
      Swal.fire("Peringatan", "Password harus minimal 8 karakter", "warning");
      return;
    }
    setLoading(true);
    const pelanggas = {
      email,
      password,
    };
    console.log(pelanggas);
    try {
      const result = (
        await axios.post(
          `${process.env.REACT_APP_BACKEND_API}/api/pelanggans/loginpelanggan`,
          pelanggas
        )
      ).data;
      Swal.fire("Okay", "Login Berhasil", "success").then((result) => {
        window.location.href = "/home";
      });
      sessionStorage.setItem("pelanggans", JSON.stringify(result));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          Swal.fire("Oops", error.response.data.message, "error");
        } else {
          Swal.fire("Oops", "Something went wrong", "error");
        }
      } else if (error.request) {
      } else {
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Row className="row justify-content-center mt-5">
        <Col>
          <Card className="cardmodal">
            <Card.Body>
              <Card.Title className="text-center">
                <img className="img-logo" src={logo} alt="" />
                <h2>Pelanggan Login</h2>
              </Card.Title>
              <Card.Text>
                <h2 className="judullogin">Masuk</h2>

                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
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
                <Button
                  className="btnlogin btn btn-block"
                  onClick={Login}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Masuk"}
                </Button>
                <p className="mt-3 text-center">
                  Belum punya akun?{" "}
                  <a href="/registerpelanggan">Daftar disini</a>
                </p>
                <p className="text-center">
                  Login sebagai driver? <a href="/logindriver">Login disini</a>
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PelangganLogin;
