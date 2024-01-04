import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/img/gmaps/driver.png";
import Swal from "sweetalert2";

const NavbarAdmin = () => {
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  function logout(event) {
    event.preventDefault();
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("admin");
        Swal.fire("Okay", "Logout Berhasil", "success").then(() => {
          window.location.href = "/home";
        });
      }
    });
  }

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="">
          <img className="img-logo" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto right">
            {admin ? (
              <>
                <NavDropdown
                  title={<span style={{ color: "white" }}>Admin</span>}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    href="/login"
                    onClick={(event) => logout(event)}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarAdmin;
