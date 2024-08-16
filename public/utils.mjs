const API_BASE_URL = 'http://localhost:5000/rfs-library';

export function getStatusString(status) {
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
            return 'Unknown';
    }
}

export async function returnBook(userId, bookId) {
    try {
        await axios.put(`${API_BASE_URL}/borrower/${userId}/borrowed-books/${bookId}`);
        return { success: true };
    } catch (error) {
        console.error('Error returning book:', error);
        return { success: false };
    }
}

export async function addComment(userId, bookId, commentTitle, commentText) {
    try {
        // Debug: Log request data
        console.log('Adding comment with data:', {
            userId: userId,
            bookId: bookId,
            commentTitle: commentTitle,
            commentText: commentText
        });

        // Prepare JSON data
        const data = {
            userId: parseInt(userId, 10),
            bookId: parseInt(bookId, 10),
            commentTitle: commentTitle,
            commentText: commentText
        };

        await axios.post(`${API_BASE_URL}/comments/add-comment`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return { success: true };
    } catch (error) {
        console.error('Error adding comment:', error.response ? error.response.data : error.message);
        return { success: false };
    }
}

export async function handleAddCommentFormSubmission(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const bookId = parseInt(document.getElementById('BookId').value, 10);
    const userId = parseInt(document.getElementById('UserId').value, 10);
    const commentTitle = document.getElementById('CommentTitle').value;
    const commentText = document.getElementById('CommentText').value;

    // Debug: Log form data
    console.log('Form data:', {
        bookId: bookId,
        userId: userId,
        commentTitle: commentTitle,
        commentText: commentText
    });

    try {
        const result = await addComment(userId, bookId, commentTitle, commentText);
        
        if (result.success) {
            alert('Comment added successfully!');
            window.location.href = `/rfs-library/profile/${userId}`;
        } else {
            console.error('Failed to add comment');
            alert('An error occurred while adding the comment.');
        }
    } catch (error) {
        console.error('Error adding comment:', error);
        alert('An error occurred while adding the comment.');
    }
}

export async function populateCommentForm() {
    console.log('populateCommentForm called');
    // Retrieve URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');  // Ensure parameter name matches
    const userId = urlParams.get('userId');  // Ensure parameter name matches

    // Convert to integers
    const bookIdInt = parseInt(bookId, 10);
    const userIdInt = parseInt(userId, 10);

    // Log values from URL parameters
    console.log('Retrieved URL Params:', {
        bookId: bookIdInt,
        userId: userIdInt
    });

    // Set values in form fields
    if (!isNaN(bookIdInt) && !isNaN(userIdInt)) {
        document.getElementById('BookId').value = bookIdInt;
        document.getElementById('UserId').value = userIdInt;
        console.log('Form fields set with bookId and userId');
    } else {
        console.error('URL parameters missing or invalid');
    }
}
