Task

1. Init new Nest.js project.

2. Implement GoogleOauth module, which should use google-ouath strategy and provide google-oauth guard.

3. Implement any module, where route(s) should be guarded by this guard.

4. Implement a route GET /user, which should return info about logged user from the Google.

You should run nestJS app, text in command line " npm run start "
You can do request by browser " http://localhost:3000/user " it isn`t protected.
And request " http://localhost:3000/auth/google/callback " is protected by GoogleOauth.