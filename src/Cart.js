import React from 'react';
import { Link } from 'react-router-dom';
import './CartStyle.css';

function Cart({ cart, increaseQuantity, decreaseQuantity, removeAllFromCart }) {
  const totalPrice = cart.reduce((acc, item) => {
    // Check if SalePrice is greater than zero, otherwise use Price
    const priceToUse = item.SalePrice > 0 ? item.SalePrice : item.Price;
    return acc + item.Price * item.quantity;
  }, 0);

  const handleRemoveAll = () => {
    removeAllFromCart();
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              {/* Product Image */}
              <img 
                src={item.Images[item.selectedColor]} 
                alt={item.Name} 
                className="cart-item-image"
                loading="lazy"
              />
              
              {/* Product Details */}
              <div className="cart-item-details">
                <h2>{item.Name}</h2>
                {item.SalePrice > 0 ? (
                  <div className="price-container">
                    {/*<p className="original-price">₱{item.Price}</p>*/}
                    <p className="sale-price">₱{item.Price}</p>
                  </div>
                ) : (
                  <p>Price: ₱{item.Price}</p>
                )}
                <p>Color: {item.selectedColor || 'No color selected'}</p>
                <p>Size: {item.selectedSize || 'No size selected'}</p>
                
                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.ID, item.selectedSize, item.selectedColor)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.ID, item.selectedSize, item.selectedColor)}>+</button>
                  
                </div>
              </div>
            </div>
          ))}

          {/* Total Price and Checkout */}
          <div className="cart-total">
            {cart.length > 0 && (
              <>
                <Link to="/checkout">
                  <button className="checkout-button">Checkout | ₱{totalPrice}</button>
                </Link>
                <button className="remove-all-button" onClick={handleRemoveAll}>Remove All</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
