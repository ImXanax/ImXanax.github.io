const displayName = document.getElementById("typewriter-name");

displayName.addEventListener("mouseover", () => {
  displayName.textContent = "Hosseini";
  
  displayName.style.color = 'blue'
});
displayName.addEventListener("mouseout", () => {
    displayName.textContent = "Meraj";
    displayName.style.color = 'blueviolet'
  });