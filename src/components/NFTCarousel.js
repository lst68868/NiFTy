import React from "react";
import NFTCard from "./NFTCard";
import "../styles/NFTCarousel.css";

function NFTCarousel() {
  const cards = Array.from({ length: 10 }); // replace with your array of NFT cards

  return (
    <div className="nft-carousel">
      {cards.map((_, i) => (
        <NFTCard key={i} />
      ))}
    </div>
  );
}

export default NFTCarousel;
