import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';

function TrendingAnimation() {
  const circleRefs = useRef([]);
  circleRefs.current = [];

  const addToRefs = (el) => {
    if (el && !circleRefs.current.includes(el)) {
      circleRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.to(circleRefs.current, {
      y: 'random(-80, 80)',
      x: 'random(-80, 80)',
      repeat: -1,
      yoyo: true,
      duration: 2, // making images move a bit faster
      ease: 'power1.inOut',
    });
  }, []);

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

  return (
    <div className="flex flex-wrap justify-center p-10"> {/* Added padding here */}
      {cards.map((card, index) => {
        const imageSize = Math.floor(Math.random() * (120 - 60 + 1)) + 60; // random size between 60 and 120
        const marginSize = Math.floor(Math.random() * 20) + 1;
        return (
          <div
            key={index}
            ref={addToRefs}
            className={`flex space-x-4 items-center transform-gpu transition-all duration-500 ease-in-out h-auto w-auto m-${marginSize} md:m-${marginSize * 2}`} // increased range of margin
            style={{flexBasis: `${100 / 5}%`}} // divide the row into 5
          >
            <div className="relative flex items-center justify-center">
              <img className={`rounded-full object-cover hover:scale-200 transition-all duration-300`} 
                style={{width: `${imageSize}px`, height: `${imageSize}px`, aspectRatio: "1/1"}} src={card.image_link} alt="" /> {/* Preserve the circle ratio */}
            </div>
            <div className="bg-neon-green p-2 rounded-md">
              <h3 className="text-sm h-3 text-black font-orbitron text-center">{card.title}</h3>
              <span className="absolute text-white top-0 left-[-10px] text-md">{index + 1}</span>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default TrendingAnimation;
