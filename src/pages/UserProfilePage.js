import React from "react";
import UserCard from "../components/UserCard";
import CoverPicture from "../images/edit.jpg";

function UserProfilePage() {
  return (
    <>
      <div className="user-profile">
        <img className="cover-photo" src={CoverPicture} alt="" />
        <UserCard />
      </div>
    </>
  );
}

export default UserProfilePage;
