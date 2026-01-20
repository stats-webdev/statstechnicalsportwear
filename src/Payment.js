import React from 'react'

function Payment({cart }) {
    const [results, setResults] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false); // Track if the checkout is in progress
  
    const handleCheckout = async () => {
      if (isProcessing) return; // If already processing, do nothing
  
      setIsProcessing(true);
  
      const groupedCart = cart.reduce((acc, item) => {
        acc[item.ID] = acc[item.ID] || [];
        acc[item.ID].push(item);
        return acc;
      }, {});
  
      const results = [];
      for (const productId in groupedCart) {
        for (const item of groupedCart[productId]) {
          const url = new URL("https://my-product-api.stats-webdev.workers.dev");
          url.searchParams.append("id", "1");
          url.searchParams.append("productID", item.ID);
          url.searchParams.append("color", item.selectedColor);
          url.searchParams.append("sizes", item.selectedSize);
          url.searchParams.append("quantity", item.quantity); // Include quantity in the request
          url.searchParams.append("action", "purchase");
  
          try {
            const response = await fetch(url);
            const data = await response.json();
  
            if (response.ok) {
              results.push({ ...item, message: data.message, stock: data.stock });
            } else {
              results.push({ ...item, message: data.message || "Error during purchase" });
            }
          } catch (error) {
            console.error(`Error during checkout for Product ID ${item.ID}:`, error);
            results.push({ ...item, message: "An error occurred during the checkout process." });
          }
        }
      }
  
      setResults(results);
      setIsProcessing(false); // Reset processing state after all requests are complete
    };
  
    return (
      <div>
        <h1>Checkout</h1>
        <button onClick={handleCheckout} disabled={isProcessing}>Checkout</button>
  
        {results.length > 0 && (
          <div>
            <h2>Results</h2>
            {results.map((result, index) => (
              <div key={index}>
                <p>Product ID: {result.ID}</p>
                <p>Color: {result.selectedColor}</p>
                <p>Size: {result.selectedSize}</p>
                <p>Quantity: {result.quantity}</p>
                <p>Message: {result.message}</p>
                {result.stock !== undefined && <p>Updated stock: {result.stock}</p>}
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
export default Payment