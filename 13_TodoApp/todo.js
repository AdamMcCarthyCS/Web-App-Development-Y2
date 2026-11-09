let todoItems = [];
let count = 0;

function addTodo() {
    count++;
    const todoText = document.getElementById("todo-id").value;
    console.log(`add todo call ${count}: ${todoText}`);

    const table = document.getElementById("todo-table");
    const row = table.insertRow(-1);
    const textCell = row.insertCell(0);
    textCell.innerText = todoText;
}