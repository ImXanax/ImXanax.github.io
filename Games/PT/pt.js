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

cardArr.sort(()=> 0.5 - Math.random())
const grid = document.querySelector('#grid')

function createCard(){
    for(let i = 0 ; i < 12 ; i++){
        const card = document.createElement('img')
        card.setAttribute('src' , 'images/blank.gif')
        card.setAttribute('data-id' , i)
        console.log(card)
        grid.append(card)
    }
}

createCard()