// auth.js
const express = require("express");
const crypto = require("crypto");
const pool = require("./db");

const router = express.Router();
const scrypt = crypto.scrypt;
const randomBytes = crypto.randomBytes;

const hashPassword = (password, salt) => {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString("hex"));
    });
  });
};

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = await hashPassword(password, salt);

    // Збереження користувача в базі даних
    const result = await pool.query(
      "INSERT INTO users (email, password_hash, salt) VALUES ($1, $2, $3) RETURNING id",
      [email, `${salt}:${hashedPassword}`, salt]
    );
    res
      .status(201)
      .json({
        message: "User is registered",
        userId: result.rows[0].id,
      });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Not predicted server error" });
  }
});

// Вхід користувача
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userResult = await pool.query(
      "SELECT password_hash FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rowCount === 0) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const [storedSalt, storedHash] =
      userResult.rows[0].password_hash.split(":");
    const hashedPassword = await hashPassword(password, storedSalt);

    if (hashedPassword === storedHash) {
      res.status(200).json({ message: "Successful login" });
    } else {
      res.status(403).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Not predicted server error" });
  }
});

module.exports = router;
