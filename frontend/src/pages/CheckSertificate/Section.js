import React, { useState } from "react";
import Certificate from "../../components/Sertificate";
import { Col, Container, Row } from "reactstrap";

import img6 from "../../assets/images/home/home6-1.png";
import { Link } from "react-router-dom";

const SectionCertificate = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <React.Fragment>
      {/* <!-- START HOME --> */}
      <section className="bg-sertif" id="certificate">
        <div className="bg-overlay"></div>
        <Certificate/>
      </section>
      {/* <!-- END HOME --> */}
      {/* <!-- START SHAPE --> */}
    </React.Fragment>
  );
};

export default SectionCertificate;
