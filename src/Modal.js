import React from 'react';

function Modal({ product, selectedColor, availableSizes, selectedSize, setSelectedSize, handleSizeChange, handleAddToCart, closeModal, currentImage, quantity, setQuantity, notification }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>X</button>
        {currentImage && (
          <img src={currentImage} alt={selectedColor} loading="lazy" className="modal-image" />
        )}
        <h2>{product.Name}</h2>
        <p>Price: ₱{product.Price}</p>
        <p>{product.Description}</p>

        <label htmlFor="size">Select Size:</label>
        <select id="size" onChange={handleSizeChange} value={selectedSize}>
          <option value="">Select size</option>
          {availableSizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        {notification && <div className="notification">{notification}</div>}
        
        <div className="quantity-container">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button className='add-to-cart-button' onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Modal;
