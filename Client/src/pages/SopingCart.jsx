
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/Products');
        const defaultQuantities = {};
        response.data.forEach(item => {
          defaultQuantities[item.id] = 1;
        });
        setItemQuantities(defaultQuantities);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price) * itemQuantities[item.id], 0).toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return subtotal.toFixed(2);
  };

  const handleQuantityChange = (itemId, type) => {
    setItemQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      if (type === 'increase') {
        updatedQuantities[itemId] += 1;
      } else if (type === 'decrease' && updatedQuantities[itemId] > 1) {
        updatedQuantities[itemId] -= 1;
      }
      return updatedQuantities;
    });
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter((item) => item.id !== itemId);
      const updatedQuantities = { ...itemQuantities };
      delete updatedQuantities[itemId];
      setItemQuantities(updatedQuantities);
      return updatedCartItems;
    });
  };

  return (
    <div>
      <div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                      <th className="text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              className="h-16 w-16 mr-4"
                              src={item.image}
                              alt="Product image"
                            />
                            <span className="font-semibold">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4">${item.price}</td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <button
                              className="border rounded-md py-2 px-4 mr-2"
                              onClick={() => handleQuantityChange(item.id, 'decrease')}
                            >
                              -
                            </button>
                            <span className="text-center w-8">{itemQuantities[item.id]}</span>
                            <button
                              className="border rounded-md py-2 px-4 ml-2"
                              onClick={() => handleQuantityChange(item.id, 'increase')}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4">${(parseFloat(item.price) * itemQuantities[item.id]).toFixed(2)}</td>
                        <td className="py-4">
                          <button
                            className="border rounded-md py-2 px-4 ml-2"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal()}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${calculateTotal()}</span>
                </div>
                <Link to='/payment'>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                  Checkout
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;

