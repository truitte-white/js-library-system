const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getStatusString } = require('../public/utils'); // Adjust the path as needed

//this may need to go in the bookscontroller
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

// Route to display the add comment form
router.get('/add-comment', (req, res) => {
    res.render('add-comment'); // Render the EJS template
});

// Route to handle adding a new comment
router.post('/add-comment', async (req, res, next) => {
    const newComment = {
        CommentText: req.body.CommentText,
        // Assuming additional fields such as BookId and UserId can be added if needed
    };

    try {
        const response = await axios.post('http://localhost:5000/rfs-library/comments', newComment);
        const commentId = response.data; // Assuming the comment ID is returned
        console.log('Comment added successfully');
        res.redirect(`/comments/${commentId}`); // Redirect to the comment details page or another appropriate page
    } catch (error) {
        console.error('Error adding comment:', error);
        next(error); // Pass error to the next error handling middleware
    }
});

// Route to display the latest comments (if needed)
router.get('/latest-comments', async (req, res, next) => {
    try {
        const response = await axios.get('http://localhost:5000/rfs-library/comments/latest-comments');
        const latestComments = response.data;
        console.log('Latest comments fetched successfully');
        res.render('latest-comments', { comments: latestComments }); // Render a view with latest comments
    } catch (error) {
        console.error('Error fetching latest comments:', error);
        next(error); // Pass error to the next error handling middleware
    }
});

// Route to get a specific comment by ID (if needed)
router.get('/comments/:commentId', async (req, res, next) => {
    const { commentId } = req.params;

    try {
        const response = await axios.get(`http://localhost:5000/rfs-library/comments/${commentId}`);
        const comment = response.data;
        console.log('Comment fetched successfully');
        res.render('commentDetails', { comment }); // Render a view with comment details
    } catch (error) {
        console.error('Error fetching comment:', error);
        next(error); // Pass error to the next error handling middleware
    }
});

router.get('/edit-comment/:commentId', async (req, res, next) => {
    const { commentId } = req.params;

    try {
        const response = await axios.get(`http://localhost:5000/rfs-library/comments/${commentId}`);
        const comment = response.data;
        console.log('Comment fetched successfully for editing');
        res.render('edit-comment', { comment }); // Render the EJS template with comment data
    } catch (error) {
        console.error('Error fetching comment for editing:', error);
        next(error); // Pass error to the next error handling middleware
    }
});

router.post('/edit-comment/:commentId', async (req, res, next) => {
    const { commentId } = req.params;
    const updatedComment = {
        CommentText: req.body.CommentText,
        // Add additional fields if necessary
    };

    try {
        const response = await axios.put(`http://localhost:5000/rfs-library/comments/${commentId}`, updatedComment);
        const success = response.data;
        console.log('Comment updated successfully');
        res.redirect(`/comments/${commentId}`); // Redirect to the updated comment details page or another appropriate page
    } catch (error) {
        console.error('Error updating comment:', error);
        next(error); // Pass error to the next error handling middleware
    }
});

module.exports = router;


