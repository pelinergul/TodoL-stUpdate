
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('.new-todo');
const todoList = document.querySelector('.todoList');
const countItem = document.querySelector('#countItem')
todoForm.addEventListener("submit", addTodo);
function addTodo(e) {
    e.preventDefault();
    todoList.innerHTML += 
    `<li>
        <input type="checkbox" class="todo">
        <label>${todoInput.value}</label>
        <input type="edit" class="edit-button" value="${todoInput.value}">
        <button class="delete-button">x</button>
    </li>`
    todoInput.value=""
    savedata();
    bindClicks();

};
for (const filter of document.querySelectorAll('.filters input')) {
    filter.addEventListener('click', function() {
        todoList.classList.value = "todoList " + this.value;
    })
}
function markTodo() {
    this.parentElement.classList.toggle("completed")
    savedata()
}
function removeTodo() {
    this.parentElement.remove();
    savedata()
}
function editTodo(e) {
    if(e.key === 'Enter') {
        this.previousElementSibling.innerText = this.value;
        this.parentElement.classList.remove('editing');
        this.previousElementSibling.style.display = 'block';
        savedata();
    }  
}
function showTodoEdit() {
    this.parentElement.classList.add('editing');
    this.style.display = "none";
    const currValue = this.nextElementSibling.value;
    this.nextElementSibling.value = '';
    this.nextElementSibling.value = currValue;
    this.nextElementSibling.focus();
    savedata()
}
function bindClicks() {
    for (const btn of document.querySelectorAll('.delete-button')) {
        btn.addEventListener('click', removeTodo);
    }
    for (const btn of document.querySelectorAll('label')) {
        btn.addEventListener('click', markTodo);
    }
    document.querySelectorAll('label').forEach(x => x.addEventListener('dblclick', showTodoEdit));
    document.querySelectorAll('.edit-button').forEach(x => x.addEventListener('keydown', editTodo));
    savedata();
}
function savedata() {
  localStorage.setItem("data", todoList.innerHTML);
}
function loaddata() {
 todoList.innerHTML = localStorage.getItem("data");
}
loaddata();
