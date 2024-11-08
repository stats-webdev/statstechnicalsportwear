import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductsList from './ProductList';
import Cart from './Cart';

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to add product to cart
  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.ID === product.ID);
    console.log(product);
    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.ID === product.ID ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }
  const increaseQuantity = (productID) =>
    {
      setCart(cart.map((item) => 
        productID === item.ID ? {...item, quantity: item.quantity + 1} : item
      ))
    }
  const decreaseQuantity = (productID) => {
      setCart(cart.map((item) =>
            item.ID === productID? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
          )
          .filter((item) => item.quantity > 0) // Remove item if quantity is 0
      );
    };

  return (
    <Router>
      <nav>
        <Link to="/">Products</Link> | <Link to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductsList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity = {decreaseQuantity} />} />
      </Routes>
    </Router>
  );
}

export default App;