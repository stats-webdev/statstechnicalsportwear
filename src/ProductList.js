import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useSwipeable } from 'react-swipeable';

import CartButtonPage from './CartButtonPage';
import Banner from './Banner';
import Product from './Product';
import Footer from './Footer';
import './Filter.css';
import { filterProducts } from './filter';
import PopupExamples from './Popup';

function ProductsList({ cart, increaseQuantity, decreaseQuantity,removeAllFromCart }) {
  
  const [cartNotification] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredImage, setHoveredImage] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [chosenColor, setChosenColor] = useState('');
  const [hover, setHover] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [colorName, setColorName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [removePagination, setRemovePagination]=useState(false);
  const colorsPerPage = 12;
  const [filters, setFilters] = useState({
    Color: '',
    type: '',
    gender: '',
    series: '',
    FabTech: '',
  });
  const colorMapping = {
    '#1e1e1e': ['GRAPHITE', 'OBSIDIAN', 'BLACKOUT', 'BLACK GOLD', 'BLACK', 'GRANITE', 'GRAVEL', 'DARK OLIVE'],
    '#5b5b5d': ['LIGHT SLATE', 'SHALE', 'COAL', 'SLATE GRAY', 'CHARCOAL BLUE','SMOKE', 'DEEP TAUPE', 'GRAY', 'SPACE GRAY'],
    '#f2f2f2': ['GHOST', 'DICE', 'WHITE', 'WHITE GRANITE'],
    '#ece7db': ['BEIGE', 'IVORY', 'OFF-WHITE', 'CLAY', 'DARK IVORY', 'BONE WHITE'],
    '#562313':['DARK EARTH', 'TRENCH', 'COPPER', 'BROWN'],
    '#b92025':['PORTLAND RED', 'MAUL', 'BURGUNDY', 'MAROON', 'BRICK', 'FADED WINE','TAMPA', 'TAMPA PINK', 'RED'],
    '#ff5500':['MOONCAKE', 'PUMPKIN', 'MELO MAX ORANGE', 'FLAME', 'REEF', 'ORANGE'],
    '#f2df2c':['KOBE23 YELLOW', 'BRUCE LEE YELLOW GOLD', 'BUTTER', 'GLITCH POP', 'WOOD DRAGON', 'YELLOW'],
    '#28af0c':['LIME', 'DARK MOON', 'GREEN'],
    '#0e3a90':['MELO BLUE', 'CALCITE BLUE', 'TAMPA BLUE','BLUE', 'NAVY'],
    '#3e226b':['MIDNIGHT', 'PURPLE', 'PURPLE COAL', 'BUBBLE GUM', 'VIOLET'],
   //'linear-gradient(to right, #ff4500, #ff8c00, #ffd700)':['MAUL', 'BURGUNDY', 'MAROON','FADED WHITE', 'TAMPA PINK', 'BRICK', 'PUMPKIN', 'FLAME', 'REEF', 'KOBE23', 'BRUCE LEE', 'BUTTER'],
   //'linear-gradient(to right, #00c6ff, #0072ff, #7b2ff7)':['LIME', 'DARK MOON', 'CALCITE BLUE', 'CHARCOAL BLUE', 'TAMPA BLUE', 'MIDNIGHT', 'PURPLE'],
   camouflage:['WHITE BRUSH','MOONLIGHT BRUSH', 'BLACK BRUSH','WOODLAND BRUSH', 'GAITER CAMO', 'RUST BRUSH', 'JINX', 'NIGHTFROST']
  };
  
  
  const handleFilterChange = (filterCategory, value) => {
    const formattedCategory = filterCategory.toLowerCase();
  
    let mappedValue = value;
    if (formattedCategory === 'color') {
      // Map the displayed color to the actual data keys
      const colorKeys = colorMapping[value.toLowerCase()];
      mappedValue = colorKeys || [value];
      setChosenColor((prev) => 
        prev.includes(mappedValue[0]) ? prev.filter((color) => !mappedValue.includes(color)) : [...prev, ...mappedValue]
      );
      setFilters((prevFilters) => ({
        ...prevFilters,
        color: prevFilters.color === mappedValue ? '' : mappedValue, // Toggle filter
      }));
    }
    if( JSON.stringify(mappedValue) === JSON.stringify(selectedColor)) {
      setChosenColor(''); // Clear all color selections
    }
  
    setFilters((prevFilters) => ({
      ...prevFilters,
      [formattedCategory]: prevFilters[formattedCategory] === mappedValue ? '' : mappedValue, // Toggle filter
    }));
  };
  const selectedColor = chosenColor;

  const filteredProducts = filterProducts(products, filters, chosenColor, selectedSize, colorMapping);
  
  useEffect(() => {
    fetch('https://my-product-api.stats-webdev.workers.dev/?id=1')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Set products data
      })
      .catch((error) => console.error('Error fetching product data:', error));
  }, []);

  const handleMouseEnter = (productId, color) => {
    const product = products.find((p) => p.ID === productId);
    if (product && product.Thumbnail && product.Thumbnail[color]) {
      setHoveredImage((prev) => ({
        ...prev,
        [`${productId}-${color}`]: product.Thumbnail[color][0], // Use the first thumbnail if it exists
      }));
    }
  };
  const handleMouseLeave = (productId, color) => {
    setHoveredImage((prev) => {
      const newHovered = { ...prev };
      delete newHovered[`${productId}-${color}`]; // Remove hover state for the specific variation
      return newHovered;
    });
  };
  const [activeFilter, setActiveFilter] = useState(null);

  const handleToggle = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };
  const handleFilterClick = () => {
    setShowFilter(!showFilter); // Toggles the visibility of the <hr>
  };      
  useEffect(() => {
      if (showFilter) {
        document.body.classList.add('no-scroll1');
      } else {
        document.body.classList.remove('no-scroll1');
      }
    }, [showFilter]);

    const designforlist = [
      "BL - Base Layer - Next-to-Skin Comfort", 
      "COB - Condition Black - Advance Apparel Designs with multiple utilitarian Properties", 
      "EVU - Everyday - Advance technical apparel for everyday use", 
      "PRF - High intensity - Engineered for high performance activities",
      "RST - Rest Day - For Restful Moments",
      "SPR - Sport and Training - Constructed with advance tech fabrics" ]

    // console.log(Object.keys(product.Colors).map.length)
     // Flatten the filteredProducts array to get all colors
  const allColors = [];
  filteredProducts.forEach((product) => {
    Object.keys(product.Colors).forEach((color) => {
      allColors.push({ product, color });
    });
  });
  
  // Paginate: Get colors for the current page
  const totalColors = allColors.length;
  const totalPages = Math.ceil(totalColors / colorsPerPage);
  const startIndex = (currentPage - 1) * colorsPerPage;
  const endIndex = startIndex + colorsPerPage;
  const colorsToDisplay = allColors.slice(startIndex, endIndex);

  // Handle page change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1); // Set to the last page if the next page exceeds the total pages
    } else if (currentPage < 1) {
      setCurrentPage(1); // Prevent going to a page less than 1
    }
    if(totalPages < 1)
    {
      setRemovePagination(true);
    }
    else
    {
      setRemovePagination(false);
    }
    
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
// Handle page change when clicking on NEXT or PREV
const handlePrev = () => {
  handlePageChange(currentPage - 1);
};

