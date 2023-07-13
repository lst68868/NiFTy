import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular, faImage } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid, faXmark, faPalette, faMusic, faGamepad, faFootball, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

function NFTInfoPage() {
  //TODO: Replace the hard-coded values below with the dynamic values.
  const nftImage = 'https://i.seadn.io/gcs/files/69933fcc6791054a4262cfeb38460f05.gif?auto=format&dpr=1&w=1000';
  const nftCollection = 'The Crystals';
  const nftCategory = 'Art';
  const nftTitle = 'The Crystals #0623';
  const nftOwner = '94JG89';
  const nftCreator = 'joemama';

  const [heart, setHeart] = useState(faHeartRegular); //<-- Remember to change this to the actual favorite status
  const [categoryIcon, setCategory] = useState('');
  const [previewStatus, setPreviewStatus] = useState('hidden');

  useEffect(handleCategory, []);
  function handleCategory() {
    switch(nftCategory) {
      case 'Art':
        setCategory(faPalette);
        break;
      case 'Music':
        setCategory(faMusic);
        break;
      case 'Gaming':
        setCategory(faGamepad);
        break;
      case 'Sports':
        setCategory(faFootball);
        break;
      case 'Collectibles':
        setCategory(faLayerGroup);
        break;
    }
  }

  function handleImageRedirect() {
    window.open(nftImage, "_blank");
  }

  function handleFavoriteStatus() {
    if (heart === faHeartRegular) {
      setHeart(faHeartSolid);
    }else {
      setHeart(faHeartRegular);
    }
  }

  function removeImagePreview() {
    if (previewStatus === '') {
      setPreviewStatus('hidden');
    }
  }
  function addImagePreview() {
    if (previewStatus === 'hidden') {
      setPreviewStatus('');
    }
  }
  return (
    <div className='nft-info-page'>
      <div className={'image-preview '+previewStatus}>
        <img src={nftImage}/>
        <FontAwesomeIcon icon={faXmark} onClick={removeImagePreview}/>
      </div>
      <div className='image-container'>
        <div className='favorite-container'>
          <FontAwesomeIcon icon={faImage} onClick={handleImageRedirect}/>
          <FontAwesomeIcon icon={heart}  onClick={handleFavoriteStatus}/>
        </div>
        <img src={nftImage} onClick={addImagePreview}/>
      </div>
      <div className='info-container'>
        <p className='light-blue collection'>{nftCollection}</p>
        <h2 className='title'>{nftTitle}</h2>
        <p className='owner'>Owned by: <span className='light-blue'>{nftOwner}</span> | Created by: <span className='light-blue'>{nftCreator}</span></p>
        <p className='category'><FontAwesomeIcon icon={categoryIcon} /> {nftCategory}</p>
      </div>
    </div>
  )
}

export default NFTInfoPage