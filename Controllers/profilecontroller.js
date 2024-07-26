const express = require('express');
const axios = require('axios');
const router = express.Router();
const { returnBook, addComment } = require('../public/utils');

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:5000/rfs-library';

// Route to render the profile page
router.get('/profile/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Fetch user data
        const userResponse = await axios.get(`${API_BASE_URL}/users/id/${userId}`);
        const userData = userResponse.data;

        // Fetch borrowed books data
        const booksResponse = await axios.get(`${API_BASE_URL}/borrower/${userId}/borrowed-books`);
        const borrowedBooks = booksResponse.data;

        // Check if userData contains the expected properties
        if (!userData) {
            return res.status(404).render('profile', { error: 'User not found' });
        }

        // Render the profile page with user data and borrowed books
        res.render('profile', {
            firstName: userData.FirstName,
            lastName: userData.LastName,
            borrowedBooks: borrowedBooks || [], // Default to an empty array if borrowedBooks is not available
            userId: userId // Pass userId to the client for use in JavaScript functions
        });
    } catch (error) {
        // Handle errors (e.g., API call failures)
        console.error(error);
        res.status(500).render('profile', { error: 'Failed to load profile data' });
    }
});

router.post('/return-book/:bookId', async (req, res) => {
    const { userId } = req.body;
    const bookId = req.params.bookId;

    try {
        const result = await returnBook(userId, bookId);

        res.json(result);
    } catch (error) {
        console.error('Error returning book:', error);
        res.json({ success: false });
    }
});

router.post('/add-comment/:bookId', async (req, res) => {
    const { userId, comment } = req.body;
    const bookId = req.params.bookId;

    try {
        const result = await addComment(userId, bookId, comment);

        res.json(result);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.json({ success: false });
    }
});

module.exports = router;
