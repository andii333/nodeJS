const express = require("express");
const app = express();

const port = 3000;

const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

const SECRET_KEY = "mySecretKey";

app.use(express.json());

const generateToken = (username) => {
  return `${username}-${SECRET_KEY}`;
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const [username, secret] = token.split("-");

  if (secret !== SECRET_KEY) {
    return res.status(403).json({ error: "Invalid token" });
  }

  req.user = { username };
  next();
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user.username);
  res.json({ token });
});

app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username}! You have accessed a protected route.`,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
