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
    console.log(message);
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

// Enum para representar as direções

// Função para criar o objeto "commun" dentro de "message-display"
function createCommun(message, direction) {
  // Verificar se a direção fornecida é válida
  if (!Object.values(Direction).includes(direction)) {
    console.error("Direção inválida. Use Direction.LEFT ou Direction.RIGHT.");
    return;
  }

  // Criar um novo elemento div
  var communElement = document.createElement("div");

  // Adicionar a classe "commun" ao novo elemento
  communElement.classList.add("commun");

  // Adicionar a classe de direção fornecida ao novo elemento
  communElement.classList.add(direction);

  // Criar um novo elemento parágrafo
  var paragraphElement = document.createElement("p");

  // Definir o texto da mensagem como conteúdo do parágrafo
  paragraphElement.textContent = message;

  // Adicionar o parágrafo como filho do elemento "commun"
  communElement.appendChild(paragraphElement);

  // Encontrar o elemento com id "message-display"
  var messageDisplayElement = document.getElementById("message-display");

  // Adicionar o elemento "commun" criado como filho do elemento "message-display"
  messageDisplayElement.appendChild(communElement);
}

// Exemplo de uso da função

function clickBotaoAoPressionarTecla(event) {
  // Verifica se a tecla pressionada é a tecla desejada (por exemplo, "Enter" - código 13)
  if (event.keyCode === 13) {
    // 13 é o código para a tecla "Enter"
    // Simula um clique no botão
    document.getElementById("submit").click();
  }
}

// Adiciona um ouvinte de evento de teclado ao documento
document.addEventListener("keydown", clickBotaoAoPressionarTecla);
