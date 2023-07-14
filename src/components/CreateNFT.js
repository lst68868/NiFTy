import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { mintNFT } from "../web3files/NFTInterface.js";

function CreateNFT() {
  const BACKEND_URL = 'http://127.0.0.1:8000/';
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

    const currentDate = new Date().toISOString();

    const postDetails = {
      title: title,
      creator: 'The User',
      date_created: currentDate,
      image_link: link,
      category: category,
      owned_by: 'The User'
    }

    try {
      const res = await axios.post(BACKEND_URL + route, postDetails);
      console.log('123')
      console.log(res);
      setSubmitError('');
      setResponse('NFT created successfully');
    } catch (err) {
      console.log(err);
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
              "https://i.imgur.com/tWbWDED.png"
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