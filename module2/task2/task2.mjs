import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();
const __dirname = path.resolve();
const server = http.createServer(app);
const io = new Server(server);
const nicknames = {};

app.use(express.static(path.join(__dirname)));
app.get("/chat?", (req, res) => {
  res.sendFile(__dirname + "/chat.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("online", (nickname) => {
    if (!Object.values(nicknames).includes(nickname)) {
      nicknames[socket.id] = nickname;
    }
    socket.emit("online", nicknames);
    console.log('nicknames', nicknames)
  });
  socket.on("disconnect", () => {
    if (Object.keys(nicknames).includes(socket.id)) {
      delete nicknames[socket.id];
      socket.emit("online", nicknames);
      console.log('nicknames', nicknames)
    }
  });
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
