import React from 'react';

function Product({ product, addToCart }) {
  return (
    <div>
        <h3>{product.Name}</h3><p>₱{product.Price}</p> 
        <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default Product;
