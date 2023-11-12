// controllers/productController.js
const db =require ('../db');
const productModel = require('../model/productModel');

async function getAllProducts(req, res) {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in getting the home');
    }
}

async function getProductsByCategory(req, res) {
    try {
        const categoryName = req.params.category;
        const products = await productModel.getProductsByCategory(categoryName);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in getting products from the category');
    }
}

async function getProductById(req, res) {
    try {
        const productId = req.params.id;
        const product = await productModel.getProductById(productId);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get one product' });
    }
}


module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductById,
};