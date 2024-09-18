Task

1. Implement passport.js middleware, which should accept an object with username and password fields, validate them and pass on or return an error.

2. Implement simple POST endpoint /login, which should call middleware from the previous point and redirect to root endpoint on success and to itself on failure.

3. Implement any endpoint and protect it with middleware from the point 1.

To see result you have to do:
1)To run server text in command line: " npm run task1"
2)Open in browser " http://localhost:3000/login "
3)To login use:
  user: { username: "user", password: "password" },
  or
  user1: { username: "user1", password: "password1" },
  or
  user2: { username: "user2", password: "password2" },

  After authorization in cookies you will see: connect.sid 