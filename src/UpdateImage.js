import React, { useState, useEffect } from "react";

function UpdateImage() {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  const handleSaveImage = async (productID, newImage) => {
    const url = new URL("https://my-product-api.stats-webdev.workers.dev");
    url.searchParams.append("id", "1"); // Modify this as needed.
    url.searchParams.append("productID", productID);
    url.searchParams.append("action", "updateImage");
    url.searchParams.append("Images", newImage);

    try {
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        setMessage("Image updated successfully!");
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.ID === productID
              ? { ...product, Images: newImage }
              : product 
          )
        );
        
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`Error updating: ${data.message || "Unknown error"}`);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating Image:", error);
      setMessage("An error occurred while updating the Image.");
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
      <h2>Update Image</h2>
      {message && <p className="notification">{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Image</th>
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
                  value={product.Images[Object.keys(product.Images)[0]] || ""}
                  onChange={(e) =>
                    setProducts((prevProducts) =>
                      prevProducts.map((p) =>
                        p.ID === product.ID
                          ? { ...p, Images: e.target.value }
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
                    handleSaveImage(product.ID, product.Image)
                  }
                >
                  Save Image
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UpdateImage;
