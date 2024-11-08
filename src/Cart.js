import React from 'react';

function Cart({ cart, increaseQuantity, decreaseQuantity }) {
  const totalPrice = cart.reduce((acc, item) => acc + item.Price * item.quantity, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index}>
              <p>
                {item.Name} - ₱{item.Price} x {item.quantity}
              </p>
              <p>
                Quantity: {item.quantity}{' '}
                <button onClick={() => increaseQuantity(item.ID)}>+</button>
                <button onClick={() => decreaseQuantity(item.ID)}>-</button>
              </p>
              <hr />
            </div>
          ))}
          <h3>Total: ₱{totalPrice}</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;
