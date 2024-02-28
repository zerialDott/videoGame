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
// Map[Row['Col']]
function startGame() {
    const emojiSize = Math.floor((canvasSize/10)-1)
    const map = maps[3]
    const createMapRow = map.trim().split('\n')
    const mapRow = createMapRow.map(a=>a.trim().split(''))
    ctx.textAlign ='center'
    console.log({emojiSize,canvasSize});
    ctx.font =emojiSize + 'px Verdana'
    for (let row = 0; row < 10; row++) {
        for (let col = 1; col <= 10; col++) {
            const x = Math.floor((emojiSize*col)-5)
            const y = Math.floor((emojiSize*row)+35)
            ctx.fillText(emojis[mapRow[row][col-1]],x,y)
        }
    }
}