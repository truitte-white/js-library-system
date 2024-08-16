const axios = require('axios');
const API_BASE_URL = 'http://localhost:5000/rfs-library';

function getStatusString(status) {
  switch (status) {
    case 0:
      return 'Available';
    case 1:
      return 'CheckedOut';
    case 2:
      return 'Lost';
    case 3:
      return 'Destroyed';
    default:
      return 'Unknown'; // Handle unexpected values
  }
}

const returnBook = async (userId, bookId) => {
  try {
    await axios.put(`${API_BASE_URL}/borrower/${userId}/borrowed-books/${bookId}`);
    return { success: true };
  } catch (error) {
    console.error('Error returning book:', error);
    return { success: false };
  }
};

const addComment = async (userId, bookId, commentTitle, commentText) => {
  try {
    await axios.post(`${API_BASE_URL}/comments/add-comment`, {
      userId,
      bookId,
      commentTitle,
      commentText
    });
    return { success: true };
  } catch (error) {
    console.error('Error adding comment:', error);
    return { success: false };
  }
};

module.exports = {
  getStatusString,
  returnBook,
  addComment
};
