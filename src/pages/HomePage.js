import React from "react";
import {useSpring, animated} from 'react-spring';
import Trending from "../components/Trending";
import NFTCarousel from "../components/NFTCarousel";
import DropAnimation from "../components/DropAnimation";
import Countdown from "../components/Countdown";
import backsplash from "../images/backsplash.jpg";


const backsplashImage = backsplash;


function HomePage() {
  
  return (
    <div className="bg-fixed bg-cover" style={{ backgroundImage: `url(${backsplashImage})` }}>
      <div className="relative w-full h-full grid sm:place-items-center bg-cover" style={{ backsplashImage: `url(${backsplashImage})` }}>
        <h1 className="absolute top-0 left-0 sm:static text-white text-xl sm:text-2xl md:text-6xl font-orbitron font-thin z-10 pl-4 pt-6 sm:p-6 md:m-4">
          Future NFT Drops
        </h1>
        <DropAnimation className="absolute top-16 sm:inset-0 z-10 w-full h-full flex items-center justify-center" />
        <div className="absolute inset-0 flex items-center justify-center z-20 lg:pt-[100px] sm:pt-[60px]">
          <Countdown />
        </div>
      </div>
      <h1 className="text-white font-orbitron text-xl sm:text-2xl md:text-6xl  font-thin pl-4 sm:p-4 md:m-4">
        Latest NFTs 
      </h1>
      <NFTCarousel />
      <Trending />
      {/* <NFTCarousel /> */}
    </div>
  );
}
export default HomePage;
