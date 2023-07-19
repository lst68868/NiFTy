import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import CoverPicture from "../images/edit.jpg";
import NFTCardUserProfile from "../components/NFTCardUserProfile";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import NFTCard from "../components/NFTCard";
import axios from "axios";

let ethereumAddress;
const authTokens = localStorage.getItem("authTokens");
const data = JSON.parse(authTokens);
const { access } = data;
try {
  const profileResponse = await axios.get(
    "http://127.0.0.1:8000/api/profile/",
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  );

  ethereumAddress = profileResponse.data.ethereum_address;
  console.log(ethereumAddress)


} catch (err) {
  console.error(err);
}

function UserProfilePage() {
  const [cards, setCards] = useState([]); 
  async function UserProfileNFTCarousel() {
    const BACKEND_URL = "http://127.0.0.1:8000/"//"https://nft-mint-api-824f9dc02cba.herokuapp.com/";
    const route = "NFT/";
  
  // Initialize the cards state as an empty array
    const response = await axios.get(BACKEND_URL+route)
    const NFTs = response.data
    const createdNFTs = [];
    NFTs.forEach((nft) => {
      if (nft.creator === ethereumAddress) {
        createdNFTs.push(nft)
      }
    })

    setCards(createdNFTs)
  }


  const { username } = useParams();
  
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    UserProfileNFTCarousel()
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
          {cards.map((card, i) => (
            <NFTCard key={i} nft={card} nftId={card.id} />
            // <NFTCardUserProfile key={i} imageSrc={createdCards[i]} />
          ))}
          {cards.length === 0 && (
            <h2>This user hasn't created any NFTs</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;