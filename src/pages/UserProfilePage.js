import React from "react";
import UserCard from "../components/UserCard";
<<<<<<< HEAD
import CoverPicture from "../images/edit.jpg";
=======
import CoverPicture from "../images/Ethereum.png";
import NFTCardUserProfile from "../components/NFTCardUserProfile";
>>>>>>> 3d36815eaf1db13b94a07e96e831f96b83815f39

function UserProfilePage() {
  //TODO: Get the user's collected NFTs and created NFTs from the backend and replace the hard-coded values 
  const collectedCards = ["https://cdn.lifestyleasia.com/wp-content/uploads/sites/2/2021/11/03175949/Bored-Ape-1.jpg", "https://i.seadn.io/gcs/files/69933fcc6791054a4262cfeb38460f05.gif?auto=format&dpr=1&w=1000", "https://dl.openseauserdata.com/cache/originImage/files/03b9d13915eef9f9d76e7bb17f22c59c.png", "https://dl.openseauserdata.com/cache/originImage/files/f5657ce1f1b3175ef825a87d3ac25803.png", "https://dl.openseauserdata.com/cache/originImage/files/ae06ceb52025299b4dece37d4c0980b2.png", "https://dl.openseauserdata.com/cache/originImage/files/6b9754fe84548b7a535013e0e55818f9.png", "https://dl.openseauserdata.com/cache/originImage/files/e39738085c521de5e437e71dd1172781.png"];
  const createdCards = [];
  
  return (
    <>
      <div className="user-profile">
        <img className="cover-photo" src={CoverPicture} alt="" />
        <UserCard />
      </div>

      <div className='carousel-container'>
        <h3>Collected NFTs</h3>
        <div className='collected-nfts'>
          {collectedCards.map((_, i) => (
            <NFTCardUserProfile key={i} imageSrc={collectedCards[i]}/>
          ))}
          {collectedCards.length === 0 && 
            <h2>This user doesn't own any NFTs</h2>
          }
        </div>
          
        <h3>Created NFTs</h3>
        <div className='created-nfts'>
          {createdCards.map((_, i) => (
            <NFTCardUserProfile key={i} imageSrc={createdCards[i]}/>
          ))}
          {createdCards.length === 0 &&
            <h2>This user hasn't created any NFTs</h2>
          }
        </div>

      </div>
    </>
  );
}

export default UserProfilePage;
