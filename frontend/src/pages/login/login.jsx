

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// const LoginPage = () => {
//   const { setLoginState } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [role, setRole] = useState('');

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const selectedRole = queryParams.get('role');
//     setRole(selectedRole || 'candidat'); // Set default role to 'candidat'
//   }, [location.search]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password,
//         role,
//       });

//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('userRole', role);
//         setLoginState(true, role);
//         navigate(role === 'candidat' ? '/candidature' : '/recrutement');
//       } else {
//         setError('Invalid login credentials');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   const handleGoogleSuccess = async (response) => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/google-login', {
//         token: response.credential,
//       });

//       const userRole = res.data.user.role;
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('userRole', userRole);
//       setLoginState(true, userRole);

//       // Redirect based on user role
//       if (userRole === 'candidat') {
//         navigate('/candidature');
//       } else if (userRole === 'recruteur') {
//         navigate('/recrutement');
//       }
//     } catch (err) {
//       console.error('Google login failed:', err);
//       setError('Google login failed. Please try again.');
//     }
//   };

//   const handleGoogleError = () => {
//     setError('Google login failed. Please try again.');
//   };

//   return (
//     <GoogleOAuthProvider clientId="952973180310-f7rmt5ajs27ecg2m9uk4k3o2t9gpdbod.apps.googleusercontent.com">
//       <div>
//         <h2>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Email:</label>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </div>
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           <button type="submit">Login</button>
//         </form>
//         <p>OR</p>
//         <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default LoginPage;



import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './login.css'; // Make sure to import the CSS file

const LoginPage = () => {
  const { setLoginState } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedRole = queryParams.get('role');
    setRole(selectedRole || 'candidat'); // Set default role to 'candidat'
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
        role,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', role);
        setLoginState(true, role);
        navigate(role === 'candidat' ? '/candidature' : '/recrutement');
      } else {
        setError('Invalid login credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google-login', {
        token: response.credential,
      });

      const userRole = res.data.user.role;
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', userRole);
      setLoginState(true, userRole);

      // Redirect based on user role
      if (userRole === 'candidat') {
        navigate('/candidature');
      } else if (userRole === 'recruteur') {
        navigate('/recrutement');
      }
    } catch (err) {
      console.error('Google login failed:', err);
      setError('Google login failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="952973180310-f7rmt5ajs27ecg2m9uk4k3o2t9gpdbod.apps.googleusercontent.com">
      <div className="login-container">
      <img src="/images/logo.jpg" alt="Logo" className="login-logo" />
        <h2 className="login-title">Se connecter en tant que {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label className="login-label">Email:</label>
            <input
              className="login-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-password-wrapper">
            <label className="login-label">Mot de passe:</label>
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button className="login-button" type="submit">Se connecter</button>
        </form>
        <p className="login-or">ou</p>
        <GoogleLogin
          className="login-google-button"
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
        <br />
         <div>
        <h6>Vous n'avez pas de compte? <Link to="/inscription">S'inscrire</Link></h6>
      </div>
      </div>
     
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
