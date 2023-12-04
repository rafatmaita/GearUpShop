import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Products');
      setProducts(response.data);
    } catch (error) {
      console.error('حدث خطأ في جلب البيانات:', error);
    }
  };

  const handleSave = async (productId) => {
    try {
      await axios.put(`http://localhost:8000/Products/${productId}`, /* بيانات التحديث */);
      fetchData();
    } catch (error) {
      console.error('حدث خطأ في عملية الحفظ:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/Products/${productId}`);
      fetchData();
    } catch (error) {
      console.error('حدث خطأ في عملية الحذف:', error);
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex">
        <h1 className="text-3xl">Products</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Product Name</th>
              <th className="text-left p-3 px-5">Price</th>
              <th className="text-left p-3 px-5">Category</th>
              <th />
            </tr>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-orange-100 bg-gray-100">
                  <td className="p-3 px-5">
                    <input
                      type="text"
                      value={product.name}
                      className="bg-transparent"
                      readOnly
                    />
                  </td>
                  <td className="p-3 px-5">
                    <input
                      type="text"
                      value={product.price}
                      className="bg-transparent"
                      readOnly
                    />
                  </td>
                  <td className="p-3 px-5">
                    <input
                      type="text"
                      value={product.type}
                      className="bg-transparent"
                      readOnly
                    />
                  </td>
                  <td className="p-3 px-5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSave(product.id)}
                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
