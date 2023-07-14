import React from 'react'

import Drop from '../components/Drop'
import Trending from '../components/Trending'
import NFTCarousel from '../components/NFTCarousel'

function HomePage() {
  return (
    <>
      {/* header:Start */}
      <NFTCarousel />
      {/* header:End */}

      {/* drop:start */}

      {/* drop:end */}
      {/* <Drop /> */}
      <Trending />
      <NFTCarousel/>
    </>
  )
}

export default HomePage