import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      setShowAlert(false);
      await signInWithEmailAndPassword(
        getAuth(),
        formData.email,
        formData.password
      );
      navigate("/");
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
        default:
          errorMessage = e.message;
      }
      setErrors({ confirmPassword: errorMessage });
      setShowAlert(true);
    }
  };
  const handleForgotPassword = async () => {
    try {
      if (formData.email) {
        await sendPasswordResetEmail(getAuth(), formData.email);
        setMessage(
          `Password reset email sent to ${formData.email}! Check your inbox.`
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleGoogleSignIn = async () => {
    await signInWithPopup(getAuth(), googleProvider)
      .then((result) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <h2>Login</h2>
              </Card.Title>
              {message && <Alert variant="success">{message}</Alert>}
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
              <Form onSubmit={handleSignIn}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Login
                </Button>

                <Button
                  variant="danger"
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="w-100 mt-3"
                >
                  <i className="bi bi-google"></i> Sign in with Google
                </Button>

                <div className="text-center mt-3">
                  <Button variant="link" onClick={handleForgotPassword}>
                    Forgot password?
                  </Button>
                </div>

                <div className="text-center mt-3">
                  <a href="/signup">Don't have an account? Sign up</a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
