import React, { useState } from 'react';
import './PolicyFooter.css';  // Import the CSS file

const PolicyFooter = () => {
  const [showRefundPolicy, setShowRefundPolicy] = useState(false);
  const [showShippingPolicy, setShowShippingPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const closeModal = () => {
    setShowRefundPolicy(false);
    setShowShippingPolicy(false);
    setShowTermsOfService(false);
    setShowContactInfo(false);
  };

  return (
    <div>
      <footer className="policyfooter">
        <ul className="list">
          <li>
            <href onClick={() => setShowRefundPolicy(true)} className="link">
              Refund Policy
            </href>
          </li>
          <li>
            <href onClick={() => setShowShippingPolicy(true)} className="link">
              Shipping Policy
            </href>
          </li>
          <li>
            <href onClick={() => setShowTermsOfService(true)} className="link">
              Terms of Service
            </href>
          </li>
          <li>
            <href onClick={() => setShowContactInfo(true)} className="link">
              Contact Information
            </href>
          </li>
        </ul>
      </footer>

      {/* Modals */}
      {showRefundPolicy && (
        <div className="policy-modal">
          <div className="policy-modal-content">
            <h3>Refund Policy</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            <button onClick={closeModal} className="policy-close-button">Close</button>
          </div>
        </div>
      )}
      {showShippingPolicy && (
        <div className="policy-modal">
          <div className="policy-modal-content">
            <h3>Shipping Policy</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            <button onClick={closeModal} className="policy-close-button">Close</button>
          </div>
        </div>
      )}
      {showTermsOfService && (
        <div className="policy-modal">
          <div className="policy-modal-content">
            <h3>Terms of Service</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            <button onClick={closeModal} className="policy-close-button">Close</button>
          </div>
        </div>
      )}
      {showContactInfo && (
        <div className="policy-modal">
          <div className="policy-modal-content">
            <h3>Contact Information</h3>
            <hr></hr> 
            <div className="modal-content1"> 
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            </div>
            <button onClick={closeModal} className="policy-close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyFooter;
