import React from 'react'
import Product from './Product'
function ProductsList({addToCart}) {

    const products = [
        {ID: '1', Name: 'Product 1', Price: '1650' },
        {ID: '2', Name: 'Product 2', Price: '1650' },
        {ID: '3', Name: 'Product 3', Price: '1650' }
    ]

  return (
    <div>
       <div>
       {products.map(product => (
        <Product key={product.ID} product={product} addToCart={addToCart}/>
       ))}
       </div> 
    </div>
  )
}

export default ProductsList