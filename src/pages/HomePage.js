import React from 'react'

import Drop from '../components/Drop'
import Trending from '../components/Trending'
import NFTCarousel from '../components/NFTCarousel'

function HomePage() {
  return (
    <>
      <NFTCarousel />
      <Trending />
      <NFTCarousel/>
    </>
  )
}

export default HomePage