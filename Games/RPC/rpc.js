const pcDisplay = document.getElementById('computer-choice')
const userDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const scoreDisplay = document.getElementById('score')
const btn = document.querySelectorAll('button')
const resultImage = document.querySelector('#choices')
let computerChoice
let userChoice
let result
let score = 0
let lost = false

btn.forEach(buttonClicked => buttonClicked.addEventListener('click',(e)=>{
    userChoice = e.target.id
    console.log(`e: ${e.target.id}`) 
    console.log(`userChoice: ${userChoice}`)
    userDisplay.innerHTML = userChoice
    getRandomNum()
    getResults()
    resultImage.innerHTML = ''
    rImage()
}))

function getRandomNum(){
    const random = Math.floor(Math.random()*3)+1
    switch(random){
        case 1:
            computerChoice = 'rock'
        break;
        case 2:
            computerChoice = 'paper'
        break;
        case 3:
            computerChoice = 'scissors'
        break;
    }
    pcDisplay.innerHTML = computerChoice;
}

function getResults(){
   if(computerChoice === userChoice) result = 'draw'
   if(computerChoice === 'rock' && userChoice === 'paper') result = 'won'
   if(computerChoice === 'rock' && userChoice === 'scissors') result = 'lost'
   if(computerChoice === 'paper' && userChoice === 'rock') result = 'lost'
   if(computerChoice === 'paper' && userChoice === 'scissors') result = 'won'
   if(computerChoice === 'scissors' && userChoice === 'rock') result = 'won'
   if(computerChoice === 'scissors' && userChoice === 'paper') result = 'lost'
   if(result === 'lost'){
        lost = true;
        score = 0 ;
        scoreDisplay.textContent = score
   }
   if(result === 'draw'){
       document.body.style.backgroundColor = '#70b4db'
   }else if(result === 'won'){
       lost = false;
       document.body.style.backgroundColor = '#26e083'
       scoreDisplay.textContent = `${score +=1}`
   }else{
       document.body.style.backgroundColor = '#e05858'       
   }
   resultDisplay.innerHTML = result
}

function rImage(){
    const userImage = document.createElement('img')
    const computerImage = document.createElement('img')
    userImage.setAttribute('src' , `images/${userChoice}.png`)
    computerImage.setAttribute('src' , `images/${computerChoice}.png`)
    resultImage.append(userImage)
    resultImage.append(computerImage)
}