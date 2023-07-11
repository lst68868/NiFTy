import React from "react";
import "./styles/App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root";
import { AuthProvider } from "./auth/Auth";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <div>APP</div>
    </AuthProvider>
  )
}

export default App;
