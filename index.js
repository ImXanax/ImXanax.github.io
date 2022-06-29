const displayName = document.getElementById("typewriter-name");

displayName.addEventListener("mouseover", () => {
  displayName.textContent = "Meraj";
  
  displayName.style.color = 'blue'
});
displayName.addEventListener("mouseout", () => {
    displayName.textContent = "Xanax";
    displayName.style.color = 'blueviolet'
  });