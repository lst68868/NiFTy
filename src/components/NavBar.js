import React from "react";
import logo from "../images/logo.svg";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connectWallet } from "../web3files/walletConnection.js";
function NavBar() {
  const user = localStorage.getItem('user');
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );
  const { authTokens, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, [authTokens]);
  const handleSignUp = (event) => {
    event.preventDefault();
    navigate("/signup");
  };
  return (
    <nav className="bg-slate-900 text-white flex items-center px-8 nav sticky top-0 z-50">
      <div className="flex-grow pl-4">
        <a href="/">
          <img src={logo} className="h-20 w-20" alt="Mycelium logo" />
        </a>
      </div>
      <div className="space-x-4">
        { isLoggedIn && <a
          href={`/userprofile/${user}`}
          className="text-neon-green hover:text-light-green transition-all duration-200"
        >
          <i className="fas fa-user text-lg"></i>
        </a>}
        { isLoggedIn && <button
          className="text-neon-green hover:text-light-green transition-all duration-200"
          onClick={() => connectWallet()}
        >
          <i className="fas fa-wallet text-lg"></i>
        </button>}
        {isLoggedIn ? (
          <a
            className="text-neon-green hover:text-amber-100 transition-all duration-200 text-xl"
            onClick={logoutUser}
          >
            SignOut
          </a>
        ) : (
          <div className="flex space-x-4">
            <a
              href="/signin"
              className="text-neon-green text-xl hover:text-amber-100 transition-all duration-200"
            >
              Sign In
            </a>
            <a
              href="/signup"
              onClick={handleSignUp}
              className="text-neon-green text-xl hover:text-amber-100 transition-all duration-200"
            >
              Sign Up
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
export default NavBar;
