const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getStatusString } = require('../public/utils'); // Adjust the path as needed

// Route to display the add book form
router.get('/add-book', (req, res) => {
  res.render('add-book'); // Render the EJS template
});

// Route to handle adding a new book
router.post('/books', async (req, res, next) => {
  const newBook = req.body; // Get the new book data from the request body

  try {
      const response = await axios.post('http://localhost:5000/rfs-library/books', newBook);
      const result = response.data; // Assuming result contains the ID of the created book
      console.log('Book added successfully');
      res.redirect('/books'); // Redirect to the list of books or another appropriate page
  } catch (error) {
      console.error('Error adding book:', error);
      next(error); // Pass error to the next error handling middleware
  }
});

router.get('/books', async (req, res, next) => {
  try {
    const response = await axios.get('http://localhost:5000/rfs-library/books'); 
    console.log('books controller');
    res.render('books', { books: response.data, getStatusString }); // Pass getStatusString to EJS
  } catch (error) {
    console.error('Error fetching books:', error);
    next(error); // Pass error to the next error handling middleware
  }
});

// Route to get a specific book by ID
router.get('/books/:bookId', async (req, res, next) => {
  const { bookId } = req.params; // Extract bookId from request parameters

  try {
    const response = await axios.get(`http://localhost:5000/rfs-library/books/${bookId}`);
    const book = response.data; // Assuming book contains book details
    console.log('Book fetched successfully');
    res.render('bookDetails', { book }); // Render a view with book details
  } catch (error) {
    console.error('Error fetching book:', error);
    next(error); // Pass error to the next error handling middleware
  }
});

// Route to add a new book
router.post('/books', async (req, res, next) => {
  const newBook = req.body; // Get the new book data from the request body

  try {
    const response = await axios.post('http://localhost:5000/rfs-library/books', newBook);
    const result = response.data; // Assuming result contains the ID of the created book
    console.log('Book added successfully');
    res.redirect('/books'); // Redirect to the list of books or another appropriate page
  } catch (error) {
    console.error('Error adding book:', error);
    next(error); // Pass error to the next error handling middleware
  }
});

// Route to update an existing book
router.put('/books/:bookId', async (req, res, next) => {
  const { bookId } = req.params; // Extract bookId from request parameters
  const updateFields = req.body; // Get the updated book data from the request body

  try {
    const response = await axios.put(`http://localhost:5000/rfs-library/books/${bookId}`, updateFields);
    const result = response.data; // Assuming result contains some update status or confirmation
    console.log('Book updated successfully');
    res.redirect(`/books/${bookId}`); // Redirect to the updated book details page or another appropriate page
  } catch (error) {
    console.error('Error updating book:', error);
    next(error); // Pass error to the next error handling middleware
  }
});

// Route to display the edit book form
router.get('/books/:bookId/edit', async (req, res, next) => {
  const { bookId } = req.params; // Extract bookId from request parameters

  try {
      const response = await axios.get(`http://localhost:5000/rfs-library/books/${bookId}`);
      const book = response.data; // Assuming book contains book details
      console.log('Book fetched successfully for editing');
      res.render('edit-book', { book }); // Render the edit-book EJS template with book details
  } catch (error) {
      console.error('Error fetching book for editing:', error);
      next(error); // Pass error to the next error handling middleware
  }
});

// Route to update an existing book
router.post('/books/:bookId', async (req, res, next) => {
  const { bookId } = req.params; // Extract bookId from request parameters
  const updatedBook = req.body; // Get the updated book data from the request body

  try {
      const response = await axios.put(`http://localhost:5000/rfs-library/books/${bookId}`, updatedBook);
      const result = response.data; // Assuming result contains some update status or confirmation
      console.log('Book updated successfully');
      res.redirect(`/books/${bookId}`); // Redirect to the updated book details page or another appropriate page
  } catch (error) {
      console.error('Error updating book:', error);
      next(error); // Pass error to the next error handling middleware
  }
});

// Route to handle editing a comment (if needed)
router.post('/books/edit-comment', async (req, res, next) => {
  const { CommentText } = req.body; // Get the comment data from the request body

  try {
      // Implement the logic to update the comment based on your application's needs
      console.log('Comment updated successfully');
      res.redirect('/books'); // Redirect to the appropriate page after updating comment
  } catch (error) {
      console.error('Error updating comment:', error);
      next(error); // Pass error to the next error handling middleware
  }
});

module.exports = router;


