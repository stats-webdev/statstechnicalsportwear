import React, { useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import Banner from './Banner';
import Footer from './Footer';
import CartButtonPage from './CartButtonPage';
import { filterProducts } from './filter';

function SeriesPage({ products, cart, increaseQuantity, decreaseQuantity,removeAllFromCart }) {
const { seriesName, typeName, value } = useParams();
const firstWord = value?.split(' ')[0];
const [fetchedData, setFetchedData] = useState(null);

  const [showFilter, setShowFilter] = useState(false);
  const [hover, setHover] = useState(false);
  const [colorName, setColorName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const colorsPerPage = 12;
  const [activeFilter, setActiveFilter] = useState(null);
  const [removePagination, setRemovePagination]=useState(false);


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
  camouflage:['WHITE BRUSH','MOONLIGHT BRUSH', 'BLACK BRUSH','WOODLAND BRUSH', 'GAITER CAMO', 'RUST BRUSH', 'JINX', 'NIGHTFROST']
};
const [filters, setFilters] = useState({
  color: '',
  type: '',
  gender: '',
  series: '',
  fabtech: '',
  fitment: '',
  designfor: '',
});
const [selectedSize, setSelectedSize] = useState(null);
const [chosenColor, setChosenColor] = useState('');
 useEffect(() => {
  
    const fetchBannerImages = async () => {
      try {
        const response = await fetch('https://my-product-api.stats-webdev.workers.dev/bannerimages');
        const data = await response.json();
        setFetchedData(data); // Store entire fetched data if needed

      } catch (error) {
        console.error('Error fetching ads data:', error);
      }
    };
 
    fetchBannerImages();
  }, []);
const filteredProducts = filterProducts(
  products.filter((product) => {
    const matchesSeries = product.Series?.toLowerCase() === (seriesName?.toLowerCase() || "");
    const matchesType = typeName
      ? product.Type?.toLowerCase() === typeName.toLowerCase()
      : true;
    const matchesId = value
      ? String(product.ID).toLowerCase().startsWith(firstWord?.toLowerCase())
      : true;
    return matchesSeries && matchesType && matchesId;
  }),
  filters,
  chosenColor,
  selectedSize,
  colorMapping
);
  const [hoveredImage, setHoveredImage] = useState({});

  const handleMouseEnter = (productId, color) => {
    const product = products.find((p) => p.ID === productId);
    if (product && product.Thumbnail && product.Thumbnail[color]) {
      setHoveredImage((prev) => ({
        ...prev,
        [`${productId}-${color}`]: product.Thumbnail[color][0],
      }));
    }
  };

  const handleMouseLeave = (productId, color) => {
    setHoveredImage((prev) => {
      const newHovered = { ...prev };
      delete newHovered[`${productId}-${color}`];
      return newHovered;
    });
  };

  const bannerObj = fetchedData?.find((item) => item[seriesName?.toLowerCase()]);
  const bannerSrc = bannerObj ? bannerObj[seriesName?.toLowerCase()] : '';
  
      const handleToggle = (filterName) => {
      setActiveFilter(activeFilter === filterName ? null : filterName);
    };
    const handleFilterClick = () => {
      setShowFilter(!showFilter); // Toggles the visibility of the <hr>
    };      
      const uniqueProductType = Array.from(
      new Set((products.map(item => item.Type) || []))
    );
      const uniqueSeries = Array.from(
      new Set((products.map(item => item.Series) || []))
    );
  
      const handleFilterChange = (filterCategory, value) => {
      const formattedCategory = filterCategory.toLowerCase();
    const selectedColor = chosenColor;
  
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
      const designforlist = [
        "BL - Base Layer - Next-to-Skin Comfort", 
        "COB - Condition Black - Advance Apparel Designs with multiple utilitarian Properties", 
        "EVU - Everyday - Advance technical apparel for everyday use", 
        "PRF - High intensity - Engineered for high performance activities",
        "RST - Rest Day - For Restful Moments",
        "SPR - Sport and Training - Constructed with advance tech fabrics" ]
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
    const availableTypes = Array.from(
  new Set(filteredProducts.map(item => item.Type).filter(Boolean))
);
const availableSeries = Array.from(
  new Set(filteredProducts.map(item => item.Series).filter(Boolean))
);
const availableGenders = Array.from(
  new Set(filteredProducts.map(item => item.Gender).filter(Boolean))
);
const availableFabtech = Array.from(
  new Set(filteredProducts.flatMap(item => Array.isArray(item.FabTech) ? item.FabTech : [item.FabTech]).filter(Boolean))
);
const availableFitments = Array.from(
  new Set(filteredProducts.map(item => item.Fitment).filter(Boolean))
);
const availableDesignFor = Array.from(
  new Set(filteredProducts.flatMap(item => Array.isArray(item.DesignFor) ? item.DesignFor : [item.DesignFor]).filter(Boolean))
);


  return (
    <div className="series-page">
      {/* banner */}
      {bannerSrc ? (
  <img src={bannerSrc} alt={`${seriesName} Banner`} className="series-banner" />
) : (
  <Banner/>
)}
<h2 style={{ marginLeft: '5%', fontWeight: 'normal' }}>
  {seriesName} Series{" "}
  {typeName
    ? `- ${typeName}`
    : value
    ? `- ${value.split(' ')[0]}`
    : ''}
</h2>
      <hr style={{ width: '90%' }} />
      {/* <h2 className="titleh2">{'ALL PRODUCTS'}</h2> */}
      {/* <hr className="titlehr"/> */}
      <br></br>
      <nav className='titlenav'>
        <button className='titlenavbutton' onClick={handleFilterClick}> Show Filters</button>
      </nav>
      <div className='product-page1'>
      <div className={`Productlistpanel ${showFilter ? 'show' : ''}`} >
          </div>
       <aside className={`filter-sidebar ${showFilter ? 'show' : ''}`} >
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
      {availableTypes.map((type) => (
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
                {availableGenders.map((gender) => (
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
      {availableDesignFor.map((designfor) => {
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
                {availableSeries.map((series) => (
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
                {availableFitments.map((fitment) => (
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

      <CartButtonPage 
        cart={cart} 
        increaseQuantity={increaseQuantity} 
        decreaseQuantity={decreaseQuantity}
        removeAllFromCart={removeAllFromCart}
        products={products} // Pass products here
      />
      <Footer />
    </div>
  );
}

export default SeriesPage;
