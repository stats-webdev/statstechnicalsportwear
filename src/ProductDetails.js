import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Style.css';
import './Accordion.css';
import './Features.css';
import './recommended.css';
import CartButtonPage from './CartButtonPage';
import Footer from './Footer';
import {useSwipeable } from 'react-swipeable';


function ProductDetails({ addToCart, cart, increaseQuantity, decreaseQuantity, removeAllFromCart }) {
  const { productId, color } = useParams(); 
  const [products, setProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [cartNotification, setCartNotification] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentThumbnail, setCurrentThumbnail] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);
  const [Descriptions, setDecriptions] = useState('');
  const [DesignFor, setDesignFor] = useState('');
  const [FabTech, setFabTech] = useState('');
  const [SizeChart, setSizeChart] = useState('');
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(-1);
  const [sizeChartClicked, setSizeChartClicked] = useState(false);
  const [showMaterialCare, setShowMaterialCare] = useState(false);
  const [customSize, setCustomSize] = useState('');
  const [showCustomSizeInput, setShowCustomSizeInput] = useState(false);
  const [randomProducts, setRandomProducts] = useState([]);
  const [customWidth, setCustomWidth] = useState('');
const [customLength, setCustomLength] = useState('');
const [customJerseyName, setCustomJerseyName] = useState('');
const [customJerseyNumber, setCustomJerseyNumber] = useState('');
const [showNameNumberModal, setShowNameNumberModal] = useState(false);
const [isConfirmed, setIsConfirmed] = useState(false);
  const fabricDescriptions = {
  Durasoft: "An ultra-soft premium polyester. Lightweight yet highly durable performance-tech fabric. Engineered for extreme comfort during high-performance activities.",
  Duraflex: "Another addition to our list of high-performance fabrics. The DuraFlex has the same qualities as DuraSoft but with more stretch and shape retention.",
  Membrane: "The latest advancement in ultra-lightweight performance-tech fabrics. Moisture-wicking, stretch, durable.",
  Aeromesh: "4-way stretch oval mesh fabric.",
  Blockmesh: "Soft, breathable, 4-way stretch grid-like mesh fabric.",
  Carbonite: "Carbonite® is a specialized material created with a process called warp knit, which results in incredible shape retention and mild compression for added performance qualities. Incredibly soft, stretchy, and sweat-wicking. Ideal for next-to-skin products like leggings, liners, and compression accessories.",
  Troika: "Advanced Tech Fabric with 3 characteristics ideal for Tropical Climates. Extremely breathable, 4-way stretch, and water-resistant.",
  "Troika Lite": "TROIKA-LITE® is an all-new iteration of our most advanced range ever. The TROIKA’s leaner little brother. Engineered to be lighter, faster, and more breathable.",
  Bacpro: "A stretch and droplet-resistant fabric perfect for dust and droplet protection.",
  "Meshco.": "A fabric-integrated dotted mesh compression for added comfort and ventilation in high heat areas.",
  Aeroflex: "The latest advancement in high-performance mesh fabric technology. Extremely durable, highly moisture-wicking, soft and smooth, 4-way stretch fabric with anti-cling properties for maximum range of motion."
};

  // Set a default color if one exists (e.g., first color of the product)
  useEffect(() => {
    fetch('https://my-product-api.stats-webdev.workers.dev/?id=1')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Set products data
      })
      .catch((error) => console.error('Error fetching product data:', error));
  }, []);
  const product = products.find((p) => p.ID === productId);

  useEffect(() => {
    if (product && Object.keys(product.Colors).length > 0) {
      const defaultColor = Object.keys(product.Colors)[0]; // Automatically select the first color
      setSelectedColor(color || defaultColor);
      // Set the default thumbnail based on the selected color
      setCurrentThumbnail(product.Images[color || defaultColor]);
      setCurrentThumbnailIndex(-1)
    }
  }, [product, color]);

  useEffect(() => {
    if (product) {
      // Get the current product's series
      const currentProductSeries = product.Series;
  
      // Filter out products that belong to the same series as the current product
      const otherProducts = products
        .map((p) => {
          if (p.Series === currentProductSeries) {
            return null; // Skip products that are in the same series as the current product
          }
  
          // Extract variations for each product (colors and sizes)
          const variations = Object.keys(p.Colors).map((color) => {
            const sizes = Object.keys(p.Colors[color]).filter((size) => size !== 'Label');
            return { color, sizes }; // Return the color and its available sizes
          });
  
          return { ...p, variations }; // Add variations to each product
        })
        .filter(Boolean); // Remove any null products that were in the same series
  
      // Shuffle the filtered products and select 4 random ones
      const shuffled = otherProducts.sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, 4)); // Select 4 random products
 //     console.log(otherProducts);
    }
  }, [products, productId]);
  
  const handlePreviousThumbnail = () => {
    setCurrentThumbnailIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 :  - 1
    );
    if(currentThumbnailIndex < 0)
    {
      setCurrentThumbnailIndex(-1)
    }
  };

  const handleNextThumbnail = () => {
    setCurrentThumbnailIndex((prevIndex) => {
      const thumbnails = product.Thumbnail[selectedColor];
  
      // Check if thumbnails exist and have a length
      if (!thumbnails || thumbnails.length === 0) {
        return -1; // Reset or provide a default index when no thumbnails exist
      }
  
      // Move to the next thumbnail or loop back
      return prevIndex < thumbnails.length - 1 ? prevIndex + 1 : -1;
    });
  };
  const handleSwipeLeft = () => {
    handleNextThumbnail();
  };

  const handleSwipeRight = () => {
    handlePreviousThumbnail();
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Optional: Enables swipe with a mouse
  });


  // Ensure product and selectedColor are available before accessing them
 // const currentImage = selectedColor && product ? product.Images[selectedColor] : null;
  //const availableSizes = selectedColor && product ? product.Colors[selectedColor] || [] : [];
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  useEffect(() => {
    if (product) {
      setDecriptions(product.Description || 'Details will be available soon!');
      setDesignFor(
        Array.isArray(product.DesignFor)
          ? product.DesignFor.join("\n")  // Join array elements with a newline for proper display
          : product.DesignFor || 'New arrival—details being prepared for you!'
      );
      setFabTech(
        Array.isArray(product.FabTech)
          ? product.FabTech.join("\n") 
          : product.FabTech || 'More info coming your way shortly!');
      setSizeChart(product.SizeChart ||'Our size chart is in the works—stay tuned!');
    
    }
  }, [product]);
  const handleSizeChartClick = () => {
    setSizeChartClicked(true); // Show the overlay when the image is clicked
  };
  
  const handleCloseModal = () => {
    setSizeChartClicked(false); // Close the modal when clicked
  };

  const sections = []
  if (Descriptions?.trim()) {
  sections.push({ title: 'DESCRIPTION', content: Descriptions });
}
if (String(product?.DesignFor).trim())  {
  sections.push({ title: 'DESIGNED FOR', content: DesignFor });
}

