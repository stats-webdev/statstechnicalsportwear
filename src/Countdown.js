import {React, useEffect, useState} from 'react'
import './Banner.css'


function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      
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

  return (
    <div> <div className="Banner1" id="banner">
    {/* { <img
      src="https://imagizer.imageshack.com/img922/9852/sUWLHf.gif"
      alt="banner"
      className="banner-image"
    />} */}
    <div className="banner-content1">
      <div className="countdown-timer1">
        <div className="time-block1">
          <span className="time-value1">{timeLeft.days}</span>
          <span className="time-label1">days</span>
        </div>
        <div className="time-block1">
          <span className="time-value1">{timeLeft.hours}</span>
          <span className="time-label1">hours</span>
        </div>
        <div className="time-block1">
          <span className="time-value1">{timeLeft.minutes}</span>
          <span className="time-label1">minutes</span>
        </div>
        <div className="time-block1">
          <span className="time-value1">{timeLeft.seconds}</span>
          <span className="time-label1">seconds</span>
        </div>
      </div>
       {/* <h2 className="banner-title1">[ WAREHOUSE SALE 2024 ]</h2>
      <p className="banner-subtitle1">DISCOUNTS UP TO 80% OFF</p>  */}
    </div>
  </div></div>
  )
}

export default Countdown