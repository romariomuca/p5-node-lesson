/*
newBubble.color = random([
  "rgb(255,255,255)",
  "rgb(255,239,255)",
  "rgb(245,255,249)",
  "rgb(255,233,244)",
  "rgb(233,244,255)",
]);
*/

let entrata = false;

let clientSocket = io(); //io() is pre-build funciton it would be socket.io
//creo variabile clientSocket che è uguale io() che sta caricando la libreria grazie al html file

clientSocket.on("connect", newConnection); //when client connect to the server faccio funzione newConnection
clientSocket.on("mouseBroadcast", newBroadcast); //client socket cìmouse broadcast quando lo riceve faccio funzione newBoradcast

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");
}

function newConnection() {
  console.log(clientSocket.id); //vedrò l'id di connessione del server
}

//quello che succede quando vedo gli altri utenti fare cose
function newBroadcast(data) {
  //function every time i have info from another server
  /*
  console.log(data); //data è l'array che contiene posizione x e y del mouse. si connette al server grazue a mousebroadcast e newbroadcast
  noStroke();
  fill("white");
  circle(data.x, data.y, random(1, 10));
  */
  if (entrata == true) {
    console.log("sonod enttro");
    noStroke();
    fill("white");
    circle(data.x, data.y, random(1, 3));
    entrata = false;
  }
}

//QUI SUCCEDE quello che fa il primo utente
function draw() {
  //background("yellow");
  //I can put all the informations about stroke and fill.
  /*
  noStroke();
  fill(0, 0, 255, 5);
  circle(mouseX, mouseY, random(1, 10));
  */
}
function mouseClicked() {
  entrata = true;
  noStroke();
  fill("red");
  circle(mouseX, mouseY, random(3, 6));
}
function mouseMoved() {
  let message = {
    x: mouseX,
    y: mouseY,
  };

  clientSocket.emit("mouse", message); //send to server con il nome "mouse"
}
