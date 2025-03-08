import React from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";

import img5 from "../assets/images/users/img-5.jpg";
import img6 from "../assets/images/users/img-6.jpg";
import img7 from "../assets/images/users/img-7.jpg";

const data = [img5, img6, img7];

const TestinomialData = [
  {
    clientName: "Rina Andini",
    caption: " \" Aeternum mempermudah kami dalam menyimpan dan memverifikasi sertifikat pelatihan karyawan. Dengan teknologi blockchain, kami yakin data tetap aman dan valid, mempercepat proses verifikasi yang sebelumnya memakan waktu. \" ",
    profile: "HR Manager"
  },
  {
    clientName: "Dimas Prasetyo",
    caption: " \" Saya merasa tenang menyimpan ijazah dan sertifikat kompetensi saya di Aeternum. Platform ini memanfaatkan teknologi AI untuk memverifikasi keaslian dokumen secara otomatis, memberi saya keyakinan bahwa data saya aman dan terjamin. \" ",
    profile: "Mahasiswa"
  },
  {
    clientName: "Anita Kusuma",
    caption: " \" Aeternum memudahkan kami dalam menyimpan sertifikat kelulusan siswa dengan aman dan memastikan keaslian dokumen. Proses verifikasi untuk alumni juga jadi lebih cepat dan efisien, memberikan kenyamanan bagi kami dan para lulusan. \" ",
    profile: "Kepala Sekolah"
  },
];

const CustomSlide = (props) => {
  const { clientName, caption, profile } = props;
  return (
    <React.Fragment>
      <div className="carousel-item active">
        <div className="testimonial-box text-center mt-4">
          <div className="testimonial-content rounded">
            <p className="text-muted mb-0">
              {caption}
            </p>
          </div>
          <i className="mdi mdi-format-quote-close text-primary display-3"></i>
          <h5 className="fs-18">{clientName}</h5>
          <p className="text-muted mb-0">{profile}</p>
        </div>
      </div>
    </React.Fragment>
  );
}

const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    </div>
  );
};

const NextBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
    </div>
  );
};

const Testimonial = () => {
  return (
    <React.Fragment>
      <section className="section">
        <Container id="testimonial">
          <Row className="justify-content-center">
            <Col className="mb-5 pb-5" lg={7}>
              <div className="header-title text-center">
                <p className="text-uppercase text-muted mb-2">Testimoni</p>
                <h3>Beberapa Feedback Dari Client Kami</h3>
                <div className="title-border mt-3"></div>
                <p className="title-desc text-muted mt-3">
                  Kami bangga telah membantu banyak klien dalam menyimpan dan memverifikasi sertifikat digital mereka.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="mt-5 pt-2">
            <Col lg={12}>
              <div
                id="testimonialSlider"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <Slider
                  autoplay
                  autoplaySpeed={2000}
                  dots
                  pauseOnDotsHover={true}
                  pauseOnFocus={true}
                  initialSlide={2}
                  infinite
                  prevArrow={<PreviousBtn />}
                  nextArrow={<NextBtn />}
                  customPaging={(i) => {
                    return (
                      <img
                        src={data[i]}
                        className="img-fluid mx-auto d-block"
                        alt="work_img"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    );
                  }}
                  dotsClass="slick-dots custom-indicator"
                >

                  {/* Testimonial Text Slide Component Start */}
                  {TestinomialData.map((item, key) => (
                    <CustomSlide
                      key={key}
                      clientName={item.clientName}
                      caption={item.caption}
                      profile={item.profile} />
                  ))}
                  {/* Testimonial Text Slide Component End */}
                </Slider>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Testimonial;
