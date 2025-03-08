import React from "react";
import NavBar from "../../Layout/Navbar";
import BackToTop from "../../components/BackToTop";
import Footer from "../../Layout/Footer";
import FooterAlt from "../../Layout/FooterAlt";
import Sertificate from "../../components/Sertificate";
import SectionCertificate from "./Section";
import Pricing from "../../components/Pricing";
import Process from "../../components/Process";
import TutorialVideo from "../../components/TutorialVideo";

const CheckSertificate = () => {
  return (
    <React.Fragment>
      <NavBar isDark={false} />
      <SectionCertificate />
      <TutorialVideo />
      <Process/>
      <Footer />
      <FooterAlt />
      <BackToTop />
    </React.Fragment>
  );
};

export default CheckSertificate;
