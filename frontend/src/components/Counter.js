import React from "react";
import CountUp from "react-countup";
import { Col, Container, Row } from "reactstrap";

import achivements from "../assets/images/achivements.jpg";

const CounterData = [
  {
    endPoint: 485,
    iconClass: "mdi mdi-heart",
    title: "Happy Clients",
  },
  {
    endPoint: 536,
    iconClass: "mdi mdi-layers",
    title: "Projects Completed",
  },
  {
    endPoint: 1652,
    iconClass: "mdi mdi-cloud-download",
    title: "Files Downloaded",
  },
  {
    endPoint: 14652,
    iconClass: "mdi mdi-code-not-equal-variant",
    title: "Liens Of Code",
  },
];

const Counter = () => {
  return (
    <React.Fragment>
      <section className="section bg-light">
        <Container>
          <Row>
            <Col lg={6}>
              <div className="counter-box">
                <h4>Our Achivements</h4>
                <p className="text-muted mt-2">
                  You can combine all the zoric You can combine all the zoric
                  templates into a single one, you can take a component from the
                  Application theme and use it in the Website. It seems that
                  only fragments of the original text remain in only fragments
                  the Lorem Ipsum texts used today.
                </p>

                <div className="mt-4 mb-5">
                  <Row id="counter">
                    {/* Counter Component Start */}

                    {CounterData.map((val, key) => (
                      <Col key={key} md={6}>
                        <div className="counter-box mt-4">
                          <div className="d-flex">
                            <div className="counter-icon">
                              <i className={val.iconClass}></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h4 className="counter_value" data-target="485">
                                <CountUp end={val.endPoint} duration={2} />
                              </h4>
                              <p className="text-muted">{val.title}</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}

                    {/* Counter Component Start */}
                  </Row>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="img">
                <img
                  src={achivements}
                  className="img-fluid box-shadow-lg rounded"
                  alt=""
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}

export default Counter;
