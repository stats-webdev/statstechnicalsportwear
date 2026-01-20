import React, { useState, useEffect } from "react";

function UpdateProductType() {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  const handleSaveProductType = async (productID, newType) => {
    const url = new URL("https://my-product-api.stats-webdev.workers.dev");
    url.searchParams.append("id", "1"); // Modify this as needed.
    url.searchParams.append("productID", productID);
    url.searchParams.append("action", "updateProductType");
    url.searchParams.append("Type", newType);

    try {
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        setMessage("Product type updated successfully!");
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.ID === productID
              ? { ...product, Type: newType }
              : product
          )
        );
      } else {
        setMessage(`Error updating: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating product type:", error);
      setMessage("An error occurred while updating the product type.");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://my-product-api.stats-webdev.workers.dev/?id=1"
        );
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {message && <p className="notification">{message}</p>}
      <div className="product-data-container">
        <nav className="product-data-nav">
          <h2 style={{ color: "white", marginLeft: "15px" }}>Product Types</h2>
        </nav>
        <div className="product-data-table-container">
          <table className="product-data-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Type</th>
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
                      value={product.Type || ""}
                      onChange={(e) =>
                        setProducts((prevProducts) =>
                          prevProducts.map((p) =>
                            p.ID === product.ID
                              ? { ...p, Type: e.target.value }
                              : p
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="button"
                      onClick={() =>
                        handleSaveProductType(product.ID, product.Type)
                      }
                    >
                      Save Type
                    </button>
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

export default UpdateProductType;
