import { useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const loginUrl = "https://fakestoreapi.com/auth/login";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username) {
      setError("Username is required!");
      return;
    }

    if (!password) {
      setError("Password is required!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      setLoading(false);

      if (data) {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setError("Username or password incorrect!");
    }
  }

  function handleUsernameChange(e) {
    setError("");
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setError("");
    setPassword(e.target.value);
  }

  return (
    <Container fluid className="login w-100 h-100">
      <Form
        className="position-absolute p-4 bg-light w-25 top-50 start-50 translate-middle rounded shadow-lg"
        noValidate
        onSubmit={handleSubmit}
      >
        <Row className="align-items-center">
          <Col xs="12">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              size="lg"
              className="mb-2"
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              disabled={loading}
              onChange={handleUsernameChange}
            />
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs="12">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              disabled={loading}
              onChange={handlePasswordChange}
            />
          </Col>
        </Row>
        {error && (
          <Row className="mt-3">
            <Col>
              <Alert variant="danger">{error}</Alert>
            </Col>
          </Row>
        )}
        <Row className="align-items-center mt-3">
          <Col xs="12">
            <Button
              type="submit"
              size="lg"
              className="mt-3 w-100"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Login"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Login;
