const pool = require('../db');

const addToCart = async (user_id, product_id, quantity) => {
  try {
    const addToCartQuery = `
      INSERT INTO carts (user_id, product_id, quantity) 
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    
    const values = [user_id, product_id, quantity];
    const { rows } = await pool.query(addToCartQuery, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const getUserCartWithImages = async (userId) => {
  try {
    const getCartQuery = `
      SELECT p.product_name, p.description, p.price, p.product_id,c.cart_id ,c.quantity
      FROM carts c
      INNER JOIN products p ON c.product_id = p.product_id
      
      WHERE c.user_id = $1;
    `;

    const { rows } = await pool.query(getCartQuery, [userId]);
    return rows;
  } catch (error) {
    throw error;
  }
};
const deleteCart = async (cart_id) => {
  try {
    const deleteCartQuery = `
         DELETE FROM carts 
         WHERE cart_id = $1;
    `;
    
    const { rows } = await pool.query(deleteCartQuery, [ cart_id]);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addToCart,
  getUserCartWithImages,
  deleteCart,
};
