console.log("node is running")


// crea local server
let express = require("express"); //Load the express code
let socket = require("socket.io"); //Load the socket package
let app = express(); //create local host
let port = 3000; //dichiara server port (3000 standard)
let server = app.listen(port); //aspetta che qualcuno si connetta (da browser "localhost:3000")
//per stoppare (ctrl+c); per riavviare "node server.js" (da terminale)

//crea folder per client ("public")
app.use(express.static("public")); //mostra ai clienti la certella public

//crea connessione input/output
let io = socket(server) //variabile input output: crea connessione input (da cliente to server)
io.on("connection", newConnection) //all'evento "connection" esegui "newConnection()"
// = esegui ogni volta che si crea una nuova connessione


//Variabili sketch
let numberUser = 0;
var color = ["#F54F29", "#FF974F", "#FFD393", "#9C9B7A", "#405952"];

function newConnection(socket) {
  console.log("new connection: " + socket.client.id) //mostra codice connessione cliente
  //assegna a ogni utente un numero da 1 a 5
  if (numberUser < 5) {
    numberUser++;
  } else {
    numberUser = 1
  };
  //assegna colore per ogni user
  let i = numberUser;
  let clientColor = color[i - 1];

  //emetti messaggio colore e numero utente
  socket.emit("number", numberUser); //manda messaggio "number" per indicare n.utente
  socket.emit("color", clientColor); //manda messaggio "color"
  //manda messaggio a tutti utenti (colore e n.utente)
  let clientData = {
    clientColor: clientColor,
    numberUser: numberUser
  }
  socket.broadcast.emit("newPlayer", clientData);

  socket.on("mouse", mouseMessage); //se arriva un messaggio di tipo "mouse" dal client(nello sketch), mouseMessage()
  function mouseMessage(dataReceived) {
    console.log(socket.client.id, dataReceived);
    socket.broadcast.emit("mouseBroadcast", dataReceived) //crea nuovo messaggio da emettere a ogni client
  }
}
