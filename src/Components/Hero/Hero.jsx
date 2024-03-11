import React from 'react'
import "./Hero.css"
import hero_image from "../../assets/homepage_model.png"
import hero_back from "../../assets/hero_image_back.png"
import heart from "../../assets/heart.png"
import calories from "../../assets/calories.png"
import { motion } from "framer-motion"

import { Link } from "react-scroll";

const Hero = () => {
  const transition = { duration: 1, type: "tween"};
  const mobile = window.innerWidth<=768? true:false;
  
  return (
  
    <div className="hero" id='home'>
      {/* <h1>hi</h1> */}
      <div className="blur hero-blur"></div>

      <div className="left-h">
        {/* <Header/> */}
        {/* the best ad */}
        <div className="the-best">
          

          <motion.div
            initial={{left: mobile? "178px": '238px' }}
            whileInView={{ left: "8px" }}
            transition={{ ...transition, type: "tween", repeat: Infinity}}
          ></motion.div>
          
          <span>THE BEST FITNESS APP For OLDER ADULTS</span>
        </div>
        {/* Hero text */}
        <div className="hero-text">
          <div>
            <span className="stroke-text">BUILD </span>
            <span> your </span>
          </div>
          <div>
            <span> Desired Physique</span>
          </div>
          <div>
            <span>
              In here, we will help you to build your muscle strength and enhance your physical performance
            </span>
          </div>
        </div>

      

        {/* hero buttons */}
        <div className="hero-btns">
          <button className="btn">Sign Up</button>
          <button className="btn">Learn More</button>
        </div>
      </div>

      {/* Right Side */}
      <div className="right-h">
      {/* <Link className="btn"
              to="contact"
              spy={true}
              smooth={true}
            >
              Sign In
     
            </Link> */}

          <button className="signin-btn"
              to="contact"
              spy={true}
              smooth={true}
            >
              Sign In
     
            </button>
         
        

        {/* heart rate */}
        {/* <motion.div
          initial={{ right: "-1rem" }}
          whileInView={{ right: "4rem" }}
          transition={transition}
          className="heart-rate"
        >
          <img src={heart} alt="" />
          <span>Heart Rate</span>
          <span>116 bpm</span>
        </motion.div> */}

        {/* hero images */}
        <img className="hero-img" src={hero_image} alt="" />
        <motion.img
            initial={{right: mobile? "11rem": '11rem' }}
          whileInView={{ right: "20rem" }}
          transition={transition}
          className="hero-back"
          src={hero_back}
          alt=""
        />

        {/* calories */}
        <motion.div
          initial={{ right: "32rem" }}
          whileInView={{ right: "28rem" }}
          transition={transition}
          className="calories"
        >
          <img src={calories} alt="" />
          <div>
            <span>Calories burned</span>
            <span>220 kcal</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
