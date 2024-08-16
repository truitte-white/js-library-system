from c# api files
UsersControllers.cs
    
    Get User by Email

    Endpoint: GET rfs-library/users/email/{email}
    Description: Retrieves user details based on the provided email.
    Parameters:
    email (string): The email address of the user.
    Responses:
    200 OK with user details if found.
    400 Bad Request if the email is null or empty.
    404 Not Found if the user is not found.
    500 Internal Server Error for unexpected errors.
    
    Get User by ID

    Endpoint: GET rfs-library/users/id/{userId}
    Description: Retrieves user details based on the provided user ID.
    Parameters:
    userId (int): The ID of the user.
    Responses:
    200 OK with user details if found.
    404 Not Found if the user is not found.
    500 Internal Server Error for unexpected errors.
    
    Create User

    Endpoint: POST rfs-library/users
    Description: Creates a new user with the provided details.
    Parameters:
    newUser (Users object): Contains user details like email and password.
    Responses:
    200 OK with the ID of the newly created user.
    500 Internal Server Error for unexpected errors.
    
    Update User

    Endpoint: PUT rfs-library/users/{userId}
    Description: Updates the user details for the specified user ID.
    Parameters:
    userId (int): The ID of the user to update.
    updatedUser (Users object): Contains updated user details.
    Responses:
    200 OK with the result of the update operation.
    400 Bad Request if the provided user ID does not match the ID in the body.
    500 Internal Server Error for unexpected errors.
    
    Get Profile

    Endpoint: GET rfs-library/users/profile
    Description: Retrieves the profile information for the currently authenticated user.
    Authorization: Requires authentication (users must be logged in).
    Responses:
    200 OK with borrowed books information.
    500 Internal Server Error for unexpected errors.
    
    Login

    Endpoint: POST rfs-library/users/login
    Description: Authenticates a user and generates a token.
    Parameters:
    loginDto (UserLoginDto object): Contains email and password.
    Responses:
    200 OK with a success message and token if login is successful.
    400 Bad Request if email or password is missing.
    401 Unauthorized if email is not found or password is incorrect.
    500 Internal Server Error for unexpected errors.
    
    Signup

    Endpoint: POST rfs-library/users/signup
    Description: Registers a new user with the provided email and password.
    Parameters:
    signupDto (UserSignupDto object): Contains email and password.
    Responses:
    200 OK with a success message if signup is successful.
    400 Bad Request if email or password is missing, or if the user already exists.
    500 Internal Server Error for unexpected errors.
    
    Logout

    Endpoint: POST rfs-library/users/logout
    Description: Logs out the currently authenticated user by deleting the token.
    Authorization: Requires authentication (users must be logged in).
    Responses:
    200 OK with a success message.
    500 Internal Server Error for unexpected errors.
    
    Models and DTOs
    Users: Represents a user in the system, including properties such as Email, Password, and UserId.
    UserLoginDto: Data transfer object for user login with Email and Password.
    UserSignupDto: Data transfer object for user signup with Email and Password.
    
    Key Services Used
    IUserService: Provides methods to interact with user data (e.g., FindUserByEmail, FindUserById, CreateUser, UpdateUser).
    IBorrowerService: Provides methods related to borrowed books (e.g., FindAllBorrowedBooks).
    ITokenHelper: Helps in generating and validating authentication tokens.
    ILogger: Used for logging errors and informational messages.
    These endpoints cover user management, authentication, and session management, providing a robust set of functionalities for a user-based API in a library system.

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
    Add Comment
    Route: POST /rfs-library/comments/add-comment
    Description: Adds a new comment.
    Payload:
    json
    Copy code
    {
        "commentId": int,         // Optional, usually auto-generated
        "bookId": int,
        "userId": int,
        "commentTitle": string,
        "commentText": string
    }
    Response:
    201 Created with the ID of the created comment.
    400 Bad Request if the input is invalid.
    500 Internal Server Error on failure.
    2. Update Comment
    Route: PUT /rfs-library/comments/{commentId}
    Description: Updates an existing comment by commentId.
    Payload:
    json
    Copy code
    {
        "commentId": int,         // Must match the `commentId` in the URL
        "bookId": int,
        "userId": int,
        "commentTitle": string,
        "commentText": string
    }
    Response:
    204 No Content on success.
    400 Bad Request if commentId in the URL and body don't match, or input is invalid.
    404 Not Found if the comment doesn't exist.
    500 Internal Server Error on failure.
    3. Delete Comment
    Route: DELETE /rfs-library/comments/{commentId}/{userId}
    Description: Deletes a comment by commentId if the userId matches.
    Response:
    204 No Content on success.
    404 Not Found if the comment doesn't exist.
    500 Internal Server Error on failure.
    4. Get Comment by ID
    Route: GET /rfs-library/comments/{commentId}
    Description: Fetches a comment by commentId.
    Response:
    200 OK with the comment data.
    404 Not Found if the comment doesn't exist.
    500 Internal Server Error on failure.
    5. Get Latest Comments
    Route: GET /rfs-library/comments/latest-comments
    Description: Fetches the latest comments.
    Response:
    200 OK with a list of the latest comments.
    500 Internal Server Error on failure.
    6. Get Comments by User ID
    Route: GET /rfs-library/comments/user/{userId}
    Description: Fetches comments made by a specific user.
    Response:
    200 OK with a list of comments.
    500 Internal Server Error on failure.
