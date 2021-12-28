import font from './font.js';
import colors from './colors.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// The game can be changed here.
const options = {
    game: {
        score: 0,
        speed: 8
    },
    canvas: {
        columnCount: 20,
        columnSize: canvas.width / 20,
        width: canvas.width,
        height: canvas.height
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

export { options, keys, ctx }