import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mintNFT } from "../web3files/NFTInterface.js";
import getHighestID from "../web3files/alchemy_calls.js";
import mint from "../images/mint.jpg"
// import CreateNFTAnimation from "./CreateNFTAnimation.js";

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

      // ...
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
      className="flex items-center justify-center bg-slate-900 text-white h-screen w-full bg-cover"
      style={{ backgroundImage: `url(${mintImage})`}}
    >
      <div className="lg:w-[500px] lg:h-[500px] flex flex-col items-center justify-center bg-slate-900 rounded-full p-6 overflow-auto">
        <h1 className="text-neon-green font-orbitron text-4xl mb-5 text-center">Mint an NFT</h1>
          <div className="mb-4 w-full text-center">
            <label htmlFor="title-label" className="block mb-2">Title</label>
            <input 
              type="text"
              id="title-label"
              className="w-full px-4 py-2 bg-slate-500 text-black placeholder-black placeholder-opacity-50 italic"
              placeholder="Give it a title!"
              onChange={updateTitle}
            />
            {titleError && <p className="mt-2 text-red-500 text-xs">{titleError}</p>}
          </div>
  
          <div className="mb-4 w-full text-center">
            <label htmlFor="link-label" className="block mb-2">Link</label>
            <input
              type="text"
              id="link-label"
              className="w-full px-4 py-2 bg-blue-200 text-white placeholder-white placeholder-opacity-50 italic" 
              placeholder="Drop in your image link"
              onChange={updateLink}
            />
            {linkError && <p className="mt-2 text-red-500 text-xs">{linkError}</p>}
          </div>
  
          <div className="mb-4 w-full text-center">
            <label htmlFor="category-label" className="block mb-2">Category</label>
            <select id="category-label" className="w-full px-4 py-2 bg-blue-200 text-white" onChange={updateCategory}>
              <option value="Art">Art</option>
              <option value="Music">Music</option>
              <option value="Gaming">Gaming</option>
              <option value="Sports">Sports</option>
              <option value="Collectibles">Collectibles</option>
            </select>
          </div>
  
          <button
            className="w-full py-1 bg-neon-green text-black font-orbitron rounded mb-4 text-center"
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
  
          {response && <p className="text-white">{response}</p>}
          {submitError && <p className="text-red-500">{submitError}</p>}
        </div>
      </div>
    );
  }
  export default CreateNFT;
  


