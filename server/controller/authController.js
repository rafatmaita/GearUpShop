const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input using Joi
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { error } = schema.validate({ username, email, password });
        if (error) {
            return res.status(400).json({ message: "Validation error", error: error.details });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input using Joi
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { error } = schema.validate({ email, password });
        if (error) {
            return res.status(400).json({ message: "Validation error", error: error.details });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found");
        }

        // Compare the provided password with the stored hashed password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send("Invalid password");
        }

        // Generate a JWT token
        const token = jwt.sign({ _id: user._id }, "your-secret-key", { expiresIn: "10h" });

        // Set the token as a cookie (optional, you can also send it in the response body)
        res.cookie("accessToken", token, { httpOnly: true });

        // Send the response with user information and token
        res.json({ userId: user._id, authToken: token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};