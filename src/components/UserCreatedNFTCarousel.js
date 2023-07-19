import React, { useState, useEffect } from "react";
import axios from "axios";
import NFTCard from "./NFTCard";
import "../styles/NFTCarousel.css";
import card from "@material-tailwind/react/theme/components/card";
let ethereumAddress;
try {
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
    console.log(ethereumAddress);
    } catch (err) {
    console.error(err);
    }
} catch(err) {
    ethereumAddress = 'noone'
}

function UserCreatedNFTCarousel() {
  const BACKEND_URL = "http://127.0.0.1:8000/";
//   const BACKEND_URL = "https://nft-mint-api-824f9dc02cba.herokuapp.com/";
  const route = "NFT/";
  const createdNFTs = []
  const [cards, setCards] = useState([]); // Initialize the cards state as an empty array

  // Fetch the NFT data when the component mounts
  useEffect(() => {
    // Define the function that fetches the data
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(BACKEND_URL + route);
        const allNFTs = response.data;
        
        allNFTs.forEach((nft) => {
            if (nft.creator === ethereumAddress) {
                createdNFTs.push(nft)
                console.log('found match')
            }
        })
        console.log('hihi')
        console.log(createdNFTs)

        setCards(createdNFTs); // Update the state with the fetched NFTs
      } catch (error) {
        console.error("Failed to fetch NFTs", error);
      }
    };

    fetchData(); // Call the function
  }, []); // An empty dependency array ensures the data is fetched only once when the component mounts

  return (
    <div className="nft-carousel m-6 bg-gradient-to-r from-slate-900 to-purple">
      {cards.map((nft, i) => (
        // Pass the NFT data as a prop to the NFTCard component
        <NFTCard key={i} nft={nft} nftId={nft.id} />
      ))}
    </div>
  );
}

export default UserCreatedNFTCarousel;