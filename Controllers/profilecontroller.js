const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const router = express.Router();
const { returnBook, addComment } = require('../public/utils');
const { loggedIn } = require('../middleware/loggedInmiddleware');
const { auth } = require('../middleware/authmiddleware');
const { tokenMiddleware } = require('../middleware/index');

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:5000/rfs-library';

router.post('/logout', (req, res) => {
    res.cookie('token', 'expire-token', { expires: new Date(0), httpOnly: true });
    return res.redirect('/users/login');
});

// Route to render the login form
router.get('/users/login', (req, res) => {
    res.render('login');
});

// Route to handle login POST request
router.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.locals.message = "Email and password are required.";
        console.log('Missing email or password')
        return res.redirect('/rfs-library/users/login');
    }

    try {
        // Find user by email
        const userResponse = await axios.get(`${API_BASE_URL}/users/email/${email}`);
        const user = userResponse.data;
        console.log("user retreive:", user)

        if (!user) {
            res.locals.message = "User does not exist with this email.";
            console.log("user does not exist")
            return res.redirect('/rfs-library/users/login');
        }

        if (!user.Password) {
            res.locals.message = "User password is not available.";
            console.log("password bad")
            return res.redirect('/rfs-library/users/login');
        }

        // Compare passwords
        console.log(password)
        console.log(user.Password)
        const passwordMatch = await bcrypt.compare(password, user.Password);
        console.log('Password match result:', passwordMatch);

        if (!passwordMatch) {
            res.locals.message = "Incorrect password.";
            console.log('Error: Incorrect password');
            return res.redirect('/rfs-library/users/login');
        }

        // Successful login
        const userId = user.UserId;
 
        // Sign token
        const token = tokenMiddleware.sign({ userId: user.UserId });

        const updatedUser = {
            userId,
            email,  
            FirstName: user.FirstName,  
            LastName: user.LastName,
            Password: user.Password,
            token
        };

        // Update user token in database
        //user.token = token;
        try {
            await axios.put(`${API_BASE_URL}/users/${userId}`, updatedUser);
        } catch (err) {
            console.error('Error in login:', err.response?.data || err.message);
            return res.status(500).render('error', { message: 'Login failed' });
        }

        // Set cookie
        res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 1 });
        console.log('Cookie set with token');
        // Redirect to profile page

        return res.redirect(`/rfs-library/profile/${user.UserId}`);
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).render('error', { message: 'Login failed' });
    }
});

// Route to render the profile page
router.get('/profile/:userId', loggedIn, async (req, res) => {
    const userId = req.params.userId;


    try {
        // Fetch user data
        const userResponse = await axios.get(`${API_BASE_URL}/users/id/${userId}`);
        const userData = userResponse.data;

        // Fetch borrowed books data
        const booksResponse = await axios.get(`${API_BASE_URL}/borrower/${userId}/borrowed-books`);
        const borrowedBooks = booksResponse.data;

        // Fetch comments for the user
        const commentsResponse = await axios.get(`${API_BASE_URL}/comments/user/${userId}`);
        const comments = commentsResponse.data;

        if (!userData) {
            return res.status(404).render('profile', { error: 'User not found' });
        }

        res.render('profile', {
            userID: userData.userId,
            loggedIn: res.locals.loggedIn,
            firstName: userData.FirstName,
            lastName: userData.LastName,
            borrowedBooks: borrowedBooks || [],
            userId: userId,
            comments: comments || [], 
            error: null  // Ensure 'error' is defined
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('profile', { error: 'Failed to load profile data' });
    }
});

// Route to handle signup POST request
router.post('/users', async (req, res) => {
    const { FirstName, LastName, email, password } = req.body;

    if (!FirstName || !LastName || !email || !password) {
        res.locals.message = "All fields are required.";
        return res.redirect('/rfs-library/signup');
    }

    try {
        // Send signup request to C# API
        const response = await axios.post(`${API_BASE_URL}/users/signup`, { FirstName, LastName, email, password });

        if (response.status === 200) {
            res.locals.message = "Signup successful! Please log in.";
            return res.redirect('/rfs-library/users/login');
        } else {
            res.locals.message = "Signup failed. Please try again.";
            return res.redirect('/rfs-library/signup');
        }
    } catch (err) {
        console.error('Error in signup:', err);
        res.locals.message = "An error occurred during signup.";
        return res.redirect('/rfs-library/signup');
    }
});


// router.post('/return-book/:bookId', async (req, res) => {
//     const { userId } = req.body;
//     const bookId = req.params.bookId;

//     try {
//         const result = await returnBook(userId, bookId);
//         res.json(result);
//     } catch (error) {
//         console.error('Error returning book:', error);
//         res.json({ success: false });
//     }
// });

// router.post('/add-comment/:bookId', async (req, res) => {
//     const { userId, comment } = req.body;
//     const bookId = req.params.bookId;

//     try {
//         const result = await addComment(userId, bookId, comment);
//         res.json(result);
//     } catch (error) {
//         console.error('Error adding comment:', error);
//         res.json({ success: false });
//     }
// });



module.exports = router;
