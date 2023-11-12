// controllers/commentController.js
const commentModel = require('../model/commentModel');

const addComment = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const comment = await commentModel.addComment(name, email, message);
    res.status(200).json({ message: 'Comment added successfully', data: comment });
  } catch (error) {
    console.error('Error adding comment: ', error);
    res.status(500).json({ error: 'Error adding comment' });
  }
};
const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel.getAllComments();
    res.status(200).json({ comments });
  } catch (error) {
    console.error('Error fetching comments: ', error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
};

module.exports = { addComment,
  getAllComments };
