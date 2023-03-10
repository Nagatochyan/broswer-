// HTML要素の取得
const todoList = document.getElementById("todo-list");
const addBtn = document.getElementById("add-btn");
const inputField = document.getElementById("input-field");

// TODOリストのデータ
let todos = [];

// TODO項目を作成する関数
function createTodoItem(todo) {
  const todoItem = document.createElement("li");
  const todoText = document.createElement("span");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  todoText.innerText = todo.title;
  editBtn.innerText = "Edit";
  deleteBtn.innerText = "Delete";
  editBtn.addEventListener("click", () => {
    const newTitle = prompt("Enter new title:", todo.title);
    if (newTitle !== null && newTitle.trim() !== "") {
      todo.title = newTitle;
      todoText.innerText = newTitle;
    }
  });
  deleteBtn.addEventListener("click", () => {
    todos = todos.filter(item => item.id !== todo.id);
    renderTodoList();
  });
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    todoText.style.textDecoration = todo.completed ? "line-through" : "none";
  });
  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(editBtn);
  todoItem.appendChild(deleteBtn);
  return todoItem;
}

// TODOリストを表示する関数
function renderTodoList() {
  todoList.innerHTML = "";
  todos.forEach(todo => {
    const todoItem = createTodoItem(todo);
    todoList.appendChild(todoItem);
  });
}

// TODO項目を追加するイベントリスナー
addBtn.addEventListener("click", () => {
  const title = inputField.value.trim();
  if (title !== "") {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false
    };
    todos.push(newTodo);
    inputField.value = "";
    renderTodoList();
  }
});

// 初期表示
renderTodoList();
