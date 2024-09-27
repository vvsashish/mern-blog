import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AboutPage = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <Card className="shadow-lg mb-4">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <h2>About The Blog Site</h2>
              </Card.Title>
              <Card.Text>
                Welcome to my innovative blog site, built using the powerful
                MERN stack. MERN stands for MongoDB, Express, React, and
                Node.js. These technologies work together to create a seamless
                and efficient platform for the users.
              </Card.Text>
              <Card.Text>
                <h4>What is the MERN Stack?</h4>
                The MERN stack is a combination of four key technologies:
                <ul>
                  <li>
                    <strong>MongoDB</strong>: A flexible database that stores
                    data in a way that's easy to manage and retrieve.
                  </li>
                  <li>
                    <strong>Express</strong>: A web application framework for
                    Node.js, which helps in building robust web applications.
                  </li>
                  <li>
                    <strong>React</strong>: A library for building user
                    interfaces, making the site interactive and user-friendly.
                  </li>
                  <li>
                    <strong>Node.js</strong>: A runtime environment that allows
                    us to run JavaScript on the server side, ensuring the site
                    is fast and scalable.
                  </li>
                </ul>
              </Card.Text>
              <Card.Text>
                <h4>Special Feature: Text Generation</h4>
                One of the standout features of this blog site is the ability to
                generate text for blog posts. This feature uses advanced AI
                technology to help you create content effortlessly. Whether
                you're stuck on what to write or just need a bit of inspiration,
                my text generation tool is here to assist you.
              </Card.Text>
              <Card.Text>
                <h4>How It Works</h4>
                When you start writing a new blog post, you can simply enter a
                title and let the AI do the rest. The AI generates a detailed
                and engaging blog post based on your title, saving you time and
                effort. This feature is perfect for those moments when you need
                a little creative boost.
              </Card.Text>
              <Card.Text>
                <h4>Why Choose My Blog Site?</h4>
                <ul>
                  <li>
                    <strong>User-Friendly</strong>: This site is designed to be
                    easy to use, even if you're not tech-savvy.
                  </li>
                  <li>
                    <strong>Efficient</strong>: The MERN stack ensures the site
                    runs smoothly and efficiently.
                  </li>
                  <li>
                    <strong>Innovative</strong>: The text generation feature
                    sets us apart, making content creation a breeze.
                  </li>
                </ul>
              </Card.Text>
              <Card.Text>
                I hope you enjoy using my blog site as much as I enjoyed
                building it. Happy blogging!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
