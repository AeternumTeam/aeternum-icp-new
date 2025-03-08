import React from "react";
import { Button, Col, Container, Row } from "reactstrap";

const CTA = () => {
  return (
    <React.Fragment>
      <section className="bg-cta">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="header-title text-center">
                <h2>Become a part of zoric bussiness community today</h2>
                <p className="title-desc text-muted mt-3">
                  Start working with zoric that can provide everything you need
                  to generate awareness, drive traffic, connect.
                </p>
                <div className="mt-4">
                  <Button color="success" href="/#" className="mt-2">
                    Get Started
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}

export default CTA;
