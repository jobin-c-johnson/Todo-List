const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUi = document.getElementById('todo-list');

let allTodos = getTodo();
console.log(allTodos);
todoUpdate();

todoForm.addEventListener('submit',function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText= todoInput.value.trim();
    if(todoText.length>0){
        const todoObject = {
            text : todoText,
            completed : false
        }
        allTodos.push(todoObject);
        todoUpdate();
        saveTodo();
        todoInput.value="";
    }
}
function todoUpdate(){
    todoListUi.innerHTML="";
    allTodos.forEach((todo,todoIndex)=>{
        const todoItem= createTodoItem(todo,todoIndex);
        todoListUi.append(todoItem);

    })
}

function createTodoItem(todo,todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLi = document.createElement("li");
    const todoText = todo.text;
    todoLi.className= "todo";
    todoLi.innerHTML =`
        <input type="checkbox" id="${todoId}">
        <label for="${todoId}" class="custom-checkbox">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z"></path><path d="M15.292 7.295 12 10.587 8.708 7.295 7.294 8.709l3.292 3.292-3.292 3.292 1.414 1.414L12 13.415l3.292 3.292 1.414-1.414-3.292-3.292 3.292-3.292z"></path></svg>
        </button>
    `
    const deleteButton = todoLi.querySelector(".delete-button")
    deleteButton.addEventListener("click",()=>{
        deleteTodoItem(todoIndex);
    })
    const checkbox = todoLi.querySelector("input");
    checkbox.addEventListener("change",()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodo();
    })
    checkbox.checked= todo.completed;
    return todoLi;
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_,i)=> i !==todoIndex);
    saveTodo();
    todoUpdate();
}
function saveTodo(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos",todosJson);
}

function getTodo(){
    const todos = localStorage.getItem("todos") ;
    return todos ? JSON.parse(todos):[];
}