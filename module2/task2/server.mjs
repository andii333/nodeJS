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
  socket.on("joinChannel", (data) => {
    socket.join(data.channel);
    socket.nickname = data.nickname;
    socket.channel = data.channel;
    if (!nicknames[data.channel]) {
      nicknames[data.channel] = [];
    }
    if (!nicknames[data.channel].includes(data.nickname)) {
      nicknames[data.channel].push(data.nickname);
    }
    io.to(data.channel).emit("online", nicknames[data.channel]);
  });
  socket.on("disconnect", () => {
    if (nicknames[socket.channel] && nicknames[socket.channel].includes(socket.nickname)) {
      const arr = nicknames[socket.channel];
      arr.splice(arr.indexOf(socket.nickname),1);
      nicknames[socket.channel] = arr;
      io.to(socket.channel).emit("online", nicknames[socket.channel]);
    }
  });
  // socket.on("chat message", (msg) => {
  //   socket.to(msg.channel).broadcast.emit("chat message", msg);
  // });
  // socket.on("typing", (data) => {
  //   socket.to(data.channel).broadcast.emit("typing", data.nickname);
  // });
  // socket.on("stop typing", (data) => {
  //   socket.to(data.channel).broadcast.emit("stop typing", data.nickname);
  // });
});

server.listen(3000, () => {
  console.log("listening on localhost:3000");
});
