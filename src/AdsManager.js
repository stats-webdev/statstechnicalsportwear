import React, { useState, useEffect } from 'react';
import './AdsManager.css'

const AdsManager = () => {
  const [adsOptions, setAdsOptions] = useState([]); // State for dropdown options
  const [adsID, setAdsID] = useState('');
  const [colorID, setColorID] = useState('');
  const [adsID1, setAdsID1] = useState('');
  const [colorID1, setColorID1] = useState('');
  const [message, setMessage] = useState('');
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const response = await fetch('https://my-product-api.stats-webdev.workers.dev/?id=1');
        const data = await response.json();
        setFetchedData(data); // Store entire fetched data if needed

      } catch (error) {
        console.error('Error fetching ads data:', error);
      }
    };
 
    fetchAdsData();
  }, []);
  const handleUpdate = async () => {
    try {
      const response = await fetch("https://my-product-api.stats-webdev.workers.dev/update-ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adsID, colorID, adsID1, colorID1 }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || 'Update successful!');
      } else {
        console.error(result);
        setMessage('Failed to update ad.');
      }
    } catch (error) {
      console.error("Error updating ad:", error);
      setMessage('An error occurred while updating.');
    }
  };
  console.log(fetchedData)
  const selectedAd = fetchedData ? fetchedData.find(ad => ad.Name === adsID) : null;
  const availableColors = selectedAd ? Object.keys(selectedAd.Colors) : [];
  
  const selectedAd1 = fetchedData ? fetchedData.find(ad => ad.Name === adsID1) : null;
  const availableColors1 = selectedAd1 ? Object.keys(selectedAd1.Colors) : [];
  
  return (
    <div className='adsContainer'>
    <div className='adsCard'>
      <h2>Update Ads</h2>
      <p>Ad 1</p>
      
      <select className='select' value={adsID} onChange={(e) => setAdsID(e.target.value)}>
      <option value="">Select Product</option>
      {Array.isArray(fetchedData) &&
          fetchedData.map((ad) => (
            <option key={ad.ID} value={ad.Name}>
              {ad.Name}
            </option>
          ))}
      </select>
      <select className='select' value={colorID} onChange={(e) => setColorID(e.target.value)} disabled={!adsID}>
        <option value="">Select Color</option>
        {Object.entries(availableColors).map(([colorID, colorName]) => (
          <option key={colorID} value={colorID}>
            {colorName} {/* Display the color name */}
          </option>
        ))}
      </select>
      <p>Ad 2</p>
      <select className='select' value={adsID1} onChange={(e) => setAdsID1(e.target.value)}>
      <option value="">Select Product</option>
        {Array.isArray(fetchedData) &&
          fetchedData.map((ad) => (
            <option key={ad.ID} value={ad.Name}>
              {ad.Name}
            </option>
          ))}
      </select>
      <select className='select' value={colorID1} onChange={(e) => setColorID1(e.target.value)} disabled={!adsID1}>
        <option value="">Select Color</option>
        {Object.entries(availableColors1).map(([colorID, colorName]) => (
          <option key={colorID} value={colorID}>
            {colorName} {/* Display the color name */}
          </option>
        ))}
      </select>
      <br></br>
      <button onClick={handleUpdate} className='UpdateButton'>Update Ads</button>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
};

export default AdsManager;
