// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Dropdown } from 'react-bootstrap';

const Navbar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth); // Get the token from the auth slice

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">React Auth Modue App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!token && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
            )}
            {token && ( // This should be true if the token exists
              <Dropdown className="ms-auto">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <img
                    src="https://via.placeholder.com/30" // Dummy image URL
                    alt="Profile"
                    className="rounded-circle"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;