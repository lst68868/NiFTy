import React from 'react'
import drop from '../images/drop.svg'

function Drop() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img
        src={drop}
        style={{ width: '100%', height: 'auto' }}
        alt="Drop"
      />
    </div>
  )
}

export default Drop
