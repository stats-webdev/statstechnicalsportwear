import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Cart from './Cart';
import './CartButtonPage.css';
import { Link } from 'react-router-dom';

function CartButtonPage({ cart, increaseQuantity, decreaseQuantity, removeAllFromCart, products}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [adsID, setAdsID] = useState(0);
  const [colorID, setColorID] = useState(0);
  const [adsID1, setAdsID1] = useState(0);
  const [colorID1, setColorID1] = useState(0);
  const [fetchedData, setFetchedData] = useState(null);

  // Calculate the total item count
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate the total price
  const totalPrice = cart.reduce((acc, item) => {
    // Check if SalePrice is greater than zero, otherwise use Price
    const priceToUse = item.SalePrice > 0 ? item.SalePrice : item.Price;
    return acc + item.Price * item.quantity;
  }, 0);

  // Format the totalPrice with commas for thousands
  const formattedTotalPrice = totalPrice.toLocaleString();

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const response = await fetch('https://my-product-api.stats-webdev.workers.dev/adsfetch');
        const data = await response.json();
        setFetchedData(data); // Store entire fetched data if needed
        setAdsID(data.adsID || "ACTIVE TEE V2"); // Default to 0 if no adsID
        setColorID(data.colorID || 0); // Default to 0 if no colorID
        setAdsID1(data.adsID1 || "ACTIVE TEE V2"); // Default to 0 if no adsID
        setColorID1(data.colorID1 || 0); // Default to 0 if no colorID
      } catch (error) {
        console.error('Error fetching ads data:', error);
      }
    };

    fetchAdsData();
  }, []);
  // Effect to add and remove the 'no-scroll' class to the body
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isModalOpen]);

  const productsByName = products.reduce((acc, product) => {
    acc[product.Name] = product;
    return acc;
  }, {});
  const productsByName1 = products.reduce((acc1, product1) => {
    acc1[product1.Name] = product1;
    return acc1;
  }, {});
 
 

  const firstProduct = productsByName[adsID];
  const colorKey = firstProduct?.Colors ? Object.keys(firstProduct?.Colors) : null;
  const color = colorKey ? colorKey[colorID] : null;
  const imageSrc = colorKey && firstProduct?.Images ? firstProduct?.Images[color] : null;
  
  const secondProduct = productsByName1[adsID1];
  const colorKey1 = secondProduct?.Colors ? Object.keys(secondProduct?.Colors) : null;
  const color1 = colorKey1 ? colorKey1[colorID1] : null;
  const imageSrc1 = color1 && secondProduct?.Images ? secondProduct?.Images[color1] : null;

  const canIncreaseQuantity = (productId, color, amount) => {
    const product = productsByName[productId];
    const selectedColorStock = product?.Colors?.[color]?.Stock || 0;
    const cartItem = cart.find(item => item.ID === productId && item.color === color);

    if (cartItem) {
      const newQuantity = cartItem.quantity + amount;
      return newQuantity <= selectedColorStock;
    }
    return amount <= selectedColorStock;
  };

  const handleIncreaseQuantity = (productId, color) => {
    if (canIncreaseQuantity(productId, color, 1)) {
      increaseQuantity(productId, color);
    } else {
      alert('Sorry, this item is out of stock!');
    }
  };

 
  
  // Access product by name


  return (
    <>
      {/* Floating Cart Button */}
      <div
        onClick={() => setModalOpen(true)} // Open modal on click
        className="cart-button"
      >
        <FaShoppingCart size={30} color="white" />

        {itemCount > 0 && (
          <span className="cart-button-notification">
            {itemCount}
          </span>
        )}
      </div>

      {/* Page Overlay when modal is open */}
      {isModalOpen && <div className="page-overlay"></div>}

      {/* Cart Modal */}
      {isModalOpen && (
        <div className="cart-modal-overlay">
          <div className={`cart-modal-content ${isModalOpen ? 'open' : ''}`}>
            <nav className='modal-nav'>
              <p className='cart-text'>Cart</p>
              <button onClick={() => setModalOpen(false)} className="close-button"> </button>
            </nav>
            <div className='cart-content'>
              {/* Cart Component */}
              <Cart cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart} />
              
              {/* Total Price and Checkout Button */}
            </div>
            <div className='adsfooter'>
  {/* First Product */}
  {cart.length > 0 && (
  <div className='ads-list'>
  {firstProduct && color && (
    <div>
    <Link to={`/${firstProduct?.ID}/${color}`} onClick={() => setModalOpen(false)} style={{textDecoration:'none'}} >
        {firstProduct.SalePrice > 0 ? (
        <p className='modal-price'>
          <span> ₱{firstProduct?.SalePrice}</span>
        </p>
      ) : (
        <p className='modal-price'>₱{firstProduct?.Price}</p>
      )}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={firstProduct?.Name || 'Product Image'}
          className="modal-product-image"
        />
      ) : (
        <p>No Image Available</p> // Fallback if image is missing
      )}
      <p className='modal-product-name'>{firstProduct?.Name}</p>
    </Link>
     <Link to={`/${firstProduct?.ID}/${color}`} onClick={() => setModalOpen(false)}>
     <button className="add-to-cart-button">Add to Cart</button>
</Link>
</div>
  )}

  {/* Second Product */}
  {secondProduct && color1 && (
    <div>
    <Link to={`/${secondProduct?.ID}/${color1}`} onClick={() => setModalOpen(false) } style={{textDecoration:'none'}}>
        {secondProduct?.SalePrice > 0 ? (
        <p className='modal-price'>
          <span> ₱{secondProduct?.SalePrice}</span>
        </p>
      ) : (
        <p className='modal-price'>₱{secondProduct?.Price}</p>
      )}
      {imageSrc1 ? (
        <img
          src={imageSrc1}
          alt={secondProduct?.Name || 'Product Image'}
          className="modal-product-image"
        />
      ) : (
        <p>No Image Available</p> // Fallback if image is missing
      )}
      <p className='modal-product-name'>{secondProduct?.Name}</p>
    </Link>
    <Link to={`/${secondProduct?.ID}/${color1}`} onClick={() => setModalOpen(false)}>
                <button className="add-to-cart-button">Add to Cart</button>
    </Link>
        </div>
  )}
  
  </div>
      )}
</div>
            {cart.length > 0 && (
              <div className="cart-footer">
                <Link to={"/checkout"} onClick={() => setModalOpen(false)}>
                  <button className="modal-checkout-button" >
                    Checkout | ₱{formattedTotalPrice}
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CartButtonPage;
