
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Vous pouvez ajouter un spinner de chargement ici
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
