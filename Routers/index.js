// const express = require('express');
// const router = express.Router();
// const { booksController, commentController, profileController } = require('../Controllers');
// const { authMiddleware, loggedInMiddleware } = require('../middleware');

// // GET requests
// router.get('/rfs-library/users/login', loggedInMiddleware.loggedIn, profileController.getLoginForm);
// router.get('/users/signup', loggedInMiddleware.loggedIn, profileController.getSignupForm);
// router.get('/users/profile/:userId', loggedInMiddleware.loggedIn, authMiddleware.auth, profileController.getProfile);
// router.get('/users/logout', loggedInMiddleware.loggedIn, profileController.logout);
// router.get('/books', loggedInMiddleware.loggedIn, authMiddleware.auth, booksController.displayBooks);
// router.get('/books/add-book', loggedInMiddleware.loggedIn, authMiddleware.auth, booksController.addBookForm);
// router.get('/books/:bookId/edit', loggedInMiddleware.loggedIn, authMiddleware.auth, booksController.editBookForm);
// router.get('/comments/add-comment', loggedInMiddleware.loggedIn, authMiddleware.auth, commentController.addCommentForm);
// router.get('/comments/edit-comment', loggedInMiddleware.loggedIn, authMiddleware.auth, commentController.editCommentForm);

// // POST requests
// router.post('/books/add-book', loggedInMiddleware.loggedIn, authMiddleware.auth, booksController.addBook);
// router.post('/books/borrow/:bookId', loggedInMiddleware.loggedIn, authMiddleware.auth, booksController.borrowBook);
// router.post('/books/return/:bookId', loggedInMiddleware.loggedIn, authMiddleware.auth, booksController.returnBook);
// router.post('/books/edit-book/:bookId', loggedInMiddleware.loggedIn, authMiddleware.auth, booksController.editBook);
// router.post('/comments/add-comment', loggedInMiddleware.loggedIn, authMiddleware.auth, commentController.addComment);
// router.post('/comments/edit-comment/:commentId', loggedInMiddleware.loggedIn, authMiddleware.auth, commentController.editComment);
// router.post('rfs-library/users/login', loggedInMiddleware.loggedIn, profileController.login);
// router.post('/users/signup', loggedInMiddleware.loggedIn, profileController.signup);

// module.exports = router;
