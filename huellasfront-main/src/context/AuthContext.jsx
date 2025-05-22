import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Eliminamos useNavigate de aquí y lo manejaremos en los componentes
  const login = () => {
    setIsAuthenticated(true);
    // La redirección se manejará en el componente Login
  };

  const logout = () => {
    setIsAuthenticated(false);
    // La redirección se manejará en el componente Navigation
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};