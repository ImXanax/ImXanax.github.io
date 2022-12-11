const num = document.querySelectorAll('input[type="checkbox"]');
const btn = document.querySelector(".input-add");
const taskContainer = document.querySelector(".tasks");
const taskInput = document.querySelector('input[type="text"]');

let currentTodo = {};
let delBtns = [];
// let todos = [];
let itemText = "";
let cardId = Math.floor(Math.random(1) * 1000);
let itemId = Math.floor(Math.random(1) * 1000);

document.addEventListener("DOMContentLoaded", main);

function main() {
  iniCards();
  document.querySelector(".tasks").addEventListener("dragover", function (e) {
    e.preventDefault();
    if (
      !e.target.classList.contains("dragging") &&
      e.target.classList.contains("card")
    ) {
      const draggingCard = document.querySelector(".dragging");
      const cards = [...this.querySelectorAll(".card")];
      const currPos = cards.indexOf(draggingCard);
      const newPos = cards.indexOf(e.target);
      console.log(currPos, newPos);
      if (currPos > newPos) {
        this.insertBefore(draggingCard, e.target);
      } else {
        this.insertBefore(draggingCard, e.target.nextSibling);
      }
      const todos = JSON.parse(localStorage.getItem("todos"));
      const removed = todos.splice(currPos, 1);
      todos.splice(newPos, 0, removed[0]);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
}

function iniCards() {}

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
function createNewCard(element) {
  if (taskInput.value === null) return;
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
  newCard.setAttribute(`id`, `${cardId++}`);
  checkBox.setAttribute("type", "checkbox");
  task.setAttribute("id", `${itemId++}`);

  //deals with empty inputs
  // if (element.itemText) itemText = element.itemText;
  // else if (taskInput.value) itemText = taskInput.value;
  //itemText = element.itemText ? element.itemText : element.itemText ? null : taskInput.value ? taskInput.value : taskInput.value ? "" : null ;
  // else {
  currentTodo = {
    itemText,
  };
  todos.push(currentTodo);
  //console.log(todos);
  localStorage.setItem("todo", JSON.stringify(todos));
  //console.log(localStorage.getItem("todo"));

  task.textContent = itemText;
  taskInput.value = "";

  //creates a new card
  newCard.appendChild(newCardUtil);
  newCardUtil.appendChild(checkBox);
  newCardUtil.appendChild(deleteBtn);
  newCard.appendChild(task);
  taskContainer.appendChild(newCard);

  delBtns.push(newCard.querySelector('button[class="delete"]'));

  //event for delete
  delBtns.forEach((b) => {
    b.addEventListener("click", (e) => {
      b.parentElement.parentElement.remove();
    });
  });
  // }

  //add initial placeholder if it doesnt exist already
  if (!document.querySelector('div[class="next-card"]')) {
    const placeHolder = document.createElement("div");
    placeHolder.classList.add("next-card");
    taskContainer.appendChild(placeHolder);
  } else {
    addPlaceHolder();
  }
}

// Add button event listener
btn.addEventListener("click", (event) => {
  createNewCard();
});

//Accept 'Enter' as alternative to add tasks
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    createNewCard();
  } else return;
});
