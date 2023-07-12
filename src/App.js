import React from "react";
import "./styles/App.css";
// import CreateNFT from "./components/CreateNFT";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root";
import { AuthProvider } from "./auth/Auth";
import NavBar from "./components/Navbar";
import "./components/Footer.js";
import Drop from "./components/Drop.js";
import Trending from "./components/Trending";
import Footer from "./components/Footer.js";


function App() {
  return (
    <div>
      <NavBar />
      <Drop />
      <Trending />
      <Footer/>
      <AuthProvider>
        <RouterProvider router={router} />
        <div></div>
      </AuthProvider> 
    </div>
  )
}

export default App;