import React, { createContext, useState, useContext } from "react";

// Create Context
const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userCredentials) => {
    // Authenticate user here, this is just a dummy function
    setIsAuthenticated(true);
    setUser(userCredentials);
  };

  const logout = () => {
    // Deauthenticate user here, this is just a dummy function
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook that shorthands the context!
export const useAuth = () => useContext(AuthContext);
