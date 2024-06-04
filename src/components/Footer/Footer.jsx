import React from "react";
import FooterLogo from "../../assets/Travel Logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import footervid from "../../assets/footervideo.mp4";



const Footer = () => {
  return (
    <>
      <div className="  py-10 relative overflow-hidden">
        <video autoPlay  loop  muted className="absolute right-0 top-0 h-full overflow-hidden w-full object-cover z-[-1]" >
          <source src={footervid} type="video/mp4" />
        </video>
        <div className="container">
          <div className=" py-5 bg-white/80 backdrop-blur-sm rounded-t-xl">
            <div className="py-8 px-4">
              <h1 className="flex  items-center gap-3 text-xl sm:text-3xl font-bold text-justify sm:text-left">
                <img src={FooterLogo} alt="" className="max-h-[60px]" />
                
              </h1>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                facere ab hic accusamus omnis dolor voluptatibus illo, tempore
                eum tenetur.
              </p>
              <br />
              <div className="flex items-center gap-3 ">
                <FaLocationArrow />
                <p>Faridabad, Harayana</p>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <FaMobileAlt />
                <p>+91 123xxxxxxxx</p>
              </div>
            
              <div>
                <div className="flex items-center gap-3 mt-6">
                  <a href="#">
                    <FaInstagram className="text-3xl" />
                  </a>
                  <a href="#">
                    <FaFacebook className="text-3xl" />
                  </a>
                  <a href="#">
                    <FaLinkedin className="text-3xl" />
                  </a>
                </div>
              </div>
            </div>
           
          </div>
          <div>
            <div className="text-center py-5 border-t-2 border-gray-300/50 bg-primary text-white">
              @copyright 2024 All rights reserved 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer
