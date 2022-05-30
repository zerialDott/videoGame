const canvas = document.getElementById('game')
const game = canvas.getContext('2d')

window.addEventListener('load',startGame)
// game.fillText
function startGame() {
    game.fillRect(0,0,100,100)
    game.clearRect(0,0,20,20)
}