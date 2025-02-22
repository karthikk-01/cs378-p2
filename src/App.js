import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// MenuItem Component
const MenuItem = ({ title, description, imageName, price, quantity, onAdd, onRemove }) => {
  return (
    <div className="menu-item">
      <img src={`./images/${imageName}`} alt={title} className="item-image" />
      <h2>{title}</h2>
      <p className="item-description">{description}</p>
      <div className="price-container">
        <span className="price">${price}</span>
        <div>
          {quantity > 0 && (
            <>
              <button className="add-btn me-2" onClick={onRemove}>-</button>
              <span className="quantity mx-2">{quantity}</span>
            </>
          )}
          <button className="add-btn" onClick={onAdd}>
            {quantity === 0 ? 'Add' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Menu data
const menuItems = [
  {
    id: 1,
    title: 'Gyoza',
    description: 'Japanese dumplings',
    imageName: 'gyoza.png',
    price: 5.99,
  },
  {
    id: 2,
    title: 'Sushi',
    description: 'Japanese rice rolls',
    imageName: 'sushi.png',
    price: 6.99,
  },
  {
    id: 3,
    title: 'Ramen',
    description: 'Japanese noodle soup',
    imageName: 'ramen.png',
    price: 7.99,
  },
  {
    id: 4,
    title: 'Matcha Cake',
    description: 'Japanese green tea cake',
    imageName: 'matcha-cake.png',
    price: 4.99,
  },
  {
    id: 5,
    title: 'Mochi',
    description: 'Japanese rice cake',
    imageName: 'mochi.png',
    price: 3.99,
  },
  {
    id: 6,
    title: 'Yakitori',
    description: 'Japanese skewered chicken',
    imageName: 'yakitori.png',
    price: 2.99,
  },
  {
    id: 7,
    title: 'Takoyaki',
    description: 'Japanese octopus balls',
    imageName: 'takoyaki.png',
    price: 5.99,
  },
  {
    id: 8,
    title: 'Sashimi',
    description: 'Japanese raw fish',
    imageName: 'sashimi.png',
    price: 8.99,
  },
  {
    id: 9,
    title: 'Okonomiyaki',
    description: 'Japanese savory pancake',
    imageName: 'okonomiyaki.png',
    price: 6.99,
  },
  {
    id: 10,
    title: 'Katsu Curry',
    description: 'Japanese curry with fried pork',
    imageName: 'katsu-curry.png',
    price: 9.99,
  }
];

function App() {
  const [cart, setCart] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);

  const addToCart = (itemId) => {
    setCart(prevCart => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
    setShowReceipt(false);
  };

  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(item => item.id === parseInt(itemId));
      return total + (item.price * quantity);
    }, 0);
  };

  const handleOrder = () => {
    if (Object.keys(cart).length > 0) {
      setShowReceipt(true);
    }
  };

  return (
    <div className="container">
      <header className="text-center my-5">
        <h1 className="main-title">Japanese Cuisine</h1>
        <p className="fancy-text">Authentic Japanese Flavors</p>
      </header>

      <div className="cart-summary mb-4">
        <span className="price me-3">Total: ${calculateTotal().toFixed(2)}</span>
        <button 
          className="add-btn me-2"
          onClick={handleOrder}
          disabled={Object.keys(cart).length === 0}
        >
          Order
        </button>
        <button 
          className="add-btn"
          onClick={clearCart}
          disabled={Object.keys(cart).length === 0}
        >
          Clear All
        </button>
      </div>
      
      {showReceipt && (
        <div className="receipt mb-4">
          <h3>Order Summary</h3>
          {Object.entries(cart).map(([itemId, quantity]) => {
            const item = menuItems.find(item => item.id === parseInt(itemId));
            return (
              <div key={itemId} className="receipt-item">
                <span>{item.title} x {quantity}</span>
                <span className="price">${(item.price * quantity).toFixed(2)}</span>
              </div>
            );
          })}
          <div className="receipt-total">
            <strong>Total: ${calculateTotal().toFixed(2)}</strong>
          </div>
        </div>
      )}

      <div className="menu-items">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            title={item.title}
            description={item.description}
            imageName={item.imageName}
            price={item.price}
            quantity={cart[item.id] || 0}
            onAdd={() => addToCart(item.id)}
            onRemove={() => removeFromCart(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;