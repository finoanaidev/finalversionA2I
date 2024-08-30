import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import Login from './auth/Login';
import Register from './auth/Register';
import ListeCandidat from './Candidature/ListeCandidat';
import Offres from './Recrutement/ListeOffre';
import EditRecrutement from './Recrutement/editOffre';
import PrivateRoute from './PrivateRoute';
import CreateOffre from './Offres/CreateOffre';
import SectionOffre from './Offres/SectionOffre';
import EditOffre from './Offres/EditOffre';
import EditCandidat from './Candidature/EditCandidat';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listeCandidat" element={<PrivateRoute><ListeCandidat /></PrivateRoute>} />
          <Route path="/edit-candidat/:id" element={<PrivateRoute><EditCandidat /></PrivateRoute>} />
          <Route path="/offres" element={<PrivateRoute><Offres /></PrivateRoute>} />
          <Route path="/editRecrutement/:id" element={<PrivateRoute><EditRecrutement /></PrivateRoute>} />
          <Route path="/create-offre" element={<PrivateRoute><CreateOffre /></PrivateRoute>} />
          <Route path="/section-offre" element={<PrivateRoute><SectionOffre /></PrivateRoute>} />
          <Route path="/edit-offre/:id" element={<PrivateRoute><EditOffre /></PrivateRoute>} />
          {/* Add other routes here */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
