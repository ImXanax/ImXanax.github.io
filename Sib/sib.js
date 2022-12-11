

document.addEventListener('DOMContentLoaded',main)
let btn = document.querySelector('.btn')
const user = document.getElementById('user')
const pass = document.getElementById('pass')
btn.addEventListener('click',(e)=>{
    if(user.value==='sibdbadmin'&&pass.value==='m123m123'){
        window.location.href = "./Admin/admin.html"
    }
    else {
        const el = e.target.parentElement.parentElement
        el.setAttribute('background', '#ff00ff')
    }
})

function main(){
    console.log('loaded')
}