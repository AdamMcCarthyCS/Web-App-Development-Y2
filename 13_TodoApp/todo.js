let todoItems = [];

function formatNowDate() {
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDay();

    hour = date.getHours();
    mins = date.getMinutes();
    secs = date.getSeconds();

    datetimeString = `${day}/${month}/${year}, ${hour}:${mins}:${secs}`
    return datetimeString;

}

function renderTodo(todo) {
    const table = document.getElementById("todo-table");
    const row = table.insertRow(-1);
    const textCell = row.insertCell(0);
    const dateCell = row.insertCell(1);
    textCell.innerText = todo.text;
    dateCell.innerText = todo.date;
}

function addTodo() {
    const todoText = document.getElementById("todo-id").value;
    const todo = {
        text: todoText,
        date: formatNowDate(),
    };
    todoItems.push(todo);
    renderTodo(todo);
}