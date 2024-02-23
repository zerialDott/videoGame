const canvas = document.getElementById('game')
const ctx = canvas.getContext("2d")
let canvasSize

window.addEventListener('load',handleLoad)
window.addEventListener('resize', handleLoad)

function handleLoad() {
    reSize()
    startGame()
}
function reSize() {
    const width = window.innerWidth
    const height = window.innerHeight
    const newCanvasSize = height > width ? width*0.8: height*0.8

    canvas.width = canvas.height = newCanvasSize
    canvasSize = Math.floor(newCanvasSize)
}
function startGame() {
    const emojiSize = Math.floor(canvasSize/10)
    console.log({emojiSize,canvasSize});
    ctx.font =emojiSize + 'px Verdana'
    for (let i = 0; i < 10; i++) {
        ctx.textAlign ='start'
        ctx.fillText(emojis['X'],emojiSize*i,emojiSize)
    }
}