if (String(product?.FabTech || '').trim()) {
  sections.push({
    title: 'FABRIC + TECHNOLOGY',
    content: <div>
      {(() => {
        const fabTech = String(product?.FabTech || '');
        const matches = Object.entries(fabricDescriptions).filter(([fabric]) =>
          fabTech.includes(fabric)
        );

        return matches.length > 0 ? (
          matches.map(([fabric, description]) => (
            <div key={fabric} style={{ marginTop: '10px' }}>
              <strong style={{textTransform:'uppercase'}}>{fabric}</strong>
              <p className="mcare">{description}</p>
            </div>
          ))
        ) : (
          <div style={{ marginTop: '10px', textTransform: 'uppercase' }}>
            <strong>{fabTech}</strong>
          </div>
        );
      })()}
      <p
        className='mcarelink'
        onClick={() => setShowMaterialCare(true)}
      >
        MATERIAL CARE
      </p>
    </div>
  });
}

sections.push({
  title: 'SIZE CHARTS',
  content: /^https?:\/\//.test(product?.SizeChart) ? (
    <img
      src={product.SizeChart}
      alt="Size Chart"
      className="sizechartimage"
      onClick={handleSizeChartClick}
    />
  ) : (
    'Our size chart is in the works—stay tuned!'
  )
});
  

  useEffect(() => {
    if (product && product.Colors) {
      const availableColors = Object.keys(product.Colors);
      if (!availableColors.includes(color)) {
        setSelectedColor(availableColors[0]); // Default to the first color if the URL color is invalid
      } else {
        setSelectedColor(color); // Sync with URL parameter
      }
      setSelectedSize(''); // Reset size when the URL color changes
    }
  }, [color, product]);
  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize('');
  };

