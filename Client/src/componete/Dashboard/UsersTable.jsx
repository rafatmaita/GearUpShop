import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Users');
      setUsers(response.data);
    } catch (error) {
      console.error('حدث خطأ في جلب البيانات:', error);
    }
  };

  const handleSave = async (userId) => {
    try {
      await axios.put(`http://localhost:8000/Users/${userId}`, /* بيانات التحديث */);
      fetchData();
    } catch (error) {
      console.error('حدث خطأ في عملية الحفظ:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/Users/${userId}`);
      fetchData();
    } catch (error) {
      console.error('حدث خطأ في عملية الحذف:', error);
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex">
        <h1 className="text-3xl">Users</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Email</th>
              <th />
            </tr>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-orange-100 bg-gray-100">
                  <td className="p-3 px-5">
                    <input
                      type="text"
                      value={user.name}
                      className="bg-transparent"
                      readOnly
                    />
                  </td>
                  <td className="p-3 px-5">
                    <input
                      type="text"
                      value={user.email}
                      className="bg-transparent"
                      readOnly
                    />
                  </td>
                  <td className="p-3 px-5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSave(user.id)}
                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;
