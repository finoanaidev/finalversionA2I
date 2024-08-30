import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const login = (user) => {
    setIsLoggedIn(true);
    setUserRole(user.role);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    localStorage.removeItem('token');
  };

  const setLoginState = (loggedIn, role) => {
    setIsLoggedIn(loggedIn);
    setUserRole(role);
  };

  const value = {
    isLoggedIn,
    userRole,
    login,
    logout,
    setLoginState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};