Task

1. Implement simple POST endpoint /login, which should accept an object with username and password fields, validate them and return a token on success or an error message.

2. Implement middleware, which should check header Authorization for the presence of a token and call the next handler or return an error message.

3. Implement any endpoint and protect it with middleware from the previous point.

To run server text in command line: "npm run task4"

Try in postman:
1. Setup the /login Endpoint:
a) Open Postman
Launch Postman and create a new POST request.
b) Set the URL for the /login endpoint:
Copy code
http://localhost:3000/login
c) Add the JSON body:
Click on the Body tab.
Select raw and choose JSON format.
Add the following content to the body:
json
Copy code
{
  "username": "user1",
  "password": "password1"
}
d) Send the request:
Click the Send button.
You should receive a response with a token, such as:
json
Copy code
{
  "token": "user1-mySecretKey"
}
2. Test the Protected Endpoint /protected:
a) Create a new GET request:
Create another request in Postman, this time GET.
b) Set the URL for the /protected endpoint:
bash
Copy code
http://localhost:3000/protected
c) Add the Authorization Header:
Go to the Headers tab.
Add a new header with the key Authorization and value Bearer your_token, replacing your_token with the token you received from the /login response. Example:
makefile
Copy code
Authorization: Bearer user1-mySecretKey
d) Send the request: