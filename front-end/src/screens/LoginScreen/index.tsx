import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import styles from './styles.module.scss'
import Row from "react-bootstrap/Row";
import Header from "../../components/Header";
import { useAuth } from "../../Auth/AuthContext";

function LoginScreen() {
  const auth = useAuth()
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const handleSubmit = (event: any) => {
    
    event.preventDefault();
    auth?.login(email,password)
  
  };

  return (
  <section>
    <Header/>
    <Container >
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3 justify-content-center">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
       
      </Row>
      <Row className="mb-3 justify-content-center">
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        
        </Form.Group>
      </Row>
      <Row className="mb-3 justify-content-center">
      <Button className={styles.btn_login} type="submit">Login</Button>
      </Row>
    </Form>
    </Container>
  </section>
  );
}

export default LoginScreen;
