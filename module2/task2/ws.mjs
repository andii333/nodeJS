const socket = io();
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const inputMessage = document.getElementById("input");
const chat1 = document.getElementById("chat1");
const chat2 = document.getElementById("chat2");
const chat3 = document.getElementById("chat3");
const activeChat = document.getElementById("active-chat");
const nameInput = document.getElementById("name");
const activeName = document.getElementById("active-name");
const typing = document.getElementById("typing");
const online = document.getElementById("online");
let nickname = "";
let chatNumber = 1;
let arrayTyping = [];
let arrayOnline = [];

chat1.onclick = function () {
  chooseChat(1);
};
chat2.onclick = function () {
  chooseChat(2);
};
chat3.onclick = function () {
  chooseChat(3);
};
function chooseChat(chatId) {
  activeChat.textContent = `chat${chatId}`;
  activeName.textContent = nameInput.value.toString();
  nickname = nameInput.value.toString();
  chatNumber = chatId;
}

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
      channel: chatNumber,
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
socket.on("online", (nickname) => {
  const index = arrayOnline.indexOf(nickname);
  arrayOnline.splice(index, 1);
  online.textContent = "";
  arr.length ? online.append(`online: ${arr}`) : (online.className = "hide");
});
socket.on("disconnect", (nickname) => {
  const index = arrayOnline.indexOf(nickname);
  arrayOnline.splice(index, 1);
  online.textContent = "";
  arrayOnline.length
    ? online.append(`online: ${arrayOnline}`)
    : (online.className = "hide");
});
