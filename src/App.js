import React from "react";
import "./styles/App.css";
import CreateNFT from "./components/CreateNFT";
import NavBar from "./components/NavBar";
import "./components/Footer.js";
import Drop from "./components/Drop.js";
import Trending from "./components/Trending";
import Footer from "./components/Footer.js";
import SignInPage from "./pages/SignInPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import { AuthContext } from "./components/AuthContext";
import { useContext } from "react";


function App() {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drop" element={<Drop />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/createnft" element={<CreateNFT />} />
        <Route path="/signin" element={<SignInPage />} />
        {isLoggedIn ? (
          <Route path="/userprofilepage" element={<UserProfilePage />} />
        ) : (
          <Route path="/login" element={<SignInPage />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
