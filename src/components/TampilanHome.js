import { Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import scooter from "../assets/img/core-img/scooter1.svg";

function TampilanHome() {
  return (
    <Container>
      <h1 className="judul text-center">
        Selamat Datang di Sistem Layanan Antar Jemput ( UINJEK )
      </h1>

      <div className="tampilanhome mb-5">
        <HomeJek />
        <div className="row justify-content-center  fixed-bottom w-100 m-auto flex-nowrap">
          <div className="col-md-3">
            <Link to="" className="btn pengaduan btn-block">
              Home
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default TampilanHome;

export function HomeJek() {
  return (
    <Row className="justify-content-md-center">
      <div class="product-catagories-wrapper pt-3">
        <Container>
          <div class="section-heading">
            <h6 class="ml-3">Layanan UINJEK</h6>
          </div>
          <div class="product-catagory-wrap">
            <Container>
              <Card className="mb-3 catagory-card">
                <Card.Body>
                  <Link to="/listdriver">
                    <img className="img-scooter" src={scooter} alt="" />
                  </Link>
                  <p className="text-center">Lihat Daftar Driver</p>
                </Card.Body>
              </Card>
            </Container>
          </div>
        </Container>
      </div>
    </Row>
  );
}
