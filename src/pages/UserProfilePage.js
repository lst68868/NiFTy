import React, { useEffect } from "react";
import UserCard from "../components/UserCard";
import CoverPicture from "../images/edit.jpg";
import NFTCardUserProfile from "../components/NFTCardUserProfile";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";

function UserProfilePage() {
  const { username } = useParams();
  
  const navigate = useNavigate();
  const createdCards = [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="user-profile">
        <img className="cover-photo" src={CoverPicture} alt="" />
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <UserCard username={username}  />
          <Button
            variant="dark"
            onClick={() => navigate("/createnft")}
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
              marginTop: "20px",
              marginRight: "40px", 
              marginBottom: "25px"
            }}
          >
            Create NFT
          </Button>
        </div>
      </div>

      <div className="carousel-container">
        <h3>Created NFTs</h3>
        <div className="created-nfts">
          {createdCards.map((_, i) => (
            <NFTCardUserProfile key={i} imageSrc={createdCards[i]} />
          ))}
          {createdCards.length === 0 && (
            <h2>This user hasn't created any NFTs</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;