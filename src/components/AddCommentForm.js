import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";
import { Form, Button } from "react-bootstrap";

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();

  const addComment = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(
      `/api/articles/${articleName}/comments`,
      {
        postedBy: name,
        text: commentText,
      },
      {
        headers,
      }
    );
    const updatedArticle = response.data;
    onArticleUpdated(updatedArticle);
    setName("");
    setCommentText("");
  };

  return (
    <div className="mt-4">
      <h3>Add a Comment</h3>
      {user && <p>You are posting as {user.email}</p>}
      <Form>
        <Form.Group controlId="commentTextArea">
          <Form.Control
            as="textarea"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={4}
            placeholder="Write your comment here..."
          />
        </Form.Group>
        <Button variant="primary" onClick={addComment} className="mt-2">
          Add Comment
        </Button>
      </Form>
    </div>
  );
};

export default AddCommentForm;
