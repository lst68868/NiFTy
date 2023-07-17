import React from 'react'
import Avatar from '@mui/material/Avatar';
import AboutPicture from "../images/network.png";

import Larisa from "../images/Larisa.png";
import Leo from "../images/Leo.png";
import Matt from "../images/Matt.png";
import Me from "../images/me.jpg";
import Jajuan from "../images/Jajuan.jpg";

const avatarImages = [
  { src: Larisa, name: "Larisa Mos" },
  { src: Leo, name: "Leo Tulchin" },
  { src: Matt, name: "Matt Ahlborg" },
  { src: Me, name: "Nafisa Mahmood" },
  { src: Jajuan, name: "Jajuan Godley" },
];

function AboutPage() {
  return (
    <>
      <div className='about-page'>
        <div className='about-content'>
          <div className='story' style={{ display: 'flex', alignItems: 'stretch', marginTop: '40px', padding: '10px' }}>
            <img src={AboutPicture} alt="" style={{ marginRight: '20px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.15)', width: '50%' }} />
            <div className='written' style={{ margin: '10px', padding: '10px' }}>
              <h2> Our Story</h2>
              <p>
                What is Lorem Ipsum?
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
          </div>
          <div>
            <div className='team' style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px', padding: '10px' }}>
              <h2>Our Team</h2>
            </div>
            <div className='avatar' style={{ display: 'flex', justifyContent: 'center', gap: '100px', margin: '10px', padding: '10px', flexWrap: 'wrap' }}>
              {avatarImages.map((image, i) => (
                <div style={{ width: '150px', margin: '10px' }}>
                  <Avatar
                    alt={image.name}
                    src={image.src}
                    sx={{ width: 120, height: 120, borderRadius: '50%', boxShadow: '0px 0px 10px rgba(0,0,0,0.15)' }}
                  />

                  <div style={{ marginTop: '20px' }}>
                    <h5>{image.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
