import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartRegular,
  faImage,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faXmark,
  faPalette,
  faMusic,
  faGamepad,
  faFootball,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

function NFTInfoPage() {
  const { id } = useParams();
  const [nftData, setNftData] = useState(null);
  const [heart, setHeart] = useState(faHeartRegular);
  const [categoryIcon, setCategory] = useState("");
  const [previewStatus, setPreviewStatus] = useState("hidden");

  useEffect(() => {
    const fetchData = async () => {
      const BACKEND_URL = "http://127.0.0.1:8006/";
      const route = "nftinfo/";

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
      switch (nftData.category) {
        case "Art":
          setCategory(faPalette);
          break;
        case "Music":
          setCategory(faMusic);
          break;
        case "Gaming":
          setCategory(faGamepad);
          break;
        case "Sports":
          setCategory(faFootball);
          break;
        case "Collectibles":
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
    } else {
      setHeart(faHeartRegular);
    }
  }

  function removeImagePreview() {
    if (previewStatus === "") {
      setPreviewStatus("hidden");
    }
  }
  function addImagePreview() {
    if (previewStatus === "hidden") {
      setPreviewStatus("");
    }
  }

  return (
    nftData && (
      <div className="nft-info-page">
        <div className={"image-preview " + previewStatus}>
          <img src={nftData.image_link} />
          <FontAwesomeIcon icon={faXmark} onClick={removeImagePreview} />
        </div>
        <div className="image-container">
          <div className="favorite-container">
            <FontAwesomeIcon icon={faImage} onClick={handleImageRedirect} />
            <FontAwesomeIcon icon={heart} onClick={handleFavoriteStatus} />
          </div>
          <img src={nftData.image_link} onClick={addImagePreview} />
        </div>
        <div className="info-container">
          <p className="light-blue collection">{nftData.collection}</p>
          <h2 className="title">{nftData.title}</h2>
          <p className="owner">
            Owned by: <span className="light-blue">{nftData.owner}</span> |
            Created by: <span className="light-blue">{nftData.creator}</span>
          </p>
          <p className="category">
            <FontAwesomeIcon icon={categoryIcon} /> {nftData.category}
          </p>
          <p className="light-blue collection">{nftCollection}</p>
          <h2 className="title">{nftTitle}</h2>
          <p className="owner">
            Owned by: <span className="light-blue">{nftOwner}</span> | Created
            by: <span className="light-blue">{nftCreator}</span>
          </p>
          <div className="info-container-footer">
            <p className="category">
              <FontAwesomeIcon icon={categoryIcon} /> {nftCategory}
            </p>
            <p className="view-count">
              <FontAwesomeIcon icon={faEye} /> {viewCount}
            </p>
          </div>
        </div>
      </div>
    )
  );
}

export default NFTInfoPage;
