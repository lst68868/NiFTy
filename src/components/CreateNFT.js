import React, {useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreateNFT() {
    const BACKEND_URL = 'URL';//<-- Should probably be put in a .env file ¯\\_(ツ)_/¯ Also remember to add the backend url
    const route = '/';//<---TODO: Add the route that lets you create a NFT

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [category, setCategory] = useState('');
    const [titleError, setTitleError] = useState('');
    const [linkError, setLinkError] = useState('');
    const [submitError, setSubmitError] = useState('');

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
        }else {
            setTitleError('');
        }

        if (link === '') {
            setLinkError('Link cannot be left blank');
            return false;
        } else {
            setLinkError('');
        }

    
        // TODO: Connect to the backend and send a POST request with the Title and link
        const postDetails = { //<-- TODO: replace creator, and owned_by with their correct infomation
            title: title,
            creator: 'The User',
            date_created: new Date(),
            image_link: link,
            category: category,
            owned_by: 'The User'
        }

        try {
            const res = await axios.post(BACKEND_URL+route, postDetails);
            console.log(res);
            setSubmitError('');
        }
        catch(err) {
            console.log(err);
            setSubmitError('An error occured while attemping to upload. Make sure your link was valid');
        }
   }  
  
    return (
    <div className='NFT-creation-form'>
        <h1>Create A NFT</h1>
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
            Enter a link for the NFT
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
            Choose a category for your NFT
            </Form.Text>
        </div>

        <Button variant="primary" onClick={handleSubmit}>Upload NFT</Button>{' '}
        <h6 className='error-text'>{submitError}</h6>
    </div>
  );
}

export default CreateNFT;