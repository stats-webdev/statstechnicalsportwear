import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Checkout from './Checkout';
import ProductsList from './ProductList';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import CartButtonPage from './CartButtonPage';
import Admin from './Admin';
import AddProductForm from './AddProductForm';
import Countdown from './Countdown';
import AllProductCards from './AllProductCards';
import SeriesPage from './SeriesPage';
import FabTechPage from './FabTechpage';
import ProductType from './ProductType';
import AboutUs from './AboutUs';
import Location from './Location';
import FeaturesUpdate from './FeaturesUpdate';
import AdminDashboard from './AdminDashboard';
import AdsManager from './AdsManager';
import BannerManager from './BannerManager';
import Login from './Login';
import UpdateSizeChart from './UpdateSizeChart';
import UpdateImage from './UpdateImage';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute
import WhatWeDo from './WhatWeDo';
import FaQsPage from './FaQsPage'
import TermOfService from './TermOfService';
import PrivacyPolicy from './PrivacyPolicy';
import ReturnPolicy from './ReturnPolicy';
import WhyWeDoIt from './WhyWeDoIt';
import WhoWeAre from './WhoWeAre';
import HowWeWork from './HowWeWork';
import UpdateThumbnail from './UpdateThumbnail';
import NotFound from './NotFound';
import MaterialCare from './MaterialCare';
import ReviewPage from './ReviewPage';
import FabricTech from './FabricTech';
import UpdateProductType from './UpdateProductType';
import Lookbook from './Lookbook';
import LookbookPage from './LookbookPage';
import PopupExamples from './Popup';
import PopupAdmin from './PopupManager';


function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    fetch('https://my-product-api.stats-webdev.workers.dev/?id=1')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);  // Set products data
      })
      .catch((error) => console.error('Error fetching product data:', error));
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Automatically remove products with quantity 0
useEffect(() => {
  const filteredCart = cart.filter((item) => item.quantity > 0);
  if (filteredCart.length !== cart.length) {
    setCart(filteredCart);
  }
}, [cart]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  // Adjust cart quantities based on stock
  useEffect(() => {
    if (cart.length > 0 && products.length > 0) {
      const adjustedCart = cart.map((item) => {
        const product = products.find((p) => p.ID === item.ID);
        if (!product) return item; // Skip if product not found
  
        const stock = product.Colors[item.selectedColor][item.selectedSize];
        if (item.quantity > stock) {
          return { ...item, quantity: stock }; // Adjust quantity to stock
        }
        return item; // No adjustment needed
      });
  
      // Only update cart if adjustments were made
      if (JSON.stringify(cart) !== JSON.stringify(adjustedCart)) {
        setCart(adjustedCart);
      }
    }
  }, [cart, products]);
  const addToCart = (product) => {
    const stock = products.find((item) => item.ID === product.ID).Colors[product.selectedColor][product.selectedSize];
    const existingProduct = cart.find(
      (item) =>
        item.ID === product.ID &&
        item.selectedColor === product.selectedColor &&
        item.selectedSize === product.selectedSize
    );
  
    if (existingProduct) {
      if (existingProduct.quantity + product.quantity > stock) {
        setMessage(`You cannot add more than ${stock} items to the cart.`);
        setTimeout(() => setMessage(''), 3000);
        return;
      }
      setCart(
        cart.map((item) =>
          item.ID === existingProduct.ID &&
          item.selectedColor === existingProduct.selectedColor &&
          item.selectedSize === existingProduct.selectedSize
            ? { ...existingProduct, quantity: existingProduct.quantity + product.quantity }
            : item
        )
      );
    } else {
      if (product.quantity > stock) {
        setMessage(`Only ${stock} items are available in stock.`);
        setTimeout(() => setMessage(''), 3000);
        return;
      }
      setCart([...cart, product]);
    }
  };

  const increaseQuantity = (productID, selectedSize, selectedColor) => {
    setCart(
      cart.map((item) => {
        if (item.ID === productID && item.selectedSize === selectedSize && item.selectedColor === selectedColor) {
          const stock = products.find((product) => product.ID === productID).Colors[selectedColor][selectedSize];
          if (item.quantity < stock) {
            return { ...item, quantity: item.quantity + 1 };
          }
          setMessage(`Only ${stock} items are available in stock.`);
          setTimeout(() => setMessage(''), 3000);
        }
        return item;
      })
    );
  };
  
  const decreaseQuantity = (productID, selectedSize, selectedColor) => {
    setCart(
      cart.map((item) =>
          item.ID === productID && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const removeAllFromCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  return (
    <div>
      <div>{message && <div className="alert">{message}</div>}</div>
    <Router>
      <Routes>
        <Route path="/" element={<ProductsList  cart={cart}  increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart} />} />
        <Route path="/cart" element={<Cart cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart}/>} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart}/>} />
        <Route path="/:productId/:color" element={<ProductDetails addToCart={addToCart} cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart} />} /> {/* Size selection page */}
        <Route path="/:productId" element={<ProductDetails addToCart={addToCart} cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart} />} /> {/* Size selection page */}
        <Route path="/cart-button"  element={<CartButtonPage cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart}/>}/>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/Countdown" element={<Countdown />} />
        <Route path="/AllProduct" element={<AllProductCards cart={cart} addToCart={addToCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart}/>} />
        <Route path="/AllProduct/:productType" element={<AllProductCards cart={cart} addToCart={addToCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart}/>} />
        <Route path="/AllProduct/:productType/:subType?" element={<AllProductCards cart={cart} addToCart={addToCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart}/>} />
        <Route path="/Series/:seriesName" element={<SeriesPage products={products} cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart}/>} />
        <Route path="/Series/:seriesName/:typeName?" element={<SeriesPage products={products} cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart}/>} />     
        <Route path="/series/:seriesName/id/:value" element={<SeriesPage products={products} cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart}/>} />     

       <Route path="/fabtech/:fabtechName" element={<FabTechPage products={products} cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart}/>} />
        <Route path="/Type/:productType" element={<ProductType products={products} cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAllFromCart={removeAllFromCart}/>} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Location" element={<Location />} />
        <Route path="/Features" element={<FeaturesUpdate />} />
        <Route path="/Image" element={<UpdateImage />} />
        <Route path="/Whatwedo" element={<WhatWeDo />} />
        <Route path="/Howwework" element={<HowWeWork />} />
        <Route path="/Faqs" element={<FaQsPage />} />
        <Route path="/Termsofservice" element={<TermOfService />} />
        <Route path="/Privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/ReturnPolicy" element={<ReturnPolicy />} />
        <Route path="/Whywedoit" element={<WhyWeDoIt />} />
        <Route path="/Whoweare" element={<WhoWeAre />} />
        <Route path="/Materialcare" element={<MaterialCare />} />
        <Route path="/Reviewpage" element={<ReviewPage />} />
        <Route path="/FabricTech" element={<FabricTech />} />
        <Route path="/Lookbook" element={<Lookbook />} />
        <Route path="/lookbook/:id" element={<LookbookPage />} />

        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/popup" element={<PopupAdmin />} />
          <Route path="/Dashboard" element={<AdminDashboard />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Add" element={<AddProductForm />} />
          <Route path="/Ads" element={<AdsManager />} />
          <Route path="/Banner" element={<BannerManager />} />
           <Route path="/UpdateType" element={<UpdateProductType />} />
          <Route path="/SizeChart" element={<UpdateSizeChart />} />
          <Route path="/Thumbnail" element={<UpdateThumbnail />} />

        </Route>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
