// MenuItem.js
import React from 'react';

const MenuItem = ({ title, description, imageName, price }) => {
  return (
    <div className="menu-item">
      <div className="row g-4">
        <div className="col-4">
          <img 
            src={`/images/${imageName}`} 
            alt={title} 
            className="item-image"
          />
        </div>
        <div className="col-8">
          <h2>{title}</h2>
          <p className="item-description">{description}</p>
          <div className="price-container">
            <span className="price">${price.toFixed(2)}</span>
            <button className="add-btn">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;