//Creates a variable containing the id of the canvas
const canvas = document.getElementById("pong");
//Creates a variable with the 2D rendering context for drawing on the canvas
const ctx = canvas.getContext("2d");
//Sets the width and height of the canvas 
canvas.width = 812.5;
canvas.height = 500;
//Sets the starting variables for the scores for player one and two
let scoreOne = 0;
let scoreTwo = 0;
//A constructor so we can create our elements
class Element {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.speed = options.x || 2;
        this.gravity = options.x;
    }
}
//Makes player one
const playerOne = new Element({
    x: 15,
    y: 200,
    width: 20,
    height: 100,
    color: "red",
    gravity: 2,
});
//Makes player two
const playerTwo = new Element({
    x: 782.5,
    y: 200,
    width: 20,
    height: 100,
    color: "blue",
    gravity: 2,
});
//Makes the ball
const ball = new Element({
    x: 396.25,
    y: 240,
    width: 20,
    height: 20,
    color: "white",
    speed: 1,
    gravity: 1,
});
//Creates the function to draw the element
function drawElement(element) {
    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.width, element.height);
};
//Creates the function to show the score for player one
function showScoreOne() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(scoreOne, canvas.width / 2 - 75, 40);
};
//creates the function to show the score for player two
function showScoreTwo() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText(scoreTwo, canvas.width / 2 + 75, 40);
};
//Creates a function that draws all elements
function drawElements() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawElement(playerOne);
    drawElement(playerTwo);
    drawElement(ball);
    showScoreOne();
    showScoreTwo();
};
//Creates a function that keeps drawing everything
function loop() {
    drawElements();
    window.requestAnimationFrame(loop);
}
//Calls the loop function
loop();