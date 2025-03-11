import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import LanguageSwitcher from "./languageSwitcher";
import { translate } from "../utils/translate";
import i18n from "../utils/i18n";


const CustomNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth); // Get the token from auth state
  const [language, setLanguage] = useState(i18n.language); // Track language state

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogoutAndSignUp = () => {
    dispatch(logout());
    navigate("/signup")
  };
  // Listen for language change
  useEffect(() => {
    const handleLanguageChange = () => setLanguage(i18n.language);
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow-sm">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🚀 {translate("general.reactAuthModule")}
        </Navbar.Brand>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="navbarNav" />

        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            {!token && (
              <Nav.Link as={Link} to="/login" className="fw-semibold">
                Login
              </Nav.Link>
            )}
            {!token && (
              <Nav.Link as={Link} to="/signup" className="fw-semibold">
                Signup
              </Nav.Link>
            )}
            {token && (
              <Nav.Link as={Link} to="/users" className="fw-semibold">
                Users
              </Nav.Link>
            )}

            {token && (
              <Nav.Link
                onClick={handleLogoutAndSignUp}
                className="fw-semibold"
                style={{ cursor: 'pointer' }}
              >
                LogOut & Signup
              </Nav.Link>
            )}
          </Nav>

          {/* Right-aligned Items */}
          <Nav className="ms-auto d-flex align-items-center">
            <LanguageSwitcher />

            {token && (
              <Dropdown align="end" className="ms-3">
                <Dropdown.Toggle variant="light" className="border-0 shadow-sm">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="rounded-circle border border-secondary"
                    width="35"
                    height="35"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow">
                  <Dropdown.Item as={Link} to="/profile">👤 Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    🚪 Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
