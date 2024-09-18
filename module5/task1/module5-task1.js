const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const users = {
  user: { username: "user", password: "password" },
  user1: { username: "user1", password: "password1" },
  user2: { username: "user2", password: "password2" },
};

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users[username];
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser((username, done) => {
  const user = users[username];
  done(null, user ? user : false);
});

app.get("/login", (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="post">
      <label for="username">username:</label>
      <input type="text" id="username" name="username" required><br><br>

      <label for="password">password:</label>
      <input type="password" id="password" name="password" required><br><br>

      <button type="submit">Enter</button>
    </form>
  `);
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/protected",
    failureRedirect: "/login",
  })
);

app.get("/protected", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send("Це захищений маршрут. Ви автентифіковані.");
  } else {
    res.redirect("/login");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
