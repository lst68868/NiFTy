import React from "react";
import "./styles/App.css";
// import CreateNFT from "./components/CreateNFT";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root";
import { AuthProvider } from "./auth/Auth";
import NavBar from "./components/Navbar.js";
import "./components/Footer.js";
// import Drop from "./components/Drop.js";
import Trending from "./components/Trending";
import Footer from "./components/Footer.js";
import DropAnimation from "./components/DropAnimation";


function App() {
  return (
    <div>
      <NavBar />
      {/* <Drop /> */}
      <DropAnimation />
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
