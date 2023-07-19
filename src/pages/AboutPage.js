import React from "react";
import { FaLinkedin } from 'react-icons/fa'; // for LinkedIn icons
import background from "../images/mycelium-background.jpeg";
import leaves from "../images/leaves.jpg";
import Larisa from "../images/Larisa.png";
import Leo from "../images/Leo.png";
import Matt from "../images/Matt.png";
import Nafisa from "../images/me.jpg";
import Jajuan from "../images/Jajuan.jpg";

const avatarImages = [
  { src: Larisa, name: "Larisa Mos", linkedin: "#" },
  { src: Leo, name: "Leo Tulchin", linkedin: "#" },
  { src: Matt, name: "Matt Ahlborg", linkedin: "#" },
  { src: Nafisa, name: "Nafisa Mahmood", linkedin: "#" },
  { src: Jajuan, name: "Jajuan Godley", linkedin: "#" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-cover bg-center text-white flex flex-col items-center justify-center px-8 pt-32 pb-20 space-y-32" style={{backgroundImage: `url(${leaves})`}}>
      <div className="flex flex-col mx-8 sm:mx-2 md:flex-row space-y-32 md:space-y-0 md:space-x-16">
        <div className="w-full h-64 md:w-64 lg:w-[1000px] md:h-auto md:flex-grow rounded-full md:rounded-none lg:rounded-[60px] overflow-hidden border-neon-green border-[5px]"> 
          <img src={background} alt="Mycelium Background" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <h1 className="font-orbitron text-5xl md:text-left drop-shadow-sm shadow-neon-green">OUR STORY</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg md:gap-8"> {/* Increased the gap between grid columns */}
            <div className="space-y-4 text-2xl leading-normal"> {/* Increased text size for left column */}
              <p className="mb-4">In the heart of the digital realm, a seed of an idea sprouted - an idea that would mimic nature's intricate connections in an entirely new landscape.</p>
              <p>It was the not so early days of the NFT revolution, a time when digital assets were fully claiming their rightful place in the world. A small team of innovators, us, fascinated by the hidden networks beneath our feet, found their muse in the enthralling mycelial networks that span beneath the forest floors.</p>
            </div>

            <div className="space-y-4 text-base"> {/* Reduced text size for right column */}
              <p>This unassuming life form, championed by the renowned forester and author Peter Wohlleben in his book, "The Hidden Life of Trees," presents a sophisticated and interconnected web, teeming with communication and exchange - nature's internet.</p>
              <p>It was here that the inspiration for our NFT marketplace was born. The serendipitous wordplay between ‘non-fungible’ and 'non-fungable’ token led to the inception of a platform that encapsulates the essence of mycelium.</p>
              <p>Our marketplace, akin to the mycelial networks, aims to connect digital creators and enthusiasts across the globe, fostering a vibrant ecosystem for trade and exchange of unique, digital assets. We looked to the mycelium not only for its symbolic representation of interconnection but also for its decentralization, its resilience, and its organic evolution.</p>
              <p>Thus, our platform emerged, intertwining nature's wisdom with blockchain technology, to create a marketplace that is as vibrant and dynamic as the mycelium that inspired it.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start"> {/* Align the Our Team text with the left edge of the first text column */}
        <h2 className="font-orbitron text-4xl text-left sm:text-center mb-6 w-full">OUR TEAM</h2>

        <div className="flex flex-wrap justify-center gap-8"> {/* Increased the gap between avatars */}
          {avatarImages.map((avatar, index) => {
            const names = avatar.name.split(' ');

            return (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 mb-3 rounded-full overflow-hidden border-neon-green border-[5px]">
                    <img src={avatar.src} alt={avatar.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="mb-2 text-[18px] font-orbitron font-thin text-center">{names[0]}<br/>{names[1]}</h3>
                  <a href={avatar.linkedin} target="_blank" rel="noreferrer" className="text-linkedin hover:text-neon-green">
                    <FaLinkedin className="text-2xl" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
