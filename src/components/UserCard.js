import React from "react";
import Avatar from "@mui/material/Avatar";
import ProfilePicture from "../images/NFT-Avatar.webp";
import axios from "axios";

const authTokens = localStorage.getItem("authTokens");

const data = JSON.parse(authTokens);
const { access } = data;
let ethereumAddress;

try {
  const profileResponse = await axios.get(
    "http://127.0.0.1:8000/api/profile/",
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  );

  ethereumAddress = profileResponse.data.ethereum_address;
  console.log(ethereumAddress);
} catch (err) {
  console.error(err);
}




export default function UserCard(props) {
  return (
    <div className="user-card">
      <div className="profile-pic-container">
        <label htmlFor="profile-pic">
          <Avatar className="profile-pic" alt="Remy Sharp" src={ProfilePicture} />
        </label>
      </div>
      <div className="user-details" style={{ margin: '20px' }}>
        <div > 
          <h2 className="username" style={{ fontSize: '2em', margin: '0' }}>{props.username}</h2> 
          <span style={{ fontSize: '1.5em', display: 'block', margin: '0' }}>{ethereumAddress}</span> 
        </div>
      </div>
    </div>
  );
}