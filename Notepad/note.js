const num = document.querySelectorAll('input[type="checkbox"]');
const btn = document.querySelector(".input-add");
const taskContainer = document.querySelector(".tasks");
const cards = document.querySelectorAll('li[class="card"]');
const taskInput = document.querySelector('input[type="text"]');
let delBtns = [];
let cardId = 0;
let itemId = 0;

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
  const newCardUtil = document.createElement("div");
  const checkBox = document.createElement("input");
  const deleteBtn = document.createElement("button");
  const task = document.createElement("p");

  //assign classes
  newCard.classList.add("card");
  newCardUtil.classList.add("card-util");
  task.classList.add("item");
  deleteBtn.classList.add("delete");

  //assign attr
  newCard.setAttribute(`id`, `c${cardId++}`);
  checkBox.setAttribute("type", "checkbox");
  task.setAttribute("id", `i${itemId++}`);

  //deals with empty inputs
  let todo = taskInput.value ? taskInput.value : "n";
  if (todo === "n") {
    return;
  } else {
    task.textContent = todo;
    taskInput.value = "";

    //creates a new card
    newCard.appendChild(newCardUtil);
    newCardUtil.appendChild(checkBox);
    newCardUtil.appendChild(deleteBtn);
    newCard.appendChild(task);
    taskContainer.appendChild(newCard);

    delBtns.push(newCard.querySelector('button[class="delete"]'));

    delBtns.forEach((b) => {
      b.addEventListener("click", () => {
        b.parentElement.parentElement.remove();
      });
    });
  }
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
