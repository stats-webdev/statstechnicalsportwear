import React, { useState } from "react";
import "./AthletesPage.css";
import Footer from "./Footer";


const athletesData = [
  {
    id: 1,
    name: 'GRETCHEL SOLTONES',
    sport: 'VOLLEYBALL',
    image: 'images/gretchel-soltones.jpg',
    description: 'A powerhouse on the court, Gretchel Soltones is a professional volleyball player known for her incredible agility and powerful spikes. Her dedication to the sport and relentless pursuit of excellence make her a perfect ambassador for the STATS brand. Gretchel\'s journey inspires countless aspiring athletes, proving that with hard work and passion, anything is possible.',
    social: {
      instagram: 'https://instagram.com/gretchel',
      facebook: 'https://facebook.com/gretchel',
      twitter: 'https://twitter.com/gretchel'
    },
    highlights: [
      { platform: 'instagram', title: 'March Highlight #1', url: '#' },
      { platform: 'instagram', title: 'March Highlight #2', url: '#' },
      { platform: 'facebook', title: 'March Facebook Reel #1', url: '#' },
      { platform: 'instagram', title: 'March Highlight #1', url: '#' },
      { platform: 'instagram', title: 'March Highlight #2', url: '#' },
      { platform: 'facebook', title: 'March Facebook Reel #1', url: '#' }
    ],
    imagePosition: 'left'
  },
  {
    id: 2,
    name: 'CARLOS YULO',
    sport: 'ARTISTIC GYMNASTICS',
    image: 'images/carlos-yulo.jpg',
    description: 'A world-class Filipino artistic gymnast who has achieved multiple medals at the World Artistic Gymnastics Championships. Known for his powerful floor exercises and precision on the vault, Carlos embodies the spirit of dedication and excellence that STATS represents. He is a trailblazer, proving that Filipino athletes can compete and win at the highest levels of international sport.',
    social: {
      instagram: 'https://instagram.com/carlos',
      facebook: 'https://facebook.com/carlos'
    },
    highlights: [
      { platform: 'youtube', title: 'World Championship Floor Routine', url: '#' },
      { platform: 'instagram', title: 'Training Highlights Reel', url: '#' },
      { platform: 'youtube', title: 'Vault Finals Performance', url: '#' }
    ],
    imagePosition: 'right'
  },
  {
    id: 3,
    name: 'HIDILYN DIAZ',
    sport: 'WEIGHTLIFTING',
    image: 'images/hidilyn-diaz.jpg',
    description: 'An iconic figure in Philippine sports, Hidilyn Diaz is a weightlifter who made history by winning the country\'s first-ever Olympic gold medal. Her journey is a testament to resilience, strength, and unwavering determination. She inspires a nation and perfectly aligns with our mission to empower athletes to break barriers and achieve greatness.',
    social: {
      instagram: 'https://instagram.com/hidilyn',
      facebook: 'https://facebook.com/hidilyn',
      twitter: 'https://twitter.com/hidilyn'
    },
    highlights: [
      { platform: 'youtube', title: 'Olympic Gold Medal Lift', url: '#' },
      { platform: 'youtube', title: 'A Day in the Life', url: '#' }
    ],
    imagePosition: 'left'
  }
];

// SVG Icons - Minimalist Style
const icons = {
  instagram: <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  facebook: <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>,
  twitter: <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  youtube: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>,
  chevron: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
};

const AthletesPage = () => {
  const [activeHighlight, setActiveHighlight] = useState(null);

  const handleHighlightClick = (athleteId, index) => {
    setActiveHighlight({ athleteId, index });
    console.log(`Clicked highlight ${index} for athlete ${athleteId}`);
  };

  return (
    <div className="athletes-page">
      {/* Hero Banner */}
      <section className="hero-banner" style={{ backgroundImage: 'url(https://i.pinimg.com/1200x/a1/fb/47/a1fb47633a85ccc9e2d3c0a3a01a163f.jpg)' }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title"></h1>
          <p className="hero-description">
          
          </p>
        </div>
      </section>

      {/* Athletes Container */}
      <div className="athletes-container">
        {athletesData.map((athlete, index) => (
          <AthleteSection
            key={athlete.id}
            athlete={athlete}
            index={index}
            activeHighlight={activeHighlight}
            onHighlightClick={handleHighlightClick}
          />
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const AthleteSection = ({ athlete, index, activeHighlight, onHighlightClick }) => {
  const bgClass = index % 2 === 0 ? 'bg-gray' : 'bg-white';
  const imageOrder = athlete.imagePosition === 'right' ? 'order-2' : 'order-1';
  const contentOrder = athlete.imagePosition === 'right' ? 'order-1' : 'order-2';

  return (
    <section className={`athlete-section ${bgClass}`}>
      <div className="athlete-container">
        <div className={`athlete-image-wrapper ${imageOrder}`}>
          <img
            src={athlete.image}
            alt={athlete.name}
            className="athlete-image"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80';
            }}
          />
        </div>
        <div className={`athlete-content ${contentOrder}`}>
          <div className="athlete-sport">{athlete.sport}</div>
          <h2 className="athlete-name">{athlete.name}</h2>
          <div className="athlete-divider"></div>
          <p className="athlete-description">{athlete.description}</p>
          <SocialLinks social={athlete.social} athleteName={athlete.name} />
          <HighlightsSection
            highlights={athlete.highlights}
            athleteId={athlete.id}
            activeHighlight={activeHighlight}
            onHighlightClick={onHighlightClick}
          />
        </div>
      </div>
    </section>
  );
};

const SocialLinks = ({ social, athleteName }) => {
  const firstName = athleteName.split(' ')[0];

  return (
    <div className="social-section">
      <h3 className="social-title">FOLLOW {firstName}</h3>
      <div className="social-links">
        {social.instagram && (
          <a
            href={social.instagram}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            {icons.instagram}
          </a>
        )}
        {social.facebook && (
          <a
            href={social.facebook}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            {icons.facebook}
          </a>
        )}
        {social.twitter && (
          <a
            href={social.twitter}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            {icons.twitter}
          </a>
        )}
      </div>
    </div>
  );
};

const HighlightsSection = ({ highlights, athleteId, activeHighlight, onHighlightClick }) => {
  return (
    <div className="highlights-section">
      <h3 className="highlights-title">WATCH HIGHLIGHTS</h3>
      <div className="highlights-list">
        {highlights.map((highlight, index) => {
          const icon = highlight.platform === 'youtube' ? icons.youtube :
                       highlight.platform === 'instagram' ? icons.instagram :
                       icons.facebook;
          const iconClass = highlight.platform === 'youtube' ? 'youtube' : '';
          const isActive = activeHighlight && activeHighlight.athleteId === athleteId && activeHighlight.index === index;

          return (
            <button
              key={index}
              className={`highlight-button ${isActive ? 'active' : ''}`}
              onClick={() => onHighlightClick(athleteId, index)}
            >
              <div className="highlight-content">
                <span className={`highlight-icon ${iconClass}`}>{icon}</span>
                <span className="highlight-title">{highlight.title}</span>
              </div>
              <span className="highlight-arrow">{icons.chevron}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AthletesPage;
