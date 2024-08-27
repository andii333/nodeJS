const socket = io();
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const inputMessage = document.getElementById("input");
const typing = document.getElementById("typing");
const online = document.getElementById("online");
let arrayTyping = [];
let arrayOnline = [];
const url = new URL(window.location.href);
const nickname = url.searchParams.get("name");
const channel = url.searchParams.get("channel");
inputMessage.addEventListener("input", function () {
  if (inputMessage.value) {
    socket.emit("typing", nickname);
  } else {
    socket.emit("stop typing", nickname);
  }
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputMessage.value && inputMessage.value.length <= 30) {
    socket.emit("chat message", {
      channel: channel,
      message: inputMessage.value,
      nickname: nickname,
      date: new Date(),
    });
    socket.emit("stop typing", nickname);
    inputMessage.value = "";
  }
});

socket.on("chat message", function (data) {
  const liTag = document.createElement("li");
  liTag.append(
    `nickname: ${data.nickname} | date: ${new Date(
      data.date
    ).toLocaleDateString()} | message: ${data.message}`
  );
  messages.appendChild(liTag);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("typing", (nickname) => {
  if (!arrayTyping.includes(nickname)) {
    arrayTyping.push(nickname);
    typing.textContent = "";
    typing.append(`typing: ${arrayTyping}`);
    typing.classList.remove("hide");
  }
});
socket.on("stop typing", (nickname) => {
  const index = arrayTyping.indexOf(nickname);
  arrayTyping.splice(index, 1);
  typing.textContent = "";
  arrayTyping.length
  ? typing.append(`typing: ${arrayTyping}`)
  : (typing.className = "hide");
});
socket.on("online", (nicknames) => {
  arrayOnline = Object.values(nicknames);
  online.textContent = "";
  arrayOnline.length
  ? online.append(`online: ${arrayOnline}`)
  : (online.className = "hide");
});
socket.emit("online", nickname);
setInterval(() => {
  socket.emit("online", nickname);
}, 1000);