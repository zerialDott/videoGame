const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
// Btn's
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

let canvasSize
let elementSize
let playerPosition = {x:undefined, y:undefined}
let giftPosition = {x:undefined, y:undefined}
let enemyPosition =[]
let level = 0

let lives = 3
// Escuchadores de eventos generales
window.addEventListener('resize',handleGame)
window.addEventListener('load',handleGame)

// Escuchadores de movimiento
window.addEventListener('keydown',moveKey)
btnUp.addEventListener('click',moveUp)
btnLeft.addEventListener('click', moveLeft)
btnDown.addEventListener('click',moveDown)
btnRight.addEventListener('click',moveRight)

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
    elementSize = Math.floor((canvasSize/10))
    
    // ctx.textAling='end'
    const generalMap = maps[level]
    const separatedMap = generalMap.trim().split('\n')
    const mapRows = separatedMap.map(a=> a.trim().split(''))
    ctx.textAlign = 'start'
    ctx.font = elementSize + 'px Verdana'
    
    ctx.clearRect(0,0,canvasSize,canvasSize)
    // este array vacio limipa el array creado por la ejecucion de startGame cada que se hace un movimiento
    enemyPosition =[]

    mapRows.forEach((row,rowIndex)=>{
        row.forEach((col,colIndex)=>{
            const render = emojis[col]
            const posX = elementSize * colIndex 
            const posY = (elementSize * rowIndex) + elementSize
            ctx.fillText(render,posX,posY)
            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX
                    playerPosition.y = posY
                }
            }else if (col == 'I') {
                giftPosition.x = posX
                giftPosition.y = posY
            }else if (col == 'X') {
                enemyPosition.push({
                    x:posX,
                    y:posY,
                })
            }
        })
    })
    ctx.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y)
    movePlayer()
}
function movePlayer() {
    const getGiftX = giftPosition.x == playerPosition.x
    const getGiftY = giftPosition.y == playerPosition.y
    const isCollision = getGiftX && getGiftY
    isCollision ? levelUp() : null

    const enemyCollision = enemyPosition.find(enemy=>{
        const collisionX = enemy.x == playerPosition.x
        const collisionY = enemy.y == playerPosition.y
        return collisionX && collisionY
    })
    if (enemyCollision) {
        levelFail()
        console.log({lives});
    }

}
function moveKey(event) {
    const keyLow = event.key.toLowerCase()

    switch (keyLow) {
        case 'arrowup':
        case 'w':
            moveUp()
            break;
        case 'arrowleft':
        case 'a':
            moveLeft()
            break;
        case 'arrowdown':
        case 's':
            moveDown()
            break;
        case 'arrowright':
        case 'd':
            moveRight()
            break;
        default:
            break;
    }
}
function moveUp() {
    if ((playerPosition.y - elementSize) >= elementSize) {
        playerPosition.y -= elementSize
        startGame()
    }
}
function moveLeft() {
    if ((playerPosition.x - elementSize) >= 0) {
        playerPosition.x -= elementSize
        startGame()
    }
}
function moveDown() {
    if ((playerPosition.y + elementSize) < canvasSize) {
        playerPosition.y += elementSize
        startGame()
    }
}
function moveRight() {
    if ((playerPosition.x + elementSize) < canvasSize -elementSize) {
        playerPosition.x += elementSize
        startGame()
    }
}
function levelUp() {
    level ++ 
    startGame()
}
function levelFail() {
    lives --
    if(lives <= 0){
        level = 0 
        finish()
    }
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}


function finish() {
    if (lives <= 0 ) {
        window.alert('PERDISTE')
        lives = 3
    }
}