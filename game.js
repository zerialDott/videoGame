const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
let canvasSize

window.addEventListener('resize',handleGame)
window.addEventListener('load',handleGame)
function reSize() {
    const reWidth = window.innerWidth
    const reHeight = window.innerHeight

    let setCanvasSize = reHeight < reWidth ? reHeight *0.8 : reWidth*0.8
    setCanvasSize = Math.ceil(setCanvasSize)

    canvas.width = canvas.height = setCanvasSize 
    canvasSize = setCanvasSize
}
function handleGame() {
    reSize()
    startGame()
}
function startGame() {
    const elementSize = Math.floor((canvasSize/10))
    
    // ctx.textAling='end'
    const generalMap = maps[0]
    const separatedMap = generalMap.trim().split('\n')
    const mapRows = separatedMap.map(a=> a.trim().split(''))
    ctx.textAlign = 'start'
    ctx.font = elementSize + 'px Verdana'
    for (let i = 0; i < 10; i++) {
        for (let j = 1; j <=10; j++) {
            // ctx.fillText(emojis['X'],0,0)
            const posX = ((elementSize* j)-elementSize)
            const posY = ((elementSize* i)+elementSize)
            const set = emojis[mapRows[i][j-1]]
            ctx.fillText(set,posX,posY)
            console.log({posX,posY,set});
        }
    }
}