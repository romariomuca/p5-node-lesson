let clientSocket = io(); //io() is pre-build funciton it would be socket.io
//creo variabile clientSocket che è uguale io() che sta caricando la libreria grazie al html file

clientSocket.on("connect", newConnection); //when client connect to the server faccio funzione newConnection
clientSocket.on("mouseBroadcast", newBroadcast); //client socket cìmouse broadcast quando lo riceve faccio funzione newBoradcast

function newConnection() {
  console.log(clientSocket.id); //vedrò l'id di connessione del server
}

function newBroadcast(data) {
  //function every time i have info from another server
  console.log(data);
  fill("red");
  circle(data.x, data.y, 10);
}

function setup() {
  background(220);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  fill("yellow");
  circle(mouseX, mouseY, 30);
}

function mouseMoved() {
  let message = {
    x: mouseX,
    y: mouseY,
  };

  clientSocket.emit("mouse", message); //send to server con il nome "mouse"
}
