import React, { useState } from "react";
import "./Navbar.css";
import { Link as Link } from "react-scroll";
import Bars from "../../assets/bars.png";
import { Link as Route} from "react-router-dom";

const Navbar = () => {
  const mobile = window.innerWidth <= 768 ? true : false;
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <div className="header" id="header">
     
      {(menuOpened===false && mobile===true)? (
        <div
          style={{ backgroundColor: "var(--appColor)", padding: "0.5rem", borderRadius: "5px" }}
          onClick={() => setMenuOpened(true)}
        >
          <img
            src={Bars}
            alt="bars"
            style={{ width: "1.5rem", height: "1.5rem" }}
          />
        </div>
      ) : (
        <ul className="header-menu">
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              activeClass="active"
              to="home"
              spy={true}
              smooth={true}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              activeClass="active"
              to="introduction"
              spy={true}
              smooth={true}
            >
              About us
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to="programs"
              spy={true}
              smooth={true}
            >
              Programs
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to="contact"
              spy={true}
              smooth={true}
            >
              Contact us
            </Link>
          </li>
          <li className="signin">
            <Route
            className="signin-btn" 
              onClick={() => setMenuOpened(false)}
              to="/login"
              style={{ textDecoration: 'none' }}
            >
              Sign In
            </Route>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar