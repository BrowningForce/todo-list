//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todo");

//Event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("click", filterTodo);
document.addEventListener('DOMContentLoaded', getTodos)

//Functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();

    //create list item
    createTodoDiv(todoInput.value);
    
    //add item to todos in local storage
    saveLocalTodos(todoInput.value);

    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;

    //delete todo
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        //animation
        todo.classList.add("falloff");
        removeLocalItems(todo);
        todo.addEventListener("transitionend", () => todo.remove());
    }
    //checkmark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                todo.style.display = todo.classList.contains("completed")
                    ? "flex"
                    : "none";
                break;
            case "uncompleted":
                todo.style.display = todo.classList.contains("completed")
                    ? "none"
                    : "flex";
                break;
        }
    });
}

const saveLocalTodos = (todo) => {
    //check if localStorage exists
    const todos = checkLocalStorage();
    //push item to todos array
    todos.push(todo);


    localStorage.setItem('todos', JSON.stringify(todos));
};

function getTodos() {
    const todos = checkLocalStorage();
    todos.forEach(todo => {
        createTodoDiv(todo);
    })
}

function checkLocalStorage() {
    return (
        localStorage.getItem("todos") === null
        ? (todos = [])
        : (todos = JSON.parse(localStorage.getItem("todos")))
    );
}

function createTodoDiv(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create <li> tag
    const todoItem = document.createElement("li");
    todoItem.innerText = todo;
    todoItem.classList.add("todo-item");
    todoDiv.appendChild(todoItem);

    //create checmark button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("complete-btn");
    todoDiv.appendChild(checkButton);

    //create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteButton);

    //append todo div to ul
    todoList.appendChild(todoDiv);
}

function removeLocalItems(todo) {
    let todos = checkLocalStorage();

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}