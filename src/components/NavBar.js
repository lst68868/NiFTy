import React from "react";
import logo from "../images/logo.svg";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connectWallet } from "../web3files/walletConnection.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faWallet } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  const user = localStorage.getItem("user");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const { authTokens, user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, [authTokens]);

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate("/signup");
  };

  const handleUserProfile = () => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else {
      navigate("/userprofile");
    }
  };

  return (
    <nav className="bg-slate-900 text-white flex items-center px-8">
      <div className="flex-grow">
        <a href="/">
          <img
            src={logo}
            className="h-20 w-20"
            alt="Mycelium logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            <Nav.Link href="/drops">DROPS</Nav.Link>
            <NavDropdown title="Collections" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/collections/art">Art</NavDropdown.Item>
              <NavDropdown.Item href="/collections/games">
                Games
              </NavDropdown.Item>
              <NavDropdown.Item href="/collections/domain">
                Domain
              </NavDropdown.Item>
              <NavDropdown.Item href="/collections/music">
                Music
              </NavDropdown.Item>
              <NavDropdown.Item href="/collections/profilepicture">
                Profile Picture
              </NavDropdown.Item>
              <NavDropdown.Item href="/collections/photography">
                Photography
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/collections/all">
                All Collections
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id='navbarScrollingUserDropdown' style={{ color: '#212529' }}>
              <NavDropdown.Item onClick={handleUserProfile}>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={() => connectWallet()}>
                <FontAwesomeIcon icon={faWallet} /> Connect Wallet
              </NavDropdown.Item>
              <NavDropdown.Item href='/createnft'>Create NFT</NavDropdown.Item>
              {isLoggedIn ? (
                <NavDropdown.Item onClick={logoutUser}>SignOut</NavDropdown.Item>
              ) : (
                <>
                  <NavDropdown.Item href='/signin'>Sign In</NavDropdown.Item>
                  <NavDropdown.Item href='/signup' onClick={handleSignUp}>Sign Up</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search NFTs"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="dark">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </a>
      </div>
      <div className="space-x-4">
        <a href="/userprofile" className="text-neon-green hover:text-light-green transition-all duration-200">
          <i className="fas fa-user text-lg"></i>
        </a>
        <button className="text-neon-green hover:text-light-green transition-all duration-200" onClick={() => connectWallet()}>
          <i className="fas fa-wallet text-lg"></i>
        </button>
        {isLoggedIn ? (
          <a className="text-neon-green hover:text-light-green transition-all duration-200" onClick={logoutUser}>
            SignOut
          </a>
        ) : (
          <div className="flex space-x-4">
            <a href="/signin" className="text-neon-green hover:text-light-green transition-all duration-200">Sign In</a>
            <a href="/signup" onClick={handleSignUp} className="text-neon-green hover:text-light-green transition-all duration-200">
              Sign Up
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;