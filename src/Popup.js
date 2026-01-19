import React, { useState, useEffect } from "react";
import "./popup.css";
import { Link } from "react-router-dom";

// Helper to check if link is internal
function isInternalLink(link) {
  return (
    link.startsWith("/type/") ||
    link.startsWith("/series/") ||
    /^\/[A-Za-z0-9]/.test(link)
  );
}

// Popup container (re-usable)
function Popup({ isOpen, onClose, className = "", children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup-container">
      {/* backdrop */}
      <div className="popup-backdrop" onClick={onClose} aria-hidden />

      {/* content */}
      <div className={`popup-content ${className}`} role="dialog" aria-modal="true">
        {children}

        {/* close button */}
        <button aria-label="close" onClick={onClose} className="popup-close">
          ✕
        </button>
      </div>
    </div>
  );
}

// Image + Text popup
function ImageTextAd({ isOpen, onClose, image, title, subtitle, cta }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup-body">
        <img src={image} alt="ad" />
        <div className="popup-text">
          <h3>{title}</h3>
          <p>{subtitle}</p>
          <div className="popup-actions">
            {isInternalLink(cta.href) ? (
              <Link
                to={cta.href}
                className="popup-btn-primary"
                onClick={onClose}
                style={{textDecoration: 'none'}}
              >
                {cta.text || "Learn more"}
              </Link>
            ) : (
              <a
                href={cta.href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="popup-btn-primary"
                onClick={onClose}
              >
                {cta.text || "Learn more"}
              </a>
            )}
            <button onClick={onClose} className="popup-btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
}

// Image-only popup
function ImageOnlyAd({ isOpen, onClose, image, href }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      {isInternalLink(href) ? (
        <Link to={href} onClick={onClose} style={{textDecoration: 'none'}}>
          <img src={image} alt="promo" style={{ width: "100%", display: "block" }} />
        </Link>
      ) : (
        <a
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
        >
          <img src={image} alt="promo" style={{ width: "100%", display: "block" }} />
        </a>
      )}
    </Popup>
  );
}
function getPopupLink(linkDestination, allTypes, allSeries, allIDs) {
  if (!linkDestination) return "#";
  const value = linkDestination.trim();

  // Check for Type (case-insensitive)
  if (allTypes.some(type => type.toLowerCase() === value.toLowerCase())) {
    return `/type/${value}`;
  }
  // Check for Series (case-insensitive)
  if (allSeries.some(series => series.toLowerCase() === value.toLowerCase())) {
    return `/series/${value}`;
  }
  // Check for Product ID (exact match)
  if (allIDs.includes(value)) {
    return `/${value}`;
  }
  // Otherwise, return as is (for external links)
  return value;
}

export default function PopupExamples({ pageKey }) {
    
  const [popup, setPopup] = useState(null);
  const [allTypes, setAllTypes] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  const [allIDs, setAllIDs] = useState([]);

  useEffect(() => {
    fetch(`https://my-product-api.stats-webdev.workers.dev/api/get-popup?page=${pageKey}`)
      .then(res => res.json())
      .then(data => {
        if (data.isActive) setPopup(data);
      });
  }, [pageKey]);

  useEffect(() => {
    fetch("https://my-product-api.stats-webdev.workers.dev/?id=1")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllTypes(Array.from(new Set(data.map(item => item.Type).filter(Boolean))));
          setAllSeries(Array.from(new Set(data.map(item => item.Series).filter(Boolean))));
          setAllIDs(Array.from(new Set(data.map(item => item.ID).filter(Boolean))));
        }
      });
  }, []);

  if (!popup) return null;

  const link = getPopupLink(popup.linkDestination, allTypes, allSeries, allIDs);

  return popup.displayType === "imageWithText" ? (
    <ImageTextAd
      isOpen={true}
      onClose={() => setPopup(null)}
      image={popup.imageUrl}
      title={popup.title}
      subtitle={popup.description}
      cta={{ text: popup.buttonText, href: link }}
    />
  ) : (
    <ImageOnlyAd
      isOpen={true}
      onClose={() => setPopup(null)}
      image={popup.imageUrl}
      href={link}
    />
  );
}