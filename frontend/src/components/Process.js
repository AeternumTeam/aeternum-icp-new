import React from "react";
import { Col, Container, Row } from "reactstrap";

const ProcessCard = (props) => {
  return (
    <React.Fragment>
      <Col lg={3} md={6}>
        <div className={props.number !== "04" ? "process-box process-border text-center" : "process-box text-center"}>
          <div className="process-count text-white mt-4">
            <h3 className="process-number">{props.number}</h3>
          </div>

          <div className="process-content bg-light mt-5 rounded p-4">
            <h5 className="fs-18">{props.step}</h5>
            <p className="text-muted mb-0">{props.caption}</p>
          </div>
        </div>
        {/* <!--end process-box--> */}
      </Col>
    </React.Fragment>
  );
}

// Process Data

const ProcessData = [
  {
    number: "01",
    step: "Daftar",
    caption: "Mulai dengan membuat akun untuk mengakses platform kami.",
  },
  {
    number: "02",
    step: "Unggah Sertifikat",
    caption: "Unggah sertifikat digital Anda dengan penyimpanan aman di blockchain.",
  },
  {
    number: "03",
    step: "Verifikasi",
    caption: "Verifikasi sertifikat Anda secara real-time dengan satu klik.",
  },
  {
    number: "04",
    step: "Bagikan Sertifikat",
    caption: "Kelola dan akses sertifikat Anda dari mana saja, kapan saja.",
  },
];

const Process = () => {
  return (
    <React.Fragment>
      <section className="bg-process vh-100 d-flex align-items-center" id="process">
        <Container>
          <Row className="justify-content-center">
            <Col lg={7}>
              <div className="header-title text-center">
                <h3>Cara Kerja Kami</h3>
                <div className="title-border mt-3"></div>
                <p className="title-desc text-muted mt-3">
                  Proses penyimpanan dan verifikasi sertifikat digital yang mudah dan cepat. Ikuti langkah-langkah berikut untuk memastikan keamanan sertifikat Anda menggunakan teknologi blockchain.
                </p>
              </div>
            </Col>
          </Row>

          <Row className="mt-5 pt-2">
            {/* Process Component Start */}

            {ProcessData.map((value, idx) => (
              <ProcessCard
                key={idx}
                number={value.number}
                step={value.step}
                caption={value.caption}
                isShow={value.isShow}
              />
            ))}

            {/* Process Component End */}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}

export default Process;
