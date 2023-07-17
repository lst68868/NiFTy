import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular, faImage } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid, faXmark, faEye, faPalette, faMusic, faGamepad, faFootball, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

function NFTInfoPage() {
  const { id } = useParams();
  
  const BACKEND_URL = "https://nft-mint-api-824f9dc02cba.herokuapp.com/";
  const route = "NFT/";

  const [nftImage, setNftImage] = useState('');
  const [nftCollection, setNftCollection] = useState('');
  const [nftCategory, setNftCategory] = useState('');
  const [nftTitle, setNftTitle] = useState('');
  const [nftOwner, setNftOwner] = useState('');
  const [nftCreator, setNftCreator] = useState('');

  async function getNFT() {
    try {
      const response = await axios.get(BACKEND_URL + route)
      const data = response.data

      data.forEach((nft) => { //<-- We need a route that responds with a single nft so that we don't have to loop through every nft to find the one we need
        if (nft.id == id) {
          setNftImage(nft.image_link);
          setNftCollection(nft.title);
          setNftCategory(nft.category);
          setNftTitle(nft.title);
          setNftOwner(nft.owned_by);
          setNftCreator(nft.creator);
        }
      })
    } catch(error) {
      console.error(error)
    }
  }
  getNFT()

  //TODO: Replace the hard-coded values below with the dynamic values.
  const viewCount = 24; //<-- The NFT model should be updated to include a view counter

  const [heart, setHeart] = useState(faHeartRegular); //<-- Remember to change this to the actual favorite status
  const [categoryIcon, setCategory] = useState('');
  const [previewStatus, setPreviewStatus] = useState('hidden');

  useEffect(handleCategory, [nftCategory]);
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
        <div className='info-container-footer'>
          <p className='category'><FontAwesomeIcon icon={categoryIcon} /> {nftCategory}</p>
          <p className='view-count'><FontAwesomeIcon icon={faEye} /> {viewCount}</p>
        </div>
      </div>
    </div>
  )
}

export default NFTInfoPage