import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();
const __dirname = path.resolve();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname)));
app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/chat.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("online", (nickname) => {
    socket.broadcast.emit("online", nickname);
  });
  // socket.on("disconnect", (nickname) => {
  //   socket.broadcast.emit("disconnect", nickname);
  // });
  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", msg);
  });
  socket.on("typing", (nickname) => {
    socket.broadcast.emit("typing", nickname);
  });
  socket.on("stop typing", (nickname) => {
    socket.broadcast.emit("stop typing", nickname);
  });
});

server.listen(3000, () => {
  console.log("listening on localhost:3000");
});
