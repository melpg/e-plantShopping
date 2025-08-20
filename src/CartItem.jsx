import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';



const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
    .reduce((total, item) => {
      const cost = Number(item.cost) || 0;  // Ensure cost is a number
      const quantity = Number(item.quantity) || 0;  // Ensure quantity is a number
      return total + cost * quantity;
    }, 0)
    .toFixed(2);
  };

  const handleContinueShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

const handleCheckout=(e)=>{
  alert('Functionality to be added for future reference, continue shopping');
}

  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1;
  dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
  };

  const handleDecrement = (item) => {
    const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
  dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
   
  };

  const handleRemove = (item) => {
    dispatch(removeItem({name: item.name}))
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = Number(item.cost) || 0;
  const quantity = Number(item.quantity) || 0;
  return (cost * quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: Rs{calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: Rs{calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>Grand Total: Rs{calculateTotalAmount()}</div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckout(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