const handleNext = () => {
  handlePageChange(currentPage + 1);
};

  const uniqueSeries = Array.from(
    new Set((products.map(item => item.Series) || []))
  );
const availableFabtech = Array.from(
  new Set(filteredProducts.flatMap(item => Array.isArray(item.FabTech) ? item.FabTech : [item.FabTech]).filter(Boolean))
);
  const uniqueDesignFor = Array.from(
    new Set((products.map(item => item.DesignFor) || []))
  );
  const uniqueProductType = Array.from(
    new Set((products.map(item => item.Type) || []))
  );

  
  
  return (
    <div >
        <Banner /> 
               <PopupExamples pageKey="/" />
      {/* <h2 className="titleh2">{'ALL PRODUCTS'}</h2> */}
      {/* <hr className="titlehr"/> */}
      <br></br>
      <nav className='titlenav'>
        <button className='titlenavbutton' onClick={handleFilterClick}>Show Filters</button>
      </nav>
      <div className='product-page1'>
      <div className={`Productlistpanel ${showFilter ? 'show' : ''}`} >
          </div>
       <aside className={`filter-sidebar1 ${showFilter ? 'show' : ''}`} >
          {/* Product Type */}
         <div>
          <nav className='sidebarnav'>
            <p className='sidebarnavtitle'>
              Filters
            </p>
            <button className="filter-close-button" onClick={handleFilterClick}> </button>
          </nav>
          </div>
   
          <div className="filter-group">
        
            <h4 onClick={() => handleToggle("type")}>
              Product Type
              <span className={`toggle-icon ${activeFilter === "type" ? 'active' : ''}`} id='toggleButton'></span>
            </h4>
            {activeFilter === "type" && (
              <div className="filter-options">
                {uniqueProductType.map((type) => (
                  <div className='filter-button-line' key={type} >
                  <button
                    className={`filter-button ${filters.type === type ? 'active' : ''}`}
                    onClick={() => handleFilterChange("type", type)}
                  >
                   {type}
                   
                  </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <hr></hr>
           {/* Gender */}
           <div className="filter-group">
            <h4 onClick={() => handleToggle("gender")}>
              Gender
              <span className={`toggle-icon ${activeFilter === "gender" ? 'active' : ''}`}></span>
            </h4>
            {activeFilter === "gender" && (
              <div className="filter-options">
                {["Mens", "Womens", "Unisex"].map((gender) => (
                  <button
                  className={`filter-button ${filters.gender === gender ? 'active' : ''}`}
                    onClick={() => handleFilterChange("gender", gender)}
                    key={gender}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            )}
          </div>
          <hr></hr>
              {/* DesignFor */}
              <div className="filter-group">
  <h4 onClick={() => handleToggle("designfor")}>
    Designed For
    <span className={`toggle-icon ${activeFilter === "designfor" ? 'active' : ''}`}></span>
  </h4>
  {activeFilter === "designfor" && (
    <div className="filter-options">
      {designforlist.map((designfor) => {
        // Extract only the second part (the name)
        const parts = designfor.split(" - ");
        const formatted = `[${parts[0]}] ${parts[1].toUpperCase()}`;
        return (
          <button
            className={`filter-button ${filters.designfor === designfor ? 'active' : ''}`}
            onClick={() => handleFilterChange("designfor", designfor)}
            key={designfor}
          >
            {formatted}
          </button>
        );
      })}
    </div>
  )}
</div>
          <hr></hr>
          {/* Colors */}
          <div className="filter-group">
  <h4 onClick={() => handleToggle("color")}>
    Color
    <span className={`toggle-icon ${activeFilter === "color" ? 'active' : ''}`}></span>
  </h4>
  {activeFilter === "color" && (
    <div className="filter-options" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}>
      {Object.keys(colorMapping).map((color) => {
        const selectedColorArray = Array.isArray(selectedColor) ? selectedColor : [selectedColor];
        const isSelected = selectedColorArray.some(selected => colorMapping[color]?.includes(selected));
        const handleMouseEnterColor = (color) => {
          setHover(true);
          if (color === 'linear-gradient(to right, #ff4500, #ff8c00, #ffd700)') {
            setColorName('warm'); // For gradient
          } 
          else if (color === 'linear-gradient(to right, #00c6ff, #0072ff, #7b2ff7)') {
            setColorName('cool'); // For gradient
          } 
          else if (color === '#1e1e1e') {
            setColorName('black'); // For gradient
          }  else if (color === '#5b5b5d') {
            setColorName('gray'); // For gradient
          }  else if (color === '#f2f2f2') {
            setColorName('white'); // For gradient
          }  else if (color === '#ece7db') {
            setColorName('off-white'); // For gradient
          }  else if (color === '#562313') {
            setColorName('earth'); // For gradient
          }  else if (color === '#b92025') {
            setColorName('red'); // For gradient
          } else if (color === '#ff5500') {
            setColorName('orange'); // For gradient
          } else if(color === '#f2df2c'){
            setColorName('yellow'); // For gradient
          } else if(color === '#28af0c'){
            setColorName('green'); // For gradient
          } else if(color === '#0e3a90'){
            setColorName('blue'); // For gradient
          } else if(color === '#3e226b'){
            setColorName('violet'); // For gradient
          }
          else {
            setColorName(color); // For other colors
          }
        };
        
        const handleMouseLeaveColor = () => {
          setHover(false);
          setColorName('');
        };
      // console.log(Object.keys(colorMapping).length - 1)
        return (
          <div key={color} className="color-item">
            <button
              className={`color-box ${isSelected ? 'active' : ''}`}
              onClick={() => handleFilterChange('color', color)}
              onMouseEnter={() => handleMouseEnterColor(color)}
              onMouseLeave={handleMouseLeaveColor}
              
              style={{
                background: color,
                border: isSelected ? '2px solid #ccc' : '1px solid #ccc',
              }}
            >
        {color === 'camouflage' && (
          <img className ='colorbox' src='https://imagizer.imageshack.com/v2/1600x1200q70/923/1nE6jS.jpg'/>
        )}
            </button>
              {hover &&  (colorName === color || (colorName === 'warm' && color === 'linear-gradient(to right, #ff4500, #ff8c00, #ffd700)') || 
              (colorName === 'cool' && color === 'linear-gradient(to right, #00c6ff, #0072ff, #7b2ff7)') || 
              (colorName === 'black' && color === '#1e1e1e') ||
              (colorName === 'gray' && color === '#5b5b5d') ||
              (colorName === 'white' && color === '#f2f2f2') ||
              (colorName === 'off-white' && color === '#ece7db') ||
              (colorName === 'earth' && color === '#562313') ||
              (colorName === 'red' && color === '#b92025') ||
              (colorName === 'orange' && color === '#ff5500') ||
              (colorName === 'yellow' && color === '#f2df2c') ||
              (colorName === 'green' && color === '#28af0c') ||
              (colorName === 'blue' && color === '#0e3a90') ||
              (colorName === 'violet' && color === '#3e226b')) && (
              <div className="color-tooltip">
                {colorName}
              </div>
            )}
          </div>
        );
      })}
    </div>
  )}
</div>
          <hr></hr>

         
          <div className="filter-group">
            <h4 onClick={() => handleToggle("series")}>
              Series
              <span className={`toggle-icon ${activeFilter === "series" ? 'active' : ''}`}></span>
            </h4>
            {activeFilter === "series" && (
              <div className="filter-options">
                {uniqueSeries.map((series) => (
                  <button
                  className={`filter-button ${filters.series === series ? 'active' : ''}`}
                    onClick={() => handleFilterChange("series", series)}
                    key={series}
                  >
                    {series}
                  </button>
                ))}
              </div>
            )}
          </div>
          <hr></hr>
          <div className="filter-group">
            <h4 onClick={() => handleToggle("fabtech")}>
            fabtech
              <span className={`toggle-icon ${activeFilter === "fabtech" ? 'active' : ''}`}></span>
            </h4>
            {activeFilter === "fabtech" && (
              <div className="filter-options">
                {availableFabtech.map((fabtech) => (
                  <button
                  className={`filter-button ${filters.fabtech === fabtech ? 'active' : ''}`}
                    onClick={() => handleFilterChange("fabtech", fabtech)}
                    key={fabtech}
                  >
                    {fabtech}
                  </button>
                ))}
              </div>
            )}
          </div>
          <hr></hr>
          <div className="filter-group">
            <h4 onClick={() => handleToggle("fitment")}>
            fitment
              <span className={`toggle-icon ${activeFilter === "fitment" ? 'active' : ''}`}></span>
            </h4>
            {activeFilter === "fitment" && (
              <div className="filter-options">
                {["standard fit", "relaxed fit", "adaptive fit"].map((fitment) => (
                  <button
                  className={`filter-button ${filters.fitment === fitment ? 'active' : ''}`}
                    onClick={() => handleFilterChange("fitment", fitment)}
                    key={fitment}
                  >
                    {fitment}
                  </button>
                ))}
              </div>
            )}
          </div>
          <hr></hr>
          <div className="filter-group">
          <h4 onClick={() => handleToggle("size")}>
            Size
              <span className={`toggle-icon ${activeFilter === "size" ? 'active' : ''}`}></span>
            </h4>
           {activeFilter === "size" && (
  <div className="filter-options">
    {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((size) => {
      const displayLabel = size === "3XL" ? "C" : size;
      return (
        <button
          key={size}
          className={`filter-button2 ${selectedSize === size ? 'active' : ''}`}
          onClick={() => setSelectedSize(selectedSize === size ? null : size)} // Toggle selection
          style={{
            /* padding: '5px',
            fontSize: '10px',
            textAlign: 'center',
            marginLeft: '2px',
            marginBottom: '2px',
            backgroundColor: 'transparent' */
          }}
        >
          {displayLabel}
        </button>
      );
    })}
  </div>
)}
</div>
<hr></hr>
          {/* Add more filter categories similarly */}
        </aside>
         {/* CARDS {products.map((product) => (
            <div key={product.ID} className="product-card">
              <Link to={`/${product.ID}`}>
                <img src={product.PriceCard} alt={product.Name}className="product-image" />
              </Link>
              <h3>{product.Name}</h3>
              <Link to={`/${product.ID}`}>
              <button className="add-to-cart-button">Add to Cart</button>
              </Link>
            </div>
          ))} */}
             
           <section className="product-grid">
           {totalColors === 0 ? (
    <div className="product-page1">
      <p className="no-products-message"></p>
    </div>
  ) : (
    colorsToDisplay.map(({ product, color }) =>
          // Map through each color variation for the product
         
            <div
            key={`${product.ID}-${color}`}
            className="product-card"
            onMouseEnter={() => handleMouseEnter(product.ID, color)}
            onMouseLeave={() => handleMouseLeave(product.ID, color)}
          >
              <Link to={`/${product.ID}/${color}`} style={{ textDecoration: 'none' }}>
              {/* {console.log('Colors: ', Object.keys(product.Colors).length)} */}
               {/* Display the BESTSELLER tag for this color */}
               {product.Colors[color].Label === 1 && (
  <div className="bestseller-tag">BESTSELLER</div>
)}
{product.Colors[color].Label === 2 && (
  <div className="onsale-tag">ON SALE</div>
)}
{product.Colors[color].Label === 3 && (
  <div className="bestseller-tag">LIMITED STOCKS ONLY</div>
)}
{product.Colors[color].Label === 4 && (
  <div className="bestseller-tag">NEW STOCKS AVAILABLE</div>
)}
{product.Colors[color].Label === 5 && (
  <div className="bestseller-tag">FEW STOCKS LEFT</div>
)}
{product.Colors[color].Label === 6 && (
  <div className="bestseller-tag">PRE-ORDER</div>
)}
{product.Colors[color].Label === 7 && (
  <div className="onsale-tag">SOLD OUT</div>
)}
                <img
                  src={
                    hoveredImage[`${product.ID}-${color}`]
                      ? hoveredImage[`${product.ID}-${color}`] // Show hovered thumbnail if exists
                      : product.Images[color] // Default image as fallback
                  }
                  alt={`${product.Name} - ${color}`}
                  className="product-image"
                />
              <h3>{product.Name} - {color}</h3>
              {product.SalePrice > 0 ? (
    <p>
      <span className="original-price">₱{product.Price}</span>
      <span className="sale-price"> ₱{product.SalePrice}</span>
    </p>
  ) : (
    <p>₱{product.Price}</p>
  )}
              </Link>
              {/* <Link to={`/${product.ID}/${color}`}>
                <button className="add-to-cart-button">View Product</button>
              </Link> */}
            </div>
        )
      )}
      
        </section>
        </div>
     {/* Pagination controls */}
<div className={removePagination ? "pagination-controls-hide" : "pagination-controls"}>
  {/* Previous Button */}
    {/* Previous Button */}
    <button onClick={handlePrev} disabled={currentPage === 1}>
      PREV
    </button>

    {/* Page Number */}
    <span>{`Page ${currentPage} of ${totalPages}`}</span>

    {/* Next Button */}
    <button onClick={handleNext} disabled={currentPage === totalPages}>
      NEXT
    </button>
</div>


      {cartNotification && <div className="cart-notification">{cartNotification}</div>}
      <CartButtonPage 
        cart={cart} 
        increaseQuantity={increaseQuantity} 
        decreaseQuantity={decreaseQuantity}
        removeAllFromCart={removeAllFromCart}
        products={products} // Pass products here
      />
      <Footer/>
    </div>
  );
}

export default ProductsList;
