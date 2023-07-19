import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mintNFT } from "../web3files/NFTInterface.js";
import getHighestID from "../web3files/alchemy_calls.js";
import mint from "../images/mint.jpg"
import CreateNFTAnimation from "./CreateNFTAnimation.js";


function CreateNFT() {
  const navigate = useNavigate();

  const mintImage=mint;
  // const BACKEND_URL = "https://nft-mint-api-824f9dc02cba.herokuapp.com/";
  const BACKEND_URL = "http://127.0.0.1:8000/"
  const route = "api/create-nft/";

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("Art");
  const [titleError, setTitleError] = useState("");
  const [linkError, setLinkError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [response, setResponse] = useState("");

  function updateTitle(element) {
    setTitle(element.target.value);
  }

  function updateLink(element) {
    setLink(element.target.value);
  }

  function updateCategory(element) {
    setCategory(element.target.value);
  }

  async function handleSubmit() {
    const highestTokenId = await getHighestID();

    if (title === "") {
      setTitleError("Title cannot be left blank");
      return false;
    } else {
      setTitleError("");
    }

    if (link === "") {
      setLinkError("Link cannot be left blank");
      return false;
    } else {
      setLinkError("");
    }
    const authTokens = localStorage.getItem("authTokens");

    if (!authTokens) {
      // Handle case when access token is not available
      // Redirect user to login or take appropriate action
      return;
    }
    const currentDate = new Date().toISOString();

    const data = JSON.parse(authTokens);
    const { access } = data;
    try {
      const profileResponse = await axios.get(
        "http://127.0.0.1:8000/api/profile/",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const ethereumAddress = profileResponse.data.ethereum_address;

      const postDetails = {
        title: title,
        creator: ethereumAddress,
        date_created: currentDate,
        image_link: link,
        category: category,
        owned_by: ethereumAddress,
        tokenId: highestTokenId + 1,
      };

      const createNftResponse = await axios.post(
        BACKEND_URL + route,
        postDetails
      );

      setSubmitError("");
      setResponse("");

      
    } catch (err) {
      console.error(err);
      setSubmitError(
        "An error occurred while attempting to upload. Make sure your link is valid"
      );
      setResponse("NFT creation failed");
    }

    setTimeout(() => {
      navigate('/');
    }, 6000)
  }

  return (
    <div 
      className="relative flex bg-slate-900 text-white h-screen w-full bg-cover"
      style={{ backgroundImage: `url(${mintImage})`}}
    >
      <h1 className="relative top-0 left-0 sm:static text-neon-green text-2xl sm:text-2lg md:text-4xl font-orbitron font-bold z-10 pl-4 pt-6 sm:p-6 md:m-4">
        MINT NFT
      </h1>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <CreateNFTAnimation className="w-2/3 sm:w-3/4 md:w-3/4 lg:w-1/5 sm:p-0 sm:m-0" /> 
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] lg:w-[250px] h-[200px] lg:h-[250px] flex flex-col items-center justify-center bg-slate-900 rounded-full p-4 overflow-auto z-20">
        
        <div className="mb-2 w-full text-center">
          {/* <label htmlFor="title-label" className="block mb-1 text-sm">Title</label> */}
          <input 
            type="text"
            id="title-label"
            className="w-3/4 px-2 py-1 bg-slate-800 text-white placeholder-neon-green placeholder-opacity-50 italic text-sm shadow-lg rounded-lg"
            placeholder="Give it a title!"
            onChange={updateTitle}
          />
          {titleError && <p className="mt-1 text-red-500 text-xs">{titleError}</p>}
        </div>

        <div className="mb-2 w-full text-center">
          {/* <label htmlFor="link-label" className="block mb-1 text-sm">Link</label> */}
          <input
            type="text"
            id="link-label"
            className="w-3/4 px-2 py-1 bg-slate-800 text-white placeholder-neon-green placeholder-opacity-50 italic text-sm shadow-lg rounded-lg" 
            placeholder="Drop image link here"
            onChange={updateLink}
          />
          {linkError && <p className="mt-1 text-red-500 text-xs">{linkError}</p>}
        </div>

        <div className="mb-2 w-full text-center">
          {/* <label htmlFor="category-label" className="block mb-1 text-sm">Category</label> */}
          <select id="category-label" className="w-3/4 px-2 py-1 bg-slate-800 text-neon-green placeholder-black placeholder-opacity-50 italic text-sm shadow-lg rounded-lg" onChange={updateCategory}>
            <option value="" disabled selected>Choose category</option>
            <option value="Art">Art</option>
            <option value="Music">Music</option>
            <option value="Gaming">Gaming</option>
            <option value="Sports">Sports</option>
            <option value="Collectibles">Collectibles</option>
          </select>
        </div>

        <button
          className="w-3/4 py-1 bg-neon-green text-black font-orbitron rounded mb-2 text-center text-sm shadow-lg"
          onClick={async () => {
            try {
              handleSubmit();
              const response = await mintNFT(
                "0xd42fb10F209e3DA159c30d04Dc9e6Fa0f9A50F80",
                link
              );
              setResponse(
                <span>
                  NFT Mint pending:<br></br>To check on its status, click{" "}
                  <a
                    href={"https://sepolia.etherscan.io/tx/" + response.hash}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "underline" }}
                  >
                    here
                  </a>
                  .
                </span>
              );
            } catch (error) {
              console.error(error);
              setResponse("NFT minting failed");
            }
          }}
        >
          MINT NFT!
        </button>
        {response && <p className="text-white text-sm">{response}</p>}
        {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
      </div>
    </div>
  );
}


export default CreateNFT;
  


