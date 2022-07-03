const num = document.querySelectorAll('input[type="checkbox"]');
const btn = document.querySelector(".input-add");
const taskContainer = document.querySelector(".tasks");
const cards = document.querySelectorAll('li[class="card"]');
const taskInput = document.querySelector('input[type="text"]');

function addPlaceHolder() {
  let placeHolder = document.querySelector('div[class="next-card"]');
  placeHolder.remove();

  placeHolder = document.createElement("div");
  placeHolder.classList.add("next-card");
  taskContainer.appendChild(placeHolder);
}

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

    let todo = taskInput.value ? taskInput.value : "Nothing Specified...";

    task.textContent = todo;
    newCard.appendChild(newCardUtil);
    newCardUtil.appendChild(checkBox);
    newCardUtil.appendChild(deleteBtn);
    newCard.appendChild(task);

    taskContainer.appendChild(newCard);
    //add initial placeholder
    if (!document.querySelector('div[class="next-card"]')) {
      const placeHolder = document.createElement("div");
      placeHolder.classList.add("next-card");
      taskContainer.appendChild(placeHolder);
    } else {
      addPlaceHolder();
    }
  } catch (e) {
    console.error("ERR:" + e);
  }
}

taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    createCard();
  } else return;
});
// adding tasks

// checkmarking task + strikethrough effect

// removing tasks

// appending card placeholder at the end
