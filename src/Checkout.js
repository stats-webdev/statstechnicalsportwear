import React, { useState, useEffect } from 'react';
import './Checkout.css';
import { regions } from './Countries';
import { Link } from 'react-router-dom';
import PolicyFooter from './PolicyFooter';
import { v4 as uuidv4 } from 'uuid';
import emailjs from '@emailjs/browser';

function Checkout({ cart, setCart}) {
  const [proof, setProof] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    orderId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    orderItems: [],
    orderTotal: 0,
    status: 'Pending',
    image: '',
    reference:'',
    apartment: '',
    postalCode: '',
    city: '',
    region: '',
    country: 'Philippines',
    shippingMethod: '',
    paymentMethod: '',
  });
  const [country, setCountry] = useState('Philippines');
  const [phoneError, setPhoneError] = useState('');
  const [formError, setFormError] = useState(''); // For custom error messages
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [results, setResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false); // Track if the checkout is in progress
  const [checkout, setCheckout] = useState(true);
  const [shippingFee, setShippingFee] = useState(0);
  const [lbcShippingFee, setLBCShippingFee] = useState(0);
  const [isConfirm, setIsConfirm] = useState(false); // Track if the checkout is in progress
  const [orderId, setOrderId] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [orderedItems, setOrderedItems] = useState([])

  const handlePaymentMethod = (event) => {
    const selectedValue = event.target.value;
    setSelectedPaymentMethod(selectedValue);
    setShippingInfo((prev) => ({
      ...prev,
      paymentMethod: selectedValue,
    }));
  };



const subtotal = cart.reduce((acc, item) => {
  return acc + item.Price * item.quantity;
}, 0);

