
import React from 'react'
import drop from '../images/drop.svg'

function Drop() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '70%', 
      width: '80%', 
      margin: '5% auto'
     }}>
      <img
        src={drop}
        style={{ width: '100%', height: 'auto' }}
        alt="Drop"
      />
    </div>
  )
}

export default Drop