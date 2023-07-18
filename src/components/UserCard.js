import React from "react";
import Avatar from "@mui/material/Avatar";
import ProfilePicture from "../images/NFT-Avatar.webp";


function UserCard() {
  return (
    <div className="user-card" >
      <div className="profile-pic-container">
        <label htmlFor="profile-pic" >
          <Avatar className="profile-pic" alt="Remy Sharp" src={ProfilePicture} />
        </label>
      </div>
      <div className="user-details" style={{ margin: '20px' }}>
        <h2 className="username" style={{ fontSize: '2em', margin: '0' }}>Unnamed</h2> 
        <span style={{ fontSize: '1.5em', display: 'block', margin: '0' }}>Ethereum Address</span> 
      </div>


      {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0 1rem' }}>
        <div style={{ display: 'flex' }}>
          <ul className='list-unstyled mb-0' style={{ display: 'flex' }}>
            <li style={{ marginRight: '1rem' }}>
              <a href='#!' className='collected'>
                Collected
              </a>
            </li>
            <li style={{ marginRight: '1rem' }}>
              <a href='#!' className='created'>
                Created
              </a>
            </li>
            <li style={{ marginRight: '1rem' }}>
              <a href='#!' className='favorited'>
                Favorited
              </a>
            </li>
            <li>
              <a href='#!' className='activity'>
                Activity
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  );
}

export default UserCard;