BooksController.cs
    1. Get All Books
    Route: GET /rfs-library/books
    Description: Fetches a list of all books.
    Response:
    Returns a list of Books objects.
    Status Code: 200 OK with a JSON array of book objects.
    Example response:
    json
    Copy code
    [
        {
            "bookId": 1,
            "bookName": "Book Title 1",
            "authorName": "Author 1",
            "genre": "Genre 1",
            "publishYear": 2020,
            "status": "Available"
        },
        ...
    ]
    2. Get Book By ID
    Route: GET /rfs-library/books/{bookId}
    Parameters:
    bookId (int): The ID of the book to fetch.
    Description: Fetches the details of a specific book by its ID.
    Response:
    Returns a Books object.
    Status Code: 200 OK with a JSON object of the book details.
    Example response:
    json
    Copy code
    {
        "bookId": 1,
        "bookName": "Book Title 1",
        "authorName": "Author 1",
        "genre": "Genre 1",
        "publishYear": 2020,
        "status": "Available"
    }
    3. Add a Book
    Route: POST /rfs-library/books/add-book
    Payload:
    bookName (string): The name of the book.
    authorName (string): The name of the author.
    genre (string): The genre of the book.
    publishYear (int): The year the book was published.
    status (enum): The status of the book (e.g., "Available", "CheckedOut").
    Description: Adds a new book to the library.
    Request Body Example:
    json
    Copy code
    {
        "bookName": "New Book Title",
        "authorName": "New Author",
        "genre": "Fiction",
        "publishYear": 2023,
        "status": "Available"
    }
    Response:
    Status Code: 200 OK with the ID of the newly created book.
    4. Update a Book
    Route: PUT /rfs-library/books/{bookId}
    Parameters:
    bookId (int): The ID of the book to update.
    Payload:
    A Books object containing the fields to be updated.
    Description: Updates the details of an existing book.
    Request Body Example:
    json
    Copy code
    {
        "bookName": "Updated Book Title",
        "authorName": "Updated Author",
        "genre": "Updated Genre",
        "publishYear": 2022,
        "status": "CheckedOut"
    }
    Response:
    Status Code: 200 OK with the ID of the updated book.
    5. Update Book Status
    Route: PUT /rfs-library/books/{bookId}/edit-status
    Parameters:
    bookId (int): The ID of the book whose status is to be updated.
    Payload:
    NewStatus (string): The new status of the book (must match the enum BookStatus).
    Description: Updates the status of an existing book.
    Request Body Example:
    json
    Copy code
    {
        "NewStatus": "CheckedOut"
    }
    Response:
    Status Code: 200 OK with a success message.
    Data Types and Models
    Books Model
    The Books model might look like this:

    csharp
    Copy code
    public class Books
    {
        public int BookId { get; set; }
        public string BookName { get; set; }
        public string AuthorName { get; set; }
        public string Genre { get; set; }
        public int PublishYear { get; set; }
        public BookStatus Status { get; set; }

        public enum BookStatus
        {
            Available,
            CheckedOut,
            Reserved,
            Lost
        }
    }
    Summary of Required Routes
    GET /rfs-library/books: Fetch all books.
    GET /rfs-library/books/{bookId}: Fetch a specific book by ID.
    POST /rfs-library/books/add-book: Add a new book.
    PUT /rfs-library/books/{bookId}: Update an existing book.
    PUT /rfs-library/books/{bookId}/edit-status: Update the status of an existing book.