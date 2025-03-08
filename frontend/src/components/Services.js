import React from "react";
import { Col, Container, Row } from "reactstrap";

import img01 from "../assets/images/feature/img-01.png";
import img02 from "../assets/images/feature/img-02.png";
import img03 from "../assets/images/feature/img-03.png";
import img04 from "../assets/images/feature/img-04.png";
import img05 from "../assets/images/feature/img-05.png";
import img06 from "../assets/images/feature/img-06.png";

const ServicesCard = (props) => {
  return (
    <>
      <Col lg={4} md={6}>
        <div
          className={
            props.isShadow
              ? "service-box text-center mt-4 box-shadow"
              : "service-box text-center mt-4"
          }
        >
          <img src={props.imgsrc} alt="" className="img-fluid" />
          <h5 className="fs-18 mt-4">{props.title}</h5>
          <div className="lighlight-border mt-3"></div>
          <p className="text-muted mt-3">{props.caption}</p>
        </div>
      </Col>
      {/* <!--end col--> */}
    </>
  );
}

// Services data

const ServicesData = [
  {
    imgsrc: img01,
    title: "Penyimpanan Terdesentralisasi",
    caption:
      "Simpan sertifikat digital Anda di jaringan blockchain yang terdesentralisasi, memastikan keamanan tanpa ketergantungan pada server pusat.",
  },
  {
    imgsrc: img02,
    title: "Verifikasi Otomatis dan Transparan",
    caption:
      "Setiap sertifikat yang disimpan dapat diverifikasi oleh siapa pun di jaringan blockchain, memberikan transparansi penuh dan mencegah pemalsuan.",
    isShadow: true,
  },
  {
    imgsrc: img03,
    title: "Keaslian Sertifikat",
    caption:
      "Dengan blockchain, setiap sertifikat memiliki jejak digital yang tidak dapat diubah, menjamin keasliannya untuk selamanya.",
  },
  {
    imgsrc: img04,
    title: "Keamanan Berbasis Kriptografi",
    caption:
      "Sertifikat Anda dienkripsi dan disimpan menggunakan teknik kriptografi blockchain, memberikan perlindungan tingkat tinggi dari akses yang tidak sah.",
    isShadow: true,
  },
  {
    imgsrc: img05,
    title: "Validasi Peer-to-Peer",
    caption:
      "Validasi sertifikat dilakukan oleh node blockchain secara peer-to-peer, menghilangkan kebutuhan pihak ketiga dan mempercepat proses verifikasi.",
  },
  {
    imgsrc: img06,
    title: "Immutabilitas Data",
    caption:
      "Sertifikat yang disimpan di blockchain tidak bisa diubah atau dihapus, memastikan bahwa data tetap konsisten dan valid sepanjang waktu.",
    isShadow: true,
  },
];

const Services = () => {
  return (
    <>
      <section className="section">
        <Container id="services">
          <Row className="justify-content-center">
            <Col lg={7}> 
              <div className="header-title text-center">
                <p className="text-uppercase text-muted mb-2">
                  LAYANAN YANG KAMI BERIKAN
                </p>
                <h3>Kami Menjamin Keamanan Data</h3>
                <div className="title-border mt-3"></div>
                <p className="text-muted mt-3">
                  Kami menawarkan layanan penyimpanan dan verifikasi sertifikat digital yang aman, transparan, dan tak terbantahkan dengan memanfaatkan teknologi blockchain.
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            {/* Services Component Start */}

            {ServicesData.map((value, idx) => (
              <ServicesCard
                key={idx}
                imgsrc={value.imgsrc}
                title={value.title}
                caption={value.caption}
                isShadow={value.isShadow}
              />
            ))}

            {/* Services Component End */}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Services;
