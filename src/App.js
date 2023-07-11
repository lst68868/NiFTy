import React from "react";
import "./styles/App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root";
import { AuthProvider } from "./auth/Auth";
import { Navbar } from "react-bootstrap";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div>
    <NavBar />
    <AuthProvider>
      <RouterProvider router={router} />
      <div></div>
    </AuthProvider>
    </div>
  )
}

export default App;
