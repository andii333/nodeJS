require("dotenv").config();
const express = require("express");
const axios = require("axios");
const csv = require("csv-parser");
const { Transform } = require("stream");
const cors = require("cors");
const app = express();
const PORT = 4000;
const csvUrl = process.env.CSV_URL;

app.use(express.json());
app.use(cors());

const limitRows = (rows, limit) => {
  if (limit && rows.length > limit) {
    return rows.slice(0, limit);
  }
  return rows;
};

app.post("/transform/json", async (req, res) => {
  const rowLimit = parseInt(req.query.rows)+1 || null;

  res.setHeader("Content-Type", "application/json");

  let rows = [];

  try {
    const response = await axios.post(
      csvUrl,
      { limit: rowLimit, type: "row" },
      { responseType: "stream" }
    );

    response.data
      .pipe(csv())
      .on("data", (row) => {
        rows.push(row);
        if (rowLimit && rows.length >= rowLimit) {
          response.data.destroy();
        }
      })
      .on("end", () => {
        rows = limitRows(rows, rowLimit);
        res.json(rows);
      })
      .on("error", (err) => {
        res.status(500).json({ error: "Error processing CSV data" });
      });
  } catch (err) {
    res.status(500).json({ error: "Error fetching CSV file." });
  }
});

app.post("/transform/ndjson", async (req, res) => {
  const rowLimit = parseInt(req.query.rows)+1 || null;

  res.setHeader("Content-Type", "application/x-ndjson");

  let rowCount = 0;

  const ndjsonTransform = new Transform({
    writableObjectMode: true,
    transform(row, encoding, callback) {
      if (!rowLimit || rowCount < rowLimit) {
        this.push(JSON.stringify(row) + "\n");
        rowCount++;
      }
      callback();
    },
  });

  try {
    const response = await axios.post(
      csvUrl,
      { limit: rowLimit, type: "row" },
      { responseType: "stream" }
    );

    response.data
      .pipe(csv())
      .pipe(ndjsonTransform)
      .pipe(res)
      .on("finish", () => res.end())
      .on("error", (err) => {
        res.status(500).json({ error: "Error processing CSV data" });
      });
  } catch (err) {
    res.status(500).json({ error: "Error fetching CSV file." });
  }
});

app.listen(PORT, () => {
  console.log(`Transform server running on port ${PORT}`);
});
