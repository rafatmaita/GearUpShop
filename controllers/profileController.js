const userModel = require('../model/profileModel');
const pool = require('../db');

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { username, email, password } = req.body;

  try {
    const updatedUser = await userModel.updateUser(userId, username, email, password);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const user = await userModel.getUserDetails(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      // Return only the required fields (username and email)
      const { username, email } = user;
      res.json({ username, email });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  const uploadImage = async (req, res) => {
    if (req.file) {
      const user_id = req.params.user_id;
  
      try {
        const result = await userModel.uploadImage(pool, req, user_id, req.file.path);
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while uploading the file');
      }
    } else {
      res.status(400).send('No file uploaded');
    }
  };
  
  const getImage = async (req, res) => {
    const user_id = req.params.user_id;
  
    try {
      const imageUrl = await userModel.getImage(pool, user_id);
      if (imageUrl) {
        res.json({ image_url: imageUrl });
      } else {
        res.status(404).send('Image not found for this user');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching image');
    }
  };


module.exports = {
  updateUser,
  getUserDetails,
  getImage,
  uploadImage

};
