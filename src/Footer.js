import React from 'react';
// import './footer.css';
// import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import social media icons
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer" style={{transform:"translate(0,18rem)"}}>
      <div className="container">
        <div className="footer-content">
          <div className="social-icons">
            <a href="#" className="icon-link">
              {/* <FaFacebook className="social-icon" /> */}
              <Facebook strokeWidth={1.5} />
            </a>
            <a href="#" className="icon-link">
              {/* <FaTwitter className="social-icon" /> */}
              <Twitter strokeWidth={1.5} />
            </a>
            <a href="#" className="icon-link">
              {/* <FaInstagram className="social-icon" /> */}
              <Instagram strokeWidth={1.5} />
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} Weather Bird. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
