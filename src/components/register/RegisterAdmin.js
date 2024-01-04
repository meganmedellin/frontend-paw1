import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function RegisterAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [validation, setValidation] = useState({
    email: true,
    password: true,
    name: true,
  });

  async function register() {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setValidation((prevValidation) => ({ ...prevValidation, email: false }));
      Swal.fire("Peringatan", "Format email tidak valid", "warning");
      return;
    }

    if (password.length < 8) {
      setValidation((prevValidation) => ({
        ...prevValidation,
        password: false,
      }));
      Swal.fire("Peringatan", "Password harus minimal 8 karakter", "warning");
      return;
    }

    if (password !== cpassword) {
      setValidation((prevValidation) => ({
        ...prevValidation,
        password: false,
      }));
      Swal.fire("Peringatan", "Kata sandi tidak cocok", "warning");
      return;
    }

    if (!name) {
      setValidation((prevValidation) => ({ ...prevValidation, name: false }));
      Swal.fire("Peringatan", "Nama wajib diisi", "warning");
      return;
    }

    const admin = {
      name,
      email,
      password,
      cpassword,
    };

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/admins/register`,
        admin
      ).data;
      setName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      console.log(result);
      Swal.fire("Selamat", "Registrasi Berhasil", "success").then((result) => {
        window.location.href = "/loginadmin";
      });
    } catch (error) {
      Swal.fire("Oops", "Terjadi kesalahan", "error");
      console.error("Kesalahan registrasi:", error);
    }
  }

  return (
    <Container>
      <div className="tampilanhome">
        <Row className="justify-content-md-center">
          <Col>
            <div className="bs">
              <h2>Admin Form</h2>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setValidation((prevValidation) => ({
                        ...prevValidation,
                        name: e.target.value.length > 0,
                      }));
                    }}
                  />
                  {!validation.name && (
                    <Form.Text className="text-danger">
                      Nama wajib diisi
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setValidation((prevValidation) => ({
                        ...prevValidation,
                        email: /^\S+@\S+\.\S+$/.test(e.target.value),
                      }));
                    }}
                  />
                  {!validation.email && (
                    <Form.Text className="text-danger">
                      Format email tidak valid
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setValidation((prevValidation) => ({
                        ...prevValidation,
                        password: e.target.value.length >= 8,
                      }));
                    }}
                  />
                  {!validation.password && (
                    <Form.Text className="text-danger">
                      Password harus minimal 8 karakter
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="formCPassword">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                  {cpassword !== password && (
                    <Form.Text className="text-danger">
                      Confirm Password harus sama dengan Password
                    </Form.Text>
                  )}
                </Form.Group>

                <Button variant="primary mt-2" onClick={register}>
                  Daftar
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default RegisterAdmin;
