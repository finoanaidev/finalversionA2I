import React, { useEffect } from 'react';
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './navbar.css';

const Navbar = () => {
  const { isLoggedIn, logout, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger l'utilisateur après la connexion en fonction du rôle
    if (isLoggedIn) {
      if (userRole === 'candidat') {
        navigate('/candidature'); // Rediriger vers candidature si l'utilisateur est un candidat
      } else if (userRole === 'recruteur') {
        navigate('/recrutement'); // Rediriger vers recrutement si l'utilisateur est un recruteur
      }
    }
  }, [isLoggedIn, userRole, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/connexion');
  };

  const handleCandidatAlert = () => {
    alert('Vous êtes candidat? Seuls les recruteurs ont accès au recrutement.');
  };

  const handleCandidatureClick = () => {
    if (userRole === 'candidat') {
      navigate('/candidature');
    } else {
      handleCandidatAlert();
    }
  };

  const handleRecrutementClick = () => {
    if (userRole === 'recruteur') {
      navigate('/recrutement');
    } else {
      handleCandidatAlert();
    }
  };

  return (
    <nav className='navbar navbar-expand-lg bg-custom-purple-dark fixed-top'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand text-custom-yellow font-weight-bold'>
          <img src='/images/logo.png' style={{ width: '100px', height: 'auto' }} alt="Logo" />
        </Link>
        <button className='navbar-toggler ms-auto' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav mx-auto'>
            <li className='nav-item'>
              <NavLink to='/offre' className={({ isActive }) => isActive ? "nav-link-custom active-link" : "nav-link-custom"}>Offre</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/candidature' className={({ isActive }) => isActive ? "nav-link-custom active-link" : "nav-link-custom"} onClick={handleCandidatureClick}>Candidature</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/recrutement' className={({ isActive }) => isActive ? "nav-link-custom active-link" : "nav-link-custom"} onClick={handleRecrutementClick}>Recrutement</NavLink>
            </li>
          </ul>
          <div className='d-flex'>
            {isLoggedIn ? (
              <button className='btn btn-custom-blue d-flex align-items-center' onClick={handleLogout}>
                <IoIosLogOut className='me-2' /> Déconnexion
              </button>
            ) : (
              <Link to="/connexion" className='btn btn-custom-connexion d-flex align-items-center'>
                <IoIosLogIn className='me-2' /> Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
