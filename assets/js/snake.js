"use strict";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const columnCount = 20;
const columnSize = canvas.width / columnCount;

let snakeParts = [];
let snakeLength = 0;

const snakeHead = {
    x: Math.floor(Math.random() * columnCount),
    y: Math.floor(Math.random() * columnCount)
}

const food = {
    x: Math.floor(Math.random() * columnCount),
    y: Math.floor(Math.random() * columnCount)
}

const direction = {
    x: 0,
    y: 0
}

// Frame speed
const speed = 10;

let score = 0;

// Direction codes (Keyboard key codes for arrow keys):
const key = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    space: 32
}

const game = () => {
    clearCanvas();
    drawSnake();
    drawFood();
    drawScore();
    snakeEatFood();
    gameOver();
}

let gameLoop = setInterval(game, 1000 / speed);

const drawSnake = () => {

    ctx.fillStyle = 'yellowgreen';
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(snakeHead.x * columnCount, snakeHead.y * columnCount, columnSize, columnSize);
    ctx.fillRect(snakeHead.x * columnCount, snakeHead.y * columnCount, columnSize, columnSize);

    snakeParts.map((part) => {
        ctx.fillStyle = 'yellowgreen';
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(part.x * columnCount, part.y * columnCount, columnSize, columnSize);
        ctx.fillRect(part.x * columnCount, part.y * columnCount, columnSize, columnSize);
    })

    snakeParts.push({ x: snakeHead.x, y: snakeHead.y });

    while (snakeParts.length > snakeLength) {
        snakeParts.shift();
    }

    snakeHead.x += direction.x;
    snakeHead.y += direction.y;

}

const drawFood = () => {
    let colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'magenta'];
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillRect(food.x * columnCount, food.y * columnCount, columnSize, columnSize);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.font = '12px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Oxygen, Cantarell, sans-serif';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

const snakeEatFood = () => {
    if (snakeHead.x === food.x && snakeHead.y === food.y) {
        snakeLength++;
        score++;
        food.x = Math.floor(Math.random() * columnCount);
        food.y = Math.floor(Math.random() * columnCount);
    }
}


const clearCanvas = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const gameOver = () => {
    if (snakeHead.x < 0 || snakeHead.x >= columnCount || snakeHead.y < 0 || snakeHead.y >= columnCount || snakeParts.some((part) => part.x === snakeHead.x && part.y === snakeHead.y)) {
        ctx.fillStyle = 'white';
        ctx.font = "18px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Oxygen, Cantarell, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`SCORE: ${score}`, canvas.width / 2, canvas.height / 2);

        ctx.fillStyle = 'white';
        ctx.font = "12px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Oxygen, Cantarell, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText('Press Space to restart', canvas.width / 2, canvas.height / 2 + 30);
        clearInterval(gameLoop);
    }
}

const restart = () => {

    clearInterval(gameLoop);

    snakeParts = [];
    snakeLength = 0;

    snakeHead.x = Math.floor(Math.random() * columnCount);
    snakeHead.y = Math.floor(Math.random() * columnCount);

    food.x = Math.floor(Math.random() * columnCount);
    food.y = Math.floor(Math.random() * columnCount);

    direction.x = 0;
    direction.y = 0;

    score = 0;

    gameLoop = setInterval(game, 1000 / speed);
}

addEventListener('keydown', (e) => changeDirection(e));

const changeDirection = (e) => {
    switch (e.keyCode) {
        case key.left:
            if (direction.x !== 1) direction.x = -1;
            direction.y = 0;
            break;
        case key.up:
            direction.x = 0;
            if (direction.y !== 1) direction.y = -1;
            break;
        case key.right:
            if (direction.x !== -1) direction.x = 1;
            direction.y = 0;
            break;
        case key.down:
            direction.x = 0;
            if (direction.y !== -1) direction.y = 1;
            break;
        case key.space:
            restart();
            break;
    }
}