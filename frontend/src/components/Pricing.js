import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

const PricingData = [
  {
    title: "STARTER PLAN",
    price: "Rp. 5.999.999",
    isChildItem: [
      { id: 1, option: true, subItem: "Admin User" },
      { id: 2, option: true, subItem: "Verifikasi Sertifikat" },
      { id: 3, option: true, subItem: "Max 3 Courses & Events" },
      { id: 4, option: true, subItem: "5 Template Sertifikat" },
      { id: 5, option: true, subItem: "Manajemen Sertifikat" },
      { id: 6, option: true, subItem: "Share & Download Sertifikat" },
      { id: 8, option: true, subItem: "Bull Upload & Issuance" },
      { id: 7, option: false, subItem: "Autofill by Scan Sertifikat" },
      { id: 9, option: false, subItem: "QR Code Sertifikat" },
      { id: 10, option: false, subItem: "Prioritas Customer Support" },
      { id: 11, option: false, subItem: "Tracking & Laporan Sertifikat" },
      { id: 12, option: false, subItem: "Custom Otomatis Notifikasi Email" },
      { id: 13, option: false, subItem: "Onboarding Training Session" },
    ],
  },
  {
    title: "GROWTH PLAN",
    price: "Rp. 8.999.999",
    isSale: true,
    isChildItem: [
      { id: 1, option: true, subItem: "Admin User" },
      { id: 2, option: true, subItem: "Verifikasi Sertifikat" },
      { id: 3, option: true, subItem: "Max 3 Courses & Events" },
      { id: 4, option: true, subItem: "5 Template Sertifikat" },
      { id: 5, option: true, subItem: "Manajemen Sertifikat" },
      { id: 6, option: true, subItem: "Share & Download Sertifikat" },
      { id: 8, option: true, subItem: "Bull Upload & Issuance" },
      { id: 7, option: true, subItem: "Autofill by Scan Sertifikat" },
      { id: 9, option: true, subItem: "QR Code Sertifikat" },
      { id: 10, option: false, subItem: "Prioritas Customer Support" },
      { id: 11, option: false, subItem: "Tracking & Laporan Sertifikat" },
      { id: 12, option: false, subItem: "Custom Otomatis Notifikasi Email" },
      { id: 13, option: false, subItem: "Onboarding Training Session" },
    ],
  },
  {
    title: "SUPERIOR PLAN",
    price: "Rp. 15.000.000",
    isChildItem: [
      { id: 1, option: true, subItem: "Admin User" },
      { id: 2, option: true, subItem: "Verifikasi Sertifikat" },
      { id: 3, option: true, subItem: "Max 3 Courses & Events" },
      { id: 4, option: true, subItem: "5 Template Sertifikat" },
      { id: 5, option: true, subItem: "Manajemen Sertifikat" },
      { id: 6, option: true, subItem: "Share & Download Sertifikat" },
      { id: 8, option: true, subItem: "Bull Upload & Issuance" },
      { id: 7, option: true, subItem: "Autofill by Scan Sertifikat" },
      { id: 9, option: true, subItem: "QR Code Sertifikat" },
      { id: 10, option: true, subItem: "Prioritas Customer Support" },
      { id: 11, option: true, subItem: "Tracking & Laporan Sertifikat" },
      { id: 12, option: true, subItem: "Custom Otomatis Notifikasi Email" },
      { id: 13, option: true, subItem: "Onboarding Training Session" },
    ],
  },
];

const Pricing = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <section className="section bg-light">
      <Container>
        <Row className="justify-content-center" id="pricing">
          <Col lg={7}>
            <div className="header-title text-center mb-4">
              <p className="text-uppercase text-muted mb-2">Penawaran</p>
              <h3>Pilih Paket Berlangganan Terbaik untuk Anda</h3>
              <div className="title-border mt-3"></div>
              <p className="title-desc text-muted mt-3">
                Temukan paket berlangganan sesuai kebutuhan Anda. Kami
                menyediakan opsi fleksibel untuk mendukung perjalanan Anda menuju
                pencapaian lebih tinggi.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="align-items-center">
          {PricingData.map((items, key) => (
            <Col key={key} lg={4} md={6}>
              <div className="pricing-box bg-white box-shadow text-center p-5 mt-5 rounded">
                {items.isSale && (
                  <div className="pricing-label">
                    <h5 className="text-white fs-16">Best</h5>
                  </div>
                )}
                <p className="price-title mb-4 pb-3">{items.title}</p>
                <h1 className="mb-0 price w-100">{items.price}</h1>
                <div className="pricing-features mt-4 pt-4">
                  {items.isChildItem
                    .slice(0, isExpanded ? items.isChildItem.length : 9)
                    .map((item) => (
                      <div key={item.id} className="d-flex align-items-start gap-2 text-start">
                        {item.option ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill="#05bd93"
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            width="16"
                            viewBox="0 0 16 2"
                          >
                            <path
                              d="M1 1H13"
                              stroke="#6D7081"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                        <p className="">{item.subItem}</p>
                      </div>
                    ))}
                </div>
                <button
                  onClick={toggleExpand}
                  style={{ color: "#05bd93", fontWeight: "bold" }}
                  className="btn pricing-btn-all w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  {isExpanded ? "Lihat lebih sedikit" : "Lihat Fitur Lengkap"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{
                      transform: isExpanded ? "rotate(0deg)" : "rotate(180deg)",
                      transition: "transform 0.3s",
                    }}
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m17 14l-5-5l-5 5"
                    />
                  </svg>
                </button>
                <div className="mt-5">
                  <Link to="/#" className="btn btn-primary w-100">
                    Pilih Paket
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Pricing;