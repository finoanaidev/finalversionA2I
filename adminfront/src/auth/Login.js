
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import './Login.css'; // Importez votre fichier CSS pour les styles personnalisés

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    mailAdmin: '',
    passwordAdmin: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/loginAdmin', formData);
      const userData = res.data;
      login(userData);
      navigate('/listeCandidat');
    } catch (err) {
      setError(err.response.data.msg || 'Erreur serveur');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <Card className="custom-card"> {/* Ajoutez la classe custom-card */}
            <Card.Body>
            <div className="text-center"> {/* Centrez le contenu */}
                <h2>Connexion</h2> {/* Utilisez un titre de niveau 2 pour le centrage */}
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formMailAdmin">
                  <Form.Label>Mail Admin</Form.Label>
                  <Form.Control
                    type="email"
                    name="mailAdmin"
                    value={formData.mailAdmin}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPasswordAdmin">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordAdmin"
                    value={formData.passwordAdmin}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
<br/>
                <Button variant="primary" type="submit" className="custom-button"> {/* Ajoutez la classe custom-button */}
                  Se Connecter
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
