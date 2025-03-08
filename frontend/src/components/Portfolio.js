import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

//Import Images
import img1 from "../assets/images/portfolio/img-1.jpg";
import img2 from "../assets/images/portfolio/img-2.jpg";
import img3 from "../assets/images/portfolio/img-3.jpg";
import img4 from "../assets/images/portfolio/img-4.jpg";
import img5 from "../assets/images/portfolio/img-5.jpg";
import img6 from "../assets/images/portfolio/img-6.jpg";
import img7 from "../assets/images/portfolio/img-7.jpg";
import img8 from "../assets/images/portfolio/img-8.jpg";

const GalleryData = [
  {
    image: img1,
    title: "Motion Graphic",
    category: ["Photography", "Development"],
  },
  {
    image: img2,
    title: "Creative Flyer",
    category: ["Photography"],
  },
  {
    image: img3,
    title: "Stories Collective",
    category: ["Development"],
  },
  {
    image: img4,
    title: "Lightning Shot",
    category: ["Project", "Design"],
  },
  {
    image: img5,
    title: "Mockup Collection",
    category: ["Development", "Project", "Design"],
  },
  {
    image: img6,
    title: "Company V-card",
    category: ["Photography"],
  },
  {
    image: img7,
    title: "Mockup box with paints",
    category: ["Development", "Design"],
  },
  {
    image: img8,
    title: "Pen and article",
    category: ["Photography"],
  },
];

const Gallery = () => {
  const [displayCategory, setCategory] = useState("All");
  const [photoIndex, setphotoIndex] = useState(0);
  const [isOpen, setisOpen] = useState(false);
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <React.Fragment>
      <section className="section" id="portfolio">
        <Container fluid={true}>
          <Row className="justify-content-center">
            <Col lg={7}>
              <div className="header-title text-center">
                <p className="text-uppercase text-muted mb-2">Portfolio</p>
                <h3>Our Works</h3>
                <div className="title-border mt-3"></div>
                <p className="title-desc text-muted mt-3">
                  We craft digital, graphic and dimensional thinking, to create
                  category leading brand experiences that have meaning and add a
                  value.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="my-4 pt-2">
            <Col lg={12}>
              <div className="filters-group">
                <ul className="nav filter-options list-unstyled list-inline justify-content-center">
                  <li
                    className={
                      displayCategory === "All"
                        ? "nav-link list-inline-item mt-2 active"
                        : "nav-link list-inline-item mt-2"
                    }
                    onClick={() => setCategory("All")}
                  >
                    All
                  </li>

                  <li
                    className={
                      displayCategory === "Project"
                        ? "nav-link list-inline-item mt-2 active"
                        : "nav-link list-inline-item mt-2"
                    }
                    onClick={() => setCategory("Project")}
                  >
                    Project
                  </li>

                  <li
                    className={
                      displayCategory === "Design"
                        ? "nav-link list-inline-item mt-2 active"
                        : "nav-link list-inline-item mt-2"
                    }
                    onClick={() => setCategory("Design")}
                  >
                    Design
                  </li>

                  <li
                    className={
                      displayCategory === "Photography"
                        ? "nav-link list-inline-item mt-2 active"
                        : "nav-link list-inline-item mt-2"
                    }
                    onClick={() => setCategory("Photography")}
                  >
                    Photography
                  </li>

                  <li
                    className={
                      displayCategory === "Development"
                        ? "nav-link list-inline-item mt-2 active"
                        : "nav-link list-inline-item mt-2"
                    }
                    onClick={() => setCategory("Development")}
                  >
                    Development
                  </li>
                </ul>
              </div>
            </Col>
          </Row>

          
        </Container>

        <Container className="mt-5" fluid={true}>
            <Row className="g-2" id="grid">
              {GalleryData.filter(
                ({ category }) =>
                  category.includes(displayCategory) ||
                  displayCategory === "All"
              ).map(({ title, image, category }, key) => (
                <Col
                  key={key}
                  className="picture-item"
                  data-groups={category}
                  md={6}
                  lg={3}
                >
                  <div className="portfolio-box rounded">
                    <img className="img-fluid" src={image} alt="work-img" />
                    <div className="portfolio-content">
                      <div className="img-view">
                        <i
                          onClick={() => {
                            setphotoIndex(key);
                            setisOpen(!isOpen);
                            console.log(key);
                          }}
                          className="mdi mdi-plus text-muted image-popup"
                        ></i>
                        <div className="gallery-overlay"></div>
                      </div>
                      <div className="portfolio-caption">
                        <Link to="/#" className="text-primary">
                          <h5 className="mb-1 fs-18">{title}</h5>
                        </Link>
                        <p className="mb-0">{category.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                  {/* <!--end portfolio-box--> */}
                </Col>
              ))}

              {/* lightbox portfolio images */}

              {isOpen && (
                <Lightbox
                  mainSrc={images[photoIndex]}
                  nextSrc={images[(photoIndex + 1) % images.length]}
                  prevSrc={
                    images[(photoIndex + images.length - 1) % images.length]
                  }
                  onCloseRequest={() => setisOpen(false)}
                  onMovePrevRequest={() =>
                    setphotoIndex(
                      (photoIndex + images.length - 1) % images.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setphotoIndex((photoIndex + 1) % images.length)
                  }
                />
              )}
            </Row>
          </Container>
      </section>
    </React.Fragment>
  );
};
export default Gallery;
