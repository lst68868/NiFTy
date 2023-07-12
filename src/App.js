import React from "react";
import "./styles/App.css";
import CreateNFT from "./components/CreateNFT";
// import { RouterProvider } from "react-router-dom";
// import router from "./routes/root";
// import { AuthProvider } from "./auth/Auth";
import NavBar from "./components/NavBar.js";
import "./components/Footer.js";
import Drop from "./components/Drop.js";
import Trending from "./components/Trending";
import Footer from "./components/Footer.js";
import SignInPage from "./pages/SignInPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NFTCarousel from "./components/NFTCarousel";

function App() {
  return (
    <div>
      <NavBar />
      <NFTCarousel />
      <NFTCarousel />
      <NFTCarousel />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="" element={<Drop />} />
        <Route path="/" element={<Trending />} />
        <Route path="/" element={<Footer />} />
        <Route path="/" element={<CreateNFT />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </div>
  );
}

export default App;
