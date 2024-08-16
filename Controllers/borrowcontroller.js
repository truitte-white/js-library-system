const express = require('express');
const axios = require('axios');
const router = express.Router();

// Define the base URL for the C# API
const API_BASE_URL = 'http://localhost:5000/rfs-library/borrower';

// Route to get the longest checked out books
router.get('/longest-checked-out', async (req, res, next) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/longest-checked-out`);
        const books = response.data;
        res.render('longest-checked-out', { books }); // Render a view with the books data
    } catch (error) {
        console.error('Error fetching longest checked out books:', error);
        next(error);
    }
});

// Route to borrow a book
router.post('/borrower/borrow-book', async (req, res, next) => {
    console.log("Post request received");
    console.log(req.body);
    const borrowData = req.body;
    console.log('borrow data', borrowData)

    try {
        await axios.post('http://localhost:5000/rfs-library/borrower/borrow-book', borrowData);
        console.log('Book borrowed successfully');
        res.json({ success: true, message: 'Book borrowed successfully' });
    } catch (error) {
        console.error('Error borrowing book:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ success: false, message: 'Error borrowing book' });
    }
});


router.put('/borrower/:userId/borrowed-books/:bookId', async (req, res, next) => {
    const { userId, bookId } = req.params;

    try {
        // Logic to return the book
        await axios.put(`${API_BASE_URL}/${userId}/borrowed-books/${bookId}`);
        console.log('Book returned successfully');
        res.json({ success: true });
    } catch (error) {
        console.error('Error returning book:', error);
        res.status(500).json({ success: false, message: 'Error returning book' });
    }
});


// Route to get borrowed books for a specific user
router.get('/borrowed-books/:userId', async (req, res, next) => {
    const { userId } = req.params;

    try {
        const userResponse = await axios.get(`${API_BASE_URL}/users/id/${userId}`);
        const userData = userResponse.data;

        // Fetch borrowed books data
        const booksResponse = await axios.get(`${API_BASE_URL}/borrower/${userId}/borrowed-books`);
        const borrowedBooks = booksResponse.data;

        // Fetch comments for the user
        const commentsResponse = await axios.get(`${API_BASE_URL}/comments/user/${userId}`);
        const comments = commentsResponse.data;

        res.render('profile', {
            userID: userData.userId,
            loggedIn: res.locals.loggedIn,
            firstName: userData.firstName,
            lastName: userData.lastName,
            borrowedBooks: borrowedBooks || [],
            userId: userId,
            comments: comments || [], 
            error: null  // Ensure 'error' is defined
        }); // Render a view with borrowed books data
    } catch (error) {
        console.error('Error fetching borrowed books:', error);
        next(error);
    }
});

// Route to get a specific borrowed book by user ID and book ID
router.get('/borrowed-books/:userId/:bookId', async (req, res, next) => {
    const { userId, bookId } = req.params;

    try {
        const response = await axios.get(`${API_BASE_URL}/${userId}/borrowed-books/${bookId}`);
        const borrowedBook = response.data;
        res.render('borrowed-book-details', { borrowedBook }); // Render a view with borrowed book details
    } catch (error) {
        console.error('Error fetching borrowed book details:', error);
        next(error);
    }
});

module.exports = router;