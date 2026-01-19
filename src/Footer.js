import {React, useEffect} from "react";

import "./Footer.css";
import { FaFacebookF, FaInstagram, FaLinkedin, FaEnvelope, FaTiktok } from "react-icons/fa"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";

const Footer = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    script.async = true;
    document.body.appendChild(script);

  }, []);

  return (
    <div>
     <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h4 className="footer-heading">ABOUT</h4>
          <ul className="footer-list">
          {/* <li> <a href="https://www.statstechnicalsportwear.com/aboutus/" style={{textDecoration:"none", color:"#8b8b8b"}} target="_blank" rel="noopener noreferrer"> 
          ABOUT US</a></li> */}
            <li>
            <Link style={{textDecoration:"none", color:"#8b8b8b"}} to='/whatwedo'   onClick={(e) => {e.preventDefault(); window.location.href = "/whatwedo"}}>WHAT WE DO</Link>
            </li>
            {/* <li>
            <Link style={{textDecoration:"none", color:"#8b8b8b"}} to='/whywedoit'   onClick={(e) => {e.preventDefault(); window.location.href = "/whywedoit"}}>WHY WE DO IT</Link>
            </li> */}
            <li>
            <Link style={{textDecoration:"none", color:"#8b8b8b"}} to='/howwework'   onClick={(e) => {e.preventDefault(); window.location.href = "/howwework"}}>HOW WE WORK</Link>
            </li>
            <li>
            <Link style={{textDecoration:"none", color:"#8b8b8b"}} to='/whoweare'   onClick={(e) => {e.preventDefault(); window.location.href = "/whoweare"}}>WHO WE ARE</Link>
            </li>
          <li    //className="trustpilot-widget"
          data-locale="en-US"
          data-template-id="56278e9abfbbba0bdcd568bc"
          data-businessunit-id="6824058bb16be873d3c217aa"
         // data-style-height="52px"
         // data-style-width="100%" 
         >
            <Link style={{textDecoration:"none", color:"#8b8b8b"}} to="reviewpage"  onClick={(e) => {e.preventDefault(); window.location.href = "/reviewpage"}}> COMMUNITY</Link>
          </li>
     
            <li>
            <Link style={{textDecoration:"none", color:"#8b8b8b"}} to='/location'   onClick={(e) => {e.preventDefault(); window.location.href = "/location"}}>LOCATION</Link>
            </li>
           {/* <li> <a href="https://www.statstechnicalsportwear.com/location/" style={{textDecoration:"none", color:"#8b8b8b"}} target="_blank" rel="noopener noreferrer"> 
           LOCATION</a></li>
           <li> <a href="https://www.statstechnicalsportwear.com/faqs/" style={{textDecoration:"none", color:"#8b8b8b"}} target="_blank" rel="noopener noreferrer"> 
           FAQS</a></li>
           <li> <a href="https://www.statstechnicalsportwear.com/reviews/" style={{textDecoration:"none", color:"#8b8b8b"}} target="_blank" rel="noopener noreferrer"> 
           REVIEWS</a></li> */}
          </ul>
        </div>

        {/* Services Section */}
        <div className="footer-section">
          <h4 className="footer-heading">SERVICES</h4>
          <ul className="footer-list">
          <li>
          <li>
{ /*           <Link style={{textDecoration:"none", color:"#8b8b8b"}} to='/materialcare'   onClick={(e) => {e.preventDefault(); window.location.href = "/materialcare"}}>MATERIAL CARE</Link>
*/}            </li>
            <Link style={{textDecoration:"none", color:"#8b8b8b"}} to='/faqs'   onClick={(e) => {e.preventDefault(); window.location.href = "/faqs"}}>FAQS</Link>
            </li>
            <li>
            <Link style={{textDecoration:"none", color:"#8b8b8b"}} to='/termsofservice'   onClick={(e) => {e.preventDefault(); window.location.href = "/termsofservice"}}>TERMS OF SERVICE</Link>
            </li>
            <li>
            <Link style={{textDecoration:"none", color:"#8b8b8b"}} to='/returnpolicy'   onClick={(e) => {e.preventDefault(); window.location.href = "/returnpolicy"}}>RETURN AND EXCHANGE POLICY</Link>
            </li>
            <li>
            <Link style={{textDecoration:"none", color:"#8b8b8b"}} to='/privacypolicy'   onClick={(e) => {e.preventDefault(); window.location.href = "/privacypolicy"}}>PRIVACY POLICY</Link>
            </li>
          </ul>
        </div>

        {/* Connect Section */}
        <div className="footer-section">
          <h4 className="footer-heading">CONNECT</h4>
          <div className="footer-connect-links">
            <a href="https://www.facebook.com/statsph" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="connect-icon" />
            </a>
            <a href="https://www.instagram.com/statsph/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="connect-icon" />
            </a>
            <a href="https://www.threads.net/@statsph?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" aria-label="Threads" style={{marginTop:'-2px'}}>
            <div className="connect-icon"> <span className="fa-brands fa-threads"/></div>
            </a>
            <a href="https://www.tiktok.com/@statsph?_t=8s5OXGDiNX8&_r=1" aria-label="Tiktok" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="connect-icon" />
            </a>
            <a href="https://www.linkedin.com/company/stats-technical-apparel" aria-label="LInkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="connect-icon" />
            </a>
            <a href="mailto:statsfxl@gmail.com" aria-label="Email" target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="connect-icon" />
            </a>
          </div>
        </div>
      </div>
      </footer>
    <div className="footer-copyright">

    <p>
      Copyright &copy; 2025 - <b>STATS</b>
    </p>
  </div>
  </div>
  );
};

export default Footer;
