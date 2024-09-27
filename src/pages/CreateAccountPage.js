import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

const CreateAccountPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmailAndPassword = (fullName, email, password) => {
    const errors = {};
    if (!fullName.length) {
      errors.length = "Please provide your full name.";
    }
    if (!email.length) {
      errors.length = "Please provide your email address.";
    }
    if (password.length < 8) {
      errors.length = "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      errors.lowercase = "Password must contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      errors.number = "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.specialChar =
        "Password must contain at least one special character.";
    }
    return errors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const passwordErrors = validateEmailAndPassword(
        formData.fullName,
        formData.email,
        formData.password
      );
      if (Object.keys(passwordErrors).length > 0) {
        setErrors(passwordErrors);
        setShowAlert(true);
      } else if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match." });
        setShowAlert(true);
      } else {
        setErrors({});
        setShowAlert(false);
        await createUserWithEmailAndPassword(
          getAuth(),
          formData.email,
          formData.password
        );
        navigate("/blog");
      }
    } catch (e) {
      let errorMessage = "";
      switch (e.code) {
        case "auth/invalid-email":
          errorMessage = "The email address is not valid, enter a valid one.";
          break;
        case "auth/email-already-in-use":
          errorMessage =
            "The email address is already in use by another account.";
          break;
        case "auth/weak-password":
          errorMessage = "The password is too weak.";
          break;
        default:
          errorMessage = e.message;
      }
      setErrors({ confirmPassword: errorMessage });
      setShowAlert(true);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <h2>Sign Up</h2>
              </Card.Title>
              {showAlert && (
                <Alert
                  variant="danger"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  {Object.values(errors).map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </Alert>
              )}
              <Form onSubmit={handleSignUp}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Sign Up
                </Button>

                <div className="text-center mt-3">
                  <a href="/login">Already have an account? Login</a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAccountPage;
