import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CollectionCard() {
  return (
    <Card style={{ width: "18rem", backgroundColor: "black" }}>
      <Card.Img
        variant="top"
        src="https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png"
      />
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title style={{ color: "white" }}>$19 Fortnite Card</Card.Title>
        <Card.Text style={{ color: "white" }}>by JankySpanky</Card.Text>
        <Button variant="light" style={{ width: "100%", color: "black" }}>
          View Collection
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CollectionCard;
