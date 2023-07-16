import React from 'react'

import Drop from '../components/Drop'
import Trending from '../components/Trending'
import NFTCarousel from '../components/NFTCarousel'
import DropAnimation from "../components/DropAnimation";


function HomePage() {
  return (
    <>
      <div className="anim-container">
        <DropAnimation />
      </div>
      <NFTCarousel />
      <Trending />
      <NFTCarousel/>
    </>
  )
}

export default HomePage