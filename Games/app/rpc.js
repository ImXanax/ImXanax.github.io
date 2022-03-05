const pcDisplay = document.getElementById('computer-choice');
const userDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const btn = document.querySelectorAll('button')
let computerChoice
let userChoice
let result

btn.forEach(buttonClicked => buttonClicked.addEventListener('click',(e)=>{
    userChoice = e.target.id
    userDisplay.innerHTML = userChoice
    getRandomNum()
    getResults()
}))

function getRandomNum(){
    const random = Math.floor(Math.random()*3)+1
    console.log(random)
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
    console.log(computerChoice)
    pcDisplay.innerHTML = computerChoice;
}

function getResults(){
    /*
    rock paper -> win
    rock scissors -> lose

    paper rock -> lose
    paper scissors -> win

    scissors rock -> win
    scissors paper -> lose
    */
   if(computerChoice === userChoice) result = 'Draw'
   if(computerChoice === 'rock' && userChoice === 'paper') result = 'won'
   if(computerChoice === 'rock' && userChoice === 'scissors') result = 'lost'
   if(computerChoice === 'paper' && userChoice === 'rock') result = 'lost'
   if(computerChoice === 'paper' && userChoice === 'scissors') result = 'won'
   if(computerChoice === 'scissors' && userChoice === 'rock') result = 'won'
   if(computerChoice === 'scissors' && userChoice === 'paper') result = 'lost'

   resultDisplay.innerHTML = result
}
