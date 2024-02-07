let socket;
let id;

const Direction = {
  LEFT: "left",
  RIGHT: "right",
};

document.addEventListener("DOMContentLoaded", function () {
  console.log("conectou");
  if (!socket) {
    socket = new io("http://localhost:3000/");
  }
  socket.on("recived", function (message) {
    createCommun(message.message, Direction.LEFT);
  });
});

let input = document.getElementById("message-input-text");

let submit = document.getElementById("submit");

submit.addEventListener("click", function () {
  if (input.value.trim() === "") {
    return;
  }
  socket.emit("message", input.value);
  createCommun(input.value, Direction.RIGHT);
  input.value = "";
});

function createCommun(message, direction) {
  if (!Object.values(Direction).includes(direction)) {
    console.error("Direção inválida. Use Direction.LEFT ou Direction.RIGHT.");
    return;
  }

  var communElement = document.createElement("div");

  communElement.classList.add("commun");

  communElement.classList.add(direction);

  var paragraphElement = document.createElement("p");

  paragraphElement.textContent = message;

  communElement.appendChild(paragraphElement);

  var messageDisplayElement = document.getElementById("message-display");

  messageDisplayElement.appendChild(communElement);
}

function clickBotaoAoPressionarTecla(event) {
  if (event.keyCode === 13) {
    document.getElementById("submit").click();
  }
}
document.addEventListener("keydown", clickBotaoAoPressionarTecla);
