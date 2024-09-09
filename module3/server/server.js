import express from "express";
import { randomUUID } from "crypto";
const app = express();
const port = 3000;

app.get("/random/uuid", (req, res) => {
  res.json({ uuid: randomUUID() });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
