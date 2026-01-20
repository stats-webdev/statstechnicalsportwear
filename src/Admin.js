import React, { useState, useEffect } from 'react';
import './Admin.css';  // Import the CSS file

function Admin() {
  const [productID, setProductID] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");
  const [stock, setStock] = useState(null);
  const [products, setProducts] = useState([]); // State to store fetched product data
  const [productThumbnails, setProductThumbnails] = useState({});
  const [newThumbnailURL, setNewThumbnailURL] = useState("");

  // Fetch all product data on component mount
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

  const handleStockChange = (productID, color, size, newStock) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.ID === productID) {
          const updatedColors = { ...product.Colors };
          updatedColors[color] = { ...updatedColors[color], [size]: newStock };
          return { ...product, Colors: updatedColors };
        }
        return product;
      })
    );
  };

  const handleSaveSalePrice = async (productID, newPrice) => {
    const url = new URL("https://my-product-api.stats-webdev.workers.dev");
    url.searchParams.append("id", "1");
    url.searchParams.append("productID", productID);
    url.searchParams.append("action", "updatePrice");
    url.searchParams.append("price", newPrice);

    try {
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        setMessage("Sale price updated successfully!");
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.ID === productID
              ? { ...product, SalePrice: newPrice }
              : product
          )
        );
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error updating sale price");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating sale price:", error);
      setMessage("An error occurred while updating the sale price.");
    }
  };

  const handleSaveStock = async (productID, color, sizes) => {
    // Loop through each size and save it to the API
    for (let size in sizes) {
      const newStock = sizes[size];
      const url = new URL("https://my-product-api.stats-webdev.workers.dev");
      url.searchParams.append("id", "1");
      url.searchParams.append("productID", productID);
      url.searchParams.append("color", color);
      url.searchParams.append("sizes", size);
      url.searchParams.append("quantity", newStock);
      url.searchParams.append("action", "updateStock");

      try {
        const response = await fetch(url, { method: "POST" });
        const data = await response.json();

        if (response.ok) {
          setMessage("Stock updated successfully!");
        } else {
          setMessage("Error updating stock.");
        }
      } catch (error) {
        console.error("Error updating stock:", error);
        setMessage("An error occurred while updating stock.");
      }
    }
      setTimeout(() => setMessage(""), 500);
  };

  const handleSaveAll = async (productID, color, newPrice) => {
    const sizes = products.find((product) => product.ID === productID)?.Colors[color];
    if (sizes) {
      await handleSaveStock(productID, color, sizes);
    }
  };

  return (
    <div>
      {message && <div className="notification">{message}</div>}
      {stock !== null && <p>Updated stock: {stock}</p>}
        <div className='product-data-container'>
        <nav className='product-data-nav'><h2 style={{ color: 'white', marginLeft: '15px' }}>Product Data</h2></nav>
        <div className='product-data-table-container'>
        <table className='product-data-table'>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Color</th>
              <th>Size & Stocks</th>
              <th>Save Stocks</th>
              <th>Sale Price</th>
           
            </tr>
          </thead>
          <tbody>
            {products.map((product) =>
              Object.entries(product.Colors).map(([color, sizes], index, arr) =>(
                <tr key={`${product.ID}-${color}`}>
                  <td>{product.ID}</td>
                  <td>{product.Name}</td>
                  <td>{color}</td>
                  <td>
                    {Object.entries(sizes).map(([size, stock], idx, arr) => (
                      <div key={`${color}-${size}`} style={{ display: 'inline-block'}} >
                        <span>{size}</span>
                        {idx === arr.length - 1 ? (
                          <select
                            className='label-select'
                            value={stock}
                            onChange={(e) =>
                              handleStockChange(product.ID, color, size, parseInt(e.target.value))
                            }
                          >
                            <option value="0">None</option>
                            <option value="1">Best Seller</option>
                            <option value="2">On Sale</option>
                            <option value="3">Limited Stocks</option>
                            <option value="4">New Stocks</option>
                            <option value="5">Few Stocks</option>
                            <option value="6">Pre-order</option>
                            <option value="7">Sold Out</option>
                          </select>
                        ) : (
                          <input
                            type="number"
                            value={stock}
                            onChange={(e) =>
                              handleStockChange(product.ID, color, size, e.target.value)
                            }
                          />
                        )}
                      </div>
                    ))}
                  </td>
                  <td>
                    <button
                      onClick={() => handleSaveAll(product.ID, color)}
                      className="button"
                    >
                      Save
                    </button>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={product.SalePrice || ""}
                      onChange={(e) =>
                        setProducts((prevProducts) =>
                          prevProducts.map((p) =>
                            p.ID === product.ID
                              ? { ...p, SalePrice: e.target.value }
                              : p
                          )
                        )
                      }
                    />
                    <button
                      onClick={() => handleSaveSalePrice(product.ID, product.SalePrice)}
                      className="button"
                    >
                      Save
                    </button>
                  </td>
                  
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Admin;
