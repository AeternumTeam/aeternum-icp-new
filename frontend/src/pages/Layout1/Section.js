import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import img6 from "../../assets/images/home/home6-1.png";

const Section = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <React.Fragment>
      {/* <!-- START HOME --> */}
      <section className="bg-home" id="home">
        <div className="bg-overlay"></div>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="home-content me-lg-5">
                <h6 className="sub-title mb-3 text-white">AETERNUM</h6>
                <h1 className="mb-4 text-white">
                 Sertifikat Digital Aman dan Terjamin dengan Teknologi{" "}
                  <span className="text-primary">Blockchain</span>
                </h1>
                <p className="text-white-50 fs-17">
                  Lindungi sertifikat digital kamu dengan teknologi
                  blockchain yang memastikan keamanan, integritas,
                  dan aksesibilitas penuh di seluruh dunia.
                </p>
                <div className="mt-4">
                  <Link to="/#" className="btn btn-primary mt-2">
                    Mulai Sekarang
                  </Link>{" "}
                  <Link to="/#" className="btn btn-outline-white mt-2 ms-md-1">
                    Pelajari Lebih Lanjut
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mt-4 mt-lg-0">
                <img src={img6} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <!-- END HOME --> */}
      {/* <!-- START SHAPE --> */}
      <div className="position-relative">
        <div className="shape">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="1440"
            height="150"
            preserveAspectRatio="none"
            viewBox="0 0 1440 150"
          >
            <g mask='url("#SvgjsMask1022")' fill="none">
              <path
                d="M 0,58 C 144,73 432,131.8 720,133 C 1008,134.2 1296,77.8 1440,64L1440 250L0 250z"
                fill="rgba(255, 255, 255, 1)"
              ></path>
            </g>
            <defs>
              <mask id="SvgjsMask1022">
                <rect width="1440" height="250" fill="#ffffff"></rect>
              </mask>
            </defs>
          </svg>
        </div>
      </div>

    </React.Fragment>
  );
};

export default Section;
