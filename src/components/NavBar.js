import { getAuth, signOut } from "firebase/auth";
import useUser from "../hooks/useUser";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";
import noUserImage from "../noUser.jpg";
const NavBar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container className="mx-2">
        <Navbar.Brand href="/">
          <Logo className="animated-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Container className="d-flex justify-content-between">
            <Nav className="ml-auto">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blog">
                Blog
              </Nav.Link>
              <Nav.Link as={NavLink} to="/new-blog-post">
                Create an article
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              {!user && (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/signup">
                    Signup
                  </Nav.Link>
                </>
              )}
              {user && (
                <Container className="ml-2">
                  <Dropdown>
                    <Dropdown.Toggle
                      as="div"
                      id="dropdown-basic"
                      className="p-0 border-0 bg-transparent"
                    >
                      <img
                        src={user.photoURL ? user.photoURL : noUserImage}
                        alt="avatar"
                        className="rounded-circle"
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                        }}
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={NavLink} to="/user-profile">
                        Your Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          signOut(getAuth());
                          navigate("/");
                        }}
                      >
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Container>
              )}
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
