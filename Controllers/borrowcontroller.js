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
router.post('/borrow-book', async (req, res, next) => {
    const borrowData = req.body;

    try {
        const response = await axios.post(API_BASE_URL, borrowData);
        const result = response.data;
        console.log('Book borrowed successfully');
        res.redirect('/borrowed-books'); // Redirect to a page showing borrowed books
    } catch (error) {
        console.error('Error borrowing book:', error);
        next(error);
    }
});

// Route to get borrowed books for a specific user
router.get('/borrowed-books/:userId', async (req, res, next) => {
    const { userId } = req.params;

    try {
        const response = await axios.get(`${API_BASE_URL}/${userId}/borrowed-books`);
        const borrowedBooks = response.data;
        res.render('borrowed-books', { borrowedBooks }); // Render a view with borrowed books data
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

// Route to return a borrowed book
router.put('/return-book/:userId/:bookId', async (req, res, next) => {
    const { userId, bookId } = req.params;

    try {
        const response = await axios.put(`${API_BASE_URL}/${userId}/borrowed-books/${bookId}`);
        const result = response.data;
        console.log('Book returned successfully');
        res.redirect('/borrowed-books/' + userId); // Redirect to the list of borrowed books for the user
    } catch (error) {
        console.error('Error returning book:', error);
        next(error);
    }
});

module.exports = router;
