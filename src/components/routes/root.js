import {
  createBrowserRouter
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/about/",
    element: <AboutPage/>
  },
  {
    path: "/signin",
    element: <SignInPage/>
  },
  {
    path: "/signup",
    element: <SignUpPage/>
  }
]);
export default router;