const handleSizeChange = (size) => {
  setSelectedSize(size);
  setShowCustomSizeInput(false);
  if (
    ['jersey', 'jersey shorts', 'jersey tank', 'jersey long sleeves'].includes(product?.Type) &&
    !size.startsWith('C')
  ) {
    setShowNameNumberModal(true);
  } else {
    setShowNameNumberModal(false);
  }
};
    useEffect(()=>{
    if(showCustomSizeInput)
      {
        setSelectedSize(customSize);
      }
  })


  

  const handleAddToCart = () => {
        if ((selectedSize?.startsWith('C:') || showCustomSizeInput) && !isConfirmed) {
    setNotification('Please confirm the pre-order/custom disclaimer.');
    setTimeout(() => setNotification(''), 3000);
    return;
  }
   if (
    (selectedSize?.startsWith('C:') || showCustomSizeInput) &&
    product?.Series !== 'UP REPLICA AND MERCH' &&
    (!customWidth.trim() || !customLength.trim())
  ) {
    setNotification('Custom Width and Length are required.');
    setTimeout(() => setNotification(''), 3000);
    return;
  }
     if (
    (selectedSize?.startsWith('C:') || showCustomSizeInput) &&
    product?.Series === 'UP REPLICA AND MERCH' && 
    (!customWidth.trim() || !customLength.trim()) && !(product.Type === 'jersey' || product.Type === 'jersey long sleeves' || product.Type === 'jersey shorts'|| product?.Type === 'jersey tank')
  ) {
    setNotification('Custom Width and Length are required.');
    setTimeout(() => setNotification(''), 3000);
    return;
  }

  if (
  product?.Series === 'UP REPLICA AND MERCH' &&
  (selectedSize === 'Custom Size' || showCustomSizeInput) && product?.Type === 'jersey long sleeves' 
) {

  if (!customJerseyNumber.trim()) {
    setNotification('Please fill in Custom Jersey Number.');
    setTimeout(() => setNotification(''), 3000);
    return;
  }
}
if (
  product?.Series === 'UP REPLICA AND MERCH' &&
  (selectedSize === 'Custom Size' || showCustomSizeInput) && (product?.Type === 'jersey' || product?.Type === 'jersey shorts'|| product?.Type === 'jersey tank')
) {

  if (!customJerseyName.trim() || !customJerseyNumber.trim()) {
    setNotification('Please fill in both Custom Jersey Name and Number.');
    setTimeout(() => setNotification(''), 3000);
    return;
  }
}
const isJerseyType = ['jersey', 'jersey shorts', 'jersey tank', 'jersey long sleeves'].includes(product?.Type);

let sizeDisplay = selectedSize;
if (
  isJerseyType &&
  !selectedSize.startsWith('C:') &&
  (customJerseyName.trim() || customJerseyNumber.trim())
) {
  // For standard sizes, append name/number
  sizeDisplay = `${selectedSize}: Name: ${customJerseyName} | Number: ${customJerseyNumber}`;
}

    if (selectedSize && selectedColor) {
        const customizationFee = isCustomizable ? 200 : 0;
    const cartPrice = Number(product.SalePrice > 0 ? product.SalePrice : product.Price) + customizationFee;
     const selectedProduct = {
  ...product,
  selectedSize: sizeDisplay,
  selectedColor,
  quantity,
  Price: cartPrice,
  customJerseyName: isJerseyType ? customJerseyName : undefined,
  customJerseyNumber: isJerseyType ? customJerseyNumber : undefined,
};
      addToCart(selectedProduct);
      setCartNotification('Item added to cart!');
      setTimeout(() => setCartNotification(''), 3000);
    //  setIsModalOpen(false); // Close the modal after adding to cart
    } else {
      setNotification('Please select both a size and color.');
      setTimeout(() => setNotification(''), 3000); // Clear the notification after 3 seconds
    }
     setShowNameNumberModal(false);   
     setShowCustomSizeInput(false);
  };
