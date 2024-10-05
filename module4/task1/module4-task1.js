const express = require("express");
const cors = require("cors");
const { validateOrder } = require("./validator.js");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/", validateOrder, (req, res) => {
  res
    .status(200)
    .json({ message: "Order received successfully", order: req.body });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
