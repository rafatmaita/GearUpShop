const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;
const secretKey = 'your-secret-key';

app.use(bodyParser.json());

// PostgreSQL configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'GearUpShop',
  password: 'Rafat#01',
  port: 5432, // Your PostgreSQL port
});

const usersTable = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
)
`;

// Initialize the users table
pool.query(usersTable, (err, result) => {
  if (err) {
    console.error('Error initializing users table:', err);
  } else {
    console.log('Users table initialized');
  }
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token not provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
}

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);

    res.json({ message: 'User registered successfully', user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login and generate JWT
app.post('/login', async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = req.body;

    // Find the user in the database
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.rows[0].id, username: user.rows[0].username }, secretKey, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Protected route (requires a valid token)
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
