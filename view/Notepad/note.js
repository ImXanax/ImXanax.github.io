const btn = document.querySelector(".input-add");
const taskContainer = document.querySelector(".tasks");
const taskInput = document.querySelector('input[type="text"]');
let todos = [];
/**
 * [{
 *     index: number,
 *     text: string,
 *     checked: boolean
 * }][]
 *
 */
document.addEventListener("DOMContentLoaded", main);

function main() {
    const storedTodos = JSON.parse(localStorage.getItem("todo"));
    console.log("✔ storedTodo: ",storedTodos)
    if (storedTodos && storedTodos.length) {
        todos.push(...storedTodos)
        renderTodos();
    } else localStorage.setItem("todo", JSON.stringify(todos));

    function renderTodos() {
        taskContainer.innerHTML = "";
        // check for null todos before rendering
        if (todos && todos.length) {
            console.log('here', todos)
            todos.forEach((task, index) => {
                createNewCard(task.text, index);
            });
        }
    }

    function handleStorage() {
        let taskText = taskInput.value.trim();

        if (taskText) {
            todos.push({text: taskText, checked: false});
            localStorage.setItem("todo", JSON.stringify(todos));
            renderTodos();
            taskInput.value = "";
        }
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

    // Input listeners , 'button click' & 'Enter'
    btn.addEventListener("click", handleStorage)   // Accept 'Enter' as alternative to add tasks
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleStorage()
        }
    });
}
