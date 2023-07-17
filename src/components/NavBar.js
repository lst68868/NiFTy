import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../images/logo.svg";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connectWallet } from "../web3files/walletConnection.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faWallet } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid style={{ gap: "20px", minHeight: "70px" }}>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="150px"
            height="150px"
            className="d-inline-block align-top"
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
  );
}

export default NavBar;