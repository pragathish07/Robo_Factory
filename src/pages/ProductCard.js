import React, { useContext, useState } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import './ProductCard.css';
import { CartContext } from './CartContext'; // Adjust the import path as necessary

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

const ProductCard = ({ product }) => {
  const { name, price, image, rating } = product;
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setAdded(true);
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <div className="product-info">
        <h3>{name}</h3>
        <p className="price">${price}</p>
        <div className="rating">{renderStars(rating)}</div>
        <div className="quantity">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className="buttons">
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? 'Added to Cart' : 'Add to Cart'}
          </button>
          <button className="buy-now-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
