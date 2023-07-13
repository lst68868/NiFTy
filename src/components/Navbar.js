import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../images/logo.svg";
import { AuthContext } from "./AuthContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { connectWallet } from "../web3files/walletConnection.js";
import { mintNFT } from "../web3files/NFTInterface.js";

function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Perform any necessary cleanup or API requests for sign out
    console.log("Signing out...");
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/"); // Navigate to the sign-in page after sign out
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate("/signup");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid style={{ gap: "20px", height: "70px" }}>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="150px"
            height="150px"
            className="d-inline-block align-top"
            alt="Mycelium logo"
          />
        </Navbar.Brand>
        <div style={{ display: "flex", gap: "20px" }}>
          <Nav.Link href="/userprofile">
            <i className="fas fa-user"></i>
          </Nav.Link>
          <Button variant="primary" onClick={() => connectWallet()}>
            <i className="fas fa-wallet"></i>
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              mintNFT(
                "0xd42fb10F209e3DA159c30d04Dc9e6Fa0f9A50F80",
                "https://i.imgur.com/tWbWDED.png"
              )
            }
          >
            <i>mint!</i>
          </Button>

          {isLoggedIn ? (
            <Nav.Link variant="link" onClick={handleSignOut}>
              SignOut
            </Nav.Link>
          ) : (
            <div>
              <Nav.Link href="/signin">Sign In</Nav.Link>
              <Nav.Link href="/signup" onClick={handleSignUp}>
                Sign Up
              </Nav.Link>
            </div>
          )}
        </div>
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
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search NFTs"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
