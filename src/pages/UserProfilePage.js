import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Image,
  Badge,
  CloseButton,
} from "react-bootstrap";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    jobTitle: "",
    company: "",
    degree: "",
    institution: "",
    profilePic: null,
    hobbies: "",
    tags: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hobbiesList, setHobbiesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleDiscard = () => {
    setFormData({
      fullName: "",
      email: "",
      jobTitle: "",
      company: "",
      degree: "",
      institution: "",
      profilePic: null,
      hobbies: "",
      tags: "",
    });
    setHobbiesList([]);
    setTagsList([]);
    setIsSubmitted(false);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  const handleAddHobby = () => {
    if (formData.hobbies) {
      setHobbiesList([...hobbiesList, formData.hobbies]);
      setFormData({ ...formData, hobbies: "" });
    }
  };

  const handleAddTag = () => {
    if (formData.tags) {
      setTagsList([...tagsList, formData.tags]);
      setFormData({ ...formData, tags: "" });
    }
  };

  const handleRemoveHobby = (index) => {
    setHobbiesList(hobbiesList.filter((_, i) => i !== index));
  };

  const handleRemoveTag = (index) => {
    setTagsList(tagsList.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>User Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Profile Picture</Form.Label>
              <div className="mb-3">
                {formData.profilePic && (
                  <Image
                    src={URL.createObjectURL(formData.profilePic)}
                    roundedCircle
                    width="150"
                    height="150"
                  />
                )}
                {!isSubmitted && (
                  <Form.Control
                    type="file"
                    name="profilePic"
                    onChange={handleFileChange}
                  />
                )}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              {isSubmitted ? (
                <div className="d-flex align-items-center">
                  <p className="mb-0">{formData.fullName}</p>
                </div>
              ) : (
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              {isSubmitted ? (
                <div className="d-flex align-items-center">
                  <p className="mb-0">{formData.email}</p>
                </div>
              ) : (
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Job Title</Form.Label>
              {isSubmitted ? (
                <div className="d-flex align-items-center">
                  <p className="mb-0">{formData.jobTitle}</p>
                </div>
              ) : (
                <Form.Control
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              {isSubmitted ? (
                <div className="d-flex align-items-center">
                  <p className="mb-0">{formData.company}</p>
                </div>
              ) : (
                <Form.Control
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Degree</Form.Label>
              {isSubmitted ? (
                <div className="d-flex align-items-center">
                  <p className="mb-0">{formData.degree}</p>
                </div>
              ) : (
                <Form.Control
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Institution</Form.Label>
              {isSubmitted ? (
                <div className="d-flex align-items-center">
                  <p className="mb-0">{formData.institution}</p>
                </div>
              ) : (
                <Form.Control
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Hobbies</Form.Label>
              {isSubmitted ? (
                <div>
                  {hobbiesList.map((hobby, index) => (
                    <Badge key={index} pill variant="primary" className="mr-2">
                      {hobby}
                      <CloseButton onClick={() => handleRemoveHobby(index)} />
                    </Badge>
                  ))}
                </div>
              ) : (
                <div>
                  <Form.Control
                    type="text"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <Button variant="warning" onClick={handleAddHobby}>
                    Add Hobby
                  </Button>
                  <div className="mt-2">
                    {hobbiesList.map((hobby, index) => (
                      <Badge
                        key={index}
                        pill
                        variant="primary"
                        className="mr-2"
                      >
                        {hobby}
                        <CloseButton onClick={() => handleRemoveHobby(index)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              {isSubmitted ? (
                <div>
                  {tagsList.map((tag, index) => (
                    <Badge key={index} pill variant="info" className="mr-2">
                      {tag}
                      <CloseButton onClick={() => handleRemoveTag(index)} />
                    </Badge>
                  ))}
                </div>
              ) : (
                <div>
                  <Form.Control
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <Button variant="warning" onClick={handleAddTag}>
                    Add Tag
                  </Button>
                  <div className="mt-2">
                    {tagsList.map((tag, index) => (
                      <Badge key={index} pill variant="info" className="mr-2">
                        {tag}
                        <CloseButton onClick={() => handleRemoveTag(index)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Form.Group>
            <div className="my-4">
              {!isSubmitted && (
                <Button variant="primary" type="submit" disabled={isSubmitted}>
                  {isSubmitted ? "Submitted" : "Submit"}
                </Button>
              )}

              {!isSubmitted && (
                <Button
                  variant="secondary"
                  onClick={handleDiscard}
                  className="ms-2"
                >
                  Discard
                </Button>
              )}
              {isSubmitted && (
                <Button variant="primary" onClick={handleEdit} className="me-2">
                  Edit
                </Button>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
