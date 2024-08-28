import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();
const __dirname = path.resolve();
const server = http.createServer(app);
const io = new Server(server);
const nicknames = {};
const typingDictionary = {};

app.use(express.static(path.join(__dirname)));
app.get("/chat?", (req, res) => {
  res.sendFile(__dirname + "/chat.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

function addDataToDictionary(dictionary, channel, nickname) {
  if (!dictionary[channel]) {
    dictionary[channel] = [];
  }
  if (!dictionary[channel].includes(nickname)) {
    dictionary[channel].push(nickname);
  }
}
function deleteDataToDictionary(dictionary, channel, nickname) {
  if (
    dictionary[channel] &&
    dictionary[channel].includes(nickname)
  ) {
    const arr = dictionary[channel];
    arr.splice(arr.indexOf(nickname), 1);
    dictionary[channel] = arr;
  }
}
io.on("connection", (socket) => {
  socket.on("joinChannel", (data) => {
    socket.nickname = data.nickname;
    socket.channel = data.channel;
    socket.join(socket.channel);
    addDataToDictionary(nicknames, socket.channel, socket.nickname);
    io.to(socket.channel).emit("online", nicknames[socket.channel]);
  });
  socket.on("disconnect", () => {
    deleteDataToDictionary(nicknames, socket.channel, socket.nickname);
    io.to(socket.channel).emit("online", nicknames[socket.channel]);
    deleteDataToDictionary(typingDictionary, socket.channel, socket.nickname);
    io.to(socket.channel).emit("typing", typingDictionary[socket.channel]);
  });
  socket.on("typing", (data) => {
    addDataToDictionary(typingDictionary, data.channel, data.nickname);
    io.to(data.channel).emit("typing", typingDictionary[data.channel]);
  });
  socket.on("stop typing", (data) => {
    deleteDataToDictionary(typingDictionary, data.channel, data.nickname);
    io.to(data.channel).emit("typing", typingDictionary[data.channel]);
  });
  socket.on("chat message", (msg) => {
    io.to(msg.channel).emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on localhost:3000");
});
