// Banner.js
import React, { useState, useEffect } from 'react';
import './Style.css';

function Banner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [bannerImage, setBannerImage] = useState(''); // State to store banner image URL

  // Fetch banner image from API on component mount
  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const response = await fetch('https://my-product-api.stats-webdev.workers.dev/bannerfetch');
        const data = await response.json();
        const bannerURL = data.banner; // Assuming the response contains a "banner" field
        setBannerImage(bannerURL); // Update the state with the banner image URL
       // console.log(bannerURL);
      } catch (error) {
        console.error('Error fetching banner image:', error);
      }
    };

    fetchBannerImage();
  }, []);

  useEffect(() => {
    const targetDate = new Date("2024-12-01T23:59:59").getTime(); // Set your countdown target date here

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Banner scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const banner = document.getElementById('banner');
      const scrollPosition = window.scrollY;
      if (banner) {
        if (scrollPosition < 200) {
          banner.style.height = `${70 - scrollPosition / 10}vh`;
        } else {
          banner.style.height = '50vh';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
     <div className="Banner" id="banner">
    {bannerImage ? (
      <img
        src={bannerImage}
        alt="banner"
        className="banner-image"
      />
    ) : null}
      {/* <div className="banner-content">
        <div className="countdown-timer">
          <div className="time-block">
            <span className="time-value">{timeLeft.days}</span>
            <span className="time-label">days</span>
          </div>
          <div className="time-block">
            <span className="time-value">{timeLeft.hours}</span>
            <span className="time-label">hours</span>
          </div>
          <div className="time-block">
            <span className="time-value">{timeLeft.minutes}</span>
            <span className="time-label">minutes</span>
          </div>
          <div className="time-block">
            <span className="time-value">{timeLeft.seconds}</span>
            <span className="time-label">seconds</span>
          </div>
        </div>
        <h2 className="banner-title">[ Warehouse Sale 2024 ]</h2>
        <p className="banner-subtitle">DISCOUNTS UP TO 80% OFF</p>
      </div> */}
    </div>
  );
}

export default Banner;
