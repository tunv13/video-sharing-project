import React, { ChangeEvent, FormEvent, useState } from "react";
import Header from "../../components/Header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import instanceAuthSerice from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { ErrorResponse } from "../../types/Auth";

enum FormField {
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
  F_NAME = "F_NAME",
  L_NAME = "L_NAME",
  RE_PASSWORD = "RE_PASSWORD",
}

export default function RegisterScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case FormField.EMAIL:
        setEmail(value);
        break;
      case FormField.RE_PASSWORD:
        setRePassword(value);
        break;
      case FormField.PASSWORD:
        setPassword(value);
        break;
      case FormField.F_NAME:
        setFirstName(value);
        break;
      case FormField.L_NAME:
        setLastName(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (password !== rePassword) {
        setError("Re Password is not match");
        return;
      }
      const body = {
        email,
        password,
        firstName,
        lastName,
      };
      await instanceAuthSerice.register(body);
      navigate("/login");
    } catch (error: unknown) {
      if (isAxiosError<ErrorResponse>(error)) {
        setError(error.response?.data.message ?? "Some thing went wrong");
      }
    }
  };
  return (
    <section>
      <Header />
      <Container>
        <h1 className="">Register</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 justify-content-center">
            <Form.Group as={Col} md="6">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name={FormField.EMAIL}
                onChange={handleChange}
                value={email}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 justify-content-center">
            <Form.Group as={Col} md="6">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                name={FormField.F_NAME}
                onChange={handleChange}
                value={firstName}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 justify-content-center">
            <Form.Group as={Col} md="6">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                name={FormField.L_NAME}
                onChange={handleChange}
                value={lastName}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 justify-content-center">
            <Form.Group as={Col} md="6">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name={FormField.PASSWORD}
                type="password"
                onChange={handleChange}
                value={password}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 justify-content-center">
            <Form.Group as={Col} md="6">
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control
                required
                name={FormField.RE_PASSWORD}
                type="password"
                onChange={handleChange}
                value={rePassword}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 justify-content-center">
            {error && <span className="text-danger">{error}</span>}
            <Button className={styles.btn_login} type="submit">
              Register
            </Button>
          </Row>
        </Form>
      </Container>
    </section>
  );
}
