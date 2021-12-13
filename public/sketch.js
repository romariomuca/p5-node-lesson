/*
newBubble.color = random([
  "rgb(255,255,255)",
  "rgb(255,239,255)",
  "rgb(245,255,249)",
  "rgb(255,233,244)",
  "rgb(233,244,255)",
]);
*/
//aggiungo font
let font;
let font2;
//aggiungo il suono
let song_stars;
let song_starsBroadcast;
let ambient_sound;

let cont_stelle = 0;
let cont_stelle_dimensione2 = 0;
let entrata = false;

let clientSocket = io(); //io() is pre-build funciton it would be socket.io
//creo variabile clientSocket che è uguale io() che sta caricando la libreria grazie al html file

clientSocket.on("connect", newConnection); //when client connect to the server faccio funzione newConnection
clientSocket.on("mouseBroadcast", newBroadcast); //client socket cìmouse broadcast quando lo riceve faccio funzione newBoradcast

function preload() {
  //carico canzoni
  song_stars = loadSound("assets/song_stars2.mp3");
  song_starsBroadcast = loadSound("assets/song_stars.mp3");
  ambient_sound = loadSound("assets/ambient_sound.mp3");
  song_stars.setVolume(0.8);
  ambient_sound.setVolume(0.8);
  font1 = loadFont("assets/font1.ttf");
  font2 = loadFont("assets/font2.ttf");
}

function setup() {
  //cambio cursore
  cursor(CROSS);
  //attivo musica ambientale
  ambient_sound.loop();

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
    console.log("sono denttro");
    noStroke();
    fill(
      random([
        "rgb(255, 239, 255)",
        "rgb(245, 255, 249)",
        "rgb(255, 233, 244)",
        "rgb(233, 244, 255)",
      ])
    );
    cont_stelle_dimensione2++;
    song_starsBroadcast.play();
    circle(data.x, data.y, random(3, 6));
    entrata = false;
  }
  console.log(entrata);
  console.log("guarda qui:", data.x, data.y);
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
  //mostro contatore stelle
  textFont(font2);
  fill("black");
  rect(9, 9, 130, 120);
  fill("white");
  textSize(10);
  text("draw your universe ©", 10, 20);

  textFont(font1);
  text("galaxies:", 10, 40);
  text(cont_stelle, 10, 52);
  text("wormholes:", 10, 65);
  text(cont_stelle_dimensione2, 10, 77);

  text("coordinates:", 10, 89);
  text(int(mouseX), 10, 101);
  text(int(mouseY), 40, 101);

  text("years:", 10, 115);
  text(frameCount, 10, 127);
}
function mouseClicked() {
  entrata = true;
  cont_stelle++;
  console.log(cont_stelle);

  //parto canzone delle stelline
  song_stars.play();
  noStroke();
  fill("white");
  circle(mouseX, mouseY, random(1, 4));
}
function mouseMoved() {
  let message = {
    x: mouseX,
    y: mouseY,
  };

  clientSocket.emit("mouse", message); //send to server con il nome "mouse"
}
