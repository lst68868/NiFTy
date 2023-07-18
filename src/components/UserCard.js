import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function UserCard(props) {
  return (
    <div className="user-card" >
      <div className="profile-pic-container">
        <label htmlFor="profile-pic" >
          <Avatar className="profile-pic" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </label>
        <input id="profile-pic" className="upload-profile-pic" type="file"/>
      </div>
      <div className="user-details" style={{ margin: '20px' }}>
      <h2 className="username">{props.username}</h2>
        <span>Ethereum Address</span>
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
