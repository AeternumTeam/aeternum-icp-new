import React from "react";
import logolight from "../assets/images/logo-light.png";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

const ListCard = (props) => {
  return (
    <React.Fragment>
      <div className={props.isList ? "col-lg-3 col-md-6" : "col-lg-2 col-md-6"}>
        <div className={props.isShow ? "mt-4 ps-0 ps-lg-5" : "mt-4"}>
          <h6 className="text-white text-uppercase fs-16">{props.title}</h6>
          <ul className="list-unstyled footer-link mt-3 mb-0">
            {props.isChildList.map((Item, key) => (
              <li key={key}>
                <Link to="/#" alt="work">
                  {Item.subList}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

const ListData = [
  {
    title: "Resources",
    isList: true,
    isShow: true,
    isChildList: [
      { id: 1, subList: "Tentang Kami" },
      { id: 2, subList: "Dokumentasi" },
      { id: 3, subList: "Term & Service" },
      { id: 4, subList: "Components" },
    ],
  },
  {
    title: "Help",
    isList: false,
    isShow: false,
    isChildList: [
      { id: 1, subList: "Sign Up" },
      { id: 2, subList: "Login" },
      { id: 3, subList: "Careers" },
      { id: 4, subList: "Privacy Policy" },
    ],
  },
];

const ListIconData = [
  {
    iconClass: "mdi mdi-facebook",
  },
  {
    iconClass: "mdi mdi-linkedin",
  },
  {
    iconClass: "mdi mdi-pinterest",
  },
  {
    iconClass: "mdi mdi-twitter",
  },
];

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="bg-footer">
        <Container>
          <Row>
            <Col lg={3}>
              <div className="mt-4">
                <Link to="/">
                  <img src={logolight} alt="" height="22" />
                </Link>
                <p className="text-white-50 mt-3 pt-2 mb-0 ">
                  Sertifikat Digital Aman dan Terjamin dengan Teknologi Blockchain.
                </p>
                <div className="mt-4">
                  <ul className="list-inline footer-social">
                    {/* Footer Icon Component Start */}
                    {ListIconData.map((item, key) => (
                      <li className="list-inline-item" key={key}>
                        <Link to="/#">
                          <i className={item.iconClass}></i>
                        </Link>
                      </li>
                    ))}
                    {/* Footer Icon Component End */}
                  </ul>
                </div>
              </div>
            </Col>

            {/* Footer List Start*/}

            {ListData.map((item, key) => (
              <ListCard
                key={key}
                isList={item.isList}
                isShow={item.isShow}
                title={item.title}
                isChildList={item.isChildList}
              />
            ))}
            {/* Footer List End*/}

            <Col lg={4}>
              <div className="mt-4">
                <h6 className="text-white text-uppercase fs-16">Latest news</h6>
                <div className="mt-3 mb-0">
                  <div className="d-flex">
                    <i className="mdi mdi-twitter text-white-50 float-start"></i>
                    <div className="flex-grow-1">
                      <p className="text-white-50 ps-3">
                        Pleasures have to repudiated annoyances accepted
                        therefore always holds chooses enjoy a pleasure
                        consequences.
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="d-flex">
                      <i className="mdi mdi-twitter text-white-50 float-start"></i>
                      <div className="flex-grow-1">
                        <p className="text-white-50 ps-3">
                          Greater pleasures el esndures pains avoid welcomed
                          avoided pariatu
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
