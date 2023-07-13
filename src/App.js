import React from "react";
import "./styles/App.css";
import CreateNFT from "./components/CreateNFT.js";
import NavBar from "./components/NavBar.js";
// import { RouterProvider } from "react-router-dom";
// import router from "./routes/root";
// import { AuthProvider } from "./auth/Auth";
import "./components/Footer.js";
import Drop from "./components/Drop.js";
import Trending from "./components/Trending.js";
import Footer from "./components/Footer.js";
import SignInPage from "./pages/SignInPage.js";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import UserProfilePage from "./pages/UserProfilePage.js";
import { AuthContext } from "./components/AuthContext.js";
import { useContext } from "react";

import SignUp from "./pages/SignUpPage.js";
import SignUpPage from "./pages/SignUpPage.js";

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
        <Route path="/signup" element={<SignUpPage />} />
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