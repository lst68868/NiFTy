import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular, faImage } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid, faXmark, faPalette, faMusic, faGamepad, faFootball, faLayerGroup, faEye} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import shapes from '../images/shapes.jpg'; 

function NFTInfoPage() {
  const { id } = useParams();
  const [nftData, setNftData] = useState(null);
  const [heart, setHeart] = useState(faHeartRegular);
  const [categoryIcon, setCategory] = useState('');
  const [previewStatus, setPreviewStatus] = useState('hidden');

  useEffect(() => {
    const fetchData = async () => {
      const BACKEND_URL = 'https://nft-mint-api-824f9dc02cba.herokuapp.com/'//'http://127.0.0.1:8000/';
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
    <div className="nft-info-page" style={{ backgroundImage: `url(${shapes})` }}>
      <div className={`image-preview ${previewStatus}`}>
        <img src={nftData.image_link} className="object-cover w-full h-full"/>
        <FontAwesomeIcon icon={faXmark} className="text-white" onClick={removeImagePreview}/>
      </div>
      <div className='image-container bg-slate-700 bg-opacity-30'>
        <div className='favorite-container flex'>
          <FontAwesomeIcon icon={faImage} className=" text-white" onClick={handleImageRedirect}/>
          <FontAwesomeIcon icon={heart} className=" text-white" onClick={handleFavoriteStatus}/>
        </div>
        <img src={nftData.image_link} className="object-cover w-full h-full rounded-lg" onClick={addImagePreview}/>
      </div>
      <div className='info-container bg-slate-700 bg-opacity-30'>
        <p className='text-light-blue-400 collection'>{nftData.collection}</p>
        <h2 className=' text-neon-green font-orbitron'>{nftData.title}</h2>
        <p className='owner text-neon-green'>Owned by: <span className='text-white'>{nftData.owned_by}</span> | Created by: <span className='text-white'>{nftData.creator}</span></p>
        <div className='info-container-footer'>
          <p className='category text-white'><FontAwesomeIcon icon={categoryIcon} /> {nftData.category}</p>
          <p className="view-count text-white"><FontAwesomeIcon icon={faEye} /> {nftData.views}</p>
        </div>
      </div>
    </div>
  )
}

export default NFTInfoPage;
