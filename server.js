const express = require('express');
const axios = require('axios');
const booksRouter = require('./Controllers/bookscontroller');
const homeRouter = require('./Controllers/homecontroller'); // Import books router
const profileRouter = require('./Controllers/homecontroller'); // Import books router
const app = express();

// Set up middleware
app.use(express.json());
//app.use(express.static('public'));
app.use('/public', express.static('public', { type: 'text/css' }));
app.use('/Controllers', express.static('Controllers', { type: 'text/javascript' }));

// Use books router
app.use('/rfs-library', booksRouter);
app.use('/rfs-library', homeRouter);

// Set up view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', './views'); // Directory where EJS templates are located

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Something broke!' });
});

// Mount controllers
app.use('/rfs-library', homeRouter);
app.use('/rfs-library', booksRouter);
app.use('/rfs-library', profileRouter);

app.get('/rfs-library/home', (req, res) => {
  res.render('home'); 
});

app.get('/rfs-library/books', (req, res) => {
  res.render('books', { books: booksData });
});

app.get('/rfs-library/profile', (req, res) => {
  res.render('profile', { username: userData.username, borrowedBooks: userData.borrowedBooks });
});

router.get('/rfs-library/add-book', (req, res) => {
  res.render('add-book'); // Render the EJS template
});

router.get('/rfs-library/edit-book', (req, res) => {
  res.render('add-book'); // Render the EJS template
});

router.get('/rfs-library/add-comment', (req, res) => {
  res.render('add-comment'); // Render the EJS template
});

router.get('/rfs-library/edit-comment', (req, res) => {
  res.render('edit-comment'); // Render the EJS template
});


app.get('/error', (req, res) => {
  res.render('error', { message: 'Something went wrong' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
