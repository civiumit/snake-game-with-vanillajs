"use strict";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Elements inside the canvas derive their colors from here.
// Food drawing directly uses the colorful function
const colors = {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
    yellow: '#ffff00',
    purple: '#ff00ff',
    orange: '#ffa500',
    pink: '#ffc0cb',
    cyan: '#00ffff',
    magenta: '#ff00ff',
    yellowgreen: '#9acd32',
    black: '#000000',
    white: '#ffffff',
    colorfull() {
        const ObjValToArr = Object.values(this);
        const randomIndex = Math.floor(Math.random() * ObjValToArr.length);
        return ObjValToArr[randomIndex];
    }
}

const font = {
    // System UI font family
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Oxygen, Cantarell, sans-serif',
    size: {
        sm: '12px',
        md: '14px',
        lg: '18px',
    },
    getFont(size) {
        return `${this.size[size]} ${this.fontFamily}`;
    }
}

// The game can be changed here.
const options = {
    game: {
        score: 0,
        speed: 8
    },
    canvas: {
        columnCount: 20,
        columnSize: canvas.width / 20
    },
    snake: {
        background: colors.yellowgreen,
        stroke: colors.black,
        lineWidth: 2,
        snakeParts: [],
        snakeLength: 0
    },
    scoreText: {
        fillStyle: colors.white,
        font: font.getFont('sm'),
        textAlign: 'left',
        text() {
            return `Score: ${options.game.score}`
        },
    },
    gameOver: {
        title: {
            fillStyle: colors.white,
            font: font.getFont('lg'),
            textAlign: 'center',
            text() {
                return `SCORE: ${options.game.score}`
            },
        },
        description: {
            fillStyle: colors.white,
            font: font.getFont('sm'),
            textAlign: 'center',
            text() {
                return `Press Space to restart`
            },
        }
    },
}

// Keyboard key codes for arrow keys:
const keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    space: 32
}

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
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Game over when the snake hits corners or itself
const gameOver = () => {
    if (snakeHead.x < 0 || snakeHead.x >= options.canvas.columnCount || snakeHead.y < 0 || snakeHead.y >= options.canvas.columnCount || options.snake.snakeParts.some((part) => part.x === snakeHead.x && part.y === snakeHead.y)) {
        ctx.fillStyle = options.gameOver.title.fillStyle;
        ctx.font = options.gameOver.title.font;
        ctx.textAlign = options.gameOver.title.textAlign;
        ctx.fillText(options.gameOver.title.text(), canvas.width / 2, canvas.height / 2);

        ctx.fillStyle = options.gameOver.description.fillStyle;
        ctx.font = options.gameOver.description.font;
        ctx.textAlign = options.gameOver.description.textAlign;
        ctx.fillText(options.gameOver.description.text(), canvas.width / 2, canvas.height / 2 + 30);

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
        case keys.space:
            restart();
            break;
    }
}
