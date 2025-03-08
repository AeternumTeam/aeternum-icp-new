import React from "react";
import Section from "./Section"
import NavBar from "../../Layout/Navbar";
import Why from "../../components/Why";
import BackToTop from "../../components/BackToTop";
import Footer from "../../Layout/Footer";
import FooterAlt from "../../Layout/FooterAlt";
import Process from "../../components/Process";
import Services from "../../components/Services";
import Testimonial from "../../components/Testimonial";
import Pricing from "../../components/Pricing";

const Layout1 = () => {
  return (
    <React.Fragment>
      <NavBar isDark={false} />
      {/* import Section */}
      <Section />
      <Services />
      <Why />
      <Testimonial />
      <Pricing />
      <Footer />
      <FooterAlt />
      <BackToTop />
    </React.Fragment>
  );
};

export default Layout1;
