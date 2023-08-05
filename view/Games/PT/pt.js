const cardArr = [
    {
        name:'cat1',
        img:'images/cat1.png'        
    },
    {
        name:'cat2',
        img:'images/cat2.png'        
    },
    {
        name:'cat3',
        img:'images/cat3.png'        
    },
    {
        name:'cat4',
        img:'images/cat4.png'        
    },
    {
        name:'cat5',
        img:'images/cat5.png'        
    },
    {
        name:'cat6',
        img:'images/cat6.png'        
    },
    {
        name:'cat1',
        img:'images/cat1.png'        
    },
    {
        name:'cat2',
        img:'images/cat2.png'        
    },
    {
        name:'cat3',
        img:'images/cat3.png'        
    },
    {
        name:'cat4',
        img:'images/cat4.png'        
    },
    {
        name:'cat5',
        img:'images/cat5.png'        
    },
    {
        name:'cat6',
        img:'images/cat6.png'        
    },
]

let chosenCard = []
let chosenCardId = []
const score = []
let scoreDisplay = document.querySelector('#score')
let gameOver = document.querySelector('#gameover')

cardArr.sort(()=> 0.5 - Math.random())
const grid = document.querySelector('#grid')

function createCard(){
    for(let i = 0 ; i < cardArr.length ; i++){
        const card = document.createElement('img')
        card.setAttribute('src' , 'images/blank.png')
        card.setAttribute('data-id' , i)
        card.addEventListener('click' , flipCard )
        grid.append(card)
    }
}

function matchCheck(){
    // should change to '#grid img' if more images were added
    const cards = document.querySelectorAll('img'); 
    const firstCardId = chosenCardId[0]
    const secondCardId =  chosenCardId[1]

    if(firstCardId === secondCardId){
        alert(`You Clicked The Same Card`)
        cards[firstCardId].setAttribute('src' , 'images/blank.png')
    }
    else if(chosenCard[0] === chosenCard[1]){
        alert(`You Found A Match`)
        cards[firstCardId].setAttribute('src' , 'images/correct.png')
        cards[secondCardId].setAttribute('src' , 'images/correct.png')
        cards[firstCardId].removeEventListener('click',flipCard)
        cards[secondCardId].removeEventListener('click',flipCard)
        score.push(chosenCard)
        scoreDisplay.textContent = score.length
        
    }else{
        alert(`Not a Match, Try Again!`)
        cards[firstCardId].setAttribute('src' , 'images/blank.png')
        cards[secondCardId].setAttribute('src' , 'images/blank.png')
    }
    chosenCard = []
    chosenCardId = []
    if(score.length === cardArr.length/2){
        alert(`Congrats, You have found them all`)
        gameOver.textContent = 'REFRESH TO REPLAY'
    }
}

function flipCard(){
    const cardId = this.getAttribute('data-id')
    chosenCard.push(cardArr[cardId].name)
    chosenCardId.push(cardId)

    this.setAttribute('src' , cardArr[cardId].img)

    if(chosenCard.length === 2){
        setTimeout( matchCheck,1000)
    }
}


createCard()