useEffect(() => {
  if (showCustomSizeInput) {
    const widthText = customWidth ? `Width: ${customWidth}` : '';
    const lengthText = customLength ? `Length: ${customLength}` : '';

    const nameText = product?.Series === 'UP REPLICA AND MERCH' && customJerseyName ? `Name: ${customJerseyName}` : '';
    const numberText = product?.Series === 'UP REPLICA AND MERCH' && customJerseyNumber ? `Number: ${customJerseyNumber}` : '';

    const combined = [widthText, lengthText, nameText, numberText]
      .filter(Boolean)
      .join(' | ');

    setCustomSize(`C: ${combined}`);
  }
}, [customWidth, customLength, customJerseyName, customJerseyNumber, showCustomSizeInput, product?.Series]);


 // const openModal = () => {
  //  if (product) {
      // Set the default color to the first in the list
    ///  const defaultColor = Object.keys(product.Colors)[0];
   //   setSelectedColor(defaultColor);
   //   setSelectedSize(''); // Reset the size whenever the modal is opened
 //   }
 //   setIsModalOpen(true);
//  };

  //Close the modal if clicked outside of it
  //useEffect(() => {
  //  const handleClickOutside = (event) => {
    //  if (event.target.classList.contains('modal-overlay')) {
      //  setIsModalOpen(false);
      //}
    //};

    // Add event listener to the document
  //  document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts or modal state changes
 //   return () => {
   //   document.removeEventListener('click', handleClickOutside);
    //};
 // }, []);
//thumbnail
useEffect(() => {
  if (selectedColor && product?.Images) {
    setCurrentThumbnail(product.Images[selectedColor]);
  }
}, [selectedColor, product?.Images]);

  const handleThumbnailClick = (thumbnail) => {
    setCurrentThumbnail(thumbnail);
  };
  if (!product) {
    return <p></p>;
  }
  const thumbnails = product.Thumbnail[selectedColor] || [];
  const handleDotClick = (index) => {
    setCurrentThumbnailIndex(index);
  };
  // Helper: is this item customizable?
const isCustomSizeSelected = selectedSize === 'Custom Size' || showCustomSizeInput || selectedSize?.startsWith('C:');
const isCustomizable =
  (
    isCustomSizeSelected &&
    (
      !!customWidth.trim() ||
      !!customLength.trim() ||
      !!customJerseyName.trim() ||
      !!customJerseyNumber.trim()
    )
  );

