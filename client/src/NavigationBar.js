import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user information from local storage upon logout
    localStorage.removeItem('user');
    // Redirect the user to the login page
    navigate('/login');
  };

  const isAuthenticated = localStorage.getItem('user') !== null;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Your App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {isAuthenticated && (
            <Nav.Link as={Link} to="/table">Table</Nav.Link>
          )}
        </Nav>
        <Nav>
          {!isAuthenticated ? (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          ) : (
            <>
              <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
