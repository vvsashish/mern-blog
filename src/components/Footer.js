import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";

const Footer = () => (
  <Container>
    <Row>
      <Col md={4}>
        <h5>Contact Me</h5>
        <p>Email: vvsashish96@gmail.com</p>
        <p>Phone: +123 456 7890</p>
      </Col>
      <Col md={4}>
        <h5>Follow Me</h5>
        <Nav className="justify-content-center">
          <Nav.Link
            href="https://facebook.com"
            target="_blank"
            className="text-white"
          >
            <i className="bi bi-facebook"></i> Facebook
          </Nav.Link>
          <Nav.Link
            href="https://twitter.com"
            target="_blank"
            className="text-white"
          >
            <i className="bi bi-twitter"></i> Twitter
          </Nav.Link>
          <Nav.Link
            href="https://linkedin.com"
            target="_blank"
            className="text-white"
          >
            <i className="bi bi-linkedin"></i> LinkedIn
          </Nav.Link>
        </Nav>
      </Col>
      <Col md={4}>
        <h5>© Comic Confessions</h5>
        <p>All rights reserved.</p>
      </Col>
    </Row>
  </Container>
);

export default Footer;
