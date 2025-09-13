import React from 'react';
import '../../styles/landingPage/footer.scss'; 
import Flogo from "../../../public/assets/img/full-logo.png";
import Right from "../../../public/assets/icons/right.png";

const Footer = () => {
  return (
    <footer>
                                    <a href="#Home">
              <img src={Flogo} alt="logo" className="foot-logo"/>
            </a>
      <div className="grid-container">

        <div className="footer-container">

          <div className="foot-container quick-links">
            <div className="title">Quick Links</div>
            <ul>
              <li>
                <a href="#Home">
                  <img src={Right} alt="arrow" height="15px" />
                  Home
                </a>
              </li>
              <li>
                <a href="#Uvp">
                  <img src={Right} alt="arrow" height="15px" />
                  About
                </a>
              </li>
              <li>
                <a href="#Features">
                  <img src={Right} alt="arrow" height="15px" />
                  Features
                </a>
              </li>
              <li>
                <a href="#reviews">
                  <img src={Right} alt="arrow" height="15px" />
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#cta">
                  <img src={Right} alt="arrow" height="15px" />
                  Create
                </a>
              </li>                            
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <p>&copy; Kunal Roy. All rights reserved.</p>
    </footer>
  );
};

export default Footer;