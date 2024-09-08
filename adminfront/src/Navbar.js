import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Navbar as BootstrapNavbar, Nav, NavDropdown } from 'react-bootstrap';
import './Navbar.css'; // Import your custom CSS file for Navbar styling

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  console.log('Current user:', user);
  console.log('Loading state:', loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BootstrapNavbar expand="lg" className="custom-navbar">
      <div className="logo-container">
        <img src='/images/logo.png' alt='Logo' style={{ width: '100px', height: 'auto' }} />
      </div>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {user ? (
            <>
              <NavDropdown title="Offres" id="offres-dropdown">
                <NavDropdown.Item as={Link} to="/create-offre">Créer une Offre</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/section-offre">Section des Offres</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Candidature" id="candidature-dropdown">
                <NavDropdown.Item as={Link} to="/listeCandidat">Candidature</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/candidat">Noms des candidats</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/offres">Recrutement</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
        {user && (
          <Nav className='logout'>
            <Nav.Link onClick={logout}>Déconnexion</Nav.Link>
          </Nav>
        )}
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
