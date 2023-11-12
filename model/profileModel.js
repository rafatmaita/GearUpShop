const pool = require('../db');

const updateUser = async (userId, username, email, password) => {
  const updateUserQuery = `
    UPDATE users
    SET username = $1, email = $2, password = $3
    WHERE user_id = $4
    RETURNING *
  `;
  const values = [username, email, password, userId];

  try {
    const updatedUser = await pool.query(updateUserQuery, values);
    return updatedUser.rows[0];
  } catch (error) {
    throw new Error('Error updating user profile');
  }
};

const getUserDetails = async (userId) => {
  const getUserDetailsQuery = `
      SELECT username, email
      FROM users
      WHERE user_id = $1
    `;
  const values = [userId];

  try {
    const user = await pool.query(getUserDetailsQuery, values);
    return user.rows[0];
  } catch (error) {
    throw new Error('Error fetching user details');
  }
};



const uploadImage = async (pool, req, user_id, imagePath) => {
  try {
    const imageResult = await pool.query(
      'INSERT INTO user_images (user_id, image_url, uploaded_at) VALUES ($1, $2, $3) RETURNING *',
      [user_id, imagePath, new Date()]
    );
    return 'File uploaded and associated with the user in the database';
  } catch (err) {
    throw err;
  }
};

const getImage = async (pool, user_id) => {
  try {
    const imageResult = await pool.query('SELECT image_url FROM user_images WHERE user_id = $1', [user_id]);
    if (imageResult.rows.length > 0) {
      return imageResult.rows[0].image_url;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};



module.exports = {
  updateUser,
  getUserDetails,
  getImage,
  uploadImage

};
