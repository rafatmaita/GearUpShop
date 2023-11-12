// models/productModel.js
const pool = require('../db');

async function getAllProducts() {
    try {
        let result = await pool.query('SELECT product_id,product_name, description, price, category FROM products');
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getProductsByCategory(categoryName) {
    try {
        const query = 'SELECT * FROM products WHERE category = $1';
        const result = await pool.query(query, [categoryName]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getProductById(productId) {
    try {
        const query = 'SELECT * FROM products WHERE product_id = $1';
        // const  productId= req.params.id;
        const result = await pool.query(query, [productId]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
// Assuming productModel is your database model

// async function getProductById(req, res) {
//     try {
//         const productId = req.params.product_id; // Use the correct parameter name
//         const query = 'SELECT * FROM products WHERE product_id = $1';
//         const result = await pool.query(query, [productId]);
//         res.json(result.rows[0]); // Send the first row as the response
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to get one product' });
//     }
// }


module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductById,
};