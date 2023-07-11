import React, {useState} from 'react';
import Select from 'react-select';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreateNFT() {
    const BACKEND_URL = 'URL'//<-- Should probably be put in the .env file ¯\\_(ツ)_/¯
    const route = '/' //<---TODO: Add the route that lets you create a NFT

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [categories, setCategories] = useState([{value: 'option1', label: 'option1'}, {value: 'option2', label: 'option2'}, {value: 'option3', label: 'option3'}]);

    function updateTitle(element) {
        setTitle(element.target.value);

    }
    function updateLink(element) {
        setLink(element.target.value);
    }

    function handleTagChange(selectedOptions) {
        const selectedTags = selectedOptions.map(option => option.value);
      };

    async function handleSubmit() {
    // TODO: Connect to the backend and send a POST request with the Title and image link
    
        const postDetails = { //<-- TODO: replace creator, date_created, owned_by with their correct infomation
            title: title,
            creator: 'The User',
            date_created: new Date(),
            image_link: link,
            owned_by: 'The User'
        }

        try {
            const res = await axios.post(BACKEND_URL+route, postDetails);
            console.log(res);
        }
        catch(err) {
            console.log(err);
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
            Enter an image link for the NFT
            </Form.Text>
        </div>

        <div className='form-section category'>
            <Form.Label htmlFor="category-label">Category</Form.Label>
            <Select
            isMulti
            name="tags"
            options={categories}
            className="basic-multi-select mb-4"
            classNamePrefix="select"
            onChange={handleTagChange}
          />
        </div>

        <Button variant="primary" onClick={handleSubmit}>Submit</Button>{' '}
    </div>
  );
}

export default CreateNFT;

// function CreateNFT() {
//     const BACKEND_URL = 'URL' //<-- Should probably be put in the .env file ¯\\_(ツ)_/¯
//     const route = '/' //<---TODO: Add the route that lets you create a NFT

//     const [title, setTitle] = useState('');
//     const [link, setLink] = useState('');

//     function updateTitle(element) {
//         setTitle(element.target.value);

//     }
//     function updateLink(element) {
//         setLink(element.target.value);
//     }

//     async function onSubmit() {
//     // TODO: Connect to the backend and send a POST request with the Title and image link
    
//         const postDetails = { //<-- TODO: replace creator, date_created, owned_by with their correct infomation
//             title: title,
//             creator: 'The User',
//             date_created: new Date(),
//             image_link: link,
//             owned_by: 'The User'
//         }
    
//         try {
//             const res = await axios.post(BACKEND_URL+route, postDetails);
//             console.log(res);
//         }
//         catch(err) {
//             console.log(err);
//         }
//   }
  
//     return (
//     <div className='NFT-creation-form'>
//         <input className='title-field' onChange={updateTitle} placeholder='Enter the NFT title'></input>
//         <input className='link-field' onChange={updateLink} placeholder='Enter the image link'></input>
//         <button onClick={onSubmit}>Submit</button>
//     </div>
//   )
// }

// export default CreateNFT;