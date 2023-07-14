import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

const BACKEND_URL = "http://127.0.0.1:8000/";

export const AuthProvider = ({ children }) => {
  // Initialize state from local storage
  /*const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  // Write changes to local storage whenever state updates
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);*/

  
  const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  async function loginUser(e) {
    e.preventDefault();
    try {
      const response = await axios.post(BACKEND_URL + 'api/token/', {
        username: e.target.username.value,
        password: e.target.password.value,
      });
      const data = await response.data;
      
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
        navigate('/');
      }else{
        alert('Something went wrong')
      }

    } catch (error) {
      console.error('Error:', error);
    }

  }

  function logoutUser() {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/signin');
  }

  async function updateToken() {
    try {
      const response = await axios.post(BACKEND_URL + 'api/token/refresh/', {
        refresh: authTokens.refresh
      });
      const data = await response.data;
      
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
      }else{
        logoutUser();
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser
  }

  useEffect(() => {
    
    const fourMinutes = 1000 * 60 * 4
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)

  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};