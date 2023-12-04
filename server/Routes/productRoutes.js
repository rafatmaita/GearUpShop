const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const authorization = require('../middleware/authorize');

router.post('/addProduct', productController.addProduct);
router.get('/getAllProducts',authorization.authorize, productController.getAllProducts);
router.get('/getAllCartByCategory',authorization.authorize, productController.getAllCartByCategory);
router.get('/getTopSellingProducts', authorization.authorize,productController.getTopSellingProducts);
router.put('/editProduct/:productId', productController.editProduct);
router.put('/deleteProduct/:productId', productController.deleteProduct);
router.get('/getProductsWithImage',authorization.authorize, productController.getProductsWithImage);
router.put('/addOrUpdateImageUrl/:productId', productController.addOrUpdateImageUrl);
<<<<<<< HEAD
router.get('/details/:productId', productController.getProductWithImage);
=======
router.get('/details/:productId',authorization.authorize, productController.getProductWithImage);
>>>>>>> eedb2127506b69053c1bdb65881ce95bba450471



module.exports = router;
