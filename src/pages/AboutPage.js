import React from "react";
import Avatar from "@mui/material/Avatar";

import Larisa from "../images/Larisa.png";
import Leo from "../images/Leo.png";
import Matt from "../images/Matt.png";
import Me from "../images/me.jpg";
import Jajuan from "../images/Jajuan.jpg";
import background from "../images/mycelium-background.jpg"

const avatarImages = [
  { src: Larisa, name: "Larisa Mos" },
  { src: Leo, name: "Leo Tulchin" },
  { src: Matt, name: "Matt Ahlborg" },
  { src: Me, name: "Nafisa Mahmood" },
  { src: Jajuan, name: "Jajuan Godley" },
];

const backgroundImage = background;

function AboutPage() {
  return (
      <div className="about-page bg-fixed bg-cover bg-opacity-50" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="about-content px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="story flex flex-col md:flex-row items-stretch my-8 md:my-16  bg-white bg-opacity-50 rounded-[100px]">
            <div className="written text-slate-900 mx-12 p-2">
              <h2 className="font-semibold text-2xl mb-4 flex justify-center align-items-center "> OUR STORY</h2>
              <p className="text-lg mb-4">
                In the heart of the digital realm, a seed of an idea sprouted - an idea that would mimic nature's intricate connections in an entirely new landscape.
              </p>
              <p className="text-lg mb-4">
                It was the not so early days of the NFT revolution, a time when digital assets were fully claiming their rightful place in the world. A small team of innovators, us, fascinated by the hidden networks beneath our feet, found their muse in the enthralling mycelial networks that span beneath the forest floors. This unassuming life form, championed by the renowned forester and author Peter Wohlleben in his book, "The Hidden Life of Trees," presents a sophisticated and interconnected web, teeming with communication and exchange - nature's internet.
              </p>
              <p className="text-lg mb-4">
                It was here that the inspiration for our NFT marketplace was born. The serendipitous wordplay between "non-fungible" and "non-fungable" token led to the inception of a platform that encapsulates the essence of mycelium. 
              </p>
              <p className="text-lg mb-4">
                Our marketplace, akin to the mycelial networks, aims to connect digital creators and enthusiasts across the globe, fostering a vibrant ecosystem for trade and exchange of unique, digital assets. We looked to the mycelium not only for its symbolic representation of interconnection but also for its decentralization, its resilience, and its organic evolution.
              </p>
              <p className="text-lg mb-4">
                Thus, our platform emerged, intertwining nature's wisdom with blockchain technology, to create a marketplace that is as vibrant and dynamic as the mycelium that inspired it.
                </p>
            </div>

          </div>
          
          <div>
            <div className="team text-slate-900 flex justify-center gap-2 my-8 md:my-16">
              <h2 className="font-semibold text-2xl">OUR TEAM</h2>
            </div>
            <div className="avatar flex justify-center align-items-center gap-10 md:gap-24 mx-2 p-2 flex-wrap">
              {avatarImages.map((image, i) => (
                <div className="w-36 m-2">
                  <Avatar
                    alt={image.name}
                    src={image.src}
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.15)",
                    }}
                  />

                  <div className="text-slate-900 mt-5">
                    <h5 className="font-medium text-lg">{image.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

export default AboutPage