const totalPrice = subtotal + shippingFee + lbcShippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value
    });
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    const phonePattern = /^[0-9]{11}$/; // Regex pattern for a valid 11-digit phone number
    if (!phonePattern.test(phone)) {
      setPhoneError('Invalid phone number. Please enter an 11-digit number.');
    } else {
      setPhoneError('');
    }
    setShippingInfo({
      ...shippingInfo,
      phone: phone
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.postalCode || !shippingInfo.city || !shippingInfo.region) {
      setFormError('Please fill out all required fields.');
      return;
    }
    if (!shippingInfo.shippingMethod) {
      setFormError('Please select a shipping method.');
      return;
    }
    if (!shippingInfo.paymentMethod) {
      setFormError('Please select a payment method.');
      return;
    }
    if (!agreeToTerms) {
      setFormError("You must agree to the Terms and Conditions before proceeding.");
      return;
    }

    if (isProcessing) return; // If already processing, do nothing
    setIsProcessing(true);

    const groupedCart = cart.reduce((acc, item) => {
      acc[item.ID] = acc[item.ID] || [];
      acc[item.ID].push(item);
      return acc;
    }, {});

    const results = [];
    for (const productId in groupedCart) {
      for (const item of groupedCart[productId]) {
        const url = new URL("https://my-product-api.stats-webdev.workers.dev");
        url.searchParams.append("id", "1");
        url.searchParams.append("productID", item.ID);
        url.searchParams.append("color", item.selectedColor);
        url.searchParams.append("sizes", item.selectedSize);
        url.searchParams.append("quantity", item.quantity); // Include quantity in the request
        url.searchParams.append("action", "purchase");

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (response.ok) {
            results.push({ ...item, message: data.message, stock: data.stock });
          } else {
            results.push({ ...item, message: data.message || "Error during purchase" });
          }
        } catch (error) {
          console.error(`Error during checkout for Product ID ${item.ID}:`, error);
          results.push({ ...item, message: "An error occurred during the checkout process." });
        }
      }
    }

    setResults(results);

   

    const formattedOrderItems = cart.map((item) => {
      return `${item.quantity} ${item.Name} ${item.selectedColor || 'No color'} ${item.selectedSize || 'No size'}`;
    }).join('\n'); // Join each line with a newline for better readability

    setOrderedItems(formattedOrderItems);

    const updatedShippingInfo = {
      ...shippingInfo,
      orderId,
      orderItems: formattedOrderItems,
      orderTotal: totalPrice,
    };

    try {
      // Replace the URL below with your deployed Cloudflare Worker URL
      const response = await fetch('https://googlsheets.stats-webdev.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedShippingInfo), // Assuming shippingInfo is already defined
        
      });
  
      // Parse the JSON response
      const result = await response.json();
      if (result.success) {
        setCart([]); // Clear the cart
      } else {
        console.error('Error saving data: ', result);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
    sendEmailNotification(); 
    setIsProcessing(false); // Reset processing state after all requests are complete
    setIsConfirm(true);
  };

  useEffect(() => {
    document.body.classList.remove('no-scroll');
  }, []);
  const handleButton = (event) => {
    const selectedValue = event.target.value;
    setSelectedShippingMethod(selectedValue);
    setShippingInfo((prev) => ({
      ...prev,
      shippingMethod: selectedValue,
    }));
  }
    /*useEffect(() => {
      let regionFee = 0;
      let LBCregionFee = 0;
      if (selectedShippingMethod === 'GoGo Express') {
        // Get the shipping fee based on the selected region
        
    
        // Check if the region is part of Metro Manila (GMM) areas
        if (
          shippingInfo.region === 'Metro Manila' ||
          shippingInfo.region === 'Bulacan' ||
          shippingInfo.region === 'Cavite' ||
          shippingInfo.region === 'Laguna' ||
          shippingInfo.region === 'Rizal'
        ) {
          regionFee = 150; // GMM shipping fee
        } else if (regions["Luzon"].some(item => item.name === shippingInfo.region)) {
          regionFee = 150; // Luzon shipping fee
        } else if (regions["Visayas"].some(item => item.name === shippingInfo.region)) {
          regionFee = 250; // Visayas shipping fee
        } else if (regions["Mindanao"].some(item => item.name === shippingInfo.region)) {
          regionFee = 300; // Mindanao shipping fee
        } else if (regions["Special"].some(item => item.name === shippingInfo.region)) {
          regionFee = 250; // Special regions shipping fee
        }
    
        setShippingFee(regionFee);  // Set the shipping fee based on the region
        setLBCShippingFee(0);
      }
      else if(selectedShippingMethod === 'LBC')
      {
       
        if (
          shippingInfo.region === 'Metro Manila' ||
          shippingInfo.region === 'Bulacan' ||
          shippingInfo.region === 'Cavite' ||
          shippingInfo.region === 'Laguna' ||
          shippingInfo.region === 'Rizal'
        ) {
          LBCregionFee = 150; // GMM shipping fee
        } else if (regions["Luzon"].some(item => item.name === shippingInfo.region)) {
          LBCregionFee = 150; // Luzon shipping fee
        } else if (regions["Visayas"].some(item => item.name === shippingInfo.region)) {
          LBCregionFee = 250; // Visayas shipping fee
        } else if (regions["Mindanao"].some(item => item.name === shippingInfo.region)) {
          LBCregionFee = 300; // Mindanao shipping fee
        } else if (regions["Special"].some(item => item.name === shippingInfo.region)) {
          LBCregionFee = 250; // Special regions shipping fee
        }
        setLBCShippingFee(LBCregionFee); 
        setShippingFee(0); 
      }
      else {
        setShippingFee(0); 
        setLBCShippingFee(0);  // No shipping fee for other methods
      }
      
    }, [shippingInfo.region, selectedShippingMethod]); */
    useEffect(() => {
  let regionFee = 0;
  let LBCregionFee = 0;

  const getShippingFeeByRegion = (regionName) => {
    const regionList = Object.entries(regions);
    for (const [_, provinces] of regionList) {
      const match = provinces.find(p => p.name === regionName);
      if (match) return match.shippingFee;
    }
    return 0;
  };

  if (selectedShippingMethod === 'GoGo Express') {
    regionFee = getShippingFeeByRegion(shippingInfo.region);
    setShippingFee(regionFee);
    setLBCShippingFee(0);
  } else if (selectedShippingMethod === 'LBC') {
    LBCregionFee = getShippingFeeByRegion(shippingInfo.region);
    setLBCShippingFee(LBCregionFee);
    setShippingFee(0);
  } else {
    setShippingFee(0);
    setLBCShippingFee(0);
  }
}, [shippingInfo.region, selectedShippingMethod]);

  const handlePayment = ()=>
  {
    const dporderId = `ST-${uuidv4().slice(0, 8)}`.toUpperCase(); // Generate unique order ID
    setOrderId(dporderId);
    if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.postalCode || !shippingInfo.city || !shippingInfo.region) {
      setFormError('Please fill out all required fields.');
      return;
    }
    if (!shippingInfo.shippingMethod) {
      setFormError('Please select a shipping method.');
      return;
    }
    if (!shippingInfo.paymentMethod) {
      setFormError('Please select a payment method.');
      return;
    }
    setCheckout(false);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Get the base64 data
        setShippingInfo((prevState) => ({
          ...prevState,
          image: base64String, // Store the base64 string in the state
          
        }));
      };
   
      reader.readAsDataURL(file);
    }
  };
  const handleReferenceChange = (e) => {
    const referenceNumber = e.target.value;
    setShippingInfo({
      ...shippingInfo,
      reference: referenceNumber
    });
  };

  const sendEmailNotification = () => {
    const OrderedItems = cart.map((item) => {
      return `${item.quantity} ${item.Name} ${item.selectedColor || 'No color'} ${item.selectedSize || 'No size'}`;
    }).join('\n'); // Join each line with a newline for better readability
    emailjs.send(
        "service_6y73mdp",  // Replace with your EmailJS service ID
        "template_4p3uqpr", // Replace with your EmailJS template ID
        {
          order_id: orderId,
          customer_name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          customer_email: shippingInfo.email,
          customer_phone: shippingInfo.phone,
          shipping_address: `${shippingInfo.address}, ${shippingInfo.apartment}, ${shippingInfo.city}, ${shippingInfo.region}, ${shippingInfo.postalCode}, ${shippingInfo.country}`,
          order_items: OrderedItems,
          order_total: `${totalPrice}`,
          shipping_method: shippingInfo.shippingMethod,
          payment_method: shippingInfo.paymentMethod,
          order_status: shippingInfo.status,
          order_date: new Date().toLocaleString(),
        },
        "G_49qUv-58XC6oitJ" // Replace with your EmailJS public key
    ).then(response => {
        console.log("Email sent successfully!", response);
    }).catch(error => {
        console.error("Error sending email:", error);
    });
};



  return (
    <div className="checkout-container">
      {cart.length === 0 ? (
        <div>
          {isConfirm ? (<div className='checkout-confirm'><div className="container">
      <h1>Order {orderId}</h1>
      <h2>Thank you, {shippingInfo.firstName || "Customer"}!</h2>

      {/* Map Display */}
      <div className="map-container">
        <h3>Shipping address</h3>
        <p>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.region}</p>
        <div style={{ height: "200px", width: "100%" }}>
          <iframe
            title="Map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(shippingInfo.region)}&output=embed`}
          ></iframe>
        </div>
      </div>

      {/* Order Confirmation */}
      <div className="order-details">
        <h3>Your order is confirmed</h3>
        <p>
        Production lead time for merch and special editions is approximately 5–7 business days, plus 1–3 business days for delivery. While we aim to ship earlier, we appreciate your patience—strictly no rush orders.
        </p>
        <p>
        For tracking updates, the courier will send your tracking number via SMS once your details have been encoded in their system.
        </p>
        <p>
        For any concerns, you may reach us at:
        </p>
        <p>
📍 306 El Grande Avenue, BF Homes, Parañaque City
📞 (+63) 918 302 8818
📧 statsfxl@gmail.com
        </p>
        <p>
        Thank you for your trust and support!
        </p>
      </div>

      {/* Order Details */}
      <div className="order-details">
        <h3>Order Details</h3>
        <div className="details-section">
          <div>
            <h4>Contact Information</h4>
            <p>
              {shippingInfo.firstName} {shippingInfo.lastName}
            </p>
            <p>{shippingInfo.email}</p>
            <p>{shippingInfo.phone}</p>
          </div>
          <div>
            <h4>Payment Method</h4>
            <p>{shippingInfo.paymentMethod}</p>
          </div>
        </div>
        <div className="details-section">
          <div>
            <h4>Shipping Address</h4>
            <p>{shippingInfo.address}</p>
            <p>{shippingInfo.phone}</p>
          </div>
          
        </div>
        <h4>Shipping Method</h4>
        <p>{shippingInfo.shippingMethod}</p>
      </div>

      {/* Footer */}
      <div className="checkout-footer">
        <p>Need Help? <a href="mailto:statsfxl@gmail.com" aria-label="Email" target="_blank" rel="noopener noreferrer">
          Contact Us</a> </p>
       <Link to={'/'}><button>Continue Shopping</button></Link> 
      </div>
      <hr></hr>
      {/* <PolicyFooter/> */}
    </div>
    
    </div>) : (<div><p>Your cart is empty. Please add items to proceed</p></div>)}
        </div>
      ) : (
        <form className="checkout-content" onSubmit={handleSubmit}>
          {checkout ? (
            <div className='shipping'>  {/* Left Column - Shipping Information */}
            <div className="shipping-details">
              {/* Error Message */}
           
          
              {/* Contact Information */}
              <section className="contact-info">
                <h2>Contact Information</h2>
                <label htmlFor="email">Email: </label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleChange}
                  required
                />
              </section>
  
              {/* Shipping Address */}
              <section className="shipping-address">
              <div className="form-group">
                  <label htmlFor="country">Country:</label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  >               
                    <option value="Philippines">Philippines</option>
                    {/* Add other countries as needed */}
                  </select>
                </div>
                <div className="name-fields">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
  
                <div className="form-group">
                  <label htmlFor="address">Address: (Please don't forget to include your Barangay)</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleChange}
                    required
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="apartment">Apartment, suite, etc. (optional):</label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={shippingInfo.apartment}
                    onChange={handleChange}
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code:</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="city">City: <br></br></label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleChange}
                    required
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="region">Region:</label>
                  <select name="region" 
                    value={shippingInfo.region} 
                    onChange={handleChange}
                    required
                  >
        <option value="" disabled>Select your region</option>
  {Object.keys(regions).map((regionCategory) => (
    <optgroup key={regionCategory} label={regionCategory}>
      {regions[regionCategory].map((province) => (
        <option key={province.name} value={province.name}>
          {province.name}
        </option>
      ))}
    </optgroup>
  ))}
</select>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone (PH):</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handlePhoneChange}
                    placeholder='e.g. 09123456789'
                    required
                  />
                  {phoneError && <p className="error-message" style={{color:'red'}}>{phoneError}</p>}
                </div>
  
               {/* Shipping Method */}
               <div className="form-group">
               <h2 className='h2Payment'>Shipping Method:</h2>
                  <label htmlFor="shippingMethod"></label>
                  <div className="button-group">
                    <button
                      type="button"
                      name="shippingMethod"
                      value="GoGo Express"
                      onClick={handleButton}
                      className={`shipping-button ${selectedShippingMethod === 'GoGo Express' ? 'active' : ''}`}
                    >
                    <span className="shipping-method1">GoGo Express</span>
                    <strong className="shipping-fee">{shippingFee === 0 ? '' : `₱${shippingFee}`}</strong>
                    </button>
                    <button
                      type="button"
                      name="shippingMethod"
                      value="LBC"
                      onClick={handleButton}
                      className={`shipping-button ${selectedShippingMethod === 'LBC' ? 'active' : ''}`}
                    >
                    <span className="shipping-method1">LBC</span><strong className="shipping-fee">{lbcShippingFee === 0 ? '' : `₱${lbcShippingFee}` }</strong>
                    </button>
                    <button
                      type="button"
                      name="shippingMethod"
                      value="Same-day delivery"
                      onClick={handleButton}
                      className={`shipping-button ${selectedShippingMethod === 'Same-day delivery' ? 'active' : ''}`}
                    >
                     <span className="shipping-method1">Same-day delivery</span> 
                    </button>
                    {selectedShippingMethod === 'Same-day delivery' && ( <p className='samedaydisclaimer'>*Disclaimer: Same-day delivery only applies to locations within Metro Manila. Standard shipping rates will apply.</p> ) }
                    <button
                      type="button"
                      name="shippingMethod"
                      value="Store Pick-up"
                      onClick={handleButton}
                      className={`shipping-button ${selectedShippingMethod === 'Store Pick-up' ? 'active' : ''}`}
                    >
                      <span className="shipping-method1">Store Pick-up</span>
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <h2 className='h2Payment'>Payment Method:</h2>
    <label htmlFor="paymentMethod"></label>
    <div className="button-group">
      <button
        type="button"
        name="paymentMethod"
        value="BDO"
        onClick={handlePaymentMethod}
        className={`payment-button ${selectedPaymentMethod === 'BDO' ? 'active' : ''}`}
      >
      BDO
      </button>
      <button
        type="button"
        name="paymentMethod"
        value="Gcash"
        onClick={handlePaymentMethod}
        className={`payment-button ${selectedPaymentMethod === 'Gcash' ? 'active' : ''}`}
      >
       Gcash
      </button>
      <button
        type="button"
        name="paymentMethod"
        value="BPI"
        onClick={handlePaymentMethod}
        className={`payment-button ${selectedPaymentMethod === 'BPI' ? 'active' : ''}`}
      >
        BPI
      </button>
    </div>
  </div>
              </section>
            
              <button
                className={`submit-button`}
                onClick={handlePayment}
              >
              Continue to Payment
              </button>
              
            
              {formError && <p className="error-message">{formError}</p>}
              <div>
              <hr className='checkout-hr'></hr>
              {/* <PolicyFooter/> */}
              </div>
            </div>
            
  
            {/* Right Column - Order Summary */}
            <div className="order-summary">
              <h2>Order Summary</h2>
              {cart.map((item, index) => (
                <div className='order-summary-details' key={index}>
            <div className="image-container">
            <img
              src={item.Images[item.selectedColor]}
              alt={item.Name}
              className="order-summary-item-image"
              loading="lazy"
            />
            <div className="quantity-badge">{item.quantity}</div>
              </div>
                  <div className="order-summary-item-details">
                    <h3>{item.Name}</h3>
                    <p> {item.selectedColor || 'No color selected'}</p>
                    <p> {item.selectedSize || 'No size selected'}</p>
                    
                  </div>
                  {item.SalePrice > 0 ? (
                      <div className="price-container">
                         <p className="sale-price">
        Price: ₱{item.Price * item.quantity}
        {item.Price > item.SalePrice && item.SalePrice > 0 && (
          <span className="custom-fee"> (₱{item.Price - item.SalePrice} fee)</span>
        )}
      </p>
                        
                      </div>
                    ) : (
                      <p>Price: ₱{item.Price * item.quantity}</p>
                    )}
                </div>
              ))}
                <div className="shipping-fee">
                <p> Subtotal: ₱{subtotal}</p>
  {selectedShippingMethod === 'GoGo Express' 
  ? ( <p>Shipping Fee: ₱{shippingFee}</p> ) 
  : selectedShippingMethod === 'LBC' 
  ? ( <p>Shipping Fee: ₱{lbcShippingFee}</p> ) 
  :(<p></p>)
  }
</div>
  <div className="total-price">
    <h3>

     Total: ₱{totalPrice}
    </h3>
  </div>
            </div>
            </div>
          ) : (
           
            <div className='shipping1'>
            
            <div className='payment-details'>
            <h2>Total <span className="amount">₱{totalPrice}</span></h2>
      <p className="pending">Pending</p>
      {/*Gcash*/}
      {selectedPaymentMethod === 'Gcash' && (
      <div className="payment-method">
        <div>
        <p>Pay Using <strong>GCash</strong></p>
      </div>
    
      <div className="payment-details1">
      {/* QR Code */}
      <div className="qr-code">
        <p>Scan QR Code:</p>
        <img
          src="https://imagizer.imageshack.com/v2/1600x1200q70/922/XzWuOz.jpg"
          alt="GCash QR Code"
          className="qr-image"
        />
      </div>
        <div className="info">
          <p>Account Number:</p>
          <p>0916 302 8818</p>
        </div>
        <div className="info">
          <p>GCash Account:</p>
          <p>Joycee B.</p>
        </div>
        <div className="info">
          <p>ID:</p>
          <p>{orderId}</p>
        </div>
      </div>
    </div>
    )}
      {/*BDO*/}
      {selectedPaymentMethod === 'BDO' && (
      <div className="payment-method">
        <div>
        <p>Pay Using <strong>BDO</strong></p>
      
    
      <div className="payment-details1">
      {/* QR Code */}
      <div className="qr-code">
        <p>Scan QR Code:</p>
        <img
          src="https://imagizer.imageshack.com/v2/1600x1200q70/923/ml8WUE.jpg"
          alt="BDO QR Code"
          className="qr-image"
        />
      </div>
        <div className="info">
          <p>Account Number:</p>
          <p>0108 6800 2452</p>
        </div>
        <div className="info">
          <p>BDO Account:</p>
          <p>WEARESTATSPH, INC.</p>
        </div>
        <div className="info">
          <p>ID:</p>
          <p>{orderId}</p>
        </div>
      </div>
    </div>
    </div>
    )}
 {/*MAYA*/}
 {selectedPaymentMethod === 'BPI' && (
      <div className="payment-method">
        <div>
        <p>Pay Using <strong>BPI</strong></p>
      </div>
    
      <div className="payment-details1">
      {/* QR Code */}
      <div className="qr-code">
        <p>Scan QR Code:</p>
        <img
          src="https://imagizer.imageshack.com/v2/1600x1200q70/922/GwvSt0.jpg"
          alt="BPI QR Code"
          className="qr-image"
        />
      </div>
        <div className="info">
          <p>Account Number:</p>
          <p>4006918156</p>
        </div>
        <div className="info">
          <p>BPI Account:</p>
          <p>JOYCEE B.</p>
        </div>
        <div className="info">
          <p>ID:</p>
          <p>{orderId}</p>
        </div>
      </div>
    </div>
    )}

      {/* Upload Proof */}
      <div className="upload-section">
        <label htmlFor="proof">Upload Proof of Payment</label>
        <input
          type="file"
          id="proof"
          accept="image/*"
          onChange={handleFileChange}
          className='referenceInput'
          required
        />
        {proof && <p>File uploaded: {proof.name}</p>}
        
      </div>

      {/* Reference Number */}
      <div className="reference-section">
        <label htmlFor="reference">Reference Number</label>
        <input
          type="text"
          id="reference"
          placeholder="Enter reference number"
          onChange={handleReferenceChange}
          required
          className='referenceInput'
        />
      </div>


      <p className="note">
        <strong>DO NOT SEND WITH MONEY CLIP or MONEY PROTECT.</strong> Payment
        must be completed within 30 minutes (if same-day delivery) or within
        24hrs (if pre-order).
      </p>
      {/* Terms and Conditions Checkbox */}
<div className="terms-section">
  <input
    type="checkbox"
    id="termsCheckbox"
    checked={agreeToTerms}
    onChange={(e) => setAgreeToTerms(e.target.checked)}
    className="terms-checkbox"
  />
  <label htmlFor="termsCheckbox">
    By clicking this you agree to our   <Link to='/termsofservice' target="_blank">Terms and Conditions</Link>
  </label>
</div>
{formError && <p className="error-message">{formError}</p>}
            <button
                type="submit"
                className={`submit-button1 ${isProcessing || !agreeToTerms ? 'disabled' : ''}`}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : ' Submit Payment'}
              </button>
              <div><hr style={{marginTop:'40px'}}></hr>
              {/* <PolicyFooter/>  */}
              </div>
            </div>
            <div className="order-summary">
              <h2>Order Summary</h2>
              {cart.map((item, index) => (
                <div className='order-summary-details' key={index}>
            <div className="image-container">
            <img
              src={item.Images[item.selectedColor]}
              alt={item.Name}
              className="order-summary-item-image"
              loading="lazy"
            />
            <div className="quantity-badge">{item.quantity}</div>
              </div>
                  <div className="order-summary-item-details">
                    <h3>{item.Name}</h3>
                    <p> {item.selectedColor || 'No color selected'}</p>
                    <p> {item.selectedSize || 'No size selected'}</p>
                    
                  </div>
                  {item.SalePrice > 0 ? (
                      <div className="price-container">
                        <p className="sale-price">Price: ₱{item.SalePrice * item.quantity}</p>
                        
                      </div>
                    ) : (
                      <p>Price: ₱{item.Price * item.quantity}</p>
                    )}
                </div>
              ))}
     <div className="shipping-fee">
     <p> Subtotal: ₱{subtotal}</p>
  {selectedShippingMethod === 'GoGo Express' ? (
    <p>Shipping Fee: ₱{shippingFee}</p>
  ) : selectedShippingMethod === 'LBC' ? (
    <p>Shipping Fee: ₱{lbcShippingFee}</p>
  ) : (
    <p>Shipping Fee: ₱0</p>
  )}
</div>

  <div className="total-price">
    <h3>
    Total: ₱{totalPrice}
    </h3>
  </div>
            </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default Checkout;
