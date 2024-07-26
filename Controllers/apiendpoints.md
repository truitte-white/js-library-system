from c# api files
UsersControllers.cs
    Endpoint Summary
    Get User by Email

    HTTP Method: GET
    URL: rfs-library/users/{email}
    Description: Retrieves a user by their email address.
    Response: Returns the user data if found, or a 404 Not Found if the user does not exist.
    Get User by ID

    HTTP Method: GET
    URL: rfs-library/users/id/{userId}
    Description: Retrieves a user by their user ID.
    Response: Returns the user data if found, or a 404 Not Found if the user does not exist.
    Create User

    HTTP Method: POST
    URL: rfs-library/users
    Description: Creates a new user with the data provided in the request body.
    Request Body: JSON object representing a Users instance.
    Response: Returns the ID of the newly created user, or a 500 Internal Server Error if the creation fails.
    Update User

    HTTP Method: PUT
    URL: rfs-library/users/{userId}
    Description: Updates an existing user with the data provided in the request body.
    Request Body: JSON object representing a Users instance.
    Response: Returns the result of the update operation, or a 500 Internal Server Error if the update fails.
    Example Requests
    Get User by Email

    Request: GET /rfs-library/users/example@example.com
    Response: 200 OK with user details or 404 Not Found
    Get User by ID

    Request: GET /rfs-library/users/id/123
    Response: 200 OK with user details or 404 Not Found
    Create User

    Request: POST /rfs-library/users
    Request Body:
    json
    Copy code
    {
    "UserId": 0,
    "Email": "newuser@example.com",
    "Name": "New User",
    // other user fields
    }
    Response: 200 OK with newly created user ID or 500 Internal Server Error
    Update User

    Request: PUT /rfs-library/users/123
    Request Body:
    json
    Copy code
    {
    "UserId": 123,
    "Email": "updateduser@example.com",
    "Name": "Updated User",
    // other updated user fields
    }
    Response: 200 OK with update result or 500 Internal Server Error
    Notes
    Replace users in the URL with the appropriate route if you change the route definition in your controller.
    Ensure that the request bodies for POST and PUT operations contain all required fields for the Users model.
    Consider adding additional error handling or validation as needed.

HomeController.cs
    Endpoint Summary
    Home Page
    HTTP Method: GET
    URL: /
    Description: Returns a simple text message indicating the library book system.
    Response: Returns a plain text response with the content "RF-SMART Library Book System".
    Example Request
    Home Page
    Request: GET /
    Response: 200 OK with the content "RF-SMART Library Book System"
    Notes
    This endpoint does not handle any additional routes beyond the root (/).
    The Content method used in the Index action returns a plain text response. If you need to render HTML or other content, you can modify this method accordingly.
    The base route "/" in the [Route("/")] attribute defines the root of your application, so this controller responds to requests made to the root URL of your server.
    If you want to add more routes or actions, you would define them within the HomeController with additional [HttpGet], [HttpPost], [HttpPut], etc., attributes and specify different routes or parameters.

BorrowerController.cs
    Endpoint Summary
    Get Longest Checked-Out Books

    HTTP Method: GET
    URL: rfs-library/borrower/longest-checked-out
    Description: Retrieves the top 5 books that have been checked out the longest based on the total days they have been borrowed.
    Response: Returns a list of the longest checked-out books with their details.
    Borrow Book

    HTTP Method: POST
    URL: rfs-library/borrower
    Description: Allows a user to borrow a book. The request body must contain details about the borrowed book.
    Request Body: JSON object representing a BooksBorrowed instance.
    Response: Returns the ID of the newly borrowed book record or an error message if the operation fails.
    Get Borrowed Books by User

    HTTP Method: GET
    URL: rfs-library/borrower/{userId}/borrowed-books
    Description: Retrieves a list of all books currently borrowed by a specific user.
    Response: Returns a list of BooksBorrowed records for the specified user.
    Get Borrowed Book by ID

    HTTP Method: GET
    URL: rfs-library/borrower/{userId}/borrowed-books/{bookId}
    Description: Retrieves details about a specific borrowed book by its ID for a particular user.
    Response: Returns the BooksBorrowed record for the specified user and book ID, or a 404 Not Found if the record does not exist.
    Return Book

    HTTP Method: PUT
    URL: rfs-library/borrower/{userId}/borrowed-books/{bookId}
    Description: Marks a borrowed book as returned. Updates the book's status to available and sets the return date.
    Response: Returns a success message if the book was returned successfully, or a 404 Not Found if the book was not borrowed by the user.
    Example Requests
    Get Longest Checked-Out Books

    Request: GET /rfs-library/borrower/longest-checked-out
    Response: 200 OK with a list of books that have been checked out the longest.
    Borrow Book

    Request: POST /rfs-library/borrower
    Request Body:
    json
    Copy code
    {
    "BookId": 1,
    "UserId": 123,
    "BorrowDate": "2024-07-25T00:00:00Z"
    // other required fields
    }
    Response: 200 OK with the ID of the borrowed book record.
    Get Borrowed Books by User

    Request: GET /rfs-library/borrower/123/borrowed-books
    Response: 200 OK with a list of borrowed books for user ID 123.
    Get Borrowed Book by ID

    Request: GET /rfs-library/borrower/123/borrowed-books/1
    Response: 200 OK with details of the borrowed book with ID 1 for user ID 123 or 404 Not Found if not found.
    Return Book

    Request: PUT /rfs-library/borrower/123/borrowed-books/1
    Response: 200 OK with a success message if the book was successfully returned or 404 Not Found if the book was not found or not borrowed by the user.
    Notes
    Ensure that your service and data model classes (IBorrowerService, BooksBorrowed, Books, LibraryDbContext, etc.) are correctly implemented to support these operations.
    For error handling, additional validation and custom error messages may be necessary to cover edge cases and user input errors.
    The UpdateBookStatus and UpdateBorrowerBook methods in your service class should handle the specific logic for updating the book and borrower records.

