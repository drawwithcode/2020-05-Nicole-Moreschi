console.log("node is running")


// crea local server
let express = require("express");
let socket = require("socket.io");
let app = express();
let port = 3000;
let server = app.listen(port);

//crea folder per client ("public")
app.use(express.static("public"));

//crea connessione input/output
let io = socket(server)
io.on("connection", newConnection)

//colori disponibili
let nUser = 0; //per numerare utenti
var color = ["#c82f0e", "#e29432", "#e9e3b3", "#518d84", "#162a49", "#1d1415", "#712c0b", "#945537"];

function newConnection(socket) {
  //assegna a ogni utente un numero da 1 a 8
  if (nUser < 8) {
    nUser++;
  } else {
    nUser = 1
  };
  //assegna colore per ogni utente
  let i = nUser;
  let clientColor = color[i - 1];

  //emetti numero e colore
  socket.emit("number", nUser); //numero utente
  socket.emit("color", clientColor); //colore utente

  //manda broadcast (colore)
  socket.broadcast.emit("newPlayer", clientColor);

  socket.on("mouse", mouseMessage);

  function mouseMessage(dataReceived) {
    socket.broadcast.emit("mouseBroadcast", dataReceived)
  }
}
