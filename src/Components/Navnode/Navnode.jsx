import React, { useState } from "react";
import "./Navnode.css";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouteLink } from "react-router-dom";
import { motion, useMotionValue } from "framer-motion";
import home from "../../assets/icons/home.png";
import dumbell from "../../assets/icons/dumbell_icon.png";
import user from "../../assets/icons/user.png";
import left_arrow from "../../assets/icons/leftArrow.png";
import glow_list from "../../assets/icons/glow_list.png";

const Navnode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDrag = (event, info) => {
    x.set(info.offset.x);
    y.set(info.offset.y);
  };

  return (
    <motion.div
      layout
      data-isOpen={isOpen}
      initial={{ borderRadius: 50, x: 0, y: 0 }}
      className="parent"
      style={{
        x,
        y,
        position: "absolute",
      }}
      drag
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDrag={handleDrag}
      onClick={() => setIsOpen(!isOpen)}
    > {!isOpen && <img style={{ width: "80px", height: "50px","pointer-events": "none" }} src={glow_list} alt="glow list" />}
      {isOpen && (
        <motion.div layout className="child">
          <nav className="floating-nav">
            <img src={left_arrow} alt="left arrow" />
         
    
         
            <RouteLink to="/home">
              <img src={home} alt="home" />
            </RouteLink>
            <RouteLink to="/MyCourse">
            <img src={dumbell} alt="dumbell" />
            </RouteLink>
            <RouteLink to="/dashboard">
              <img src={user} alt="user" />
            </RouteLink>
          </nav>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navnode;