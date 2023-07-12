import Footer from "./Footer";
import NavBar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <NavBar/>
      {children}
      <Footer/>

    </div>
  );
};

export default Layout;