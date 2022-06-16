//Creates a variable containing the id of the canvas
const canvas = document.getElementById("pong");
const startScreenCanvas = document.getElementById("startScreenCanvas");
//Creates a variable with the 2D rendering context for drawing on the canvas
const ctx = canvas.getContext("2d");
//Sets the width and height of the canvas 
canvas.width = 812.5;
canvas.height = 500;
startScreenCanvas.width = canvas.width;
startScreenCanvas.height = canvas.height;
//Sets the starting variables for the scores for player one and two
let scoreOne = 0;
let scoreTwo = 0;
//Adds key movement to the screen
window.addEventListener("keypress", doKeyDown, false);
//If specific key is pressed, move down or up
function doKeyDown(e) {
    const key = e.key;
    //If w key is pressed, player one moves up
    if(key == "w" && playerOne.y - playerOne.gravity > 10) {
        playerOne.y -= playerOne.gravity * 5;
    }
    //If s key is pressed, player one moves down
    else if(key == "s" && playerOne.y + playerOne.height + playerOne.gravity < 490) {
        playerOne.y -= playerOne.gravity * -5;
    }
    //if key is pressed, player two moves up
    if(key == "i" && playerTwo.y - playerTwo.gravity > 10) {
        playerTwo.y -= playerTwo.gravity * 5;
    }
    //if key is pressed, player two moves down
    else if(key == "k" && playerTwo.y + playerTwo.height + playerTwo.gravity < 490) {
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
    x: 777.5,
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
    ctx.fillText(scoreTwo, canvas.width / 2 + 60, 40);
};
//Draws a white line all around the canvas
function box() {
    ctx.beginPath();
    ctx.setLineDash([])
    ctx.lineStyle = "white";
    ctx.rect(10,10,792.5,480);
    ctx.stroke();
}
//Makes the dashed line / net in the middle of the screen
function dashedLine() {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.setLineDash([20, 20]);
    ctx.moveTo(406.25, 20);
    ctx.lineTo(406.25, 490);
    ctx.stroke();
};
//Makes the ball counce
function bounce() {
    if(ball.y + ball.height >= 490) {
        ball.gravity = ball.gravity * -1;
        ball.y += ball.gravity;
        ball.x += ball.speed;
    } else if(ball.y + ball.gravity <= 10){
        ball.gravity = ball.gravity * -1;
    } else {
        ball.y += ball.gravity;
        ball.x += ball.speed;
    };
    wallCollision();
};
//Detects collision
function wallCollision() {
    if((ball.y < playerTwo.y + playerTwo.height 
        && ball.x + ball.width >= playerTwo.x
        && ball.y + ball.height > playerTwo.y)
        || (ball.y < playerOne.y + playerOne.height
        && ball.x <= playerOne.x + playerOne.width
        && ball.y + ball.height > playerOne.y)) {
            ball.speed = ball.speed * -1.1;
        //Adds score for player two if the ball goes past player one
        } else if (ball.x < playerOne.x) {
            scoreTwo += 1;
            ball.speed = 3 * -1;
            ball.x = 396.25;
        //Adds score for player one if the ball goes past player two
        } else if(ball.x + ball.width > playerTwo.x + playerTwo.width) {
            scoreOne += 1;
            ball.speed = 3 * -1;
            ball.x = 396.25;
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
    box();
    dashedLine();
};
//Creates a function that keeps drawing everything
function loop() {
    bounce();
    window.requestAnimationFrame(loop);
};
//Starts the game
function startGame() {
    //Makes button invisble
    document.getElementById("startButton").style.display = "none";
    //Makes game visible
    document.getElementById("gameScreen").style.display = "block";
    //Starts game loop
    document.getElementById("startScreen").style.display = "none";
    loop();
}
