import React, { useState, useEffect } from "react";
import { Container, Col, Form, Row, Button, Toast } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../reusable/footer";
import Header from "../reusable/header";
import { GetUser } from "../../service/apiproduct"; // Ensure GetUser is defined
import md5 from "md5";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(true); // Use boolean for gender
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");
  const [account, setAccount] = useState([]);

  // Fetch existing accounts on component mount
  useEffect(() => {
    const getAccounts = async () => {
      try {
        const accounts = await GetUser();
        setAccount(accounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    getAccounts();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate password strength
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setAlertVariant("danger");
      setAlertMessage(
        "Password must be at least 8 characters long, include at least 1 uppercase letter, 1 number, and 1 special character."
      );
      setShowAlert(true);
      return;
    }

    // Check if email already exists
    if (account.some((acc) => acc.email === email)) {
      setAlertVariant("danger");
      setAlertMessage("Email already exists. Please use a different email.");
      setShowAlert(true);
      return;
    }

    // Create new user object
    const newUser = {
      id: account.length > 0 ? account[account.length - 1].id + 1 : 1,
      username,
      email,
      password: md5(password),
      fullname,
      gender,
      dob,
      status: true,
      role: 1,
    };

    // Send registration request
    fetch("http://localhost:9999/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Registration failed.");
        }
        setAlertVariant("success");
        setAlertMessage("Registration successful! Redirecting to login...");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setAlertVariant("danger");
        setAlertMessage(
          "An error occurred during registration. Please try again later."
        );
        setShowAlert(true);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Header />
      </Row>
      <br />
      <Row style={{ paddingTop: "120px" }}>
        <Col md={6}>
          <h1>Register</h1>
          {showAlert && (
            <Toast
              className="toast-right"
              show={showAlert}
              onClose={() => setShowAlert(false)}
            >
              <Toast.Header>
                <strong className="me-auto">Notification</strong>
              </Toast.Header>
              <Toast.Body>{alertMessage}</Toast.Body>
            </Toast>
          )}
          <br />
          <Form onSubmit={handleRegister}>
            <Form.Group as={Row} className="mb-3" controlId="email">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="username">
              <Form.Label column sm="2">
                Username
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="fullname">
              <Form.Label column sm="2">
                Full Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="dob">
              <Form.Label column sm="2">
                Date of Birth
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="password">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Enter a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group className="d-flex">
              <Form.Label style={{ marginRight: 75 }}>Gender</Form.Label>
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                id="male"
                style={{ marginRight: "10px" }}
                checked={gender === true}
                onChange={() => setGender(true)}
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                id="female"
                checked={gender === false}
                onChange={() => setGender(false)}
              />
            </Form.Group>
            <br />

            <Button type="submit">Sign Up</Button>
          </Form>
          <br />
          <Link to={"/login"}>Already have an account? Log in</Link>
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <img
            style={{ maxHeight: 400, maxWidth: 750, objectFit: "contain" }}
            src="/images/ps-test.jpg"
            alt="PS Test"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Footer />
      </Row>
    </Container>
  );
};

export default Register;
