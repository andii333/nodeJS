Task

Build a RESTful API using Nest.js that allows users to manage a library of books. The API should utilize Nest.js' dependency injection capabilities and other related tools to achieve modularity and maintainability.

Requirements:

- Implement a BookService class that will be responsible for handling book-related operations. The BookService should have the following methods:
- getAllBooks: Returns a list of all books in the library.
- getBookById: Takes a book ID and returns the corresponding book.
- createBook: Takes book details and adds a new book to the library.
- updateBook: Takes a book ID and updated book details and updates the corresponding book in the library.
- deleteBook: Takes a book ID and removes the corresponding book from the library.
- Implement a BookController class that will handle HTTP requests and interact with the BookService. The BookController should have the following routes:
- GET /books: Returns a JSON array of all books.
- GET /books/:id: Returns the book with the specified ID.
- POST /books: Creates a new book using the provided JSON payload.
- PUT /books/:id: Updates the book with the specified ID using the provided JSON payload.
- DELETE /books/:id: Deletes the book with the specified ID.
- Utilize Nest.js' dependency injection feature to inject an instance of the BookService into the BookController. This should be done using decorators provided by Nest.js.
- Books should be stored in PostgreSQL table
- Implement a BookRepository class that will be responsible for persisting book data. The BookRepository should have the following methods:
- findAll: Returns a Promise resolving to an array of all books.
- findById: Takes a book ID and returns a Promise resolving to the corresponding book.
- create: Takes book details and adds a new book to the data store.
- update: Takes a book ID and updated book details, and updates the corresponding book in the data store.
- delete: Takes a book ID and removes the corresponding book from the data store.
- Utilize Nest.js' dependency injection feature to inject an instance of the BookRepository into the BookService. This should be done using decorators provided by Nest.js.
- Use appropriate error handling techniques, such as Nest.js' exception filters or middleware, to handle errors and provide meaningful error responses to clients.
- Implement appropriate tests using Nest.js' testing utilities to ensure the functionality of the BookService and BookController.
- Ensure the code adheres to Nest.js best practices, such as using decorators for route handlers, implementing proper validation using DTOs (Data Transfer Objects), and using appropriate HTTP status codes for responses.

You must install postgreSQL locally. The options for connecting to the database can be seen in the file app.module.ts (line 12 - 15).
To start the server, use the command - " npm run task1 "
To run the test, use the command - "npm run test"
You can also try to add, take, delete and update books using postman - POST request to "
 http://localhost:3000/books " with body:
{
 "title": "Test Book 2",
 "author": "Author 2",
 "genre": "Genre 2",
 "yearPublished": 2000
}
for requests PUT and DELETE should go to " http://localhost:3000/books/:idBook "