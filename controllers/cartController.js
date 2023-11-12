const cartModel = require('../model/cartModel');

const addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    const data = await cartModel.addToCart(user_id, product_id, quantity);
    res.status(200).json({ message: 'Product added to cart successfully', data });
  } catch (error) {
    console.error('Error adding product to cart: ', error);
    res.status(500).json({ error: 'Error adding product to cart' });
  }
};

const getUserCartWithImages = async (req, res) => {
  const userId = req.params.userId;

  try {
    const data = await cartModel.getUserCartWithImages(userId);
    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching user cart with images: ', error);
    res.status(500).json({ error: 'Error fetching user cart with images' });
  }
};
const deleteCart = async (req, res) => {
  // const user_id = req.params.user_id;
  const cart_id = req.params.cart_id;

  try {
    const deletedCartItem = await cartModel.deleteCart( cart_id);

    if (deletedCartItem) {
      res.status(200).json({ message: 'Item removed from cart successfully', data:deletedCartItem });
    } else {
      res.status(404).json({ error: 'Cart item not found' });
    }
  } catch (error) {
    console.error('Error deleting cart item: ', error);
    res.status(500).json({ error: 'Error deleting cart item' });
  }
};

module.exports = {
  addToCart,
  getUserCartWithImages,
  deleteCart,
};
