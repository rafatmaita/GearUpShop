// userController.js

const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Request Body:', req.body);

  try {
    // Check if the username is already taken
    const existingUser = await UserModel.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user in the database
    const newUser = await UserModel.createUser(username, email, password);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the username and password match
    const user = await UserModel.findByEmailAndPassword(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Include user information in the token payload
    const payload = {
      user_id: user.user_id,
      email: user.email,
      username: user.username,
    };

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });

    res.status(200).json({
      message: 'User signed in successfully',
      token: token,
      user_id: user.user_id,
    });
    console.log(token);
    console.log(user.user_id);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  registerUser,
  loginUser,
};
