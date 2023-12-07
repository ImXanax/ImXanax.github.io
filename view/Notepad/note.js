const num = document.querySelectorAll('input[type="checkbox"]');
const btn = document.querySelector(".input-add");
const taskContainer = document.querySelector(".tasks");
const taskInput = document.querySelector('input[type="text"]');
let todos = [];
let delBtns = [];

document.addEventListener("DOMContentLoaded", main);

function main() {
  todos = JSON.parse(localStorage.getItem("todo"));
  if (todos) renderTodos();
  else localStorage.setItem("todo", JSON.stringify(todos));

  function renderTodos() {
    taskContainer.innerHTML = "";
    todos.forEach((task, index) => {
      createNewCard(task.text, index);
    });
  }

  //creating card
  function createNewCard(text, index) {
    //fetching required elements
    const newCard = document.createElement("li");
    const newCardUtil = document.createElement("div");
    const checkBox = document.createElement("input");
    const deleteBtn = document.createElement("button");
    const task = document.createElement("p");
    // assign classes
    newCard.classList.add("card");
    newCardUtil.classList.add("card-util");
    task.classList.add("item");
    deleteBtn.classList.add("delete");
    // assign attr
    newCard.setAttribute(`data-index`, index);
    checkBox.setAttribute("type", "checkbox");
    // set values
    task.textContent = text;
    //creates a new card
    newCard.appendChild(newCardUtil);
    newCardUtil.appendChild(checkBox);
    newCardUtil.appendChild(deleteBtn);
    newCard.appendChild(task);
    taskContainer.appendChild(newCard);

    //event for delete
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      localStorage.setItem("todo", JSON.stringify(todos));
      renderTodos();
    });
  }

  // Add button event listener
  btn.addEventListener("click", (event) => {
    let taskText = taskInput.value.trim();
    if (taskText) {
      todos.push({ text: taskText });
      localStorage.setItem("todo", JSON.stringify(todos));
      renderTodos();
      taskInput.value = "";
    }
  });
  // Accept 'Enter' as alternative to add tasks
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      let taskText = taskInput.value.trim();
      if (taskText) {
        todos.push({ text: taskText });
        localStorage.setItem("todo", JSON.stringify(todos));
        renderTodos();
        taskInput.value = "";
      }
    } else return;
  });
}
