import { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const loginUrl = "https://fakestoreapi.com/auth/login";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      return;
    }

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    console.log("data ", data);

    if (data) {
      localStorage.setItem("token", data.token);
      navigate("/");
    }
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <Container className="position-absolute p-3 bg-light w-25 top-50 start-50 translate-middle">
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col xs="12">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs="12">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs="12">
            <Button type="submit" className="mt-3 w-100">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Login;
