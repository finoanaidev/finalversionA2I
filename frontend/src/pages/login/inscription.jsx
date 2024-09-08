


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './inscription.css';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// function Inscription() {
//   const [nom, setNom] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!nom || !email || !password || !confirmPassword || !role) {
//       setError('Veuillez remplir tous les champs.');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Les mots de passe ne correspondent pas.');
//       return;
//     }

//     // Exigences simplifiées du mot de passe
//     const passwordRequirements = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

//     if (!passwordRequirements.test(password)) {
//       setError('Le mot de passe doit contenir au moins 8 caractères, avec au moins une lettre et un chiffre.');
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/register', {
//         nom,
//         email,
//         password,
//         role,
//       });

//       setSuccess('Inscription réussie!');
//       setNom('');
//       setEmail('');
//       setPassword('');
//       setConfirmPassword('');
//       setRole('');

//       // Si le rôle est recruteur, rediriger vers la page de login avec le rôle spécifié
//       if (role === 'recruteur') {
//         navigate(`/connexion?role=recruteur`);
//       } else {
//         localStorage.setItem('token', res.data.token);
//         localStorage.setItem('userRole', role);

//         if (role === 'candidat') {
//           navigate('/candidature');
//         }
//       }

//     } catch (err) {
//       if (err.response && err.response.data) {
//         if (err.response.data.msg === 'User already exists') {
//           setError('L\'utilisateur existe déjà.');
//         } else {
//           setError(err.response.data.msg);
//         }
//       } else {
//         setError('Erreur de serveur');
//       }
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <div className="inscription">
//       {error && <p className="error-message">{error}</p>}
//       {success && <p className="success-message">{success}</p>}
//       <img src="/images/logo.jpg" alt="Logo" className="logo" />
//       <h3>Créez votre compte</h3>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="nom">Nom</label>
//         <input 
//           type="text" 
//           id="nom" 
//           value={nom} 
//           onChange={(e) => setNom(e.target.value)} 
//         />
//         <label htmlFor="email">Email</label>
//         <input 
//           type="email" 
//           id="email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//         />
//         <label htmlFor="password">Mot de passe</label>
//         <div className="password">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <span onClick={togglePasswordVisibility} className="password-toggle-icon">
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>
//         <label htmlFor="confirmPassword">Confirmer mot de passe</label>
//         <div className="password">
//           <input
//             type={showConfirmPassword ? 'text' : 'password'}
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <span onClick={toggleConfirmPasswordVisibility} className="password-toggle-icon">
//             {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         <div className='ro'>
//           <label htmlFor="role" className='role'>Rôle</label>
//           <select id="role" value={role}  onChange={(e) => setRole(e.target.value)} className='roleSelect'>
//             <option value="">Sélectionnez un rôle</option>
//             <option value="candidat">Candidat</option>
//             <option value="recruteur">Recruteur</option>
//           </select>
//         </div>

//         <div>
//           <button type="submit">S'inscrire</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Inscription;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './inscription.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Inscription() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nom || !email || !password || !confirmPassword || !role) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    const passwordRequirements = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRequirements.test(password)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, avec au moins une lettre et un chiffre.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        nom,
        email,
        password,
        role,
      });

      setSuccess('Inscription réussie!');
      setNom('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('');

      if (role === 'recruteur') {
        navigate(`/connexion?role=recruteur`);
      } else {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userRole', role);

        if (role === 'candidat') {
          navigate('/candidature');
        }
      }

    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.msg === 'User already exists') {
          setError('L\'utilisateur existe déjà.');
        } else {
          setError(err.response.data.msg);
        }
      } else {
        setError('Erreur de serveur');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="register-container">
      {error && <p className="register-error">{error}</p>}
      {success && <p className="register-success">{success}</p>}
      <img src="/images/logo.jpg" alt="Logo" className="register-logo" />
      <h3 className="register-title">Créez votre compte</h3>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="nom" className="register-label">Nom</label>
        <input 
          type="text" 
          id="nom" 
          value={nom} 
          onChange={(e) => setNom(e.target.value)} 
          className="register-input"
        />
        <label htmlFor="email" className="register-label">Email</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="register-input"
        />
        <label htmlFor="password" className="register-label">Mot de passe</label>
        <div className="register-password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
          <span onClick={togglePasswordVisibility} className="register-eye-icon">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <label htmlFor="confirmPassword" className="register-label">Confirmer mot de passe</label>
        <div className="register-password-wrapper">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="register-input"
          />
          <span onClick={toggleConfirmPasswordVisibility} className="register-eye-icon">
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="register-form-group">
          <label htmlFor="role" className="register-label">Rôle</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="register-role-select"
          >
            <option value="">Choisir un rôle</option>
            <option value="candidat">Candidat</option>
            <option value="recruteur">Recruteur</option>
          </select>
        </div>

        <button type="submit" className="register-button">S'inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;

