import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular, faImage } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid, faXmark, faPalette, faMusic, faGamepad, faFootball, faLayerGroup, faEye} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function NFTInfoPage() {
  const { id } = useParams();
  const [nftData, setNftData] = useState(null);
  const [heart, setHeart] = useState(faHeartRegular);
  const [categoryIcon, setCategory] = useState('');
  const [previewStatus, setPreviewStatus] = useState('hidden');

  useEffect(() => {
    const fetchData = async () => {
      const BACKEND_URL = 'http://127.0.0.1:8000/';
      const route = 'nftinfo/';

      try {
        const response = await axios.get(BACKEND_URL + route + id);
        setNftData(response.data);
      } catch (error) {
        console.error("Failed to fetch NFTs", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (nftData) {
      switch(nftData.category) {
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
  }, [nftData]);

  function handleImageRedirect() {
    window.open(nftData.image_link, "_blank");
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    nftData &&
    <div className='nft-info-page'>
      <div className={'image-preview '+previewStatus}>
        <img src={nftData.image_link}/>
        <FontAwesomeIcon icon={faXmark} onClick={removeImagePreview}/>
      </div>
      <div className='image-container'>
        <div className='favorite-container'>
          <FontAwesomeIcon icon={faImage} onClick={handleImageRedirect}/>
          <FontAwesomeIcon icon={heart}  onClick={handleFavoriteStatus}/>
        </div>
        <img src={nftData.image_link} onClick={addImagePreview}/>
      </div>
      <div className='info-container'>
        <p className='light-blue collection'>{nftData.collection}</p>
        <h2 className='title'>{nftData.title}</h2>
        <p className='owner'>Owned by: <span className='light-blue'>{nftData.owned_by}</span> | Created by: <span className='light-blue'>{nftData.creator}</span></p>
        <p className='category'><FontAwesomeIcon icon={categoryIcon} /> {nftData.category}</p>
        <p className="view-count"><FontAwesomeIcon icon={faEye} /> {nftData.views}</p>
      </div>
    </div>
  )
}

export default NFTInfoPage;




