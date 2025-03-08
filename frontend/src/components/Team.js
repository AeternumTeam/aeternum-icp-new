import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import img1 from "../assets/images/users/img-1.jpg";
import img2 from "../assets/images/users/img-2.jpg";
import img3 from "../assets/images/users/img-3.jpg";
import img4 from "../assets/images/users/img-4.jpg";

const TeamCard = (props) => {
  return (
    <React.Fragment>
      <Col lg={3} md={6}>
        <div className="team-box text-center">
          <div className="team-img position-relative">
            <img src={props.imgsrc} className="img-fluid rounded" alt="" />
            <div className="team-content">
              <ul className="list-inline mb-0 p-0">
                {props.isIcon.map((item,key) => (
                <li key={key} className="list-inline-item">
                <Link to="/#">
                  <i className={item.icon}></i>
                </Link>
              </li>  
                ))}
              </ul>
            </div>
          </div>
          <div className="p-3">
            <Link to="/#" className="text-primary">
              <h5 className="fs-18 mb-1">{props.name}</h5>
            </Link>
            <p className="mb-0">{props.designation}</p>
          </div>
        </div>
        {/* <!--end team-box--> */}
      </Col>
    </React.Fragment>
  );
}

const TeamData = [
  {
    imgsrc: img2,
    name: "Juliana Waddell",
    designation: "CEO & Founder",
    isIcon: [
      {icon : "mdi mdi-facebook"},
      {icon : "mdi mdi-instagram"},
      {icon : "mdi mdi-whatsapp"},
    ]
  },
  {
    imgsrc: img1,
    name: "Tyler Raymer",
    designation: "Project Manager",
    isIcon: [
      {icon : "mdi mdi-facebook"},
      {icon : "mdi mdi-instagram"},
      {icon : "mdi mdi-whatsapp"},
    ]
  },
  {
    imgsrc: img3,
    name: "Chris Lewis",
    designation: "UI/UX Designer",
    isIcon: [
      {icon : "mdi mdi-facebook"},
      {icon : "mdi mdi-instagram"},
      {icon : "mdi mdi-whatsapp"},
    ]
  },
  {
    imgsrc: img4,
    name: "Juliana Waddell",
    designation: "Web Developer",
    isIcon: [
      {icon : "mdi mdi-facebook"},
      {icon : "mdi mdi-instagram"},
      {icon : "mdi mdi-whatsapp"},
    ]
  },
];

const Team = () => {
  return (
    <React.Fragment>
      <section className="section bg-light" id="team">
        <Container>
          <Row className="justify-content-center">
            <Col lg={7}>
              <div className="header-title text-center">
                <p className="text-uppercase text-muted mb-2">
                  meet our Expert
                </p>
                <h3>Amazing and talented People work here</h3>
                <div className="title-border mt-3"></div>
                <p className="title-desc text-muted mt-3">
                  Porttitor dolor donec pulvinar tortor nisi quis dapibus tortor
                  commodo sed Pellentesque hendrerit pellentesque libero nec
                  sollicitudin.
                </p>
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            {/* Team Detail Component Start */}

            {TeamData.map((value, idx) => (
              <TeamCard
                key={idx}
                imgsrc={value.imgsrc}
                name={value.name}
                designation={value.designation}
                isIcon = {value.isIcon} 
              />
            ))}

            {/* Team Detail Component End */}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}

export default Team;
