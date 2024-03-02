const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const btnUp = document.querySelector('#Up')
const btnRight = document.querySelector('#Right')
const btnLeft = document.querySelector('#Left')
const btnDown = document.querySelector('#Down')
// Los botones

let elementSize
let playerPosition = {x:undefined,y:undefined}
// hitbox del regalo
let giftPostion = {x:undefined, y:undefined}
let enemyPosition = []

let level = 0
let lives = 3

window.addEventListener('resize',handleGame)
window.addEventListener('load',handleGame)
function reSize() {
    const reWidth = window.innerWidth
    const reHeight = window.innerHeight

    let setCanvasSize = reHeight < reWidth ? reHeight *0.8 : reWidth*0.8
    setCanvasSize = Math.ceil(setCanvasSize)

    canvas.width = canvas.height = setCanvasSize 
    canvasSize = setCanvasSize
    if (playerPosition.x !==undefined && playerPosition.y !== undefined) {
        playerPosition.x = Math.floor((elementSize * Math.floor(playerPosition.x / elementSize)))
        playerPosition.y = Math.floor((elementSize * Math.floor(playerPosition.y / elementSize)))
    }
}
function handleGame() {
    reSize()
    startGame()
}
function startGame() {
    elementSize = Math.floor((canvasSize/10)) 
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.textAling='end'
    const generalMap = maps[level]
    
    if (!generalMap) {
        finish()
        return
    }
    const separatedMap = generalMap.trim().split('\n')
    const mapRows = separatedMap.map(a=> a.trim().split(''))
    ctx.textAlign = 'start'
    ctx.font = elementSize + 'px Verdana'

    enemyPosition = []

    ctx.clearRect(0,0,canvasSize,canvasSize)
    mapRows.forEach((row,rowIndex) => {
        row.forEach((col,colIndex)=>{
            const frameEmojis = emojis[col]
            // const posX = (elementSize * (colIndex + 1))
            const posX = (elementSize * colIndex)
            const posY = (elementSize * rowIndex)+elementSize
            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX
                    playerPosition.y = posY   
                }
            }else if (col == 'I') {
                giftPostion.x = posX
                giftPostion.y = posY                        
            }else if (col== 'X') {
                enemyPosition.push({
                    x:posX,
                    y:posY,
                })
            }
            ctx.fillText(frameEmojis,posX,posY)
        })        
    });

    ctx.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y)
    movePlayer();

    // for (let i = 0; i < 10; i++) {
    //     for (let j = 1; j <=10; j++) {
    //         // ctx.fillText(emojis['X'],0,0)
    //         const posX = ((elementSize* j)-elementSize)
    //         const posY = ((elementSize* i)+elementSize)
    //         const set = emojis[mapRows[i][j-1]]
    //         ctx.fillText(set,posX,posY)
    //         console.log({posX,posY,set});
    //     }
    // }
}
// movimiento de los botones
// document.addEventListener('keydown',movePlayer)
// document.addEventListener('DOMContentLoaded',()=>{
// const buttons = document.querySelectorAll('.btns button')
//     buttons.forEach(button=>{
//     button.addEventListener('click',(event)=>{
//         movePlayerButton(button.id)
//     })
// })
// })
// function movePlayer(event) {
//     const keyP = event.key.toLowerCase()

//     switch (keyP) {
//         case 'arrowup':
//         case 'w':
//             console.log('arriba');
//             break;
//         case 'arrowdown':
//         case 's':
//             console.log('abajo');
//             break;
//         case 'arrowleft':
//         case 'a':
//             console.log('izquierda');
//             break;
//         case 'arrowright':
//         case 'd':
//             console.log('derecha');
//             break;
//         default:
//             break;
//     }
// }
// function movePlayerButton(direction) {
//     const move = direction.toLowerCase()
//     switch (move) {
//         case 'up':
//             console.log('arriba');
//             break;
//         case 'down':
//             console.log('abajo');
//             break;
//         case 'right':
//             console.log('derecha');
//             break;
//         case 'left':
//             console.log('izquierda');
//             break;
    
//         default:
//             break;
//     }
// }


// Mover usando funciones escuchadoras
window.addEventListener('keydown',moveByKey)
btnUp.addEventListener('click',moveUp)
btnRight.addEventListener('click',moveRight)
btnLeft.addEventListener('click',moveLeft)
btnDown.addEventListener('click',moveDown)

function moveByKey(event) {
    const keyPress = event.key.toLowerCase()

    switch (keyPress) {
        case 'arrowup':
        case 'w':
            moveUp();
            break;
        case 'arrowleft':
        case 'a':
            moveLeft();
            break;
        case 'arrowdown':
        case 's':
            moveDown();
            break;
        case 'arrowright':
        case 'd':
            moveRight();
            break;
        default:
            break;
    }
}
function moveUp() {
    if ((playerPosition.y - elementSize) < elementSize) {
    } else 
    playerPosition.y -= elementSize
    startGame();   

}
function moveRight() {
    if (playerPosition.x + elementSize < canvasSize -elementSize) {
        playerPosition.x += elementSize
        startGame()   
    }
}
function moveLeft() {
    if (playerPosition.x - elementSize >= 0) {
        playerPosition.x -= elementSize
        startGame()   
    }
}
function moveDown() {
    if (playerPosition.y + elementSize < canvasSize) {
        playerPosition.y += elementSize 
        startGame()
    }
    
}
function movePlayer() {
// Condicional de la posición para poder ganar
    const collisionX = playerPosition.x == giftPostion.x
    const collisionY = playerPosition.y == giftPostion.y
    const giftCollision = collisionX && collisionY
    
    if (giftCollision) {
        levelUp()     
    }
// Validación de collision contra las bombas

    const enemyCollision = enemyPosition.find(enemy=>{
        const setColX = enemy.x == playerPosition.x
        const setColY =enemy.y == playerPosition.y
        return setColX && setColY;
    }) 
    if (enemyCollision) {
        levelFail()
    }
    // Render del jugador :) 
    ctx.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y)
    
}
function levelUp() {
    console.log('level Up');
    level ++;
    startGame()
}
function levelFail() {
    lives --
    if (lives <= 0) {
        level = 0
        lives = 3
    }
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}
function finish() {
    console.log('Ganaste el juego');   
}