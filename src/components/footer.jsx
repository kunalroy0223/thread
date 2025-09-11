import React from 'react';
import '../styles/footer.scss'; 

const Footer = () => {
  return (
    <footer>
                                    <a href="#Home">
              <img src="/assets/img/full-logo.png" alt="logo" className="foot-logo"/>
            </a>
      <div className="grid-container">

        <div className="footer-container">

          <div className="foot-container quick-links">
            <div className="title">Quick Links</div>
            <ul>
              <li>
                <a href="#Home">
                  <img src="/assets/img/right.png" alt="arrow" height="15px" />
                  Home
                </a>
              </li>
              <li>
                <a href="#About">
                  <img src="/assets/img/right.png" alt="arrow" height="15px" />
                  About
                </a>
              </li>
              <li>
                <a href="#Skills">
                  <img src="/assets/img/right.png" alt="arrow" height="15px" />
                  Skills
                </a>
              </li>
            </ul>
          </div>
                    <div className="foot-container quick-links">
            <div className="title">Quick Links</div>
            <ul>
              <li>
                <a href="#Home">
                  <img src="/assets/img/right.png" alt="arrow" height="15px" />
                  Home
                </a>
              </li>
              <li>
                <a href="#About">
                  <img src="/assets/img/right.png" alt="arrow" height="15px" />
                  About
                </a>
              </li>
              <li>
                <a href="#Skills">
                  <img src="/assets/img/right.png" alt="arrow" height="15px" />
                  Skills
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