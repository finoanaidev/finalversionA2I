
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importez useAuth depuis le contexte d'authentification
import './login.css';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importez les icônes d'œil

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '' // Ajoutez une propriété de rôle à vos données utilisateur
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // État pour gérer la visibilité du mot de passe
  const navigate = useNavigate();
  const { login } = useAuth(); // Utilisez useAuth pour accéder à la fonction login

  const { email, password, role } = formData;

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', role); // Sauvegardez le rôle sélectionné dans le localStorage
      login(res.data.user); // Appel de la fonction login avec les données utilisateur après la connexion réussie
      // Redirection en fonction du rôle de l'utilisateur
      if (role === 'candidat') {
        navigate('/candidature'); // Redirigez vers la page "candidature" si l'utilisateur est un candidat
      } else if (role === 'recruteur') {
        navigate('/recrutement'); // Redirigez vers la page "recrutement" si l'utilisateur est un recruteur
      }
    } catch (err) {
      setError(getRoleSpecificErrorMessage());
    }
  };

  const getRoleSpecificErrorMessage = () => {
    if (role === 'candidat') {
      return 'Vous êtes recruteur';
    } else if (role === 'recruteur') {
      return 'Vous êtes candidat';
    } else {
      return 'Invalid credentials';
    }
  };

  const handleSuccess = async (response) => {
    console.log('Google response:', response);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/google-login', {
        token: response.credential
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', res.data.user.role); // Sauvegardez le rôle de l'utilisateur dans le localStorage
      login(res.data.user); // Appel de la fonction login avec les données utilisateur après la connexion réussie

      // Redirection en fonction du rôle de l'utilisateur
      if (res.data.user.role === 'candidat') {
        navigate('/candidature'); // Redirigez vers la page "candidature" si l'utilisateur est un candidat
      } else if (res.data.user.role === 'recruteur') {
        navigate('/recrutement'); // Redirigez vers la page "recrutement" si l'utilisateur est un recruteur
      }
    } catch (err) {
      setError('Erreur de connexion Google. Veuillez réessayer.');
    }
  };

  const handleError = (error) => {
    console.error('Google login failed:', error);
    setError('Erreur de connexion Google. Veuillez réessayer.');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Inversez la valeur de showPassword
  };

  return (
    <div className="login">
      <div className="connexion">
        <img src="/images/logo.jpg" alt="Logo" className="logo" />
        <h3>Connexion</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={onChange} required />
          <label htmlFor="password">Mot de passe</label>
          <div className="password">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={onChange}
              required
            />
            <span onClick={togglePasswordVisibility} className="password-toggle-icon">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className='ro'>
            <label htmlFor="role" className='role'>Rôle</label>
            <select id="role" value={role} onChange={onChange} required className='roleSelect'>
              <option value="">Sélectionnez un rôle</option>
              <option value="candidat">Candidat</option>
              <option value="recruteur">Recruteur</option>
            </select>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Se Connecter</button>
        </form>
        <p>OU</p>
        <GoogleOAuthProvider clientId="952973180310-f7rmt5ajs27ecg2m9uk4k3o2t9gpdbod.apps.googleusercontent.com">
          <div className="login-card">
            <h5> Connectez-vous avec</h5>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        </GoogleOAuthProvider>
        <div>
          <p>Vous n'avez pas de compte? <Link to="/inscription">Inscrivez-vous</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
