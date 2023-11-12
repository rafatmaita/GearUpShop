// models/commentModel.js
const pool = require('../db'); // Your PostgreSQL database connection

const addComment = async (name, email, message) => {
  try {
    const addCommentQuery = `
      INSERT INTO contact_us (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    
    const values = [name, email, message];
    const { rows } = await pool.query(addCommentQuery, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const getAllComments = async () => {
  try {
    const getAllCommentsQuery = `
      SELECT * FROM contact_us;
    `;
    
    const { rows } = await pool.query(getAllCommentsQuery);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = { addComment ,getAllComments };
