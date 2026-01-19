import React, { useEffect } from 'react';
import './CommunityPage.css';
import Footer from './Footer';

// Posts/Reviews Data
const postsData = [
  {
    id: 1,
    author: 'Maria Santos',
    avatar: 'images/avatar1.jpg',
    date: '2 days ago',
    platform: 'instagram',
    image: 'images/post1.jpg',
    text: 'Just received my custom jersey from STATS! The quality is absolutely amazing and the fit is perfect. Can\'t wait to wear this on the court! 🏐',
    likes: 234
  },
  {
    id: 2,
    author: 'Juan Dela Cruz',
    avatar: 'images/avatar2.jpg',
    date: '5 days ago',
    platform: 'facebook',
    image: 'images/post2.jpg',
    text: 'Our team looks incredible in our new STATS uniforms. The customization process was so easy and the turnaround time was impressive. Highly recommend!',
    likes: 189
  },
  {
    id: 3,
    author: 'Ana Rodriguez',
    avatar: 'images/avatar3.jpg',
    date: '1 week ago',
    platform: 'instagram',
    image: 'images/post3.jpg',
    text: 'Best athletic wear I\'ve ever owned. The fabric is breathable, durable, and the colors are so vibrant. STATS never disappoints! 💯',
    likes: 312
  },
  {
    id: 4,
    author: 'Carlos Mendoza',
    avatar: 'images/avatar4.jpg',
    date: '1 week ago',
    platform: 'facebook',
    image: 'images/post4.jpg',
    text: 'Third order from STATS and they keep getting better! The attention to detail is incredible. Our basketball team is proud to wear these.',
    likes: 267
  },
  {
    id: 5,
    author: 'Sofia Martinez',
    avatar: 'images/avatar5.jpg',
    date: '2 weeks ago',
    platform: 'instagram',
    image: 'images/post5.jpg',
    text: 'From design to delivery, STATS exceeded all expectations. The customer service team was super helpful throughout the entire process! ⭐⭐⭐⭐⭐',
    likes: 421
  },
  {
    id: 6,
    author: 'Miguel Torres',
    avatar: 'images/avatar6.jpg',
    date: '2 weeks ago',
    platform: 'facebook',
    image: 'images/post6.jpg',
    text: 'Quality that lasts! We\'ve been using STATS for our football team for 2 seasons now and the jerseys still look brand new. Worth every peso!',
    likes: 198
  }
];

// Reels/Shorts Data
const reelsData = [
  {
    id: 1,
    title: 'Unboxing My Custom Jersey',
    author: '@statsathlete',
    thumbnail: 'images/reel1.jpg',
    platform: 'tiktok',
    views: '12K'
  },
  {
    id: 2,
    title: 'Game Day Ready',
    author: '@teamstats',
    thumbnail: 'images/reel2.jpg',
    platform: 'instagram',
    views: '8.5K'
  },
  {
    id: 3,
    title: 'Behind the Design Process',
    author: '@statsph',
    thumbnail: 'images/reel3.jpg',
    platform: 'youtube',
    views: '15K'
  },
  {
    id: 4,
    title: 'Team Photoshoot Day',
    author: '@volleyball_squad',
    thumbnail: 'images/reel4.jpg',
    platform: 'tiktok',
    views: '20K'
  },
  {
    id: 5,
    title: 'Quality Check: STATS vs Others',
    author: '@sports_reviews',
    thumbnail: 'images/reel5.jpg',
    platform: 'youtube',
    views: '25K'
  },
  {
    id: 6,
    title: 'Training Session',
    author: '@athletics_ph',
    thumbnail: 'images/reel6.jpg',
    platform: 'instagram',
    views: '18K'
  }
];

// Ratings Data
const ratingsData = {
  overallRating: 4.8,
  totalReviews: 1247,
  breakdown: {
    5: 892,
    4: 276,
    3: 58,
    2: 15,
    1: 6
  },
  reviews: [
    {
      id: 1,
      name: 'Rafael Garcia',
      avatar: 'images/reviewer1.jpg',
      rating: 5,
      date: 'January 3, 2026',
      text: 'Outstanding quality and service! Our volleyball team ordered custom jerseys and they turned out perfect. The sublimation printing is top-notch and the fabric feels premium. Delivery was on time and the customer support team was very responsive to all our questions.'
    },
    {
      id: 2,
      name: 'Isabella Cruz',
      avatar: 'images/reviewer2.jpg',
      rating: 5,
      date: 'January 1, 2026',
      text: 'STATS has been our go-to for all our team apparel needs. The design team helped bring our vision to life and the final product exceeded our expectations. The jerseys are comfortable, durable, and look professional. Highly recommend!'
    },
    {
      id: 3,
      name: 'Diego Reyes',
      avatar: 'images/reviewer3.jpg',
      rating: 4,
      date: 'December 28, 2025',
      text: 'Great experience overall! The ordering process was straightforward and the quality is excellent. Only reason for 4 stars instead of 5 is that delivery took slightly longer than expected, but the quality made up for it.'
    },
    {
      id: 4,
      name: 'Carmen Flores',
      avatar: 'images/reviewer4.jpg',
      rating: 5,
      date: 'December 25, 2025',
      text: 'Best custom apparel company in the Philippines! We\'ve ordered from several companies before but STATS stands out in terms of quality, design options, and customer service. The team uniforms look amazing and our players love them!'
    }
  ]
};

