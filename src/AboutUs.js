import React from 'react';
import './AboutUs.css'; // Add custom CSS for styling
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div>
    <div className="about-us-container">
      <div className="about-us-text">
        <h1>ABOUT US</h1>
        <p>
          <strong>STATS Technical Sportswear</strong>  is a prideful Filipino brand that produces high-performance technical sportswear, specifically designed for our tropical climate.

        </p>
        <p>
        We strive to set the industry standards for sportswear, focusing on fabric selection, construction, adaptability, and performance. We view apparel not merely as pieces of clothing, but as tools that amplify the wearer to consistently perform at their optimum level every time they use our products.
        </p>
        <p>
        Whether you're working out, playing your sport, or simply going about your daily activities — STATS wants to provide you with the perfect gear to help you confidently tackle any situation.
        </p>
        <p>
        Our products are constructed from advance tech-fabrics that are smooth, lightweight, moisture-wicking, durable, and with high shape retention — paired with advanced cuts and construction techniques these products are engineered for various high-performance activities, as the brand name implies: Season Condition, Tropical, Athletics, Training, and Sports.
        </p>
      </div>
      <div className="about-us-image">
        <img src="https://imagizer.imageshack.com/img924/6347/sCbDmS.jpg" alt="About Us" />
        <div className="about-us-text1">
        <p>
          <strong>STATS Technical Sportswear</strong>  is a prideful Filipino brand that produces high-performance technical sportswear, specifically designed for our tropical climate.

        </p>
        <p>
        We strive to set the industry standards for sportswear, focusing on fabric selection, construction, adaptability, and performance. We view apparel not merely as pieces of clothing, but as tools that amplify the wearer to consistently perform at their optimum level every time they use our products.
        </p>
        <p>
        Whether you're working out, playing your sport, or simply going about your daily activities — STATS wants to provide you with the perfect gear to help you confidently tackle any situation.
        </p>
        <p>
        Our products are constructed from advance tech-fabrics that are smooth, lightweight, moisture-wicking, durable, and with high shape retention — paired with advanced cuts and construction techniques these products are engineered for various high-performance activities, as the brand name implies: Season Condition, Tropical, Athletics, Training, and Sports.
        </p>
      </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
