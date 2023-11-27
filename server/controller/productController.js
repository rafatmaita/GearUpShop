const Product = require('../model/Product Model');
const Image = require('../model/Image Model');

exports.addProduct = async (req, res) => {
    try {
        const { name, title, description, price, rating, category, isDeleted, isTopSelling } = req.body;

        // Create a new product
        const newProduct = new Product({
            name,
            title,
            description,
            price,
            rating,
            category,
            isDeleted: isDeleted || false,
            isTopSelling: isTopSelling || false,
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};




exports.getAllProducts = async (req, res) => {
    try {
        // Extract pagination parameters from the query string
        const { page = 1, pageSize = 10 } = req.query;

        // Parse the parameters to integers
        const pageNumber = parseInt(page);
        const limit = parseInt(pageSize);

        // Calculate the skip value for pagination
        const skip = (pageNumber - 1) * limit;

        // Query the database with pagination
        const products = await Product.find({ isDeleted: false })
            .skip(skip)
            .limit(limit);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};




exports.getAllCartByCategory = async (req, res) => {
    try {
        const { category } = req.query;

        // Check if the category is provided
        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }

        // Query the database for items in the cart by category
        const cartItems = await Cart.find({ category });

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};





exports.getTopSellingProducts = async (req, res) => {
    try {
        // Query the database for products where isTopSelling is true
        const topSellingProducts = await Product.find({ isTopSelling: true });

        res.status(200).json(topSellingProducts);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



exports.editProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, title, description, price, rating, category, isTopSelling } = req.body;

        // Check if productId is provided
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Find the product by ID
        let product = await Product.findById(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update product properties
        product.name = name || product.name;
        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.rating = rating || product.rating;
        product.category = category || product.category;
        product.isTopSelling = isTopSelling || product.isTopSelling;

        // Save the updated product
        product = await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Check if productId is provided
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Find the product by ID
        let product = await Product.findById(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Set isDeleted to true
        product.isDeleted = true;

        // Save the updated product
        product = await product.save();

        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


exports.getProductsWithImage = async (req, res) => {
    try {
        const productsWithImage = await Product.aggregate([
            {
                $match: { isDeleted: false } // Match products that are not deleted
            },
            {
                $lookup: {
                    from: 'images', // The name of the image table
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'image'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    title: 1,
                    rating: 1,
                    price: 1,
                    'image.imageUrl': 1
                }
            }
        ]);

        res.status(200).json(productsWithImage);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.addOrUpdateImageUrl = async (req, res) => {
    try {
        const { productId } = req.params;
        const { imageUrl } = req.body;

        // Check if productId is provided
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Find the product by ID
        let product = await Product.findById(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if an image record already exists for the product
        let image = await Image.findOne({ productId });

        // If an image record exists, update the imageUrl
        if (image) {
            image.imageUrl = imageUrl;
        } else {
            // If no image record exists, create a new one
            image = new Image({
                productId,
                imageUrl
            });
        }

        // Save the image record
        image = await image.save();

        res.status(200).json({ message: "Image URL added/updated successfully", image });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
exports.getProductWithImage = async (req, res) => {
    try {
        const { productId } = req.params;

        // Check if productId is provided
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const productWithImage = await Product.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(productId), isDeleted: false }
            },
            {
                $lookup: {
                    from: 'images', // The name of the image table
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'image'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    title: 1,
                    description: 1,
                    price: 1,
                    rating: 1,
                    category: 1,
                    isTopSelling: 1,
                    'image.imageUrl': 1
                }
            }
        ]);

        if (productWithImage.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(productWithImage[0]);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
