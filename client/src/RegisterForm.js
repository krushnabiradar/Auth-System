
// RegisterForm.js
import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:5000/register', formData);
      const userData = response.data.user;
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
      navigate('/table');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'skyblue', minHeight: '100vh' }}>
      <Container className="mt-4" style={{ backgroundColor: 'gray', padding: '20px', borderRadius: '5px' }}>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              {/* Other form fields */}
              <Form.Group controlId="formDOB">
               <Form.Label>Date of Birth</Form.Label>
             <Form.Control
                   type="date"
                   name="dob"
                   value={formData.dob}
                   onChange={handleChange}
                   required
                 />
               </Form.Group>
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
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterForm;
