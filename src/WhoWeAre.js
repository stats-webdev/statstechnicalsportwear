import Footer from './Footer'
import './WhoWeAre.css'
import React from 'react'

function WhoWeAre() {
  return (
    <div>
      <div className='WhoWeAreContainer'>
        <h3>WHO WE ARE</h3>
    <hr></hr>
    <p> <strong>STATS Technical Sportswear</strong> is a prideful Filipino brand that produces high-performance technical sportswear, specifically designed for our tropical climate.</p>

    <p>We strive to set the industry standards for sportswear, focusing on fabric selection, construction, adaptability, and performance. We view apparel not merely as pieces of clothing, but as tools that amplify the wearer to consistently perform at their optimum level every time they use our products.</p>
    
    <p>Whether you're working out, playing your sport, or simply going about your daily activities — STATS wants to provide you with the perfect gear to help you confidently tackle any situation.</p>
    
    <p>Our products are constructed from advanced tech-fabrics that are smooth, lightweight, moisture-wicking, durable, and with high shape retention — paired with advanced cuts and construction techniques; these products are engineered for various high-performance activities, as the brand name implies: Season Condition, Tropical, Athletics, Training, and Sports.</p>
    {/* <img className='HowWeWorkimg' src='https://i.pinimg.com/1200x/a1/fb/47/a1fb47633a85ccc9e2d3c0a3a01a163f.jpg'/> */}
       </div>
      <Footer className='footerbottom'/>
    </div>
  )
}

export default WhoWeAre