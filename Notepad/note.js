const num = document.querySelectorAll('input[type="checkbox"]')
console.log(num[0].checked)

const btn = document.querySelector('.input-add')

btn.addEventListener('click',()=>{
    console.log(`clicked`)
})