CommentsController.cs
    Endpoint Summary
    Create Comment

    HTTP Method: POST
    URL: rfs-library/comments
    Description: Creates a new comment on a book.
    Request Body: JSON object representing a BooksComments instance.
    Response: Returns the ID of the newly created comment, or a 500 Internal Server Error if creation fails.
    Update Comment

    HTTP Method: PUT
    URL: rfs-library/comments/{commentId}
    Description: Updates an existing comment by its ID.
    Request Body: JSON object representing the updated BooksComments instance.
    Response: Returns a boolean indicating whether the update was successful, or a 500 Internal Server Error if the update fails.
    Delete Comment

    HTTP Method: DELETE
    URL: rfs-library/comments/{commentId}/{currentUserId}
    Description: Deletes a comment by its ID. The currentUserId is used to ensure that only the comment owner can delete it.
    Response: Returns a boolean indicating whether the deletion was successful, or a 500 Internal Server Error if the deletion fails.
    Get Comment by ID

    HTTP Method: GET
    URL: rfs-library/comments/{commentId}
    Description: Retrieves a specific comment by its ID.
    Response: Returns the BooksComments object if found, or a 404 Not Found if the comment does not exist.
    Get Latest Comments

    HTTP Method: GET
    URL: rfs-library/comments/latest-comments
    Description: Retrieves the 5 most recent comments.
    Response: Returns a list of the latest comments.
    Example Requests
    Create Comment

    Request: POST /rfs-library/comments
    Request Body:
    json
    Copy code
    {
    "BookId": 1,
    "UserId": 123,
    "CommentText": "Great book!",
    "CreatedDate": "2024-07-26T00:00:00Z"
    }
    Response: 200 OK with the ID of the newly created comment.
    Update Comment

    Request: PUT /rfs-library/comments/1
    Request Body:
    json
    Copy code
    {
    "BookId": 1,
    "UserId": 123,
    "CommentText": "Updated comment text",
    "CreatedDate": "2024-07-26T00:00:00Z"
    }
    Response: 200 OK with a boolean indicating success.
    Delete Comment

    Request: DELETE /rfs-library/comments/1/123
    Response: 200 OK with a boolean indicating success.
    Get Comment by ID

    Request: GET /rfs-library/comments/1
    Response: 200 OK with the comment details or 404 Not Found if the comment does not exist.
    Get Latest Comments

    Request: GET /rfs-library/comments/latest-comments
    Response: 200 OK with the list of the 5 most recent comments.
    Notes
    Ensure your ICommentService interface and its implementation properly handle the operations for creating, updating, deleting, and retrieving comments.
    The BooksComments model should include all necessary properties such as BookId, UserId, CommentText, and CreatedDate.
    Consider adding additional endpoints for functionalities like searching for comments or retrieving all comments for a specific book if needed.

BooksController.cs
    Endpoint Summary
    Get All Books

    HTTP Method: GET
    URL: rfs-library/books
    Description: Retrieves a list of all books.
    Response: Returns a list of Books objects.
    Get Book by ID

    HTTP Method: GET
    URL: rfs-library/books/{bookId}
    Description: Retrieves a specific book by its ID.
    Response: Returns the Books object if found, or a 404 Not Found if the book does not exist.
    Add Book

    HTTP Method: POST
    URL: rfs-library/books
    Description: Creates a new book entry.
    Request Body: JSON object representing a Books instance.
    Response: Returns the ID of the newly created book or a 500 Internal Server Error if the creation fails.
    Update Book

    HTTP Method: PUT
    URL: rfs-library/books/{bookId}
    Description: Updates an existing book entry by its ID. The request body should contain the fields to be updated.
    Request Body: JSON object representing the fields to be updated.
    Response: Returns the result of the update operation or a 500 Internal Server Error if the update fails.
    Example Requests
    Get All Books

    Request: GET /rfs-library/books
    Response: 200 OK with a list of all books.
    Get Book by ID

    Request: GET /rfs-library/books/1
    Response: 200 OK with the book details or 404 Not Found if the book with ID 1 does not exist.
    Add Book

    Request: POST /rfs-library/books
    Request Body:
    json
    Copy code
    {
    "BookId": 0, // Auto-generated or set to default value
    "BookName": "Example Book",
    "AuthorName": "Author Name",
    "Genre": "Genre",
    "PublishYear": 2024,
    "Status": "Available" // Or any other default status
    }
    Response: 200 OK with the ID of the newly created book.
    Update Book

    Request: PUT /rfs-library/books/1
    Request Body:
    json
    Copy code
    {
    "BookName": "Updated Book Name",
    "AuthorName": "Updated Author Name",
    "Genre": "Updated Genre",
    "PublishYear": 2025
    }
    Response: 200 OK with the result of the update operation.
    Notes
    Error Handling: The controller methods handle exceptions and return a 500 Internal Server Error with a generic message. You may want to provide more detailed error handling or validation responses depending on your needs.
    Update Book Method: The UpdateBook method uses object updateFields, which means you need to properly handle and deserialize the update fields in your service implementation. It might be beneficial to use a specific update model or DTO to ensure proper type safety and validation.
    Service Layer: Ensure that the IBookService interface and its implementation handle the necessary logic for book operations (GetAllBooks, FindBookById, CreateBook, UpdateBook).
    Feel free to add additional endpoints as needed, such as searching for books, filtering by genre, or other relevant functionalities.
