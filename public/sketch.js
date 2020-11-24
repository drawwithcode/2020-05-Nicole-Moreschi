let socket = io();
let myColor = "#000000";
let myImage;
let myNumber = 0;

//ricezione messaggi> chiama funzioni
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor)
socket.on("newPlayer", newPlayer)
socket.on("number", number)

function preload() {
  myImage = loadImage("./addons/urlo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
  //tavolozza
  push();
  strokeWeight(3);
  rect(width / 20, height / 20 * 16, 200, 108);
  pop();
  //welcome message
  push();
  fill(myColor);
  textSize(18);
  text("Welcome " + myColor + ",", width / 20, height / 20 * 14);
  text("check here your color and", width / 20, height / 20 * 15);
  text("fill the right places!", width / 20, height / 20 * 15 + 20);
  pop();
}

function draw() {
  image(myImage, 0, windowHeight/20, windowWidth, windowHeight/20*18);
}

//funzioni da ricezione server
function drawOtherMouse(data) { //draw di altri user
  push()
  noStroke();
  fill(data.color);
  ellipse(data.x, data.y, 20);
  pop()
}

function setColor(assignedColor) { //assegna un colore a mycolor
  myColor = assignedColor;
}

function newPlayer(clientColor) { //assegna un colore a altri user
  push();
  rectMode(CENTER);
  fill("white");
  noStroke();
  rect(width / 10 * 9, height / 20 * 19, 200, 50);
  pop();

  push();
  textAlign("center");
  textSize(15);
  fill(clientColor);
  text("Color " + clientColor + " has joined", width / 10 * 9, height / 20 * 19);
  pop();
}

function number(assignedNumber) { //numera utenti (serve per selezionare colori)
  myNumber = assignedNumber
}

function mouseDragged() {
  push();
  noStroke();
  fill(myColor);
  ellipse(mouseX, mouseY, 20);
  pop();
  // messaggio
  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor
  };
  //send to the server
  socket.emit("mouse", message);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
