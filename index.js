const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y ){
            this.x = x;
            this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = []
let tailLength = 2;


let appleX = 5;
let appleY = 5;

let xVelocity=0;
let yVelocity=0;

let score = 0;

function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/ speed)
    console.log(drawGame)
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity ===0){
        return false;
    }

    if(headX < 0){
            gameOver = true;
    }
    else if(headX === tileCount){
        gameOver = true
    }
    else if(headY < 0){
        gameOver = true; 
    }

    else if(headY === tileCount){
        gameOver = true;
    }

    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY)
            gameOver = true;
            break;
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "40px Helvetica";
        ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2,);
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "15px Helvetica";
        ctx.fillText("Your Score was: " + score, canvas.width / 2.75, canvas.height / 1.75)
    }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Helvetica"
    ctx.fillText("Score " + score, canvas.width-50, 10);
}

function clearScreen(){
    ctx.fillStyle = '#023e8a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){
    //snake body
    ctx.fillStyle = '#00b4d8';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
        ctx.strokeStyle = '#ade8f4';
        ctx.strokeRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX, headY))
    while(snakeParts.length > tailLength){
        snakeParts.shift(); 
    }
    //snake head
    ctx.fillStyle = '#ade8f4'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
    ctx.strokeStyle = '#00b4d8';
    ctx.strokeRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = '#65bd43'
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
    
    ctx.strokeStyle = '#408F2C'
    ctx.strokeRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision(){
    if(appleX === headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    
    //down
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }

    //right
    if(event.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();