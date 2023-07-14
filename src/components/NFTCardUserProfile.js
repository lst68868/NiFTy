import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function NFTCardUserProfile(props) {
    const imageSrc = props.imageSrc;
    const infoPage = '';
    return (
    <Card
      className="nft-card"
      style={{ backgroundColor: "black" }}
    >
      <Card.Img
        variant="top"
        src={imageSrc}
      />
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title style={{ color: "white"}}>
          Expensive JPEG
        </Card.Title>
        <Card.Text style={{ color: "white", fontSize: "1rem" }}>
          1 ETH
        </Card.Text>
        <Button
          variant="light"
          style={{ width: "100%", color: "black", fontSize: "0.8rem" }}
        >
          Info
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NFTCardUserProfile;
