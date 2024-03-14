// LoginForm.js
import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await axios.post("http://localhost:5000/login", formData);
      const userData = response.data.user;
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Redirecting to /table");
      navigate("/table");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  

  return (
    <div style={{ backgroundColor: "skyblue", minHeight: "100vh" }}>
      <Container
        className="mt-4"
        style={{
          backgroundColor: "gray",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
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
              <Button
                variant="primary"
                type="submit"
                style={{ backgroundColor: "lightskyblue" }}
              >
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
