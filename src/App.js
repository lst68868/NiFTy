import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
// import CreateNFT from "./components/CreateNFT";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root";
import { AuthProvider } from "./auth/Auth";
import NavBar from "./components/NavBar.js";
import "./components/Footer.js";
// import Drop from "./components/Drop.js";
import Trending from "./components/Trending";
// import Footer from "./components/Footer.js";
import DropAnimation from "./components/DropAnimation";

/*----- Components -----*/
import CreateNFT from "./components/CreateNFT";
// import Drop from "./components/Drop.js";
import Footer from "./components/Footer.js";

/*----- Pages -----*/
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import NFTInfoPage from "./pages/NFTInfoPage";
import SignUp from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import SignInPage from "./pages/SignInPage";

/*----- Utils -----*/
import PrivateRoute from "./utils/PrivateRoute";

/*----- Context -----*/
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <NavBar />
      {/* <Drop /> */}
      {/* <div className="flex justify-center items-center h-[100vh] w-[100vw]"> */}
      {/* <div className="anim-container">
        <DropAnimation />
      </div> */}
      {/* <WaveAnimations /> */}
      {/* </div> */}

      {/* <WaveAnimations /> */}
      {/* <Trending /> */}
      {/* <Footer /> */}
      {/* <CreateNFT /> */}
      {/* <AuthProvider>
        <RouterProvider router={router} />
        <div></div>
      </AuthProvider> */}
      <Routes>
        {/* Free Routes */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUp />} />
        {isLoggedIn ? (
          <Route path="/userprofile" element={<UserProfilePage />} />
        ) : (
          <Route path="/login" element={<SignInPage />} />
        )}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/nftinfo" element={<NFTInfoPage />} />
        <Route path="/userprofile" element={<UserProfilePage />} />

        {/* Auth Routes */}
        <Route exact element={<PrivateRoute />}>
          <Route path="/createnft" element={<CreateNFT />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
