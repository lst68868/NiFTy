import React from "react";
import NFTCard from "./NFTCard";
import "../styles/NFTCarousel.css";

function NFTCarousel() {
  const cards = Array(10).fill(0); // replace with your array of NFT cards

  return (
    <div className="nft-carousel">
      {cards.map((_, i) => (
        <NFTCard key={i} />
      ))}
    </div>
  );
}

export default NFTCarousel;
