// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     nomAdmin: '',
//     mailAdmin: '',
//     passwordAdmin: '',
//     passwordConfirmAdmin: '',
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});

//     // Vérifiez si les mots de passe correspondent
//     if (formData.passwordAdmin !== formData.passwordConfirmAdmin) {
//       setErrors({ passwordConfirmAdmin: 'Les mots de passe ne correspondent pas' });
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:5000/api/registerAdmin', formData);
//       const token = res.data.token;
//       localStorage.setItem('token', token); // Stockage du token dans le local storage
//       navigate('/listeCandidat');
//     } catch (err) {
//       if (err.response && err.response.data.errors) {
//         setErrors(err.response.data.errors.reduce((acc, error) => {
//           acc[error.param] = error.msg;
//           return acc;
//         }, {}));
//       } else {
//         setErrors({ msg: 'Erreur serveur' });
//       }
//     }
//   };

//   return (
//     <Container>
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <h1 className="text-center mb-4">Inscription</h1>
//           {errors.msg && <p style={{ color: 'red' }}>{errors.msg}</p>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="nomAdmin">
//               <Form.Label>Nom Admin</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="nomAdmin"
//                 value={formData.nomAdmin}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.nomAdmin && <p style={{ color: 'red' }}>{errors.nomAdmin}</p>}
//             </Form.Group>
//             <Form.Group controlId="mailAdmin">
//               <Form.Label>Mail Admin</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="mailAdmin"
//                 value={formData.mailAdmin}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.mailAdmin && <p style={{ color: 'red' }}>{errors.mailAdmin}</p>}
//             </Form.Group>
//             <Form.Group controlId="passwordAdmin">
//               <Form.Label>Mot de passe</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="passwordAdmin"
//                 value={formData.passwordAdmin}
//                 onChange={handleChange}
//                 required
//                 minLength={6} // Exemple de validation de longueur minimale
//               />
//               {errors.passwordAdmin && <p style={{ color: 'red' }}>{errors.passwordAdmin}</p>}
//             </Form.Group>
//             <Form.Group controlId="passwordConfirmAdmin">
//               <Form.Label>Confirmation mot de passe</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="passwordConfirmAdmin"
//                 value={formData.passwordConfirmAdmin}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.passwordConfirmAdmin && <p style={{ color: 'red' }}>{errors.passwordConfirmAdmin}</p>}
//             </Form.Group>
//             <Button variant="primary" type="submit" className="w-100 mt-3">
//               S'inscrire
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomAdmin: '',
    mailAdmin: '',
    passwordAdmin: '',
    passwordConfirmAdmin: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRequirements.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation des champs
    if (!validatePassword(formData.passwordAdmin)) {
      setErrors({ passwordAdmin: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.' });
      return;
    }

    if (formData.passwordAdmin !== formData.passwordConfirmAdmin) {
      setErrors({ passwordConfirmAdmin: 'Les mots de passe ne correspondent pas' });
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/registerAdmin', formData);
      const token = res.data.token;
      localStorage.setItem('token', token); // Stockage du token dans le local storage
      navigate('/listeCandidat');
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors.reduce((acc, error) => {
          acc[error.param] = error.msg;
          return acc;
        }, {}));
      } else {
        setErrors({ msg: 'Erreur serveur' });
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Inscription</h1>
          {errors.msg && <p style={{ color: 'red' }}>{errors.msg}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nomAdmin">
              <Form.Label>Nom Admin</Form.Label>
              <Form.Control
                type="text"
                name="nomAdmin"
                value={formData.nomAdmin}
                onChange={handleChange}
                required
              />
              {errors.nomAdmin && <p style={{ color: 'red' }}>{errors.nomAdmin}</p>}
            </Form.Group>
            <Form.Group controlId="mailAdmin">
              <Form.Label>Mail Admin</Form.Label>
              <Form.Control
                type="email"
                name="mailAdmin"
                value={formData.mailAdmin}
                onChange={handleChange}
                required
              />
              {errors.mailAdmin && <p style={{ color: 'red' }}>{errors.mailAdmin}</p>}
            </Form.Group>
            <Form.Group controlId="passwordAdmin">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="passwordAdmin"
                value={formData.passwordAdmin}
                onChange={handleChange}
                required
                minLength={8} // Validation de longueur minimale
              />
              {errors.passwordAdmin && <p style={{ color: 'red' }}>{errors.passwordAdmin}</p>}
            </Form.Group>
            <Form.Group controlId="passwordConfirmAdmin">
              <Form.Label>Confirmation mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirmAdmin"
                value={formData.passwordConfirmAdmin}
                onChange={handleChange}
                required
              />
              {errors.passwordConfirmAdmin && <p style={{ color: 'red' }}>{errors.passwordConfirmAdmin}</p>}
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              S'inscrire
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
