const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const { booksController, borrowController, commentController, homeController, profileController } = require("../rfs-library/Controllers");
const { loggedIn } = require("../rfs-library/middleware/loggedInmiddleware");

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));

//   app.use((req, res, next) => {
//     console.log('CORS Headers:', res.getHeaders());
//     next();
// });
// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(loggedIn); // Ensure loggedIn middleware is applied globally if needed

app.use(methodOverride('_method'));

// Static files
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/Controllers', express.static(path.join(__dirname, 'Controllers')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use routers
app.use('/rfs-library', booksController);
app.use('/rfs-library', homeController);
app.use('/rfs-library', profileController);
app.use('/rfs-library', borrowController);
app.use('/rfs-library', commentController); // Ensure commentController is used

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    res.status(500).render('error', { message: 'Something broke!' });
});

// GET routes
app.get('/rfs-library/home', (req, res) => res.render('home'));
app.get('/rfs-library/books', async (req, res) => {
    try {
        // Fetch books data from your database or source
        const books = await fetchBooksData(); // Assume this function fetches book data
        console.log('Books data:', books); 

        res.render('books', { books });
    } catch (error) {
        console.error('Error fetching books:', error.message);
        res.status(500).render('error', { message: 'Error fetching books.' });
    }
});
app.get('/rfs-library/users/signup', (req, res) => res.render('signup'));
app.get('/rfs-library/users/login', (req, res) => res.render('login'));
app.get('/rfs-library/logout', (req, res) => res.render('login'));
app.get('/rfs-library/books/add-book', (req, res) => res.render('add-book'));
app.get('/rfs-library/books/:bookId/edit-status', (req, res) => res.render('edit-status'));
app.get('/rfs-library/comments/add-comment', (req, res) => res.render('add-comment'));
app.get('/rfs-library/profile/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Fetch user data (replace with actual function)
        const userData = await getUserData(userId); // Fetch user details
        const borrowedBooks = await getBorrowedBooks(userId); // Fetch borrowed books
        const comments = await getComments(userId); // Fetch comments

        // Render the profile view with user data, borrowed books, and comments
        res.render('profile', { 
            userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            borrowedBooks: borrowedBooks || [], // Ensure it's an empty array if undefined
            comments: comments || [] // Ensure it's an empty array if undefined
        });
    } catch (error) {
        console.error('Error fetching profile data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST routes
app.post('/rfs-library/books/add-book', (req, res) => {
    const { bookName, authorName, genre, publishYear } = req.body;
    console.log('Received book data:', { bookName, authorName, genre, publishYear });

    // Example validation
    if (!bookName || !authorName || !genre || !publishYear) {
        console.error('Validation failed:', { bookName, authorName, genre, publishYear });
        return res.status(400).json({ error: 'All fields are required' });
    }
    res.status(201).json({ success: true, message: 'Book added successfully' });
});

// Implement logic to update the book status
app.put('/rfs-library/books/:bookId/edit-status', async (req, res) => {
    const { BookId } = req.params;
    const { NewStatus } = req.body; // Match the payload expected by C# API

    try {
        // Make sure the payload matches what the C# API expects
        const bookIdInt = parseInt(BookId, 10);
        await updateBookStatus(bookIdInt, NewStatus); // Replace with actual function if needed

        res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/rfs-library/borrower/:userId/borrowed-books/:bookId', async (req, res) => {
    const { userId, BookId } = req.params;

    try {
        console.log(`Book ${BookId} returned by user ${userId}`);
        res.redirect(`/rfs-library/profile/${userId}`);
        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        console.error('Error returning book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/rfs-library/borrower/borrow-book', async (req, res) => {
    console.log('Post request received');
    console.log('Received data:', req.body);

    const { BookId, UserId } = req.body;

    // Log the data types to ensure they are as expected
    console.log('Data type of BookId:', typeof BookId);
    console.log('Data type of UserId:', typeof UserId);

    if (!BookId || !UserId) {
        return res.status(400).json({ success: false, message: 'Invalid data format. Payload is undefined.' });
    }

    try {
        // Implement logic to borrow the book
        await borrowBook(BookId, UserId); // Assume this function handles the borrowing logic
        res.json({ success: true, message: 'Book borrowed successfully!' });
    } catch (error) {
        console.error('Error borrowing book:', error.message);
        res.status(500).json({ success: false, message: 'Error borrowing book.' });
    }
});

app.post('/rfs-library/comments/add-comment', async (req, res) => {
    // Destructure the request body
    const { bookId, userId, commentTitle, commentText } = req.body;

    // Log the types of the incoming data
    console.log('Data received:');
    console.log('bookId:', bookId, 'Type:', typeof bookId);
    console.log('userId:', userId, 'Type:', typeof userId);
    console.log('commentTitle:', commentTitle, 'Type:', typeof commentTitle);
    console.log('commentText:', commentText, 'Type:', typeof commentText);

    // Proceed with further processing
    if (!bookId || !userId || !commentTitle || !commentText) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const response = await axios.post('http://localhost:5000/rfs-library/comments/add-comment', {
            bookId,
            userId,
            commentTitle,
            commentText
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
