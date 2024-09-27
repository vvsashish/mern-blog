import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { ToastMessage } from "../components/ToastMessage";

const CreateNewArticle = () => {
  const PROMPT =
    "You are a creative blog writer. write a 1000-word blog post about the title below. You can write anything you want, but it must be at least 50 words long. The title is: ";
  const [generating, setGenerating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    content: "",
    generatedContent: "",
    isGenerated: false,
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastMessage(
      "Awesome!! Your post will be reviewed and posted on the blog."
    );
    setShowToast(true);
  };

  const generateContent = () => {
    setGenerating(true);
    if (!formData?.title) {
      return false;
    }
    const requestParams = {
      model: "HuggingFaceH4/zephyr-7b-beta",
      messages: [
        { role: "system", content: PROMPT + formData?.title },
        { role: "user", content: formData?.title },
      ],
      max_new_tokens: 2048,
    };
    fetch("https://api-inference.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
      },
      body: JSON.stringify(requestParams),
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData((prevData) => ({
          ...prevData,
          generatedContent: data.choices[0].message.content,
        }));
        setGenerating(false);
      })
      .catch(console.error);
  };

  return (
    <Container>
      <h2>New Blog Post</h2>
      <Form onSubmit={handleSubmit} className="space-y-4">
        <Form.Group controlId="title" className="mb-2">
          <Form.Label className="font-medium">Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="what's on your mind"
            required
          />
        </Form.Group>
        <Form.Check
          type="switch"
          id="custom-switch"
          name="isGenerated"
          label="Generate with AI"
          checked={formData.isGenerated}
          onChange={handleChange}
        />
        {formData.isGenerated ? (
          <Form.Group controlId="content" className="mb-2">
            <Form.Label className="font-medium">Generated Content:</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              name="content"
              value={formData.generatedContent || ""}
              onChange={handleChange}
              required
              placeholder="Text will be generated here (PS: this is a primitive text generator only for demo purpose)"
            />
            {generating && (
              <p className="text-purple-700 my-1">Generating content...</p>
            )}
            <Button onClick={generateContent} type="button" className="mt-2">
              Generate Content
            </Button>
          </Form.Group>
        ) : (
          <Form.Group controlId="content" className="mb-2">
            <Form.Label className="font-medium">Content:</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Start typing..."
            />
          </Form.Group>
        )}
        <Form.Group controlId="date" className="mb-2">
          <Form.Label className="font-medium">Date:</Form.Label>
          <Form.Control
            type="text"
            name="date"
            value={formData.date}
            readOnly
          />
        </Form.Group>
        <Button variant="warning" type="submit" className="my-4">
          Submit
        </Button>
        <ToastMessage
          show={showToast}
          onClose={() => setShowToast(false)}
          message={toastMessage}
        />
      </Form>
    </Container>
  );
};
export default CreateNewArticle;
