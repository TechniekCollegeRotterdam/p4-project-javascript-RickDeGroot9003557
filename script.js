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
//Adds key movement to the screen
window.addEventListener("keypress", doKeyDown, false);
//If specific key is pressed, move down or up
function doKeyDown(e) {
    const key = e.key;
    //If w key is pressed, player one moves up
    if(key == "w" && playerOne.y - playerOne.gravity > 0) {
        playerOne.y -= playerOne.gravity * 5;
    }
    //If s key is pressed, player one moves down
    else if(key == "s" && playerOne.y + playerOne.height+ playerOne.gravity < canvas.height) {
        playerOne.y -= playerOne.gravity * -5;
    }
    //if key is pressed, player two moves up
    if(key == "i" && playerTwo.y - playerTwo.gravity > 0) {
        playerTwo.y -= playerTwo.gravity * 5;
    }
    //if key is pressed, player two moves down
    else if(key == "k" && playerTwo.y + playerTwo.height+ playerTwo.gravity < canvas.height) {
        playerTwo.y -= playerTwo.gravity * -5;
    }
}

//A constructor so we can create our elements
class Element {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.speed = options.speed || 2;
        this.gravity = options.gravity;
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
    speed: 3,
    gravity: 1,
});
//Creates the function to draw the element
function drawElement(element) {
    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.width, element.height);
};
//Creates the function to show the score for player one
function showScoreOne() {
    ctx.font = "30px";
    ctx.fillStyle = "red";
    ctx.fillText(scoreOne, canvas.width / 2 - 75, 40);
};
//creates the function to show the score for player two
function showScoreTwo() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText(scoreTwo, canvas.width / 2 + 75, 40);
};
//Makes the ball counce
function bounce() {
    if(ball.y + ball.gravity <= 0 || ball.y + ball.gravity >= canvas.height) {
        ball.gravity  = ball.gravity * -1;
        ball.y += ball.gravity;
        ball.x += ball.speed;
    } else {
        ball.y += ball.gravity;
        ball.x += ball.speed;
    };
    wallCollision();
};
//Detects collision between the ball and the walls of the game
function wallCollision() {
    if((ball.y + ball.gravity <= playerTwo.y + playerTwo.height 
        && ball.x + ball.width + ball.speed >= playerTwo.x
        && ball.y + ball.gravity > playerTwo.y)
        || (ball.y + ball.gravity > playerOne.y
        && ball.x + ball.speed <= playerOne.x + playerOne.width)) {
            ball.speed = ball.speed * -1;
        //Adds score for player two if the ball goes past player one
        } else if (ball.x + ball.speed < playerOne.x) {
            scoreTwo += 1;
            ball.speed = ball.speed * -1;
            ball.x = 396.25 + ball.speed;
            ball.y += ball.gravity;
        //Adds score for player one if the ball goes past player two
        } else if(ball.x + ball.speed > playerTwo.x + playerTwo.width) {
            scoreOne += 1;
            ball.speed = ball.speed * -1;
            ball.x = 396.25 + ball.speed;
            ball.y += ball.gravity;
        }
    drawElements();
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
    bounce();
    window.requestAnimationFrame(loop);
};
//Calls the loop function
loop();
