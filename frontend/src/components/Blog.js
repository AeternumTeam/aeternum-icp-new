import React from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";

import img1 from "../assets/images/blog/img-1.jpg";
import img2 from "../assets/images/blog/img-2.jpg";
import img3 from "../assets/images/blog/img-3.jpg";

import img5 from "../assets/images/users/img-5.jpg";
import img6 from "../assets/images/users/img-6.jpg";
import img7 from "../assets/images/users/img-7.jpg";

// BlogCard

const BlogCard = (props) => {
  return (
    <React.Fragment>
      <Col lg={4}>
        <div className="blog-box box-shadow rounded mt-4 p-3">
          <div className="blog-img">
            <img src={props.imgsrc} className="img-fluid rounded" alt="" />
            <div className="read-more">
              <Link to="/#">
                <i className="mdi mdi-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/#" className="primary-link">
              <h5 className="fs-19 mb-1">{props.title}</h5>
            </Link>
            <p className="text-muted mt-2">{props.subtitle}</p>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img
                  src={props.imgsrc2}
                  alt=""
                  height="45"
                  className="rounded-circle me-2"
                />
                <p className="text-muted mb-0">{props.name}</p>
              </div>
              <p className="mb-0 float-end text-muted">
                <i className="mdi mdi-clock-time-four-outline align-middle me-1 text-primary"></i>{" "}
                {props.time}
              </p>
            </div>
          </div>
        </div>
        {/* <!--end blog--> */}
      </Col>
    </React.Fragment>
  );
}

// Blog Data

const BlogData = [
  {
    imgsrc1: img1,
    title: "How to be appreciated for your hard work as a developer",
    subtitle:
      "The final text is not yet available. Dummy texts have Internet tend been in use by typesetters since the 16th century.",
    imgsrc2: img5,
    name: "admin",
    time: "24 min",
  },
  {
    imgsrc1: img2,
    title: "Developers watch out for these burnout symptoms",
    subtitle:
      "Allegedly, a Latin scholar established the origin of the established text Internet by compiling unusual word.",
    imgsrc2: img6,
    name: "admin",
    time: "32 min",
  },
  {
    imgsrc1: img3,
    title: "How designers and developers can collaborate better",
    subtitle:
      "It seems that only fragments of the original text remain in only fragments the Lorem Ipsum texts used today.",
    imgsrc2: img7,
    name: "admin",
    time: "45 min",
  },
];

const Blog = () => {
  return (
    <React.Fragment>
      <section className="section" id="blog">
        <Container>
          <Row className="justify-content-center">
            <Col lg={7}>
              <div className="header-title text-center mb-5">
                <p className="text-uppercase text-muted mb-2">News</p>
                <h3>Latest Articles And News</h3>
                <div className="title-border mt-3"></div>
                <p className="title-desc text-muted mt-3">
                  We craft digital, graphic and dimensional thinking, to create
                  category leading brand experiences that have meaning and add a
                  value.
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            {/* Blog Component Start*/}

            {BlogData.map((value, idx) => (
              <BlogCard
                key={idx}
                imgsrc={value.imgsrc1}
                title={value.title}
                subtitle={value.subtitle}
                imgsrc2={value.imgsrc2}
                name={value.name}
                time={value.time}
              />
            ))}

            {/* Blog Component End*/}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}

export default Blog;
