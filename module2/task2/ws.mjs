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
inputMessage.addEventListener("input", function () {
  if (inputMessage.value) {
    socket.emit("typing", { nickname, channel });
  } else {
    socket.emit("stop typing", { nickname, channel });
  }
});
function showNewData(tag, nicknames) {
  tag.textContent = "";
  if (nicknames.includes(nickname)) {
    nicknames.splice(nicknames.indexOf(nickname), 1);
  }
  if (nicknames.length) {
    tag.append(`typing: ${nicknames}`);
    tag.classList.remove("hide");
  } else {
    tag.className = "hide";
  }
}
socket.on("online", (nicknames) => {
  showNewData(online, nicknames);
});
socket.on("typing", (nicknames) => {
  showNewData(typing, nicknames);
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
socket.emit("joinChannel", { nickname, channel });
