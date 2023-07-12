import {
  createBrowserRouter
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import Layout from "../components/Layout/Index";


// import Layout from "../components/layout/Index
;
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Layout> <HomePage /> </Layout>
  },
  {
    path: "/about/",
    element: <Layout><AboutPage/></Layout>
  },
  {
    path: "/signin",
    element: <Layout><SignInPage/> </Layout>
  },
  {
    path: "/signup",
    element: <Layout><SignUpPage/></Layout>

  },
]);
export default router;