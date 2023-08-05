const l = document.querySelector('.logo')
l.addEventListener('mousemove', ()=>{
    l.textContent = '>|<'
})
l.addEventListener('mouseleave', ()=>{
    l.textContent = '-l||l-'
    l.style.color = 'aliceblue'
})