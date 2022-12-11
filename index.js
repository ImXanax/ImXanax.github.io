const displayName = document.getElementById("typewriter-name");

displayName.addEventListener("mouseover", () => {
  displayName.textContent = "Hosseini";
  
  displayName.style.color = 'rgb(36, 114, 216)'
});
displayName.addEventListener("mouseout", () => {
    displayName.textContent = "Meraj";
    displayName.style.color = 'blueviolet'
  });