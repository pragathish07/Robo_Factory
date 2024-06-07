import React, { useContext } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import './Cart.css';
import { CartContext } from './CartContext';

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} className="star" />
      ))}
      {halfStar && <FaStarHalfAlt className="star" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} className="star" />
      ))}
    </>
  );
};

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleRemoveItem = (index) => {
    removeFromCart(index);
  };

  return (
    <div className='cart-wrapper'>
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="cart-item-details">
              <img src={item.image} alt={item.name} />
              <div>
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                <div className="cart-item-rating">
                  {renderStars(item.rating)}
                </div>
              </div>
              <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button onClick={() => handleRemoveItem(index)}>Remove</button>
          </div>
        ))}
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <div className="cart-summary-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-summary-item">
                <p className="cart-summary-name">{item.name}</p>
                <p className="cart-summary-quantity">{item.quantity}</p>
                <p className="cart-summary-price">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <p className="cart-total">Total: ${getTotalPrice().toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
