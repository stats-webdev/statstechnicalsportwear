import React, { useState, useEffect } from 'react';
import './BannerManager.css';

const BannerManager = () => {
  const [currentBanner, setCurrentBanner] = useState(''); // Current banner URL
  const [newBanner, setNewBanner] = useState(''); // New banner URL to update
  const [message, setMessage] = useState(''); // Message for feedback

  // Fetch the current banner from the API
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch('https://my-product-api.stats-webdev.workers.dev/bannerfetch');
        if (response.ok) {
          const data = await response.json();
          setCurrentBanner(data.banner || ''); // Set the current banner URL
        } else {
          console.error('Failed to fetch banner.');
        }
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    fetchBanner();
  }, []);

  // Update the banner in the API
  const handleBannerUpdate = async () => {
    try {
      const response = await fetch('https://my-product-api.stats-webdev.workers.dev/banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ banner: newBanner }),
      });

      if (response.ok) {
        setMessage('Banner updated successfully!');
        setCurrentBanner(newBanner); // Update the displayed current banner
        setNewBanner(''); // Clear the input field
      } else {
        setMessage('Failed to update banner.');
        console.error('Failed to update banner.');
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      setMessage('An error occurred while updating the banner.');
    }
  };

  return (
    <div className="bannerManagerContainer">
      <h2>Banner Manager</h2>
      <div className="currentBanner">
        <p>Current Banner:</p>
        {currentBanner ? (
          <img src={currentBanner} alt="Current Banner" className="bannerPreview" />
        ) : (
          <p>No banner set.</p>
        )}
      </div>
      <div className="updateBanner">
        <p>New Banner URL:</p>
        <input
          type="text"
          value={newBanner}
          onChange={(e) => setNewBanner(e.target.value)}
          placeholder="Enter new banner URL"
          className="bannerInput"
        />
        <button onClick={handleBannerUpdate} className="updateButton">
          Update Banner
        </button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default BannerManager;
