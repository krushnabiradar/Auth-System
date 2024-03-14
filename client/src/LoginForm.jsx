import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; // Import Axios for making HTTP requests

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Change Navigate to navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send formData to Node.js API for login
      const response = await axios.post('http://localhost:5000/login', formData);
      console.log(response.data); // Log response from the server

      // Assuming you receive the user data upon successful login
      const userData = response.data.user;

      // Redirect to the table route and pass the user data as props
      navigate('/table', { state: { userData } }); // Change Navigate.push to navigate
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure, display an error message, etc.
    }
  };

  return (
    <div style={{ backgroundColor: 'skyblue', minHeight: '100vh' }}>
      <Container className="mt-4" style={{ backgroundColor: 'gray', padding: '20px', borderRadius: '5px' }}>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" style={{ backgroundColor: 'lightskyblue' }}>
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginForm;
