const express = require('express');
const axios = require('axios');
const router = express.Router();

// Define the base URL for the C# API
const API_BASE_URL = 'http://localhost:5000/rfs-library';

// Route to render the home page with data
router.get('/home', async (req, res, next) => {
    try {
        // Fetch the longest checked out books and latest comments
        const longestCheckedOutList = await fetchLongestCheckedOut();
        const latestCommentsList = await fetchLatestComments();

        // Render the home page with the fetched data
        res.render('home', { longestCheckedOutList, latestCommentsList });
    } catch (error) {
        console.error('Error fetching data:', error);
        next(error);
    }
});

// Function to fetch the latest comments
async function fetchLatestComments() {
    try {
        const latestCommentsResponse = await axios.get(`${API_BASE_URL}/comments/latest-comments`);

        return latestCommentsResponse.data;
    } catch (error) {
        console.error('Error fetching latest comments:', error);
        return [];
    }
}

// Function to fetch the longest checked out books
async function fetchLongestCheckedOut() {
    try {
        const longestCheckedOutResponse = await axios.get(`${API_BASE_URL}/borrower/longest-checked-out`);

        return longestCheckedOutResponse.data;
    } catch (error) {
        console.error('Error fetching longest checked-out books:', error);
        return [];
    }
}

module.exports = router;
