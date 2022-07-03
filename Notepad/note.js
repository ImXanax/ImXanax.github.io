const num = document.querySelectorAll('input[type="checkbox"]');
const btn = document.querySelector(".input-add");
const taskContainer = document.querySelector(".tasks");
const cards = document.querySelectorAll('li[class="card"]');
const taskInput = document.querySelector('input[type="text"]');

//adding placeholder for next card
function addPlaceHolder() {
  //prevent overlapping element
  let placeHolder = document.querySelector('div[class="next-card"]');
  placeHolder.remove();

  //remake new element
  placeHolder = document.createElement("div");
  placeHolder.classList.add("next-card");
  taskContainer.appendChild(placeHolder);
}

//creating card
function createCard() {
  //fetching required elements
  const newCard = document.createElement("li");
  newCard.classList.add("card");
  const newCardUtil = document.createElement("div");
  newCardUtil.classList.add("card-util");
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  const task = document.createElement("p");
  task.classList.add("item");

  //deals with empty inputs
  let todo = taskInput.value ? taskInput.value : "Nothing Specified...";

  //creates a new card
  task.textContent = todo;
  newCard.appendChild(newCardUtil);
  newCardUtil.appendChild(checkBox);
  newCardUtil.appendChild(deleteBtn);
  newCard.appendChild(task);
  taskContainer.appendChild(newCard);

  //add initial placeholder if it doesnt exist already
  if (!document.querySelector('div[class="next-card"]')) {
    const placeHolder = document.createElement("div");
    placeHolder.classList.add("next-card");
    taskContainer.appendChild(placeHolder);
  } else {
    addPlaceHolder();
  }
}

//Accept 'Enter' as alternative to add tasks
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    createCard();
  } else return;
});