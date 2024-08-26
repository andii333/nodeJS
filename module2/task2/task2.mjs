import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();
const __dirname = path.resolve();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname)));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on localhost:3000");
});
