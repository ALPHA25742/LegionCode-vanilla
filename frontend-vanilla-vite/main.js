{
  // import './style.css'
  // import javascriptLogo from './javascript.svg'
  // import viteLogo from '/vite.svg'
  // import { setupCounter } from './counter.js'
  // document.querySelector('#app').innerHTML = `
  //   <div>
  //     <a href="https://vitejs.dev" target="_blank">
  //       <img src="${viteLogo}" class="logo" alt="Vite logo" />
  //     </a>
  //     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
  //       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
  //     </a>
  //     <h1>Hello Vite!</h1>
  //     <div class="card">
  //       <button id="counter" type="button"></button>
  //     </div>
  //     <p class="read-the-docs">
  //       Click on the Vite logo to learn more
  //     </p>
  //   </div>
  // `
  // setupCounter(document.querySelector('#counter'))
}

import { io } from "socket.io-client"; 

const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

const socket = io("http://localhost:3000");
const userSocket = io("http://localhost:3000/user", {auth:{token:"test"}});
socket.on("connect", () => displayMessage(`You are connected with ${socket.id}`));

userSocket.on("connect_error", (err) => {displayMessage(err.message)});

socket.on("recieved-message", (message) => {
  displayMessage(message);
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;
  if (message === "") return;
  displayMessage(message);
  socket.emit("send-message", message,room);//custom event with arguments and the callback function should be the last argument

  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
  socket.emit("join-room", room,message=>displayMessage(message));
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div);
}

//we also have socket.connect() and socket.disconnect() methods and if we get disconnected and reestablish the connection we can choose to send messages from where we left off or skip which we missed by doing socket.volatile......