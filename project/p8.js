let tasks = document.getElementById("tasks");
let ongoingtask = document.getElementById("ongoing");
let completedtask = document.getElementById("completed");
let newtaskdialog = document.getElementById("newtaskdialog");
let addlist = document.getElementById("addlist");
let newtaskname = document.getElementById("task");
let addtask = document.getElementById("add");
let close = document.getElementById("close");
let editDialog = document.getElementById("editbox");
let editname = document.getElementById("editname");
let save = document.getElementById("save");
let cancel = document.getElementById("cancel");

let currentEditLabel = null;
let currentEditIndex = null;

function saveTasksToLocalStorage(taskArray) {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function getTasksFromLocalStorage() {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
}

function renderTasks() {
  tasks.innerHTML = "";
  let allTasks = getTasksFromLocalStorage();
  allTasks.forEach((task, index) => createTaskElement(task.name, task.completed, index));
}

function createTaskElement(taskName, isCompleted, index) {
  const li = document.createElement("li");
  li.className = "tasknames";
  li.style.listStyleType = "none";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "check";
  checkbox.checked = isCompleted;

  const taskDiv = document.createElement("div");
  taskDiv.className = "tassk";

  const label = document.createElement("label");
  label.className = "taskname";
  label.textContent = taskName;

  taskDiv.appendChild(label);

  const editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.type = "button";
  editBtn.innerHTML = `<img src="edit_note_24dp_E3E3E3B_FILL0_wght400_GRAD0_opsz24.svg" alt="edit" height="25px" width="25px">`;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.type = "button";
  deleteBtn.innerHTML = `<img src="delete_sweep_24dp_E3E3E_FILL0_wght400_GRAD0_opsz24.svg" alt="delete" height="25px" width="25px">`;

  li.appendChild(checkbox);
  li.appendChild(taskDiv);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  tasks.appendChild(li);

  // Handle checkbox change
  checkbox.addEventListener("change", () => {
    let allTasks = getTasksFromLocalStorage();
    allTasks[index].completed = checkbox.checked;
    saveTasksToLocalStorage(allTasks);
    updateTaskView();
    renderTasks();
  });

  // Handle edit button
  editBtn.addEventListener("click", () => {
    currentEditLabel = label;
    currentEditIndex = index;
    editname.value = label.textContent;
    editDialog.showModal();
  });

  // Handle delete button
  deleteBtn.addEventListener("click", () => {
    let allTasks = getTasksFromLocalStorage();
    allTasks.splice(index, 1);
    saveTasksToLocalStorage(allTasks);
    renderTasks(); // Refresh list
  });
}

function updateTaskView() {
  let allTasks = getTasksFromLocalStorage();
  const ongoing = allTasks.filter(t => !t.completed).map(t => t.name).join(", ");
  const completed = allTasks.filter(t => t.completed).map(t => t.name).join(", ");
  ongoingtask.textContent = ongoing || "No ongoing tasks";
  completedtask.textContent = completed || "No completed tasks";
}

// Open Add Task Dialog
addlist.addEventListener("click", () => {
  newtaskdialog.showModal();
});

// Close Add Task Dialog
close.addEventListener("click", () => {
  newtaskdialog.close();
});

// Add Task
addtask.addEventListener("click", () => {
  const value = newtaskname.value.trim();
  if (!value) return;

  let allTasks = getTasksFromLocalStorage();
  allTasks.push({ name: value, completed: false });
  saveTasksToLocalStorage(allTasks);

  newtaskname.value = "";
  newtaskdialog.close();
  renderTasks();
});

// Save Edit
save.addEventListener("click", () => {
  const value = editname.value.trim();
  if (value && currentEditIndex !== null) {
    let allTasks = getTasksFromLocalStorage();
    allTasks[currentEditIndex].name = value;
    saveTasksToLocalStorage(allTasks);
    editDialog.close();
    renderTasks();
  }
});

// Cancel Edit
cancel.addEventListener("click", () => {
  editDialog.close();
});

// Load tasks on page load
document.addEventListener("DOMContentLoaded", renderTasks);
