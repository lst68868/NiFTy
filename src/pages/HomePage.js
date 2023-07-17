import React from "react";
import Trending from "../components/Trending";
import NFTCarousel from "../components/NFTCarousel";
import DropAnimation from "../components/DropAnimation";
import Countdown from "../components/Countdown";
function HomePage() {
  return (
    <div className="bg-black">
      <div className="relative bg-black w-full h-full grid sm:place-items-center">
        <h1 className="absolute top-0 left-0 sm:static text-white text-2xl sm:text-4xl md:text-6xl font-orbitron z-10 p-2 sm:p-4 md:m-4">
          FUTURE DROPS
        </h1>
        <DropAnimation className="absolute top-16 sm:inset-0 z-10 w-full h-full flex items-center justify-center" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Countdown />
        </div>
      </div>
      <NFTCarousel className="bg-black" />
      <Trending />
      <NFTCarousel />
    </div>
  );
}
export default HomePage;
