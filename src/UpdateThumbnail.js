import React, { useState, useEffect } from 'react';
import './Admin.css';  // Import the CSS file

function UpdateThumbnail() {
  const [productID, setProductID] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");
  const [stock, setStock] = useState(null);
  const [products, setProducts] = useState([]); // State to store fetched product data
  const [productThumbnails, setProductThumbnails] = useState({});
 const [newThumbnailURLs, setNewThumbnailURLs] = useState({});


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

  
  const handleThumbnailChange = async (productID, color, index, newThumbnail) => {
    const url = new URL("https://my-product-api.stats-webdev.workers.dev");
    url.searchParams.append("id", "1");
    url.searchParams.append("productID", productID);
    url.searchParams.append("action", "updateThumbnail");
    url.searchParams.append("color", color);
    url.searchParams.append("index", index);
    url.searchParams.append("newURL", newThumbnail);
  
    try {
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();
  
      if (response.ok) {
        setMessage("Thumbnail updated successfully!");
        // Optionally update the product data in the state to reflect the change
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.ID === productID
              ? {
                  ...product,
                  Thumbnail: {
                    ...product.Thumbnail,
                    [color]: data.thumbnail, // Update the thumbnail for the given color
                  },
                }
              : product
          )
        );
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error updating thumbnail.");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating thumbnail:", error);
      setMessage("An error occurred while updating the thumbnail.");
      setTimeout(() => setMessage(""), 3000);
    }
  };
  const handleAddThumbnail = async (productID, color, newThumbnailURL) => {
    const url = new URL("https://my-product-api.stats-webdev.workers.dev");
    url.searchParams.append("id", "1");
    url.searchParams.append("productID", productID);
    url.searchParams.append("action", "addThumbnail");
    url.searchParams.append("color", color);
    url.searchParams.append("newURL", newThumbnailURL);
  
    if (!productID || !newThumbnailURL || !color) {
      setMessage("Please provide a valid product ID, color, and thumbnail URL.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
  
    try {
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();
  
      if (response.ok) {
        // Update the product list with the new thumbnail
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.ID === productID
              ? {
                  ...product,
                  Thumbnail: {
                    ...product.Thumbnail,
                    [color]: [
                      ...(product.Thumbnail[color] || []), // Ensure previous thumbnails are included
                      newThumbnailURL, // Add the new thumbnail URL
                    ],
                  },
                }
              : product
          )
        );
        setNewThumbnailURLs(""); // Clear the input field
        setMessage("Thumbnail added successfully!");
        setNewThumbnailURLs((prev) => {
  const updated = { ...prev };
  delete updated[`${productID}-${color}`];
  return updated;
});

        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to add thumbnail.");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding thumbnail:", error);
      setMessage("An error occurred while adding the thumbnail.");
      setTimeout(() => setMessage(""), 3000);
    }
  };
const handleDeleteThumbnail = async (productID, color, index) => {
  const url = new URL("https://my-product-api.stats-webdev.workers.dev");
  url.searchParams.append("id", "1");
  url.searchParams.append("productID", productID);
  url.searchParams.append("action", "deleteThumbnail");
  url.searchParams.append("color", color);
  url.searchParams.append("index", index);

  try {
    const response = await fetch(url, { method: "POST" });
    const data = await response.json();

    if (response.ok) {
      setMessage("Thumbnail deleted successfully!");
      // Update local product state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.ID === productID
            ? {
                ...product,
                Thumbnail: {
                  ...product.Thumbnail,
                  [color]: product.Thumbnail[color].filter((_, i) => i !== index),
                },
              }
            : product
        )
      );
    } else {
      setMessage("Failed to delete thumbnail.");
    }
  } catch (error) {
    console.error("Error deleting thumbnail:", error);
    setMessage("An error occurred while deleting the thumbnail.");
  } finally {
    setTimeout(() => setMessage(""), 3000);
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
            {/* <th>Image</th> */}
            <th>Thumbnails</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product) =>
    Object.entries(product.Colors).map(([color, sizes]) => (
      <tr key={`${product.ID}-${color}`}>
                  <td>{product.ID}</td>
                  <td>{product.Name}</td>
                  <td>{color}</td>
                  {/* <td>{product.Images[Object.keys(product.Images)[0]]}</td> */}
                  <td>
  {color &&
    product.Thumbnail[color]?.map((thumbnail, index) => (
      <div key={index}>
        <label>
          Thumbnail {index + 1}:
          <input
            type="text"
            value={thumbnail}
            onChange={(e) =>
              setProducts((prevProducts) =>
                prevProducts.map((p) =>
                  p.ID === product.ID
                    ? {
                        ...p,
                        Thumbnail: {
                          ...p.Thumbnail,
                          [color]: p.Thumbnail[color].map((t, i) =>
                            i === index ? e.target.value : t
                          ),
                        },
                      }
                    : p
                )
              )
            }
          />
        </label>
        <button
          onClick={() =>
            handleThumbnailChange(product.ID, color, index, thumbnail) // Save updated thumbnail
          }
          className="button"
        >
          Save Thumbnail
        </button>
        <button
  onClick={() => handleDeleteThumbnail(product.ID, color, index)}
  className="button"
>
  Delete
</button>
      </div>
      
    ))}

  {/* Input for adding a new thumbnail */}
  <div>
                      <label>
                      New Thumbnail:
                        <input
                          type="text"
                         value={newThumbnailURLs[`${product.ID}-${color}`] || ""}
onChange={(e) =>
  setNewThumbnailURLs((prev) => ({
    ...prev,
    [`${product.ID}-${color}`]: e.target.value,
  }))
}
                        />
                      </label>
                      <button
                        onClick={() =>
  handleAddThumbnail(
    product.ID,
    color,
    newThumbnailURLs[`${product.ID}-${color}`] || ""
  )
}
                        className="button"
                      >
                        Add Thumbnail
                      </button>
                    </div>
</td>
                 
                 
                
                </tr>
              ))
            )
          }
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
}

export default UpdateThumbnail;
