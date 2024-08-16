const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_BASE_URL = 'http://localhost:5000/rfs-library';

// Route to display the add comment form
router.get('/comments/add-comment', (req, res) => {
    res.render('add-comment'); // Ensure this path is correctly defined
});

// Route to handle adding a new comment
router.post('/comments/add-comment', async (req, res) => {
    const { bookId, userId, commentTitle, commentText } = req.body;

    // Validate input
    if (!bookId || !userId || !commentTitle || !commentText) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/comments/add-comment`, {
            bookId,
            userId,
            commentTitle,
            commentText
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 201) {
            res.status(201).json({ success: true, message: 'Comment added successfully' });
        } else {
            res.status(response.status).json({ error: response.statusText });
        }
    } catch (error) {
        console.error('Error adding comment:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'An error occurred while adding the comment' });
    }
});

// Route to display the latest comments
router.get('/comments/latest-comments', async (req, res, next) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments/latest-comments`);
        const latestComments = response.data;
        console.log('Latest comments fetched successfully');
        res.render('latest-comments', { comments: latestComments }); // Render a view with latest comments
    } catch (error) {
        console.error('Error fetching latest comments:', error);
        next(error); // Pass error to the next error handling middleware
    }
});

// Route to handle deleting a comment
router.delete('/comments/:commentId/:userId', async (req, res, next) => {
    const { commentId, userId } = req.params;

    try {
        const response = await axios.delete(`${API_BASE_URL}/comments/${commentId}/${userId}`);
        if (response.status === 200) {
            console.log('Comment deleted successfully');
            res.status(200).send('Comment deleted successfully');
        } else {
            res.status(response.status).send(response.statusText);
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).send('Error deleting comment');
    }
});

module.exports = router;
