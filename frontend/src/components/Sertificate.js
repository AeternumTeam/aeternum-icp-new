import React, { useState, useMemo } from "react";
import { 
  Col, Container, Row, Form, Spinner, Input, 
  FormGroup, Button, Modal, ModalHeader, 
  ModalBody, Alert 
} from "reactstrap";
import { FaCheck } from "react-icons/fa";
import { verify } from "../fetch/verifier";

// Utility functions
const formatDate = (dateString) => {
  const MONTHS = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  if (!dateString) return "";
  
  const date = new Date(dateString.split(',')[0]);
  if (isNaN(date.getTime())) return "";
  
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

const Certificate = () => {
  const [modal, setModal] = useState(false);
  const [badge, setBadge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggle = () => setModal(!modal);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const credentialValue = event.target.credential.value.trim();

    try {
      const result = await verify({ credential: credentialValue });

      if (!result?.data) {
        setError("Data sertifikat tidak valid");
        return false;
      }

      setBadge(result.data);
      setError("");
      toggle();
    } catch (error) {
      setError(
        error.response?.data?.message || 
        "Terjadi kesalahan saat memverifikasi sertifikat"
      );
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const certificateData = useMemo(() => {
    if (!badge) return [];

    return [
      { 
        id: "issueDate",
        status: badge.status, 
        text: `Diterbitkan pada ${formatDate(badge.issueDate)}` 
      },
      { 
        id: "issuer",
        status: badge.status, 
        text: `Diterbitkan oleh ${badge.issuer}` 
      },
      { 
        id: "publisher",
        status: badge.status, 
        text: `Diterbitkan menggunakan ${badge.publishedUsing}` 
      },
      { 
        id: "recipient",
        status: badge.status, 
        text: `Diterbitkan untuk ${badge.recipient}` 
      },
      { 
        id: "issuedOn",
        status: badge.status, 
        text: `Diterima pada ${formatDate(badge.issuedOn)}` 
      },
      { 
        id: "verified",
        status: badge.status, 
        text: "Terverifikasi" 
      },
    ];
  }, [badge]);

  const renderStatusIcon = (status) => {
    return status === "ISSUED" ? (
      <FaCheck className="text-success" />
    ) : (
      <Spinner size="sm" color="secondary" />
    );
  };

  return (
    <section className="section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={7}>
            <div className="text-center">
              <p className="text-uppercase text-white mb-2">Cek Sertifikat</p>
              <h3 className="text-uppercase text-white">
                Verifikasi Keaslian Sertifikat Digital
              </h3>
              <div className="title-border mt-3"></div>
              {/* <p className="title-desc text-white mt-3">
                Cukup masukkan kode sertifikat di bawah ini, dan sistem kami akan 
                langsung memvalidasi informasi Anda.
              </p> */}
            </div>
          </Col>
        </Row>

        <Row className="mt-5 pt-2 justify-content-center">
          <Col lg={9}>
            <div className="custom-form">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={12}>
                    <FormGroup>
                      <div className="input-group">
                        <Input
                          name="credential"
                          id="credential"
                          type="text"
                          className="form-control"
                          placeholder="Masukkan kode sertifikat"
                          required
                          disabled={isLoading}
                        />
                        <Button
                          color="primary"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Spinner size="sm" />
                          ) : (
                            "Verifikasi"
                          )}
                        </Button>
                      </div>
                    </FormGroup>
                    {error && (
                      <Alert 
                        color="danger" 
                        className="mt-3"
                        fade={true}
                        timeout={300}
                      >
                        {error}
                      </Alert>
                    )}
                  </Col>
                </Row>
              </Form>
            </div>

            <Modal 
              isOpen={modal} 
              toggle={toggle} 
              centered={true} 
              size="md"
              aria-labelledby="verification-modal"
              fade={true}
            >
              <ModalHeader toggle={toggle} id="verification-modal">
                <p className="fs-4 fw-bold mb-0 text-center">Verifikasi</p>
              </ModalHeader>
              <ModalBody className="mx-3 mb-3">
                {certificateData.map((detail) => (
                  <React.Fragment key={detail.id}>
                    <Row className="align-items-center">
                      <Col xs={1}>
                        {renderStatusIcon(detail.status)}
                      </Col>
                      <Col 
                        className={
                          detail.id === "verified" ? "fw-bold text-uppercase" : ""
                        }
                      >
                        {detail.text}
                      </Col>
                    </Row>
                    {detail.id !== "verified" && <hr />}
                  </React.Fragment>
                ))}
              </ModalBody>
            </Modal>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Certificate;