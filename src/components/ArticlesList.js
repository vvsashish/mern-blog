import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import "./ArticlesList.css";

const ArticlesList = ({ articles }) => {
  return (
    <>
      {articles.map((article) => (
        <Row className="my-4 mx-4">
          <Col className="mb-4" key={article.name}>
            <Card className="h-100 shadow-sm mt-2">
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.content[0]}</Card.Text>
                <Link to={`/blog/${article.name}`} className="btn btn-primary">
                  Read More
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default ArticlesList;
