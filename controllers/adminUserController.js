const pool = require('../db'); // Assuming you have a database configuration in /config

// Display list of all users

// Display list of all users
const userList = (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error fetching user list:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(results.rows);
  });
};

// Display detail page for a specific user
const userDetail = (req, res) => {
  const userId = req.params.user_id;
  pool.query('SELECT * FROM users WHERE id = $1', [userId], (error, results) => {
    if (error) {
      console.error('Error fetching user detail:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    const user = results.rows[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  });
};

// Handle user create on POST
const userCreate = (req, res) => {
  const { username, password, email, role } = req.body;
  pool.query(
    'INSERT INTO users(username, password, email, role) VALUES($1, $2, $3, $4) RETURNING *',
    [username, password, email, role],
    (error, results) => {
      if (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(201).json(results.rows[0]);
    }
  );
};

// Handle user delete on DELETE
const userDelete = (req, res) => {
    const userId = req.params.user_id;
    pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [userId], (error, results) => {
      if (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
      const deletedUser = results.rows[0];
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(deletedUser);
    });
  };
  

module.exports = {
  userList,
    userDetail,
    userCreate,
    userDelete,
    
};