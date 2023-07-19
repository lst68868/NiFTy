import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import 'tailwindcss/tailwind.css';

function NFTCard({ nft }) {
  const navigate = useNavigate();
  function goToNFTInfoPage() {
    navigate(`/nftinfo/${nft.tokenId}`);
  }

  return (
    <Card
      className="nft-card text-center font-orbitron bg-black text-white d-flex flex-column"
      style={{ width: "16rem" }}
    > 
      <div className='nft-image-container'>
        <Card.Img className="w-full h-full object-cover" variant="top" src={nft.image_link} onClick={goToNFTInfoPage} />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="text-2xl">
            {nft.title}
          </Card.Title>
          <Card.Text className="text-xl">
            1 ETH
          </Card.Text>
        </div>
        <Button
          variant="light"
          className="w-full text-black text-base"
          style={{backgroundColor: "#39FF14"}}
        >
          Buy Now
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NFTCard;
