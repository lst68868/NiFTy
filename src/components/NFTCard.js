import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function NFTCard() {
  return (
    <Card style={{ width: "18rem", backgroundColor: "black" }}>
      <Card.Img
        variant="top"
        src="https://cdn.lifestyleasia.com/wp-content/uploads/sites/2/2021/11/03175949/Bored-Ape-1.jpg"
      />
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title style={{ color: "white" }}>Expensive JPEG</Card.Title>
        <Card.Text style={{ color: "white" }}>1 ETH</Card.Text>
        <Button variant="light" style={{ width: "100%", color: "black" }}>
          Buy Now
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NFTCard;
