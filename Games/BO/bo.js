const border = document.querySelector('.border')
const scoreDisplay = document.querySelector('.score')
const blockWidth = 100
const blockHeight = 20
const borderWidth = 560
const borderHeight = 300
const playerWidth = 100
const playerHeight = 20
const ballDiameter = 20
const playerCoordinate = [230, 10]
const ballCoordinates = [270, 40]
let playerCurrentCoords = playerCoordinate
let ballCurrentCoords = ballCoordinates
let tId
let xDir = 2
let yDir = 2
let score = 0 

class Block {
    constructor(x, y) {
        this.bottomLeft = [x, y]
        this.bottomRight = [x + blockWidth, y]
        this.topLeft = [x, y + blockHeight]
        this.topRight = [x + blockWidth, y + blockHeight]
    }
}

const blocks = [
    //1stRow
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

    //2ndRow
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),

    //3rdRwo
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

//player display
function playerDisplay() {
    player.style.left = playerCurrentCoords[0] + 'px'
    player.style.bottom = playerCurrentCoords[1] + 'px'
}

//ball display
function ballDisplay() {
    ball.style.left = ballCurrentCoords[0] + 'px'
    ball.style.bottom = ballCurrentCoords[1] + 'px'
}

//instantiates all blocks
function instantiateBlocks() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        border.appendChild(block)
    }
}

//instantiates player
const player = document.createElement('div')
player.classList.add('player')
playerDisplay()
border.appendChild(player)

//instantiates ball
const ball = document.createElement('div')
ball.classList.add('ball')
ballDisplay()
border.appendChild(ball)

//player controls
function movePlayer(event) {
    switch (event.key) {
        case 'ArrowLeft':
            if (playerCurrentCoords[0] > 0) {
                playerCurrentCoords[0] -= 10
                playerDisplay()
            }
            break;

        case 'ArrowRight':
            if (playerCurrentCoords[0] < borderWidth - playerWidth) {
                playerCurrentCoords[0] += 10
                playerDisplay()
            }
            break;
    }
}

//ball movement
function moveBall() {
    ballCurrentCoords[0] += xDir
    ballCurrentCoords[1] += yDir
    ballDisplay()
    checkCollisions()
}

//ball routing
function redirect() {
    if (xDir === 2 && yDir === 2) {
        yDir = -2
        return
    }
    if (xDir === 2 && yDir === -2) {
        xDir = -2
        return
    }
    if (xDir === -2 && yDir === -2) {
        yDir = 2
        return
    }
    if (xDir === -2 && yDir === 2) {
        xDir = 2
        return
    }
}

//collisions
function checkCollisions() {
    //blocks
    for (let i = 0 ; i < blocks.length; i++) {
        if (
            (ballCurrentCoords[0] > blocks[i].bottomLeft[0] && ballCurrentCoords[0] < blocks[i].bottomRight[0])&&
            ((ballCurrentCoords[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentCoords[1] < blocks[i].topLeft[1])

        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i , 1)
            redirect()
            score++
            scoreDisplay.textContent = score
        }
    }
    //walls
    if (
        ballCurrentCoords[0] >= (borderWidth - ballDiameter) ||
        ballCurrentCoords[1] >= (borderHeight - ballDiameter) ||
        ballCurrentCoords[0] <= 0
    ) {
        redirect()
    }
    //player
    if(
        (ballCurrentCoords[0] > playerCurrentCoords[0] && ballCurrentCoords[0] < playerCurrentCoords[0] + playerWidth) &&
        (ballCurrentCoords[1] > playerCurrentCoords[1] && ballCurrentCoords[1] < playerCurrentCoords[1] + playerHeight)
    ){
        redirect()
    }
    //gameover
    if (ballCurrentCoords[1] <= 0) {
        clearInterval(tId)
        scoreDisplay.textContent = 'YOU LOST'
        scoreDisplay.style.color = 'red'
        document.removeEventListener('keydown', movePlayer)
    }
}

tId = setInterval(moveBall, 30);

//listener
document.addEventListener('keydown', movePlayer)

instantiateBlocks()