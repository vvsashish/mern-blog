import { Card, Container } from "react-bootstrap";

const CommentsList = ({ comments }) => (
  <>
    {comments?.length ? (
      <Container className="mt-4">
        <h3>Comments:</h3>
        {comments.map((comment) => (
          <Card className="mb-3" key={comment.postedBy + ": " + comment.text}>
            <Card.Body>
              <Card.Title>{comment.postedBy}</Card.Title>
              <Card.Text>{comment.text}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Container>
    ) : (
      <></>
    )}
  </>
);

export default CommentsList;
