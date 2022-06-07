//Creates a variable containing the id of the canvas
const canvas = document.getElementById("pong");
//
const ctx = canvas.getContext("2d");
//
canvas.width = 812.5;
canvas.height = 500;
//
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
//
const playerOne = new Element({
    x: 15,
    y: 250,
    width: 20,
    height: 100,
    color: "red",
    gravity: 2,
});
//
const playerTwo = new Element({
    x: 782.5,
    y: 200,
    width: 20,
    height: 100,
    color: "blue",
    gravity: 2,
});
//
function drawElement(element) {
    context.fillStyle = element.color;
    context.fillRect(element.x, element.y, element.width, element.height);
}
//
drawElement(playerOne);



/*
 ignore
ctx.fillStyle = "blue";
ctx.fillRect(0,0,150,75);
*/