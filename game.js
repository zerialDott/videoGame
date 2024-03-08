const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
// Btn's
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

// variables globales del tamaño del canvas y los elementos 
let canvasSize
let elementSize
// Definiendo la victoria
let win = false

// Set playerPositon == 'I' 
let playerPosition = {
    x:undefined, 
    y:undefined
}
// set de la meta
let giftPosition = {
    x:undefined, 
    y:undefined
}
// Array para definir dentro las bombas/enemigos estaticos
let enemyPosition =[]
let level = 0

let lives = 5
let timeStart
let timeOut
let timeInterval

let setRecord

// Agregar los span para mostrar
const spanLives = document.getElementById('pLives')
const spanTime = document.getElementById('pTime')
const spanRecord = document.getElementById('pRecord')

// Escuchadores de eventos generales
window.addEventListener('resize', handleGame)
window.addEventListener('load', handleGame)

// Escuchadores de movimiento
window.addEventListener('keydown', moveKey)
btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnDown.addEventListener('click', moveDown)
btnRight.addEventListener('click', moveRight)

function reSize() {
    const reWidth = window.innerWidth
    const reHeight = window.innerHeight

    let setCanvasSize = reHeight < reWidth ? reHeight * 0.8 : reWidth * 0.8
    setCanvasSize = Math.ceil(setCanvasSize)

    canvas.width = canvas.height = setCanvasSize 
    canvasSize = setCanvasSize
    if (playerPosition.x !== undefined && playerPosition.y !== undefined) {
        playerPosition.x = Math.floor((elementSize * Math.floor(playerPosition.x / elementSize)))
        playerPosition.y = Math.floor((elementSize * Math.floor(playerPosition.y / elementSize)))
    }
}

function handleGame() {
    reSize()
    if (!win) {
        startGame()
    }
}

function startGame() {
    elementSize = Math.floor((canvasSize / 10))
    // si acaba de comenzar :

    if (!timeStart) {
        timeStart = Date.now() - spanTime.innerHTML
        timeInterval = setInterval(showTime, 100)
        newRecord()
    }
    if (level >= maps.length) {
        gameWin()
        return
    }
    // ctx.textAling='end'
    const generalMap = maps[level]
    const separatedMap = generalMap.trim().split('\n')
    const mapRows = separatedMap.map(a => a.trim().split(''))
    ctx.textAlign = 'start'
    ctx.font = elementSize + 'px Verdana'

    // ShowLives renderiza corazoncitos de vidas
    showLives()

    ctx.clearRect(0, 0, canvasSize, canvasSize)
    // este array vacio limipa el array creado por la ejecucion de startGame cada que se hace un movimiento
    enemyPosition = []

    mapRows.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const render = emojis[col]
            const posX = elementSize * colIndex
            const posY = (elementSize * rowIndex) + elementSize
            ctx.fillText(render, posX, posY)
            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX
                    playerPosition.y = posY
                }
            } else if (col == 'I') {
                giftPosition.x = posX
                giftPosition.y = posY
            } else if (col == 'X') {
                enemyPosition.push({
                    x: posX,
                    y: posY,
                })
            }
        })
    })
    ctx.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
    movePlayer()
}

function movePlayer() {
    const getGiftX = giftPosition.x == playerPosition.x
    const getGiftY = giftPosition.y == playerPosition.y
    const isCollision = getGiftX && getGiftY
    isCollision ? levelUp() : null

    const enemyCollision = enemyPosition.find(enemy => {
        const collisionX = enemy.x == playerPosition.x
        const collisionY = enemy.y == playerPosition.y
        return collisionX && collisionY
    })
    if (enemyCollision) {
        levelFail()
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
    if ((playerPosition.x + elementSize) < canvasSize - elementSize) {
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
    
    if (lives <= 0) {
        finish()
        return
    }
    playerPosition.x = undefined
    playerPosition.y = undefined
    clearInterval(timeInterval)
    startGame()
}
function finish() {
    window.alert('Perdiste!')
    timeStart = null
    clearInterval(timeInterval)
    lives = 5
    level = 0
    timeInterval = Date.now() - spanTime.innerHTML  
    startGame()
}
function gameWin() {
    win = true;

    const recordTime = localStorage.getItem('recordTime')
    const playerTime = Date.now() - timeStart
  
    if (!recordTime || playerTime < recordTime) {
      localStorage.setItem('record', spanTime.outerText)
      localStorage.setItem('recordTime', playerTime)
      spanRecord.innerHTML = playerTime
      showFinalMessage('newRecord', playerTime)
      return
    } else {
        showFinalMessage('newRecord', playerTime)
    }
    timeStart = null
    clearInterval(timeInterval)
    lives = 5
    level = 0
    timeInterval = 0    
}

function showLives() {
    let arrayLives = Array(lives).fill(emojis['LIVES'])
    livesRender = ''

    arrayLives.forEach(life => {
        livesRender += life
    })
    spanLives.innerHTML = livesRender
    // spanLives.innerHTML= arrayLives.join('')
}
function showTime() {
    const currentTime = Date.now() - timeStart
    spanTime.innerHTML = currentTime
    const recordTime = localStorage.getItem('recordTime')
    spanRecord.innerText = recordTime
    
}
function newRecord() {
    const currentTime = Date.now() - timeStart
    spanRecord.innerHTML = currentTime
    localStorage.setItem('record', currentTime)
    localStorage.setItem('recordTime', currentTime)
    
}
function showFinalMessage(messageType, message) {
    switch (messageType) {
      case 'newRecord':
        alert('¡Nuevo récord alcanzado! Tiempo: ' + message);
        break;
      default:
        alert('Juego completado!');
        break;
    }
}

newRecord()
