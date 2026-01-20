import React, { useState } from 'react';
import './ReviewPage.css'; // Import the CSS
import Banner from './Banner';
import Footer from './Footer';

const ReviewPage = () => {
 {/* const [reviews, setReviews] = useState([
    { name: 'Alice', rating: 5, comment: 'Amazing quality!' },
    { name: 'Bob', rating: 4, comment: 'Satisfied with the product.' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    rating: '',
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, rating, comment } = formData;

    if (!name || !rating || !comment) {
      alert('Please fill in all fields.');
      return;
    }

    setReviews((prev) => [
      { name, rating: parseInt(rating), comment },
      ...prev,
    ]);

    setFormData({ name: '', rating: '', comment: '' });*/}
  

  return (
    <div>
    <div className="">
    
      <Banner/>
        <h2 style={{ marginLeft: '5%', fontWeight: 'normal' }}>Community</h2>
      <hr style={{ width: '90%' }} />
      <br></br><br></br>
       <p style={{ display: 'block', margin: '0 auto', textAlign: 'center' }}>
  "Our community testimonial page is in the works."
</p><br></br><br></br>

    {/*  <h1 className="review-title">Customer Reviews</h1>

      <form className="review-form" onSubmit={handleSubmit}>
        <h2>Write a Review</h2>

        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
        />

        <select name="rating" value={formData.rating} onChange={handleChange}>
          <option value="">Select rating</option>
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 && 's'}
            </option>
          ))}
        </select>

        <textarea
          name="comment"
          placeholder="Write your review..."
          rows="4"
          value={formData.comment}
          onChange={handleChange}
        />

        <button type="submit">Submit Review</button>
      </form>

      <div className="review-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to write one!</p>
        ) : (
          reviews.map((review, idx) => (
            <div className="review-card" key={idx}>
              <div className="review-name">{review.name}</div>
              <div className="review-stars">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <div className="review-comment">{review.comment}</div>
            </div>
          ))
        )}
      </div>*/}
    </div>
    <Footer/>
    </div>
  );
}


export default ReviewPage;
