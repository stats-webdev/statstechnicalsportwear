import React, { useEffect, useState, useRef, useCallback } from 'react';
import './SplashScreen.css';

const MIN_DISPLAY_MS = 700;

function SplashScreen({ onDone }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible]     = useState(false);

  const timerDoneRef    = useRef(false);
  const imageLoadedRef  = useRef(false);

  // Called when BOTH conditions are satisfied
  const tryExit = useCallback(() => {
    if (timerDoneRef.current && imageLoadedRef.current) {
      setIsFadingOut(true);
    }
  }, []);

  // Condition 1 — minimum display time
  useEffect(() => {
    const t = setTimeout(() => {
      timerDoneRef.current = true;
      tryExit();
    }, MIN_DISPLAY_MS);

    return () => clearTimeout(t);
  }, [tryExit]);

  // Subtle logo fade-in so it doesn't pop in harshly
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleImageLoad = useCallback(() => {
    imageLoadedRef.current = true;
    tryExit();
  }, [tryExit]);

  const handleImageError = useCallback((e) => {
    e.currentTarget.src = 'https://i.imgur.com/vHq0L9A.png';
    // Treat error as "loaded" so we're never stuck
    imageLoadedRef.current = true;
    tryExit();
  }, [tryExit]);

  // When the CSS fade-out transition ends, tell the parent to unmount us
  const handleTransitionEnd = useCallback(() => {
    if (isFadingOut) onDone?.();
  }, [isFadingOut, onDone]);

  return (
    <div
      className={`splash-screen ${isFadingOut ? 'splash-exit' : ''}`}
      aria-hidden={isFadingOut}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={`splash-logo-wrap ${isVisible ? 'logo-visible' : 'logo-hidden'}`}>
        <img
          src="https://i.imgur.com/OIYeMvS.png"
          alt="STATS CUSTOM APPAREL"
          className="splash-logo"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    </div>
  );
}

export default SplashScreen;