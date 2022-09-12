// ist der state der alle todo daten beinhaltet
let todos = [];
let localStorageIsEmpty = false;

function getLocalStorage() {
  if (localStorage.getItem("todos")) {
    const todosInLocalStorage = localStorage.getItem("todos");
    localStorageIsEmpty = false;

    // localstorage Eintrag ist ein String und muss mit Json.parse in ein Objekt verwandeklt werden
    return JSON.parse(todosInLocalStorage);
  } else {
    localStorageIsEmpty = true;
    return [];
  }
}

todos = getLocalStorage();

// ^____ Array mit einträgen aus dem Localstorage befüllt werden
// Neue Einträge müssen in das todos array, und in den localstorage gespeichert werden

function addTodo(text) {
  todos.push({
    isDone: false,
    text: text,
    id: createID(text),
  });
}

function noEmtyTodo() {
  const textInput = inputTodo.value;
  if (textInput.length < 3) {
    console.log("To Do ist zu kurz");
    return;
  }
}

function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorageIsEmpty = false;
}

const newTodoInputElement = document.querySelector("#new-todo");

const newButnElement = document.querySelector("#new-item-btn");
const newTodoItemForm = document.querySelector("#new-item-form");

newTodoItemForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo(newTodoInputElement.value);
  updateLocalStorage();
  render();
  // reset input feld
  newTodoInputElement.value = "";
});

// list html element wo Einträge angezeigt werden sollen
const todoListElement = document.querySelector(".todo-list");

function render() {
  // reset
  todoListElement.innerHTML = "";

  if (localStorageIsEmpty) {
    const infoTextElement = document.createElement("li");
    infoTextElement.textContent = "Keine To-Dos vorhanden.";
    todoListElement.appendChild(infoTextElement);
  }

  // aus dem todos state einzelne todos erzeugen
  for (let todo of todos) {
    // dynamisch li html Elemente erzeugen mit den Daten von todo
    const listItemElement = document.createElement("li");
    listItemElement.innerText = todo.text;

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.id = todo.id;

    if (todo.isDone) {
      checkboxElement.checked = true;
    }

    listItemElement.appendChild(checkboxElement);
    todoListElement.appendChild(listItemElement);
  }
}

todoListElement.addEventListener("change", function (e) {
  const id = e.target.id;
  const index = todos.findIndex((todo) => todo.id === id);

  todos[index].isDone = !todos[index].isDone;
});

function createID(str) {
  return str.trim().replaceAll(" ", "-").toLowerCase();
}

const removeDoneTodos = document.querySelector("#remove-Done-Todos");
removeDoneTodos.addEventListener("click", function () {
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos.isDone === true) {
      todos.splice(i, 1);
    }
  }
  updateLocalStorage();
  render();
});

render();