// Calculate price with customization fee
const customizationFee = isCustomizable ? 200 : 0;
const displayPrice = Number(product.Price) + customizationFee;
const displaySalePrice = product.SalePrice > 0 ? Number(product.SalePrice) + customizationFee : 0;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(price).replace('PHP', '₱').trim();
  };

  return (
    <div>
      <div className='whole-page'>
           <div className="product-page">
         <div className="image-gallery" {...swipeHandlers}>
  {/* Thumbnail Gallery */}
  <div className="thumbnail-gallery">
    {selectedColor && product.Thumbnail[selectedColor]?.map((thumbnail, index) => (
      <img
        key={index}
        src={thumbnail}
        alt={`${selectedColor}-${index}`}
        className="thumbnail"
        onClick={() => handleThumbnailClick(thumbnail)}
      />
    ))}
  </div>

  {/* Main Image Display */}
  <button className="arrow-button left" onClick={handlePreviousThumbnail}>
        
        </button>

        {/* Main Thumbnail Image */}
        <div className="main-image">
          <img  src={currentThumbnailIndex === -1 ? currentThumbnail : thumbnails[currentThumbnailIndex]} alt={`Thumbnail ${currentThumbnailIndex}`} loading="lazy" />
        </div>

        <button className="arrow-button right" onClick={handleNextThumbnail}>
         
        </button>

</div>
<div>
   <div className="thumbnail-dots">
          {thumbnails.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentThumbnailIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Thumbnail ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
           <div className="product-details">
             <h2>{product.Name}</h2>
             {selectedColor && (<h3 className="selected-thumbnail"> {selectedColor}</h3> )}
                {/* Display Sale Price and Original Price */}
{product.SalePrice > 0 ? (
  <p>
    <span className="original-price">₱{product.Price}</span>
    <span className="sale-price"> ₱{displaySalePrice}</span>
    {isCustomizable && <span className="custom-fee"> (₱200 customization fee included)</span>}
  </p>
) : (
  <p>
    ₱{displayPrice}
    {isCustomizable && <span className="custom-fee"> (₱200 customization fee included)</span>}
  </p>
)}
           {/* Color Options */}
{product && product.Images && (
  <div className="color-options">
    {Object.keys(product.Images).map((color) => (
      <Link to={`/${product.ID}/${color}`} key={color}>
        <button
          className={`color-button ${selectedColor === color ? 'selected' : ''}`}
          onClick={() => handleColorChange(color)}
        >
          <img src={product.Images[color]} alt={color} className="color-image" />
        </button>
      </Link>
    ))}
  </div>
)}
   {/* Size Options */}
{selectedColor && product && product.Colors && product.Colors[selectedColor] && (
  <div className="size-options">
    {Object.keys(product.Colors[selectedColor])
      .filter((size) => size !== "Label" && size !== "3XL" ) // Exclude the "BestSeller" key from sizes
      .map((size) => (
      <button
        key={size}
        className={`size-button ${selectedSize === size ? 'selected' : ''}`}
        onClick={() => handleSizeChange(size)}
        disabled={product.Colors[selectedColor][size] <= 0} // Disable button if out of stock
        title={product.Colors[selectedColor][size] <= 0 ? 'Out of Stock' : ''}
      >
        {size}
      </button>
    ))}
{/* Custom Size Option */}
{product.Colors[selectedColor]?.["2XL"] && 
 !['TRANQUIL', 'CARBONITE'].includes(product?.Series) &&
 !(product?.Series === 'BATTLESUIT' && product?.Type !== 'pants') && (
  <button 
    className={`size-button ${selectedSize === customSize ? 'selected' : ''}`}
    onClick={() => {
      setShowCustomSizeInput(true);
    }}
  >
    C
  </button>
)}
{showNameNumberModal &&
  selectedSize &&
  !selectedSize.startsWith('C') &&
  ['jersey', 'jersey shorts', 'jersey tank', 'jersey long sleeves'].includes(product?.Type) && (
  <div
    className="custom-modal-overlay"
    onClick={() => {
      setShowNameNumberModal(false);
      setSelectedSize('');
    }}
  >
    <div
      className="custom-details-box"
      onClick={(e) => e.stopPropagation()}
    >
      <span
        className="custom-close-button"
        onClick={() => {
          setShowNameNumberModal(false);
          setSelectedSize('');
        }}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: '12px',
          right: '16px',
          fontWeight: 'bold',
          fontSize: '20px',
        }}
      >
        ×
      </span>
      <p className="custom-details-heading">Custom Details</p>
      {(product?.Type === 'jersey' ||
        product?.Type === 'jersey shorts' ||
        product?.Type === 'jersey tank') && (
        <>
          <div className="custom-field">
            <label htmlFor="customName">Custom Jersey Name <span className="required">(required)</span></label>
            <input
              id="customName"
              type="text"
              placeholder="e.g., JOHN"
              required
              value={customJerseyName}
              onChange={(e) => setCustomJerseyName(e.target.value)}
            />
          </div>
          <div className="custom-field">
            <label htmlFor="customNumber">Custom Jersey Number <span className="required">(required)</span></label>
            <input
              id="customNumber"
              type="text"
              placeholder="e.g., 10"
              required
              value={customJerseyNumber}
              onChange={(e) => setCustomJerseyNumber(e.target.value)}
            />
          </div>
        </>
      )}
      {product?.Type === 'jersey long sleeves' && (
        <div className="custom-field">
          <label htmlFor="customNumber">Custom Jersey Number <span className="required">(required)</span></label>
          <input
            id="customNumber"
            type="text"
            placeholder="e.g., 10"
            required
            value={customJerseyNumber}
            onChange={(e) => setCustomJerseyNumber(e.target.value)}
          />
        </div>
      )}
      <div className="samedaydisclaimer">
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
          />
          <span>I understand that pre-order and customized products take a minimum of 5–7 business days for production.</span>
        </label>
        <br />
        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  </div>
)}
    {showCustomSizeInput && (
      <div className="custom-size-container">
  <p
    //className="custom-size-input"
    //placeholder="Enter custom size"
    //value={customSize} // Hide "C: " visually but keep it in the actual value
   // onChange={(e) => {
    //  let value = e.target.value.replace(/^C:\s*/, ""); // Remove "C: " if duplicated
     // setCustomSize(value);
   // }}
   // onBlur={() => handleSizeChange(`C:${customSize}`)}// Ensure "C: " is part of the final value
    //onKeyDown={(e) => {
     // if (e.key === "Backspace" && customSize === "") {
      //  e.preventDefault(); // Prevent clearing the field completely
    //  }
   // }}
  />
  {showCustomSizeInput && (
  <div
    className="custom-modal-overlay"
    onClick={() => {
      setShowCustomSizeInput(false);
      setSelectedSize('');
    }}
  >
    <div
      className="custom-details-box"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <span
        className="custom-close-button"
        onClick={() => {
          setShowCustomSizeInput(false);
          setSelectedSize('');
        }}
          style={{
      cursor: 'pointer',
      position: 'absolute',
      top: '12px',
      right: '16px',
      fontWeight: 'bold',
      fontSize: '20px',
    }}
      >
        ×
      </span>

      <p className="custom-details-heading">Custom Details</p>

      {/* Always show these */}
      <div className="custom-field">
        <label htmlFor="customWidth">
          Custom Width <span className="required">(required)</span>
        </label>
        <input
          id="customWidth"
          type="text"
          placeholder="e.g., 18 inches"
          value={customWidth}
          onChange={(e) => setCustomWidth(e.target.value)}
        />
      </div>

      <div className="custom-field">
        <label htmlFor="customLength">
          Custom Length <span className="required">(required)</span>
        </label>
        <input
          id="customLength"
          type="text"
          placeholder="e.g., 26 inches"
          value={customLength}
          onChange={(e) => setCustomLength(e.target.value)}
        />
      </div>
        {/* Conditional: UP Shorts */}
        {product?.Series === 'UP REPLICA AND MERCH' && product?.Type === 'shorts' && (
          <div className="custom-field">
            <label htmlFor="customNumber">Custom Jersey Number <span className="required">(required)</span></label>
            <input
              id="customNumber"
              type="text"
              placeholder="e.g., 10"
              value={customJerseyNumber}
              onChange={(e) => setCustomJerseyNumber(e.target.value)}
              required
            />
          </div>
        )}
        <div className="samedaydisclaimer">
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input 
        type="checkbox" 
        checked={isConfirmed} 
        onChange={() => setIsConfirmed(!isConfirmed)} 
      />
      <span>I understand that pre-order and customized products take a minimum of 5–7 business days for production.</span>
    </label>
    <br></br>
       <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
  </div>
    </div>
  </div>
)}
    {/* Additional fields for UP REPLICA AND MERCH */}
{product?.Series === 'UP REPLICA AND MERCH' && showCustomSizeInput && (
  <div className="custom-modal-overlay" onClick={() => {
    setShowCustomSizeInput(false);
    setSelectedSize('');
  }}>
    <div className="custom-details-box" onClick={(e) => e.stopPropagation()}>
      <span 
        className="custom-close-button" 
        onClick={() => {
          setShowCustomSizeInput(false);
          setSelectedSize('');
        }}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: '12px',
          right: '16px',
          fontWeight: 'bold',
          fontSize: '20px',
        }}
      >
        ×
      </span>

      <p className="custom-details-heading">Custom Details</p>
  {product?.Type === 'jersey'|| product?.Type === 'jersey shorts' || product?.Type === 'jersey long sleeves' || product?.Type === 'jersey tank' ? (
     <>
      <div className="custom-field">
        <label htmlFor="customWidth">Custom Width <span className="optional">(optional)</span></label>
        <input id="customWidth" type="text" placeholder="e.g., 18 inches" value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} />
      </div>

      <div className="custom-field">
        <label htmlFor="customLength">Custom Length <span className="optional">(optional)</span></label>
        <input id="customLength" type="text" placeholder="e.g., 26 inches" value={customLength} onChange={(e) => setCustomLength(e.target.value)} />
      </div>
      </>
  ):
  (  <>
      <div className="custom-field">
        <label htmlFor="customWidth">Custom Width <span className="required">(required)</span></label>
        <input id="customWidth" type="text" placeholder="e.g., 18 inches" value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} />
      </div>

      <div className="custom-field">
        <label htmlFor="customLength">Custom Length <span className="required">(required)</span></label>
        <input id="customLength" type="text" placeholder="e.g., 26 inches" value={customLength} onChange={(e) => setCustomLength(e.target.value)} />
      </div>
      </>
    )
}

      {/* ✅ Conditional fields */}
      {product?.Type === 'jersey' || product?.Type === 'jersey shorts' || product?.Type === 'jersey tank' ? (
        <>
          <div className="custom-field">
            <label htmlFor="customName">Custom Jersey Name <span className="required">(required)</span></label>
            <input
              id="customName"
              type="text"
              placeholder="e.g., JOHN"
              required
              value={customJerseyName}
              onChange={(e) => setCustomJerseyName(e.target.value)}
            />
          </div>

          <div className="custom-field">
            <label htmlFor="customNumber">Custom Jersey Number <span className="required">(required)</span></label>
            <input
              id="customNumber"
              type="text"
              placeholder="e.g., 10"
              required
              value={customJerseyNumber}
              onChange={(e) => setCustomJerseyNumber(e.target.value)}
            />
          </div>
        </>
      ) : product?.Type === 'jersey long sleeves' && (
        <div className="custom-field">
          <label htmlFor="customNumber">Custom Jersey Number <span className="required">(required)</span></label>
          <input
            id="customNumber"
            type="text"
            placeholder="e.g., 10"
            value={customJerseyNumber}
            onChange={(e) => setCustomJerseyNumber(e.target.value)}
          />
        </div>
      )}
      

      {/* ✅ Disclaimer */}
      {(selectedSize === 'Custom Size' || showCustomSizeInput) && (
        <div className="samedaydisclaimer">
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" 
              checked={isConfirmed} 
              onChange={() => setIsConfirmed(!isConfirmed)} 
            />
            <span>I understand that pre-order and customized products take a minimum of 5–7 business days for production.</span>
          </label>
          <br />
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}
    </div>
  </div>
)}
  </div>
    )}

  </div>
  
)}


     
             {/* Quantity Selector
             <div className="quantity-container">
               <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
               <span>{quantity}</span>
               <button onClick={() => setQuantity(quantity + 1)}>+</button>
             </div> */}
             {notification && (<div className="sizenotification">{notification}</div>)}
             <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
             <div className="accordion">
      {sections.map((section, index) => (
        <div key={index} className="accordion-section">
          <button
            className="accordion-header"
            onClick={() => toggleSection(index)}
          >
            <span>{section.title}</span>
            <span className="accordion-icon">{expandedSection === index ? '-' : '+'}</span>
          </button>
          {expandedSection === index && (
          <div className="accordion-content">
            {typeof section.content === 'string' ? (
              <p className='mcare'>{section.content}</p>
            ) : (
              section.content
            )}
          </div>
        )}
        </div>
      ))}
        {/* Modal-like overlay for size chart */}
    {sizeChartClicked && (
      <div className="sizechartclicked" onClick={handleCloseModal}>
        <div className='sizechartcontainer'  onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <h2 style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto'}}> 
           SIZE GUIDE</h2> 
          <p className='close-button' style={{marginLeft:'-50px'}} onClick={handleCloseModal}></p>
        </div>
        <img 
          src={product.SizeChart} 
          alt="Size Chart" 
          className="sizechartimage" 
          onClick={e => e.stopPropagation()} // Prevent click from closing modal when image clicked
        />
      </div>
      </div>
    )}
    {showMaterialCare && (
  <div className="sizechartclicked" onClick={() => setShowMaterialCare(false)}>
    <div className="sizechartcontainer" onClick={e => e.stopPropagation()}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
      <h2 style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto'}}> 
           MATERIAL CARE</h2> 
   <p className='close-button' style={{marginLeft:'-50px'}} onClick={() => setShowMaterialCare(false)}></p>
      </div>
      <div className="mcare-list">
        <p>To ensure the longevity of your gear, we recommend the following care:</p>
        <p>Wash in cold water. Avoid/minimize use of washing machine.</p>
        <p>Dry in shade to preserve design elements and keep vibrant colors in-tact.</p>
        <p>Avoid fabric softener or bleaching.</p>
        <p>Wash dark-colored apparel separately from colored garments.</p>
        <p>Avoid leaving to soak or in rolled-up wet situations.</p>
        <p>Do not: dry clean, iron, spin, or tumble dry.</p>
      </div>
    </div>
  </div>
)}
    </div>
           </div>
         </div>
        {cartNotification && (<div className="cart-notification">{cartNotification}</div>)}
        <CartButtonPage 
        cart={cart} 
        increaseQuantity={increaseQuantity} 
        decreaseQuantity={decreaseQuantity}
        removeAllFromCart={removeAllFromCart}
        products={products} // Pass products here
        handleAddToCart={handleAddToCart} 
      />
    </div>
    {product.Features1 && (
      <div>
      <div className="features">
      <p style={{fontWeight:'Bold'}}>Features</p>
      <hr />
      <div className="feature-image">
  <div className="feature-main-image">
    <div className="image-label-container">
      <img className="feature-main-image" src={product.Features1} alt="Feature 1" />
      <p>{product.Features1label}</p>
    </div>
    <div className="image-label-container">
      <img className="feature-main-image" src={product.Features2} alt="Feature 2" />
      <p>{product.Features2label}</p>
    </div>
    <div className="image-label-container">
      <img className="feature-main-image" src={product.Features3} alt="Feature 3" />
      <p>{product.Features3label}</p>
    </div>
  </div>
</div>
    </div>
    </div>
    )}
    {product.technical1 && (
      <div>
      <div className="technical">
      <p style={{fontWeight:'Bold'}}>Technical Highlight</p>
      <hr />
      <div className="technical-image">
  <div className="technical-main-image">
    <img className="technical-main-image" src={product.technical1} alt="technical 1" />
    <img className="technical-main-image" src={product.technical2} alt="technical 2" />
    <img className="technical-main-image" src={product.technical3} alt="technical 3" />
  </div>
</div>
<div className='technical-label'>
  <p>{product.technical1label}</p>
  <p>{product.technical2label}</p>
  <p>{product.technical3label}</p>
</div>
    </div>
    </div>
    )}
            {/* "You May Also Like" Section */}
            <div className="recommended-products">
  <hr style={{ border: '0', height: '1px', backgroundColor: '#ccc' }} />
  <h2 style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>You May Also Like</h2>
  <div className="recommended-products-grid">
    {randomProducts.map((recommended) => {
      // Get a random color
      const colorKeys = Object.keys(recommended.Colors);
      const randomColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      const colorLabel = recommended.Colors[randomColor]?.Label;

      // Get a random image for the selected color
      const imageKeys = Object.keys(recommended.Images);
      const randomImage = imageKeys[Math.floor(Math.random() * imageKeys.length)];

      return (
        <div key={`${recommended.ID}-${randomColor}`} className="recommended-product">
          <Link
            style={{ textDecoration: 'none', color: '#1b1b1b' }}
            onClick={() => (window.location.href = `/${recommended.ID}/${randomColor}`)}
          >
            {/* Tag Display */}
            {colorLabel === 1 && <div className="bestseller-tag1">BESTSELLER</div>}
            {colorLabel === 2 && <div className="onsale-tag1">ON SALE</div>}
            {colorLabel === 3 && <div className="bestseller-tag1">LIMITED STOCKS ONLY</div>}
            {colorLabel === 4 && <div className="bestseller-tag1">NEW STOCKS AVAILABLE</div>}
            {colorLabel === 5 && <div className="bestseller-tag1">FEW STOCKS LEFT</div>}
            {colorLabel === 6 && <div className="bestseller-tag1">PRE-ORDER</div>}
            {colorLabel === 7 && <div className="onsale-tag1">SOLD OUT</div>}

            {/* Product Image */}
            <img src={recommended.Images[randomImage]} alt={`${recommended.Name} - ${randomColor}`} className="product-image" />

            {/* Product Name */}
            <h3>{recommended.Name} - {randomImage}</h3>

            {/* Pricing */}
            {recommended.SalePrice > 0 ? (
              <p>
                <span className="original-price">{formatPrice(recommended.Price)}</span>
                <span className="sale-price"> {formatPrice(recommended.SalePrice)}</span>
              </p>
            ) : (
              <p>{formatPrice(recommended.Price)}</p>
            )}
          </Link>
        </div>
      );
    })}
  </div>
</div>

      <Footer/>
    </div>
   )
}

export default ProductDetails;
