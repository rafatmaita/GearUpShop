import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState({
    fullname: 'Bashar Aysar',
    email: 'example@example.com',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  });
  const [wishlist, setWishlist] = useState([]);
  const [isEditFormVisible, setEditFormVisibility] = useState(false);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile) {
      setProfile(savedProfile);
    }

    const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (savedWishlist) {
      setWishlist(savedWishlist);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleProfileEdit = () => {
    setEditFormVisibility(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setNewImage(reader.result);
      };
    }
  };

  const handleProfileSave = (updatedProfile) => {
    if (newImage) {
      updatedProfile.profileImage = newImage;
    }

    axios.post('http://localhost:8000/Users', updatedProfile)
      .then((response) => {
        setProfile(response.data);
        alert('Profile updated successfully');
        setProfile(updatedProfile);
        setEditFormVisibility(false);
      })
      .catch((error) => {
        alert('Error updating profile:', error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/favorite')
      .then((response) => {
        setWishlist(response.data);
      })
      .catch((error) => {
        console.error('Error fetching wishlist data:', error);
      });
  }, []);

  const handleRemoveFromWishlist = (itemId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== itemId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

    axios.delete(`http://localhost:3001/favorite/${itemId}`)
      .then(() => {
        alert('Item removed successfully');
      })
      .catch((error) => {
        alert('Error removing item:', error);
      });
  }

  return (
    <div className="bg-white p-6 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="relative">
              <div style={{ marginTop: '80px', marginBottom: '90px' }}>
                <img
                  src={profile.profileImage}
                  alt="Banner Image"
                  className="w-full rounded-t-lg"
                />
              </div>
              <img
                src={profile.profileImage}
                alt="Profile Picture"
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white"
              />
            </div>
            <div className="flex items-center mt-4">
              <h2 className="text-xl font-bold text-gray-800">{profile.fullname}</h2>
              <button onClick={handleProfileEdit} className="ml-2 text-blue-500 hover:underline">
                Edit Profile
              </button>
            </div>
            <p className="text-gray-700 mt-2">email: {profile.email}</p>
          </div>
        </div>
        <div className="md:col-span-2">
          {isEditFormVisible ? (
            <EditProfileForm
              profile={profile}
              onSave={handleProfileSave}
              onCancel={() => setEditFormVisibility(false)}
              onImageChange={handleImageChange}
            />
          ) : (
            <div className="bg-white p-4 mt-6 rounded-lg shadow-md">
              <div style={{ marginTop: '80px', marginBottom: '90px' }}>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Wishlist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlist.map((item) => (
                    <article key={item.id} className="rounded-xl bg-white p-3 shadow-lg hover:shadow-2xl hover:transform hover:scale-105 duration-300">
                      <a href="#">
                        <div className="relative flex items-end overflow-hidden rounded-xl">
                          <img src={item.image} alt="Product Photo" />
                          <div style={{ position: 'absolute', top: '2px', right: '2px' }}>
                            <div className="flex items-center space-x-1.8 rounded-lg bg-orange-500 px-2 py-1 text-white">
                              <svg
                                className="w-4 h-4 text-yellow-300 mr-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                              <span className="text-sm font-bold">{item.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-1 p-2">
                          <h2 className="text-slate-700">{item.name}</h2>
                          <p className="mt-1 text-sm text-slate-400">{item.subdescription}</p>
                          <div className="mt-3 flex items-end justify-between">
                            <p className="text-lg font-bold text-orange-500">{item.price}</p>
                            {/* Add to cart button */}
                            <div
                              className="flex items-center space-x-1.5 rounded-lg bg-orange-500 px-4 py-1.5 text-white duration-100 hover-bg-orange-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                              </svg>
                              <button className="text-sm">Add to cart</button>
                            </div>
                          </div>
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EditProfileForm({ profile, onSave, onCancel, onImageChange }) {
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    onSave(editedProfile);
  };

  return (
    <div className="bg-white p-4 mt-6 rounded-lg shadow-md">
      <div style={{ marginTop: '80px', marginBottom: '90px' }}></div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Profile</h3>
      <div className="mb-2">
        <label htmlFor="fullname" className="text-gray-700 font-semibold">fullName:</label>
        <input
          type="text"
          id="fullname"
          value={editedProfile.fullname}
          onChange={(e) => setEditedProfile({ ...editedProfile, fullname: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="text-gray-700 font-semibold">email:</label>
        <input
          type="text"
          id="email"
          value={editedProfile.email}
          onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="image" className="text-gray-700 font-semibold">Profile Picture:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={onImageChange}  
        />
      </div>
      <button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md mr-2">
        Save
      </button>
      <button onClick={onCancel} className="text-gray-500 py-2 px-4">Cancel</button>
    </div>
  );
}

export default Profile;
