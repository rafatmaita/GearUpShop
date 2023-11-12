// controllers/productController.js
const path = require('path');
const multer = require('multer');
const productModel = require('../model/productImageModel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

async function uploadImage(req, res) {
  try {
    if (req.file) {
      const product_id = req.params.product_id;

      const imageResult = await productModel.uploadImage(product_id, req.file.path);

      res.send('File uploaded and associated with the user in the database');
    } else {
      res.status(400).send('No file uploaded');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred while uploading the file');
  }
}

async function getImageUrl(req, res) {
  try {
    const product_id = req.params.product_id;

    const imageUrl = await productModel.getImageUrl(product_id);

    if (imageUrl) {
      res.json({ image_url: imageUrl });
    } else {
      res.status(404).send('Image not found for this user');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching image');
  }
}

module.exports = { uploadImage, getImageUrl };
