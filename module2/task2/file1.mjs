const chat1 = document.getElementById("chat1");
const chat2 = document.getElementById("chat2");
const chat3 = document.getElementById("chat3");
const nameInput = document.getElementById("name");
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
   const nickname = nameInput.value.toString();
    if (nickname){
        window.location = "/chat?channel=" + chatId + "&name=" + nickname;
    }
}
