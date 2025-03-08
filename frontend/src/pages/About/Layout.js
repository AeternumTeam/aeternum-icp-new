import React from "react";
import NavBar from "../../Layout/Navbar";
import BackToTop from "../../components/BackToTop";
import Footer from "../../Layout/Footer";
import FooterAlt from "../../Layout/FooterAlt";
import Contact from "../../components/Contact";
import About from "../../components/About";

const AboutPage = () => {
  return (
    <React.Fragment>
      <NavBar isDark={true} />
      <About/>
      <Contact/>
      <Footer />
      <FooterAlt />
      <BackToTop />
    </React.Fragment>
  );
};

export default AboutPage;
