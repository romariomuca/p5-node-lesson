console.log("I'm running ");

let express = require("express"); //we are putting the libriary in a var, express create server

let app = express(); //app is the reslut of running the express funtion created before

let port = 3000;

let server = app.listen(port); //the connection will happen on the port 3000

console.log("server is running on http://localhost:" + port);

app.use(express.static("public")); //il folder public non verrà cambiato over time ma è statico

let serverSocket = require("socket.io"); //creo variabile che contiene la libreria socket

let io = serverSocket(server); //Io = input/output diventa serverSocket con dentro la variabile che fa attivare express

io.on("connection", newConnection);
//se un messaggio connection arriva allora reagisce con la funzione newConnection
//we have to add on the client side the connection part otherwise we it won't happen nothing - go on index and sketch
//every time a client connect we will have the function newConnection ,
//ogni persona che si connette io vedrò nel console log un nuovo newSocket.id

function newConnection(newSocket) {
  console.log(newSocket.id); //contains the unique id of client connection

  newSocket.on("mouse", mouseMessage); //newsocket is the connection, quando ricevo un messaggio di tipo "mouse" allora execute funzione mouseMessage che contiene il data Received

  function mouseMessage(dataReceived) {
    //datarecived è ciò che viene creato sul server quando ricevo mouse dal client
    console.log(dataReceived);

    newSocket.broadcast.emit("mouseBroadcast", dataReceived); //boradcast send the emssage to all others except the one the send us the message
  }
}
