import React, { useState, useEffect } from "react";

function UpdateSizeChart() {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  const handleSaveSizeChart = async (productID, newSizeChart) => {
    const url = new URL("https://my-product-api.stats-webdev.workers.dev");
    url.searchParams.append("id", "1"); // Modify this as needed.
    url.searchParams.append("productID", productID);
    url.searchParams.append("action", "updateSizeChart");
    url.searchParams.append("SizeChart", newSizeChart);

    try {
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        setMessage("Size chart updated successfully!");
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.ID === productID
              ? { ...product, SizeChart: newSizeChart }
              : product 
          )
        );
        
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`Error updating: ${data.message || "Unknown error"}`);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating size chart:", error);
      setMessage("An error occurred while updating the size chart.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleSavePriceCard = async (productID, newPriceCard) => {
    const url = new URL("https://my-product-api.stats-webdev.workers.dev");
    url.searchParams.append("id", "1"); // Modify this as needed.
    url.searchParams.append("productID", productID);
    url.searchParams.append("action", "updatePriceCard");
    url.searchParams.append("PriceCard", newPriceCard);

    try {
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        setMessage("Price Card updated successfully!");
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.ID === productID
              ? { ...product, PriceCard: newPriceCard }
              : product 
          )
        );
        
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`Error updating: ${data.message || "Unknown error"}`);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating Price Card:", error);
      setMessage("An error occurred while updating the Price Card.");
      setTimeout(() => setMessage(""), 3000);
    }
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
        setProducts(data); // Save product data to state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {message && <p className="notification">{message}</p>}
      <div className='product-data-container'>
        <nav className='product-data-nav'><h2 style={{ color: 'white', marginLeft: '15px' }}>Product Data</h2></nav>
        <div className='product-data-table-container'>
        <table className='product-data-table'>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Size Chart</th>
            <th>Size Card</th>
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
                  value={product.SizeChart || ""}
                  onChange={(e) =>
                    setProducts((prevProducts) =>
                      prevProducts.map((p) =>
                        p.ID === product.ID
                          ? { ...p, SizeChart: e.target.value }
                          : p
                      )
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={product.PriceCard || "" }
                  onChange={(e) =>
                    setProducts((prevProducts) =>
                      prevProducts.map((p) =>
                        p.ID === product.ID
                          ? { ...p, PriceCard: e.target.value }
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
                    handleSaveSizeChart(product.ID, product.SizeChart)
                  }
                >
                  Save Size Chart
                </button>
                <button
                  className="button"
                  onClick={() =>
                    handleSavePriceCard(product.ID, product.PriceCard)
                  }
                >
                  Save Size Card
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

export default UpdateSizeChart;
