import React from 'react'
import Drop from '../components/Drop'
import Trending from '../components/Trending'
import Footer from '../components/Footer'
import NFTCarousel from '../components/NFTCarousel'

function HomePage() {
  return (
    <>
      {/* <Drop /> */}
      <Trending />
      <NFTCarousel/>
      <Footer />

    </>
  )
}

export default HomePage