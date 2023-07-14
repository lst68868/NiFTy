import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import jwt_decode from 'jwt-decode';



const PrivateRoute = () => {
    const {authTokens} = useContext(AuthContext);
    let user;
    if (authTokens) {
        user = jwt_decode(authTokens.access);
        console.log(jwt_decode(authTokens.access));
    }
    else {
        user = false;
    }
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? <Outlet /> : <Navigate to="/signin" />;
}

  
export default PrivateRoute;