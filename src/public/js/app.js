// frontend server socket connection
const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nickname");

function handleOpen() {
    console.log("Connected to Server ππ»ββοΈ");
}

function makeMessage(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}

function handleMessage(message) {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
}

function handleClose() {
    console.log("Disconnected to Server ππ»βοΈ");
}

function handleSubmit(e) {
    e.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(e) {
    e.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
}

socket.addEventListener("open", handleOpen);
socket.addEventListener("message", handleMessage);
socket.addEventListener("close", handleClose);

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);

// νλ‘ νΈμμ μλ²λ‘ λ³΄λ΄κΈ°
// setTimeout(() => {
//     socket.send("hello from the browser");
// }, 10000);
