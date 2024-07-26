const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/home', async (req, res, next) => {
    try {
        const longestCheckedOutList = await fetchLongestCheckedOut();
        const latestCommentsList = await fetchLatestComments();

        res.render('home', { longestCheckedOutList, latestCommentsList });
    } catch (error) {
        console.error('Error fetching data:', error);
        next(error);
    }
});

async function fetchLatestComments() {
    try {
        const latestCommentsResponse = await axios.get('http://localhost:5000/rfs-library/comments/latest-comments');
        console.log('home controller comments response');
        console.log(latestCommentsResponse.data);
        return latestCommentsResponse.data;
    } catch (error) {
        console.error('Error fetching latest comments:', error);
        return [];
    }
}

async function fetchLongestCheckedOut() {
    try {
        const longestCheckedOutResponse = await axios.get('http://localhost:5000/rfs-library/books/longest-checked-out');
        console.log('home controller checked out response');
        console.log(longestCheckedOutResponse.data);
        return longestCheckedOutResponse.data;
    } catch (error) {
        console.error('Error fetching longest checked-out books:', error);
        return [];
    }
}

module.exports = router;
