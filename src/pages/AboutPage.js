import React from 'react'
import Avatar from '@mui/material/Avatar';
import Footer from '../components/Footer';
import AboutPicture from "../images/network.png";

function AboutPage() {
  return (
    <>
      <div className='about-page'>
        <div className='about-content'>
          <section>
          </section>
          <div className='story' style={{ display: 'flex', margin: '10px', padding: '10px' }}>
            <img src={AboutPicture} alt="" style={{ marginRight: '20px' }}/>
            <div>
              <h2> Our Story</h2>
              <p>
                What is Lorem Ipsum?
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
          </div>
          <div className='team' style={{ display: 'flex', gap: '10px', margin: '10px', padding: '10px' }}>
            <h2>Our Team</h2>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 80, height: 80 }}
            />
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 80, height: 80 }}
            />
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 80, height: 80 }}
            />
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 80, height: 80 }}
            />
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 80, height: 80 }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default AboutPage
