import express from "express";
import { generateFakeData } from "./generateFakeData.mjs";
import { displayMemoryUsage } from "./displayMemoryUsage.mjs";
import { Readable } from "stream";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/csv", (req, res) => {
  console.log("CSV request received");

  try {
    const { limit, type } = req.body;

    if (!limit || !type) {
      return res
        .status(400)
        .send("Missing required parameters: limit or type.");
    }

    const headers = {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="data.csv"',
    };
    res.writeHead(200, headers);

    let rowCount = 0;
    let currentFileSize = 0;
    const mbToBt = 1000000;
    const CHUNK_SIZE = 1000000;

    const csvStream = new Readable({
      read() {
        if (
          type === "size" &&
          !isNaN(limit) &&
          currentFileSize >= limit * mbToBt
        ) {
          this.push(null);
          console.log(`File size limit of ${limit}MB reached.`);
          return;
        }
        
        if (type === "row" && !isNaN(limit) && rowCount >= limit) {
          this.push(null);
          console.log(`Row limit of ${limit} rows reached.`);
          return;
        }
        
        rowCount++;
        const fakeData = generateFakeData(rowCount) + "\n";
        currentFileSize += Buffer.byteLength(fakeData);
        displayMemoryUsage();
        
        if (Buffer.byteLength(fakeData) >= CHUNK_SIZE) {
          this.push(fakeData);
        } else {
          this.push(fakeData);
        }
      },
    });
    
    csvStream.pipe(res);
    
    csvStream.on("end", () => {
      console.log("CSV file sent successfully");
    });

    csvStream.on("error", (error) => {
      console.error("Error occurred:", error);
      if (!res.headersSent) {
        res.status(500).send("An error occurred while generating CSV.");
      }
      console.log("Error sending CSV file");
    });
  } catch (error) {
    console.error("Error occurred:", error);
    if (!res.headersSent) {
      res.status(500).send("An error occurred while generating CSV.");
    }
    console.log("Error occurred during CSV generation");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
