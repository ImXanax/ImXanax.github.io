const l = document.querySelector('.logo')
l.addEventListener('mousemove', ()=>{
    l.textContent = '>|<'
    l.style.color = 'rgb(97, 12, 209)'
})
l.addEventListener('mouseleave', ()=>{
    l.textContent = '-l||l-'
    l.style.color = 'aliceblue'
})