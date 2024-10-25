document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    savedTasks.forEach((task) => addTaskToDOM(task));
    completedTasks.forEach((task) => addTaskToCompletedDOM(task));
}

function addTask() {
    const taskInput = document.getElementById("todo-input");
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    addTaskToDOM(taskText);
    saveTask(taskText);
    taskInput.value = "";
}

function addTaskToDOM(taskText) {
    const taskList = document.getElementById("todo-list");
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    const completeBtn = document.createElement("span");
    completeBtn.textContent = "✔️";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => completeTask(taskItem, taskText);

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTask(taskItem, taskText, "tasks");

    taskItem.appendChild(completeBtn);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
}

function addTaskToCompletedDOM(taskText) {
    const completedList = document.getElementById("completed-list");
    const completedItem = document.createElement("li");
    completedItem.textContent = taskText;

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTask(completedItem, taskText, "completedTasks");

    completedItem.appendChild(deleteBtn);
    completedList.appendChild(completedItem);
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function completeTask(taskItem, taskText) {
    deleteTask(taskItem, taskText, "tasks");
    addTaskToCompletedDOM(taskText);

    const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    completedTasks.push(taskText);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function deleteTask(taskItem, taskText, storageKey) {
    const tasks = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updatedTasks = tasks.filter((task) => task !== taskText);
    localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
    taskItem.remove();
}
