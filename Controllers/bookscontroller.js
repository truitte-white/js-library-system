const express = require('express');
const axios = require('axios');
const router = express.Router();
const { loggedIn } = require('../middleware/loggedInmiddleware');
const { getStatusString } = require('../public/utils');
const API_BASE_URL = 'http://localhost:5000/rfs-library';

router.use(loggedIn);

router.get('/books/add-book', (req, res) => {
  res.render('add-book');
});

router.get('/books/:bookId/edit-status', async (req, res) => {
  const { bookId } = req.params;

  try {
    const response = await axios.get(`${API_BASE_URL}/books/${bookId}`);
    const book = response.data;
    res.render('edit-status', { book });
  } catch (error) {
    console.error('Error fetching book for edit status:', error);
    next(error);
  }
});

// Route to handle adding a new book
// Inside booksController
router.post('/books/add-book', async (req, res) => {
  const { bookName, authorName, genre, publishYear } = req.body;

  if (!bookName || !authorName || !genre || !publishYear) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
      const response = await axios.post(`${API_BASE_URL}/books/add-book`, {
          bookName,
          authorName,
          genre,
          publishYear
      });

      if (response.status === 200) {
          return res.json({ success: true, message: 'Book added successfully!' });
      } else {
          return res.status(response.status).json({ success: false, message: 'Failed to add book.' });
      }
  } catch (err) {
      console.error('Error in adding book:', err);
      return res.status(500).json({ success: false, message: 'An error occurred while adding the book.' });
  }
});



router.get('/books', async (req, res, next) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`);
    const books = response.data;
    const user = {
      Email: res.locals.Email || '',
      FirstName: res.locals.FirstName || '',
      LastName: res.locals.LastName || '',
      Password: res.locals.Password || ''
    };
    res.render('books', {
      books,
      getStatusString,
      userEmail: user.email,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      userPassword: user.password
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    next(error);
  }
});

router.get('/books/:bookId', async (req, res, next) => {
  const { bookId } = req.params;

  try {
    const response = await axios.get(`${API_BASE_URL}/books/${bookId}`);
    const book = response.data;
    res.render('book-details', { book });
  } catch (error) {
    console.error('Error fetching book:', error);
    next(error);
  }
});

router.put('/books/:bookId/edit-status', async (req, res, next) => {
  const { bookId } = req.params;
  const { NewStatus } = req.body; // Ensure this matches the payload from the frontend

  try {
    const bookIdInt = parseInt(bookId, 10);

    const response = await axios.put(`${API_BASE_URL}/books/${bookId}/edit-status`, {
      NewStatus: NewStatus // Ensure this matches what the API expects
    });

    if (response.status === 200) {
      res.json({ message: 'Status updated successfully' });
    } else {
      res.status(response.status).json({ error: 'Failed to update book status' });
    }
  } catch (error) {
    console.error('Error updating book status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;
