import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TrendingAnimation() {
  const circleRefs = useRef([]);
  circleRefs.current = [];

  const addToRefs = (el) => {
    if (el && !circleRefs.current.includes(el)) {
      circleRefs.current.push(el);
    }
  };

  const BACKEND_URL = 'https://nft-mint-api-824f9dc02cba.herokuapp.com/';
  const route = 'trending/';
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BACKEND_URL + route);
        let trending_nfts = response.data.slice(0, 10); // Get only top 10
        trending_nfts = trending_nfts.sort(() => Math.random() - 0.5); // Shuffle array
        setCards(trending_nfts);
      } catch (error) {
        console.error('Failed to fetch NFTs', error);
      }
    };

    fetchData();
  }, []);

  // Move the animation effect into another useEffect hook
  useEffect(() => {
    if (cards.length > 0) {
      gsap.to(circleRefs.current, {
        y: 'random(-80, 80)',
        x: 'random(-80, 80)',
        repeat: -1,
        yoyo: true,
        duration: 3,
        speed: 0.3,
        ease: 'power1.inOut',
      });
    }
  }, [cards]); // Added cards to the dependency array

  return (
    <div className="flex flex-wrap justify-center p-16"> 
      {cards.map((card, index) => {
        const imageSize = Math.floor(Math.random() * (120 - 60 + 1)) + 60; // random size between 60 and 120
        const marginSize = Math.floor(Math.random() * 20) + 1;
        return (
          <div
            key={index + 3}
            ref={addToRefs}
            className="flex space-x-4 items-center transform-gpu transition-all duration-500 ease-in-out h-30 w-30 m-4"
          >
            <div className="relative w-20 h-20 lg:w-30 lg:h-30 flex items-center justify-center">
              <Link to={`/nftinfo/${card.tokenId}`}>
                <img className="rounded-full object-cover w-full h-full hover:scale-200 transition-all duration-300" src={card.image_link} alt="" />
              </Link>
            </div>
            <div className="bg-neon-green p-2 rounded-md">
              <h3 className="text-sm h-3 text-black font-orbitron text-center">{card.title}</h3>
              <span className="absolute text-white font-orbitron top-0 left-[-10px] text-lg">{index + 1}</span>
              </div>
        </div>
      );
    })}
  </div>
);
  }

export default TrendingAnimation