import React from 'react'
import Trending from '../components/Trending'
import NFTCarousel from '../components/NFTCarousel'
import DropAnimation from "../components/DropAnimation";
import Countdown from "../components/Countdown";

function HomePage() {
  return (
    <>
        <div className="relative bg-black w-full h-full">
        <h1 className="absolute top-0 left-0 text-white text-4xl font-orbitron z-20 p-4 m-4 md:text-6xl">FUTURE DROPS</h1>
        <DropAnimation className="absolute inset-0 z-10 w-full h-full flex items-center justify-center" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Countdown />
        </div>
      </div>
      <NFTCarousel />
      <Trending />
      <NFTCarousel/>
    </>
  )
}

export default HomePage