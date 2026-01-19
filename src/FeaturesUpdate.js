import React, { useState, useEffect } from "react";
import "./Admin.css";

function FeaturesUpdate() {
  const [products, setProducts] = useState([]);
  const [editedProducts, setEditedProducts] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://my-product-api.stats-webdev.workers.dev/?id=1");
        if (!response.ok) throw new Error(`Error fetching products: ${response.statusText}`);
        
        const data = await response.json();
        setProducts(data);
        setEditedProducts(data.reduce((acc, product) => {
          acc[product.ID] = { ...product };
          return acc;
        }, {}));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (productID, field, value) => {
    setEditedProducts((prev) => ({
      ...prev,
      [productID]: { ...prev[productID], [field]: value },
    }));
  };

  const handleSaveFeature = async (productID) => {
    const updatedProduct = editedProducts[productID];
    const url = new URL("https://my-product-api.stats-webdev.workers.dev");
    url.searchParams.append("id", "1");
    url.searchParams.append("productID", productID);
    url.searchParams.append("action", "updateFeature");

    // Ensure empty values are sent properly
    url.searchParams.append("Feature1", updatedProduct.Features1?.trim() !== "" ? updatedProduct.Features1 : " ");
    url.searchParams.append("Feature2", updatedProduct.Features2?.trim() !== "" ? updatedProduct.Features2 : " ");
    url.searchParams.append("Feature3", updatedProduct.Features3?.trim() !== "" ? updatedProduct.Features3 : " ");
    url.searchParams.append("Feature1label", updatedProduct.Features1label?.trim() !== "" ? updatedProduct.Features1label : " ");
    url.searchParams.append("Feature2label", updatedProduct.Features2label?.trim() !== "" ? updatedProduct.Features2label : " ");
    url.searchParams.append("Feature3label", updatedProduct.Features3label?.trim() !== "" ? updatedProduct.Features3label : " ");

    console.log("Sending Data:", updatedProduct); // Debugging log

    try {
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        setMessage("Data updated successfully!");
        
        // Ensure UI updates correctly after saving
        setProducts((prev) =>
          prev.map((p) => (p.ID === productID ? { ...p, ...updatedProduct } : p))
        );

        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error updating");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating Features:", error);
      setMessage("An error occurred while updating.");
    }
  };

  return (
    <div>
      {message && <div className="notification">{message}</div>}
      <div className='product-data-container'style={{ color: 'white', marginLeft: '15px' }}>
        <nav className='product-data-nav'><h2 style={{ color: 'white', marginLeft: '15px' }}>Product Data</h2></nav>
        <div className='product-data-table-container'>
        <table className='product-data-table'>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Feature 1</th>
            <th>Feature 2</th>
            <th>Feature 3</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.ID}>
              <td>{product.ID}</td>
              <td>{product.Name}</td>
              <td>
                <input
                  type="text"
                  placeholder="Feature 1 Value"
                  value={editedProducts[product.ID]?.Features1 || ""}
                  onChange={(e) => handleInputChange(product.ID, "Features1", e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="Feature 1 Label"
                  value={editedProducts[product.ID]?.Features1label || ""}
                  onChange={(e) => handleInputChange(product.ID, "Features1label", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Feature 2 Value"
                  value={editedProducts[product.ID]?.Features2 || ""}
                  onChange={(e) => handleInputChange(product.ID, "Features2", e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="Feature 2 Label"
                  value={editedProducts[product.ID]?.Features2label || ""}
                  onChange={(e) => handleInputChange(product.ID, "Features2label", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Feature 3 Value"
                  value={editedProducts[product.ID]?.Features3 || ""}
                  onChange={(e) => handleInputChange(product.ID, "Features3", e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="Feature 3 Label"
                  value={editedProducts[product.ID]?.Features3label || ""}
                  onChange={(e) => handleInputChange(product.ID, "Features3label", e.target.value)}
                />
              </td>
              <td>
                <button className="button" onClick={() => handleSaveFeature(product.ID)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
    </div>
    </div>
  );
}

export default FeaturesUpdate;
