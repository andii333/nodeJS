const socket = io();
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const inputMessage = document.getElementById("input");
const typing = document.getElementById("typing");
const online = document.getElementById("online");
const url = new URL(window.location.href);
const nickname = url.searchParams.get("name");
const channel = url.searchParams.get("channel");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputMessage.value && inputMessage.value.length <= 30) {
    socket.emit("chat message", {
      channel: channel,
      message: inputMessage.value,
      nickname: nickname,
      date: new Date(),
    });
    socket.emit("stop typing", { channel, nickname });
    inputMessage.value = "";
  }
});
socket.on("chat message", function (data) {
  if (data.nickname !== nickname) {
    const liTag = document.createElement("li");
    liTag.append(
      `nickname: ${data.nickname} | date: ${new Date(
        data.date
      ).toLocaleDateString()} | message: ${data.message}`
    );
    messages.appendChild(liTag);
    window.scrollTo(0, document.body.scrollHeight);
  }
});
inputMessage.addEventListener("input", function () {
  if (inputMessage.value) {
    socket.emit("typing", { nickname, channel });
  } else {
    socket.emit("stop typing", { nickname, channel });
  }
});

socket.on("typing", (nicknames) => {
  typing.textContent = "";
  if (nicknames.includes(nickname)) {
    nicknames.splice(nicknames.indexOf(nickname), 1);
  }
  if (nicknames.length) {
    typing.append(`typing: ${nicknames}`);
    typing.classList.remove("hide");
  } else {
    typing.className = "hide";
  }
});
socket.on("online", (nicknames) => {
  online.textContent = "";
  if (nicknames.includes(nickname)) {
    nicknames.splice(nicknames.indexOf(nickname), 1);
  }
  if (nicknames.length) {
    online.append(`online: ${nicknames}`);
    online.classList.remove("hide");
  } else {
    online.className = "hide";
  }
});
socket.emit("joinChannel", { nickname, channel });
