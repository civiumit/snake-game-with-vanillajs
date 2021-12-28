"use strict";

import colors from './lib/colors.js';
import { options, keys, ctx } from './lib/options.js';

// Initial coordinates for the snake are randomly generated. 
const snakeHead = {
    x: Math.floor(Math.random() * options.canvas.columnCount),
    y: Math.floor(Math.random() * options.canvas.columnCount)
}

// Initial coordinates for the food are randomly generated.
const food = {
    x: Math.floor(Math.random() * options.canvas.columnCount),
    y: Math.floor(Math.random() * options.canvas.columnCount)
}

// The direction the snake will go. Updates SnakeHead values with arrow keys.
const direction = {
    x: 0,
    y: 0
}

// Functions that make up the game
const game = () => {
    clearCanvas();
    drawSnake();
    drawFood();
    drawScore();
    snakeEatFood();
    gameOver();
}

// Replay every 1000 / Options.game.speed ms
let gameLoop = setInterval(game, 1000 / options.game.speed);

// See the options variable for the properties that make up the snake
const drawSnake = () => {
    // Snake head
    ctx.fillStyle = options.snake.background;
    ctx.strokeStyle = options.snake.stroke;
    ctx.lineWidth = options.snake.lineWidth;
    ctx.strokeRect(snakeHead.x * options.canvas.columnCount, snakeHead.y * options.canvas.columnCount, options.canvas.columnSize, options.canvas.columnSize);
    ctx.fillRect(snakeHead.x * options.canvas.columnCount, snakeHead.y * options.canvas.columnCount, options.canvas.columnSize, options.canvas.columnSize);
    // Snake body
    options.snake.snakeParts.map((part) => {
        ctx.fillStyle = options.snake.background;
        ctx.strokeStyle = options.snake.stroke;
        ctx.lineWidth = options.snake.lineWidth;
        ctx.strokeRect(part.x * options.canvas.columnCount, part.y * options.canvas.columnCount, options.canvas.columnSize, options.canvas.columnSize);
        ctx.fillRect(part.x * options.canvas.columnCount, part.y * options.canvas.columnCount, options.canvas.columnSize, options.canvas.columnSize);
    })

    options.snake.snakeParts.push({ x: snakeHead.x, y: snakeHead.y });

    while (options.snake.snakeParts.length > options.snake.snakeLength) {
        options.snake.snakeParts.shift();
    }

    snakeHead.x += direction.x;
    snakeHead.y += direction.y;
}

// See the options and colors variables for the properties that make up the food
const drawFood = () => {
    ctx.fillStyle = colors.colorfull();
    ctx.fillRect(food.x * options.canvas.columnCount, food.y * options.canvas.columnCount, options.canvas.columnSize, options.canvas.columnSize);
}

// See the options variable for the properties that make up the score
function drawScore() {
    ctx.fillStyle = options.scoreText.fillStyle;
    ctx.textAlign = options.scoreText.textAlign;
    ctx.font = options.scoreText.font;
    ctx.fillText(options.scoreText.text(), 10, 20);
}

// Each time the snake eats an apple, its length increases by 1 unit and the score increases by 1 unit.
const snakeEatFood = () => {
    if (snakeHead.x === food.x && snakeHead.y === food.y) {
        options.snake.snakeLength++;
        options.game.score++;
        food.x = Math.floor(Math.random() * options.canvas.columnCount);
        food.y = Math.floor(Math.random() * options.canvas.columnCount);
    }
}

// Clear screen when SetInterval function runs again
const clearCanvas = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, options.canvas.width, options.canvas.height);
}

// Game over when the snake hits corners or itself
const gameOver = () => {
    if (snakeHead.x < 0 || snakeHead.x >= options.canvas.columnCount || snakeHead.y < 0 || snakeHead.y >= options.canvas.columnCount || options.snake.snakeParts.some((part) => part.x === snakeHead.x && part.y === snakeHead.y)) {
        // Game over title
        ctx.fillStyle = options.gameOver.title.fillStyle;
        ctx.font = options.gameOver.title.font;
        ctx.textAlign = options.gameOver.title.textAlign;
        ctx.fillText(options.gameOver.title.text(), options.canvas.width / 2, options.canvas.height / 2);
        // Geme over description
        ctx.fillStyle = options.gameOver.description.fillStyle;
        ctx.font = options.gameOver.description.font;
        ctx.textAlign = options.gameOver.description.textAlign;
        ctx.fillText(options.gameOver.description.text(), options.canvas.width / 2, options.canvas.height / 2 + 30);

        clearInterval(gameLoop);
    }
}

// It is triggered by the space keys. It resets the game.
const restart = () => {

    clearInterval(gameLoop);

    options.snake.snakeParts = [];
    options.snake.snakeLength = 0;

    snakeHead.x = Math.floor(Math.random() * options.canvas.columnCount);
    snakeHead.y = Math.floor(Math.random() * options.canvas.columnCount);

    food.x = Math.floor(Math.random() * options.canvas.columnCount);
    food.y = Math.floor(Math.random() * options.canvas.columnCount);

    direction.x = 0;
    direction.y = 0;

    options.game.score = 0;

    gameLoop = setInterval(game, 1000 / options.game.speed);
}

addEventListener('keydown', (e) => changeDirection(e));

// It cannot be directed opposite to the direction of movement of the snake. 
const changeDirection = (e) => {
    switch (e.keyCode) {
        case keys.left:
            if (direction.x !== 1) direction.x = -1;
            direction.y = 0;
            break;
        case keys.up:
            direction.x = 0;
            if (direction.y !== 1) direction.y = -1;
            break;
        case keys.right:
            if (direction.x !== -1) direction.x = 1;
            direction.y = 0;
            break;
        case keys.down:
            direction.x = 0;
            if (direction.y !== -1) direction.y = 1;
            break;
        case keys.reset:
            restart();
            break;
    }
}
