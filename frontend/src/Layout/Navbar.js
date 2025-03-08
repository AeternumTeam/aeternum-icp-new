import React, { useState, useEffect } from "react";
import { Collapse, Container, NavbarToggler, NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";
import Scrollspy from "react-scrollspy";

//import images
import logoLight from "../assets/images/logo-light.png";
import logoDark from "../assets/images/logo-dark.png";
import { Link } from "react-router-dom";
import GoogleButton from "../components/GoogleButton";

//import fetch
import { login } from "../fetch/auth.js";

const NavBar = ({isDark}, args) => {
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const [navClass, setnavClass] = useState("");

  const [modal, setModal] = useState(false);

  const toggleLogin = () => setModal(!modal);

  const toggle = () => setisOpenMenu(!isOpenMenu);

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setnavClass("nav-sticky");
    } else {
      setnavClass("");
    }
  }

  const isDarkClass = isDark ? "navbar-light" : "";

  return (
    <React.Fragment>
      <span>
        <nav
          className={
            "navbar navbar-expand-lg fixed-top " + 
            isDarkClass +
            " sticky " +
            navClass
          }
          id="navbar"
        >
          <Container>
            <Link className="navbar-brand logo text-uppercase" to="/">
              {isDark ? (
                <>
                  <img
                    src={logoLight}
                    className="logo-light"
                    alt=""
                    height="28"
                  />
                  <img
                    src={logoDark}
                    className="logo-dark"
                    alt=""
                    height="28"
                  />
                </>
              ) : (
                <>
                  <img
                    src={logoDark}
                    className="logo-dark"
                    alt=""
                    height="28"
                  />
                  <img
                    src={logoLight}
                    className="logo-light"
                    alt=""
                    height="28"
                  />
                </>
              )}
            </Link>
            <NavbarToggler
              className="navbar-toggler"
              type="button"
              onClick={toggle}
            >
              <i className="mdi mdi-menu"></i>
            </NavbarToggler>
            <Collapse
              isOpen={isOpenMenu}
              className="navbar-collapse"
              id="navbarNav"
            >
              <Scrollspy
                offset={-18}
                items={[
                  "home",
                  "about",
                  "certificate"
                ]}
                currentClassName="active"
                className="navbar-nav ms-auto navbar-center d-xxl-flex flex-col align-items-xxl-center"
                id="mySidenav"
              >
                <li className="nav-item">
                  <NavLink href="/">Beranda</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink href="/about">Tentang Kami</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink href="/checkcertificate">Cek Sertifikat</NavLink>
                </li>
                <div className="ms-2">
                  <Link to="#" className="btn btn-primary" onClick={toggleLogin}>
                    Masuk
                  </Link>
                </div>
              </Scrollspy>
            </Collapse>
          </Container>
        </nav>
      </span>

      <Modal isOpen={modal} toggle={toggleLogin} {...args} centered={true}>\
        <ModalBody className="mx-3">
          <p className="fs-3 fw-semibold">Masuk</p>
          <Form onSubmit={login}>
            <FormGroup floating>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="email"
              />
              <Label for="exampleEmail">
                Email
              </Label>
            </FormGroup>
            {' '}
            <FormGroup floating>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
              />
              <Label for="examplePassword">
                Password
              </Label>
            </FormGroup>
            {' '}
            <Button className="w-100 btn btn-primary mt-4">
              Masuk
            </Button>
          </Form>

          <div className="d-flex align-items-center my-4">
            <div className="flex-grow-1 border-top"></div>
              <span className="mx-3 text-muted">Atau</span>
            <div className="flex-grow-1 border-top"></div>
          </div>

          <GoogleButton/>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default NavBar;
