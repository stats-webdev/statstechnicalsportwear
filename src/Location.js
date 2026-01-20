import React from 'react';
import './Location.css'; // Import CSS for styling
import Footer from './Footer';

const Location = () => {
  return (
    <div>
    <div className="location-container">
      <div className="location-details-bg">
      <div className="location-details">
        <h2>Location</h2>
        <p>306 El Grande Avenue, BF Homes </p>
        <p>Parañaque City</p>
        <p>Operating Hours:</p>
        <div className="location-hours">
          <p>Monday to Friday</p>
          <p>8:00 AM - 5:00 PM</p>
          <p>Saturday</p>
          <p>10:00 AM - 4:00 PM</p>
        </div>
        </div>
      </div>
      <div className="location-image">
      <video class="RetailVideo__Video" autoplay="" muted="" playsinline="" loop="true" controlslist="nodownload"   onContextMenu={(e) => e.preventDefault()} src="/Website Location.mp4"></video>
      </div>
   
    </div>
       <div className="location-map">
       <iframe
         title="Location Map"
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2749.6386879022557!2d121.00339005046264!3d14.455915789767282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf9f060897fb%3A0x55d72d8005aceaa!2sSTATS%20HQ%202.0!5e0!3m2!1sen!2sph!4v1733888711935!5m2!1sen!2sph"
         width="600"
         height="450"
         style={{ border: 0 }}
         allowFullScreen=""
         loading="lazy"
       ></iframe>
     </div>
     <Footer/>
     </div>
  );
};

export default Location;