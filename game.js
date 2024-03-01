const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const btnUp = document.querySelector('#Up')
const btnRight = document.querySelector('#Right')
const btnLeft = document.querySelector('#Left')
const btnDown = document.querySelector('#Down')
// Los botones
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
    mapRows.forEach((row,rowIndex) => {
        row.forEach((col,colIndex)=>{
            const frameEmojis = emojis[col]
            // const posX = (elementSize * (colIndex + 1))
            const posX = (elementSize * colIndex)
            const posY = (elementSize * rowIndex)+elementSize
            ctx.fillText(frameEmojis,posX,posY)
        })        
    });

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
    console.log(event);
}
function moveUp() {
    console.log('Arriba');
}
function moveRight() {
    console.log('Derecha');
}
function moveLeft() {
    console.log('Izquierda');
}
function moveDown() {
    console.log('Abajo');
}