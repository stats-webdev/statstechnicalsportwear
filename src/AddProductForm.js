import React, { useState, useEffect } from 'react';
import './AddProductForm.css';


function AddProductForm() {
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productSalePrice, setProductSalePrice] = useState(0); // Default to 0
  const [productDescription, setProductDescription] = useState('');
  const [productDesignFor, setProductDesignFor] = useState('');
const [productFabTech, setProductFabTech] = useState([]);
  const [productSizeChart, setProductSizeChart] = useState('');
  const [productFitment, setProductFitment] = useState('');
  const [productType, setProductType] = useState('');
  const [productGender, setProductGender] = useState('');
  const [productSeries, setProductSeries] = useState('');
 // const [productFeatures1, setProductFeatures1] = useState('');
 // const [productFeatures2, setProductFeatures2] = useState('');
 // const [productFeatures3, setProductFeatures3] = useState('');
 // const [productFeatures1label, setProductFeatures1label] = useState('');
 // const [productFeatures2label, setProductFeatures2label] = useState('');
 // const [productFeatures3label, setProductFeatures3label] = useState('');
  const [productColors, setProductColors] = useState([]);
  const [productImageLinks, setProductImageLinks] = useState({});
  const [productThumbnails, setProductThumbnails] = useState({});
  const [productPriceCard, setProductPriceCard] = useState('');
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]); // State to store fetched product data
  const [bestSeller, setBestSeller] = useState(1);
  const [availableSizes, setAvailableSizes] = useState([]);

  // Fetch product list from the API when the componenat mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://my-product-api.stats-webdev.workers.dev/?id=1");
        const data = await response.json();

        if (response.ok) {
          setProducts(data); // Save product data to state
        } else {
          console.error("Failed to fetch products:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductColorsChange = (e) => {
    const colorsInput = e.target.value.split(',').map((color) => color.trim());
    setProductColors(colorsInput);
  };

  const handleProductImageLinksChange = (e) => {
    const imageLinks = e.target.value.split(',').reduce((acc, pair) => {
      const [color, link] = pair.split('=').map((part) => part.trim());
      if (color && link) {
        acc[color] = link;
      }
      return acc;
    }, {});
    setProductImageLinks(imageLinks);
  };

  const handleProductThumbnailsChange = (e) => {
    const thumbnails = e.target.value.split('-').reduce((acc, pair) => {
      const [color, ...urls] = pair.split('=').map((part) => part.trim());
      if (color && urls.length > 0) {
        acc[color] = urls.join(',').split(',').map(url => url.trim());  // Store URLs as an array
      }
      return acc;
    }, {});
    setProductThumbnails(thumbnails);
  };
  const handleAddProduct = async () => {
    // Check for empty or whitespace-only fields
    if (
      !productID.trim() ||
      !productName.trim() ||
      !productPrice.trim() ||
      !productDescription.trim() ||
     // productDesignFor.length === 0 || 
     // productFabTech.length === 0  ||
      !productType.trim() ||
      !productGender.trim() ||
      !productSeries.trim() ||
      !productColors.length ||
      !availableSizes.length || // ← Make sure at least one size is selected
      !productImageLinks || 
      !productPriceCard.trim()
    ) {
      setMessage('Please fill in all required fields correctly.');
      setTimeout(() => setMessage(''), 3000);
      return; // Prevent adding the product if validation fails
    }

    // Check if a product with the same ID already exists in the fetched products
    const existingProduct = products.find((product) => product.ID === productID);
    if (existingProduct) {
      setMessage('Product with this ID already exists');
      setTimeout(() => setMessage(''), 3000);
      return; // Don't proceed further if the product ID exists
    }

    const newProduct = {
      ID: productID,
      Name: productName,
      Price: productPrice,
      SalePrice: productSalePrice || 0, // Set to 0 if no sale price
      Description: productDescription,
      DesignFor: productDesignFor,
      FabTech: productFabTech,
      SizeChart:productSizeChart,
      Fitment: productFitment,
      Type: productType,
      Gender: productGender,
      Series: productSeries,
     // Features1: productFeatures1,
     // Features2: productFeatures2,
     // Features3: productFeatures3,
     // Features1label: productFeatures1label,
     // Features2label: productFeatures2label,
     // Features3label: productFeatures3label,
Colors: productColors.length > 0 && availableSizes.length > 0
  ? productColors.reduce((acc, color) => {
      const productLabel = color.match(/=\d+/)?.[0].replace('=', '');
      const colorName = color.split('=')[0].trim();

      // Build size stock first
      const sizeStocks = availableSizes.reduce((sizeAcc, size) => {
        sizeAcc[size] = 5; // Default stock
        return sizeAcc;
      }, {});

      // Then add Label at the end
      acc[colorName] = {
        ...sizeStocks,
        Label: parseInt(productLabel),
      };

      return acc;
    }, {})
  : {},
      Images: productImageLinks,
      Thumbnail: productThumbnails,
      PriceCard: productPriceCard,
    };

    // Send POST request to the Cloudflare Worker to update the KV storage
    const response = await fetch('https://my-product-api.stats-webdev.workers.dev/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      setProducts([...products, newProduct]); // Add the new product to the products list
      setProductName('');
      setProductPrice('');
      setProductSalePrice(0); // Reset sale price to 0
      setProductDescription('');
      setProductDesignFor('');
      setProductFabTech('');
      setProductColors([]);
      setProductImageLinks({});
      setProductThumbnails([]);
      setProductPriceCard('');
      setProductID('');
      setMessage('Product added successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Failed to add product');
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this product?');
  
    if (confirmation) {
      try {
        // Send DELETE request to the correct Cloudflare Worker endpoint
        const response = await fetch(`https://my-product-api.stats-webdev.workers.dev/delete-product`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json', // Ensure the correct content type
          },
          body: JSON.stringify({ productID: id }), // Send the product ID as part of the request body
        });
  
        const responseText = await response.text(); // Get the response text first
  
        if (response.ok) {
          setProducts(products.filter((product) => product.ID !== id)); // Remove deleted product from state
          setMessage('Product deleted successfully!');
          setTimeout(() => setMessage(''), 3000);
        } else {
          // Try to parse the response as JSON if possible
          try {
            const errorData = JSON.parse(responseText);
            setMessage(`Failed to delete product: ${errorData.message || 'Unknown error'}`);
          } catch (e) {
            // If not JSON, treat the response as plain text
            setMessage(`Failed to delete product: ${responseText}`);
          }
          setTimeout(() => setMessage(''), 3000);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        setMessage('Error deleting product');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setProductDesignFor((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value); // Uncheck the box
      } else {
        return [...prev, value]; // Check the box
      }
    });
  };
  

  return (
    <div>
      {message && <div className="notification">{message}</div>}

      <form className="add-product-form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            value={productID}
            onChange={(e) => setProductID(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Product Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Sale Price (optional):</label>
          <input
            type="number"
            value={productSalePrice}
            onChange={(e) => setProductSalePrice(e.target.value || 0)} // Set to 0 if empty
          />
        </div>

        <div>
          <label>Product Description:</label>
          <input
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div>
  <label>Product DesignFor:</label>
  <div>
    <label>
      <input
        type="checkbox"
        value="BL - Base Layer - Next-to-Skin Comfort"
        onChange={(e) => handleCheckboxChange(e)}
        checked={productDesignFor.includes("BL - Base Layer - Next-to-Skin Comfort")}
      />
      BL - Base Layer - Next-to-Skin Comfort
    </label>
    <label>
      <input
        type="checkbox"
        value="COB - Condition Black - Advance Apparel Designs with multiple utilitarian Properties"
        onChange={(e) => handleCheckboxChange(e)}
        checked={productDesignFor.includes("COB - Condition Black - Advance Apparel Designs with multiple utilitarian Properties")}
      />
      COB - Condition Black - Advance Apparel Designs with multiple utilitarian Properties
    </label>
    <label>
      <input
        type="checkbox"
        value="EVU - Everyday - Advance technical apparel for everyday use"
        onChange={(e) => handleCheckboxChange(e)}
        checked={productDesignFor.includes("EVU - Everyday - Advance technical apparel for everyday use")}
      />
      EVU - Everyday - Advance technical apparel for everyday use
    </label>
    <label>
      <input
        type="checkbox"
        value="PRF - High intensity - Engineered for high performance activities"
        onChange={(e) => handleCheckboxChange(e)}
        checked={productDesignFor.includes("PRF - High intensity - Engineered for high performance activities")}
      />
      PRF - High intensity - Engineered for high performance activities
    </label>
    <label>
      <input
        type="checkbox"
        value="RST - Rest Day - For Restful Moments"
        onChange={(e) => handleCheckboxChange(e)}
        checked={productDesignFor.includes("RST - Rest Day - For Restful Moments")}
      />
      RST - Rest Day - For Restful Moments
    </label>
    <label>
      <input
        type="checkbox"
        value='SPR - Sport and Training - Constructed with advanced tech fabrics'
        onChange={(e) => handleCheckboxChange(e)}
        checked={productDesignFor.includes('SPR - Sport and Training - Constructed with advanced tech fabrics')}
      />
      SPR - Sport and Training - Constructed with advanced tech fabrics
    </label>
  </div>
</div>
<div>
  <label>Product FabTech:</label>
  <div>
    {[
      "Aerocotton", "Aeroflex", "Aeromesh", "Carbonite", "Duraflex", "Durasoft","Durasoft 2.0",
      "Flex Knit", "Light Fleece", "Membrane", "Mithril", "Mithril 2.0",
      "Tech Terry", "Tech Waffle", "Troika", "Hyla","MG Nylon","Cordura","Leather",'Warpx-Lite', 'Warpx'


    ].map((tech) => (
      <label key={tech} style={{ display: "block" }}>
        <input
          type="checkbox"
          value={tech}
          checked={productFabTech.includes(tech)}
          onChange={(e) => {
            if (e.target.checked) {
              setProductFabTech([...productFabTech, tech]);
            } else {
              setProductFabTech(productFabTech.filter((item) => item !== tech));
            }
          }}
        />
        {tech}
      </label>
    ))}
  </div>
</div>
        <div>
          <label>Product Size Chart:</label>
          <input
            type="text"
            value={productSizeChart}
            onChange={(e) => setProductSizeChart(e.target.value)}
            placeholder="Only use http or https - e.g., https://example.com/red.jpg"
            required
          />
        </div>
        <div>
          <label>Product Fitment:</label>
          <select
            type="text"
            value={productFitment}
            onChange={(e) => setProductFitment(e.target.value)}
            required
          >
            <option value="">Select Fitment</option>
            <option value="standard fit">Standard Fit</option>
            <option value="relaxed fit">Relaxed Fit</option>
            <option value="adaptive fit">Adaptive Fit</option>
          </select>
        </div>
        <div>
          <label>Product Type:</label>

         <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            required
          >
            <option value="">Select Product Type</option>
            <option value="accessories">accessories</option>
            <option value="bra">bra</option>
            <option value="bags">bags</option>
            <option value="hats & headwear">hats & headwear</option>
            <option value="long sleeves">long sleeves</option>
            <option value="pants">pants</option>
            <option value="shorts">shorts</option>
            <option value="short sleeves">short sleeves</option>
            <option value="jersey">jersey</option>
            <option value="tank tops">tank tops</option>
          </select>
        </div>
        <div>
          <label>Product Gender:</label>
          <select
            value={productGender}
            onChange={(e) => setProductGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Mens">Mens</option>
            <option value="Womens">Womens</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        <div>
          <label>Product Series:</label>
          <input
            type="text"
            value={productSeries}
            onChange={(e) => setProductSeries(e.target.value)}
            placeholder='e.g., membrane, active...'
            required
          />
        </div>
         {/*
        <div>
          <label>Product Features1:</label>
          <input
            type="text"
            value={productFeatures1}
            onChange={(e) => setProductFeatures1(e.target.value)}
            placeholder='Feature img link 1'
            required
          />
        </div>
        <div>
          <label>Product Features2:</label>
          <input
            type="text"
            value={productFeatures2}
            onChange={(e) => setProductFeatures2(e.target.value)}
            placeholder='Feature img link 2'
            required
          />
        </div>
        <div>
          <label>Product Features3:</label>
          <input
            type="text"
            value={productFeatures3}
            onChange={(e) => setProductFeatures3(e.target.value)}
            placeholder='Feature img link 3'
            required
          />
        </div>
  <div>

          <label>Product Features Label 1:</label>
          <input
            type="text"
            value={productFeatures1label}
            onChange={(e) => setProductFeatures1label(e.target.value)}
            placeholder='Feature1 label'
            required
          />
        </div>
        <div>
          <label>Product Features Label 2:</label>
          <input
            type="text"
            value={productFeatures2label}
            onChange={(e) => setProductFeatures2label(e.target.value)}
            placeholder='Feature2 label'
            required
          />
        </div>
        <div>
          <label>Product Features Label 3:</label>
          <input
            type="text"
            value={productFeatures3label}
            onChange={(e) => setProductFeatures3label(e.target.value)}
            placeholder='Feature3 label'
            required
          />
        </div> */}
        <div>
  <label>Available Sizes:</label>
  <div style={{display:'flex'}}>
    {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
      <label key={size} style={{ marginRight: '10px' }}>
        <input
          type="checkbox"
          value={size}
          checked={availableSizes.includes(size)}
          onChange={(e) => {
            if (e.target.checked) {
              setAvailableSizes([...availableSizes, size]);
            } else {
              setAvailableSizes(availableSizes.filter((s) => s !== size));
            }
          }}
        />
        {size}
      </label>
    ))}
  </div>
</div>
        <div>
          <label>Colors (comma-separated):</label>
          <input
            type="text"
            placeholder="e.g.,RED=1, BLUE=2, GREEN (=1 means best seller, 2 onsale, 3 limited stocks, 4 new stocks, 5 few stocks)"
            value={productColors.join(',')}
            onChange={handleProductColorsChange}
            required
          />
        </div>

        <div>
          <label>Image Links (comma-separated for each color):</label>
          <input
            type="text"
            placeholder="e.g., red=https://example.com/red.jpg, blue=https://example.com/blue.jpg"
            onChange={handleProductImageLinksChange}
            required
          />
        </div>

        <div>
          <label>Thumbnails (comma-separated for each Thumbnail and dash for each color):</label>
          <input
            type="text"
            placeholder="e.g., red=https://example.com/red1.jpg, https://example.com/red2.jpg - blue=https://example.com/blue1.jpg, https://example.com/blue2.jpg"
            onChange={handleProductThumbnailsChange}
            required
          />
        </div>

        <div>
          <label>Size Card Image URL:</label>
          <input
            type="text"
            value={productPriceCard}
            onChange={(e) => setProductPriceCard(e.target.value)}
            required
          />
        </div>

        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>


    </div>
  );
}

export default AddProductForm;