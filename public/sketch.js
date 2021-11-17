let clientSocket = io(); //creo variabile clientSocket che è uguale io() che sta caricando la libreria grazie al html file

clientSocket.on("connect", newConnection);

function newConnection() {
  console.log(clientSocket.id); //vedrò l'id di connessione del server
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  circle(mouseX, mouseY, 30);
}
