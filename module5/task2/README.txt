Express, crypto, PostgreSQL

Task

Build a small Node.js server that allows users to create an account and login securely. Users should be able to register by email. Server should store users' passwords using a secure hashing algorithm provided by Node.js' built-in crypto module, and it should verify passwords by comparing the stored hash with a newly computed hash of the entered password.

Requirements:

- Server should allow users to create an account by providing a valid email as a login and password. The password should be hashed securely using the crypto module's scrypt function.

- The application should store the email and the hashed password in a database.

- The application should allow users to log in by providing their email and password. The entered password should be hashed using the crypto module's scrypt function, and the resulting hash should be compared with the stored hash in the database.

- If the password entered is correct, the application should allow the user to access their account. (200 response). If the entered password is incorrect, the application should deny access and provide a descriptive error message. (403 response)

I had problems with twilio and did this task.

To run server text in command line " npm run task2 "
You need create table in sql database
You can try result by postman: to register  -   POST http://localhost:3000/register
with json
{
  "email": "any email",
  "password": "any password"
}
You can try result by postman: to login  -   POST http://localhost:3000/register
with json
{
  "email": "your previous email",
  "password": "your previous password"
}


