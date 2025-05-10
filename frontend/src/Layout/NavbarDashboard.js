import React, { useState, useEffect } from "react";
import { Collapse, Container, NavbarToggler, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form } from "reactstrap";
import Scrollspy from "react-scrollspy";
import { CgProfile } from "react-icons/cg";

//import images
import logoLight from "../assets/images/logo-light.png";
import logoDark from "../assets/images/logo-dark.png";
import { Link } from "react-router-dom";

//fetch
import { logout } from "../fetch/auth";

const NavBarDashboard = ({isDark, direction, ...args}) => {
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const [navClass, setnavClass] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

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

  const isDarkClass = isDark ? "navbar-dark" : "";

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
                    src={logoDark}
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
                  "services",
                  "process",
                  "testimonial",
                  "sertificate"
                ]}
                currentClassName="active"
                className="navbar-nav ms-auto navbar-center d-xxl-flex flex-col align-items-xxl-center"
                id="mySidenav"
              >
                <div className="ms-2">
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                        <DropdownToggle>
                            <CgProfile/>
                        </DropdownToggle>
                        <DropdownMenu {...args} end={true} className="mt-2">
                            <DropdownItem>
                            <i className="fa fa-th"></i> Dashboard
                            </DropdownItem>
                            <DropdownItem>
                            <i className="fa fa-user"></i> Profile
                            </DropdownItem>
                            <DropdownItem onClick={logout}>
                            <i className="fa fa-sign-out"></i> Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
              </Scrollspy>
            </Collapse>
          </Container>
        </nav>
      </span>
    </React.Fragment>
  );
};

export default NavBarDashboard;
