import React from "react";
import logo from "../images/logo.svg";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connectWallet } from "../web3files/walletConnection.js";

function NavBar() {
  const user = localStorage.getItem("user");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const { authTokens, user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, [authTokens]);

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate("/signup");
  };

  return (
    <nav className="bg-slate-900 text-white flex items-center px-8">
      <div className="flex-grow">
        <a href="/">
          <img
            src={logo}
            className="h-20 w-20"
            alt="Mycelium logo"
          />
        </a>
      </div>
      <div className="space-x-4">
        <a href="/userprofile" className="text-neon-green hover:text-light-green transition-all duration-200">
          <i className="fas fa-user text-lg"></i>
        </a>
        <button className="text-neon-green hover:text-light-green transition-all duration-200" onClick={() => connectWallet()}>
          <i className="fas fa-wallet text-lg"></i>
        </button>
        {isLoggedIn ? (
          <a className="text-neon-green hover:text-light-green transition-all duration-200" onClick={logoutUser}>
            SignOut
          </a>
        ) : (
          <div className="flex space-x-4">
            <a href="/signin" className="text-neon-green hover:text-light-green transition-all duration-200">Sign In</a>
            <a href="/signup" onClick={handleSignUp} className="text-neon-green hover:text-light-green transition-all duration-200">
              Sign Up
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