// SVG Icons
const icons = {
  instagram: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/></svg>,
  facebook: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>,
  play: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>,
  star: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>,
  starHalf: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>
};

const CommunityPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="community-page">
      {/* Hero Banner */}
      <section className="hero-banner" style={{ backgroundImage: 'url(https://i.pinimg.com/736x/a1/fb/47/a1fb47633a85ccc9e2d3c0a3a01a163f.jpg)' }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title"></h1>
          <p className="hero-description">

          </p>
        </div>
      </section>

      {/* Posts Section */}
      <section className="posts-section">
        <div className="section-container">
          <h2 className="section-title">Community Posts</h2>
          <p className="section-subtitle">See what our athletes are sharing about their STATS experience</p>
          <div className="posts-grid">
            {postsData.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Reels Section */}
      <section className="reels-section">
        <div className="section-container">
          <h2 className="section-title">Shorts & Reels</h2>
          <p className="section-subtitle">Watch our community in action</p>
          <div className="reels-grid">
            {reelsData.map(reel => (
              <ReelCard key={reel.id} reel={reel} />
            ))}
          </div>
        </div>
      </section>

      {/* Ratings Section */}
      <section className="ratings-section">
        <RatingsSection />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const PostCard = ({ post }) => (
  <div className="post-card" data-post-id={post.id}>
    <img src={post.image} alt={post.author} className="post-image" onError={(e) => {
      e.target.src = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80';
    }} />
    <div className="post-content">
      <div className="post-header-wrapper">
        <div className="post-header">
          <img src={post.avatar} alt={post.author} className="post-avatar" onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80';
          }} />
          <div className="post-author-info">
            <div className="post-author">{post.author}</div>
            <div className="post-date">{post.date}</div>
          </div>
        </div>
        <div className="post-platform">{post.platform === 'instagram' ? '📷 Instagram' : '👥 Facebook'}</div>
      </div>
      <p className="post-text">{post.text}</p>
    </div>
  </div>
);

const ReelCard = ({ reel }) => (
  <div className="reel-card" data-reel-id={reel.id} onClick={() => console.log('Playing reel:', reel.id)}>
    <img src={reel.thumbnail} alt={reel.title} className="reel-thumbnail" onError={(e) => {
      e.target.src = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80';
    }} />
    <div className="reel-play-icon">
      <span className="play-icon-svg">{icons.play}</span>
    </div>
    <div className="reel-overlay">
      <div className="reel-title">{reel.title}</div>
      <div className="reel-author">{reel.author} • {reel.views} views</div>
    </div>
  </div>
);

const RatingsSection = () => {
  const total = ratingsData.totalReviews;
  const percentages = {};
  for (let i = 5; i >= 1; i--) {
    percentages[i] = (ratingsData.breakdown[i] / total * 100).toFixed(1);
  }

  const fullStars = Math.floor(ratingsData.overallRating);
  const hasHalfStar = ratingsData.overallRating % 1 >= 0.5;

  return (
    <div className="section-container ratings-container">
      <h2 className="section-title">Customer Ratings</h2>
      <p className="section-subtitle">See what our customers say about their experience</p>
      
      <div className="ratings-summary">
        <div className="overall-rating">{ratingsData.overallRating}</div>
        <div className="stars-display">
          {Array(fullStars).fill().map((_, i) => (
            <span key={`full-${i}`} className="star">{icons.star}</span>
          ))}
          {hasHalfStar && <span className="star">{icons.starHalf}</span>}
        </div>
        <div className="total-reviews">Based on {ratingsData.totalReviews.toLocaleString()} reviews</div>
        
        <div className="rating-bars">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="rating-bar-row">
              <span className="rating-label">{rating} stars</span>
              <div className="rating-bar">
                <div className="rating-bar-fill" style={{width: `${percentages[rating]}%`}}></div>
              </div>
              <span className="rating-count">{ratingsData.breakdown[rating]}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="reviews-list">
        {ratingsData.reviews.map(review => (
          <ReviewCard key={review.id} review={review} icons={icons} />
        ))}
      </div>
    </div>
  );
};

const ReviewCard = ({ review, icons }) => (
  <div className="review-card">
    <div className="review-header">
      <div className="reviewer-info">
        <img src={review.avatar} alt={review.name} className="reviewer-avatar" onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80';
        }} />
        <div className="reviewer-details">
          <div className="reviewer-name">{review.name}</div>
          <div className="review-date">{review.date}</div>
        </div>
      </div>
      <div className="review-stars">
        {Array(review.rating).fill().map((_, i) => (
          <span key={i} className="review-star">{icons.star}</span>
        ))}
      </div>
    </div>
    <p className="review-text">{review.text}</p>
  </div>
);

export default CommunityPage;
