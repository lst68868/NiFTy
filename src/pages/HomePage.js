import React from "react";
// import Trending from "../components/Trending";
import NFTCarousel from "../components/NFTCarousel";
import DropAnimation from "../components/DropAnimation";
import Countdown from "../components/Countdown";
import backsplash from "../images/backsplash.jpg";
import TrendingAnimation from "../components/TrendingAnimation";


const backsplashImage = backsplash;


function HomePage() {
  
  return (
    <div className="bg-fixed bg-cover min-h-screen" style={{ backgroundImage: `url(${backsplashImage})` }}>
      <div className="relative w-full h-full grid sm:place-items-center bg-cover" >
        <h1 className="absolute top-0 left-0 sm:static text-white text-2xl sm:text-2lg md:text-4xl font-orbitron font-thin z-10 pl-4 pt-6 sm:p-6 md:m-4">
          DROPPING - Future NFTs
        </h1>
        <DropAnimation className="absolute top-16 sm:inset-0 z-10 w-full h-full flex items-center justify-center" />
        <div className="absolute inset-0 flex items-center justify-center z-20 lg:pt-[100px] sm:pt-[60px]">
          <Countdown />
        </div>
      </div>
      <h1 className="text-white font-orbitron text-2xl sm:text-2lg md:text-2lg  font-thin pl-4 sm:p-4 md:m-4">
        TRENDING - Top Viewed NFTs 
      </h1>
      <div className="pb-24 pr-0">
      <TrendingAnimation />
      </div>
      <h1 className="text-white font-orbitron text-2xl sm:text-2lg md:text-2lg  font-thin pl-4 pt-6 sm:p-4 md:m-4">
        LATEST - Most Recent Drops 
      </h1>
      <div className="pb-24 pr-0">
      <NFTCarousel />
      </div>
    </div>
  );
}
export default HomePage;
