const num = document.querySelectorAll('input[type="checkbox"]');
const btn = document.querySelector(".input-add");
const taskContainer = document.querySelector(".tasks");
const cards = document.querySelectorAll('li[class="card"]');
const taskInput = document.querySelector('input[type="text"]')
// const cardPlaceholder = document.createElement('div')
// cardPlaceholder.classList.add('next-card')
// taskContainer.appendChild(cardPlaceholder)

//creating card
function createCard() {
  try {
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

    let todo = taskInput.value ? taskInput.value : 'Nothing Specified...';

    task.textContent = todo
    newCard.appendChild(newCardUtil);
    newCardUtil.appendChild(checkBox);
    newCardUtil.appendChild(deleteBtn);
    newCard.appendChild(task);

    taskContainer.appendChild(newCard)
  } catch (e) {
    console.error("ERR:" + e);
  }
}
// adding tasks

// checkmarking task + strikethrough effect

// removing tasks

// appending card placeholder at the end
