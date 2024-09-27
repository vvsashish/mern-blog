import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import useUser from "../hooks/useUser";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkSubscriptionStatus, subscribe } from "../redux/actions";
const HomePage = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const isSubscribed = useSelector((state) => state.subscription.isSubscribed);
  const loading = useSelector((state) => state.subscription.loading);
  useEffect(() => {
    if (user) {
      dispatch(checkSubscriptionStatus(user.email));
    }
  }, [user, dispatch]);

  const handleSubscribe = () => {
    if (!user) {
      alert("Please log in to subscribe");
      return;
    }
    dispatch(subscribe(user.email));
  };
  if (loading) {
    return (
      <Button variant="primary" disabled>
        Loading...
      </Button>
    );
  }
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow-lg">
            <Card.Body>
              <Card.Title>
                <h1>Welcome to My Blog Site</h1>
              </Card.Title>
              <Card.Text>
                Discover a world of insightful articles and creative content
                generated with the help of generative AI technology. This blog
                site offers a unique experience where you can explore a variety
                of topics and enjoy well-crafted posts.
              </Card.Text>
              <Button variant="warning" href="/blog">
                Explore Blogs
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={4}>
          <Card className="shadow-sm mt-2">
            <Card.Body>
              <Card.Title>My Vision</Card.Title>
              <Card.Text>
                Learn more about my mission and the technology behind this blog
                site.
              </Card.Text>
              <Button variant="primary" href="/about">
                Read More
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm mt-2">
            <Card.Body>
              <Card.Title>Getting Creative</Card.Title>
              <Card.Text>
                Play with the Gen AI to create a new blog post and share it with
                your friends.
              </Card.Text>
              <Button variant="primary" href="/newBlogPost">
                Try it
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm mt-2">
            <Card.Body>
              <Card.Title>Subscribe to newsletters</Card.Title>
              <Card.Text>
                Stay updated with the latest blog posts. Dive into a variety of
                topics and enjoy fresh content regularly.
              </Card.Text>
              <Button
                variant="primary"
                onClick={handleSubscribe}
                disabled={isSubscribed || !user}
              >
                {user
                  ? isSubscribed
                    ? "Already Subscribed"
                    : "Subscribe"
                  : "Login to Subscribe"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
