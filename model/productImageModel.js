// models/productModel.js
const pool = require('../db'); // Replace with your actual database connection
const path = require('path');

async function uploadImage(product_id, filePath) {
  try {
    const imageResult = await pool.query(
      'INSERT INTO product_images (product_id, image_url, uploaded_at) VALUES ($1, $2, $3) RETURNING *',
      [product_id, filePath, new Date()]
    );

    return imageResult.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getImageUrl(product_id) {
  try {
    const imageResult = await pool.query(
      'SELECT image_url FROM product_images WHERE product_id = $1',
      [product_id]
    );

    if (imageResult.rows.length > 0) {
      return imageResult.rows[0].image_url;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { uploadImage, getImageUrl };
