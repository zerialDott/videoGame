const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
let canvasSize;

const minCanvasSize = 480;

window.addEventListener('load', () => {
    handleResize();
});
window.addEventListener('resize', () => {
    handleResize();
});

function getCanvasSize(width, height, resolution) {
    const size = Math.min(Math.floor(width * resolution), Math.floor(height * resolution));
    return size;
}

function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvasSize = getCanvasSize(width, height, 0.7);

    startGame()
}

function startGame() {
    const elementSize = (canvasSize / 10) - 0.5;
    console.log({ elementSize, canvasSize });

// Ensure emojis is defined with the symbol "X"
    const symbol = emojis['X'] || 'X'; // Use default if undefined

    game.textAlign = 'start';
    for (let i = 0; i <= 10; i++) {
    game.font = elementSize + 'px Verdana';
    game.fillText(symbol, elementSize * i, elementSize);
}
}