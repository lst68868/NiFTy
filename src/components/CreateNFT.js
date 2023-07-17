import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { mintNFT } from "../web3files/NFTInterface.js";
import getHighestID from '../web3files/alchemy_calls.js';


function CreateNFT() {

  const BACKEND_URL = 'http://127.0.0.1:8006/';
  const route = 'api/create-nft/';

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('Art');
  const [titleError, setTitleError] = useState('');
  const [linkError, setLinkError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [response, setResponse] = useState('');

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


    if (title === '') {
      setTitleError('Title cannot be left blank');
      return false;
    } else {
      setTitleError('');
    }

    if (link === '') {
      setLinkError('Link cannot be left blank');
      return false;
    } else {
      setLinkError('');
    }
    const authTokens = localStorage.getItem('authTokens');

    if (!authTokens) {
      // Handle case when access token is not available
      // Redirect user to login or take appropriate action
      return;
    }

    const data = JSON.parse(authTokens);
    const { access } = data;
    const currentDate = new Date().toISOString();
    try {
      const profileResponse = await axios.get('http://127.0.0.1:8006/api/profile/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      const ethereumAddress = profileResponse.data.ethereum_address;
      console.log(ethereumAddress)


      const postDetails = {
        title: title,
        creator: ethereumAddress,
        date_created: currentDate,
        image_link: link,
        category: category,
        owned_by: ethereumAddress,
        tokenId: highestTokenId + 1
      }

      const createNftResponse = await axios.post(BACKEND_URL + route, postDetails);

      setSubmitError('');
      setResponse('');

      // ...
    } catch (err) {
      console.error(err);
      setSubmitError('An error occurred while attempting to upload. Make sure your link is valid');
      setResponse('NFT creation failed');
    }
  }

  return (
    <div className='NFT-creation-form'>
      <h1>Mint an NFT</h1>
      <div className='form-section title'>
        <Form.Label htmlFor="title-label">Title</Form.Label>
        <Form.Control
          type="title"
          id="title-label"
          aria-describedby="title-block"
          onChange={updateTitle}
        />
        <Form.Text placeholder='Enter a title for the NFT' id="title-block" muted>
          Enter a title for the NFT
        </Form.Text>
        <h6 className='error-text'>{titleError}</h6>
      </div>

      <div className='form-section link'>
        <Form.Label htmlFor="link-label">Link</Form.Label>
        <Form.Control
          type="link"
          id="link-label"
          aria-describedby="link-block"
          onChange={updateLink}
        />
        <Form.Text id="link-block" muted>
          Provide a link to an image for the NFT
        </Form.Text>
        <h6 className='error-text'>{linkError}</h6>
      </div>

      <div className='form-section category'>
        <div className='dropdown-container'>
          <Form.Label htmlFor="category-label">Category</Form.Label>
          <select className='dropdown-select' onChange={updateCategory}>
            <option value="Art">Art</option>
            <option value="Music">Music</option>
            <option value="Gaming">Gaming</option>
            <option value="Sports">Sports</option>
            <option value="Collectibles">Collectibles</option>
          </select>
        </div>
        <Form.Text id="category-block" muted>
          Designate a category for your NFT
        </Form.Text>
      </div>

      <Button
        variant="dark"
        onClick={async () => {
          try {
            handleSubmit();
            const response = await mintNFT(
              "0xd42fb10F209e3DA159c30d04Dc9e6Fa0f9A50F80",
              link
            );
            setResponse(
              <span>
                NFT Mint pending:<br></br>To check on its status, click{' '}
                <a
                  href={"https://sepolia.etherscan.io/tx/" + response.hash}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline' }}
                >
                  here
                </a>
                .
              </span>
            );
          } catch (error) {
            console.error(error);
            setResponse('NFT minting failed');
          }
        }}
      >
        <i>Mint!</i>
      </Button>

      <p>{response}</p>

      <h6 className='error-text'>{submitError}</h6>
    </div>
  );
}

export default CreateNFT;
