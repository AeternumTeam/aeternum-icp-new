import React from "react";

import about from "../assets/images/about.jpg";
import { Container, Row, Col } from "reactstrap";

const SkillCard = (props) => {
  return (
    <React.Fragment>
      <div className="mt-4">
        <p className="fw-bold mb-2">{props.title}</p>
        <div className="progress">
          <div
            className="progress-bar rounded"
            style={{ width: props.percentage }}
          >
            <p className="progress-value fs-15 fw-bold">{props.percentage}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

// Skill Data

const SkillData = [
  {
    title: "Keamanan Terjamin",
    percentage: "100%",
  },
  {
    title: "Verifikasi Instan",
    percentage: "95%",
  },
  {
    title: "Transparansi Data",
    percentage: "98%",
  },
  {
    title: "Ketersediaan Sertifikat",
    percentage: "99%",
  },
];

const Why = () => {
  return (
    <React.Fragment>
      <section className="section bg-light">
        <Container>
          <Row className="align-items-center g-3 g-lg-0">
            <Col lg={6}>
              <div className="skill-box bg-white p-4 rounded box-shadow">
                <p className="text-uppercase mb-1">Kenapa Memakai Blockchain</p>
                <h3 className="mb-2">
                  Menghadirkan Keamanan Sertifikat Digital dengan Teknologi Blockchain.
                </h3>
                <p className="text-muted">
                  Kami mengamankan sertifikat digital dengan teknologi blockchain, menjamin keaslian dan verifikasi instan.
                </p>

                {/* Skill Component Start */}
                <div className="skills">
                  {SkillData.map((value, idx) => (
                    <SkillCard
                      key={idx}
                      title={value.title}
                      percentage={value.percentage}
                    />
                  ))}
                  {/* Skill Component End */}
                </div>
              </div>
            </Col>
            <Col className="about-img" lg={6}>
              <img
                src={about}
                className="img-fluid rounded box-shadow"
                alt=""
              />
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}

export default Why;
