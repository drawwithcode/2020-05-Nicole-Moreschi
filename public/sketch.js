let socket = io();
let myColor = "white";
let myImage;
let myNumber = 0;

//ricezione messaggi
socket.on("connect", newConnection); //quando mi connetto, chiama funzione newConnection
socket.on("mouseBroadcast", drawOtherMouse); //quando arriva messaggio "mouseBroadcast", drawOtherMouse()
socket.on("color", setColor) //quando arriva messaggio "color", setColor();
socket.on("newPlayer", newPlayer) //quando arriva messaggio "color", setColor();
socket.on("number", number) //quando arriva messaggio "myNumber", myNumber();

function preload() {
  myImage = loadImage("./addons/haring.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");

  //welcome
  push();
  textAlign("center");
  fill(myColor);
  textSize(20);
  text("Welcome! let's color the guy N. " + myNumber + " to complete the canvas", width / 2, height / 20 * 19);
  pop();

  // Create a button for saving the canvas
  btn = createButton("Save Canvas");
  btn.position(width / 2-40, height / 20 * 17.5);
  btn.mousePressed(saveToFile);

  function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
  }

  function saveToFile() {
    // Save the current canvas to file as png
    saveCanvas('mycanvas', 'png')
  }


}

function draw() {
  image(myImage, 0, 0, windowWidth, windowHeight - windowHeight / 5);
}


//Funzioni avviate dalla ricezione di messaggi dal server
function newConnection() {
  console.log("your ID: " + socket.id) //mostra mio codice connessione
}

function drawOtherMouse(data) { //disegna ellissi di altri client
  push()
  noStroke();
  fill(data.color);
  ellipse(data.x, data.y, 20);
  pop()
}

function setColor(assignedColor) { //assegna un  colore a variabile new color
  myColor = assignedColor;
}

function newPlayer(newPlayerData) {
  push();
  rectMode(CENTER);
  fill("black");
  noStroke();
  rect(width / 10 * 9, height / 20 * 19, 200, 50);
  pop();

  push();
  textAlign("center");
  textSize(15);
  fill(newPlayerData.clientColor);
  text("User " + newPlayerData.numberUser + " has joined", width / 10 * 9, height / 20 * 19);
  pop();
}

function number(assignedNumber) { //assegna numero ad ogni utente
  myNumber = assignedNumber
}

function mouseDragged() {
  push();
  noStroke();
  fill(myColor);
  ellipse(mouseX, mouseY, 20);
  pop();
  //crea messaggio
  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor
  };
  //send to the server
  socket.emit("mouse", message);
}
