const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./auth");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server is working on port:  ${port}`);
});
