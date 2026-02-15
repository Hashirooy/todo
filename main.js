import { store } from "./store/store.js";
import { createTodoList } from "./components/todoList.js";
import { createAddTaskForm } from "./components/addTaskForm.js";
import { addTaskFormMethods } from "./components/addTaskFormMethods.js";
import { createFilterForm } from "./components/filterForm.js";
import { filterFormMethods } from "./components/filterFormMethods.js";

function renderTodoList() {
  const tasks = store.getFilteredTasks();
  const html = createTodoList(tasks);
  document.querySelector(".container-tasks").innerHTML = html;
}

function renderAddTaskForm() {
  const html = createAddTaskForm();
  document.querySelector(".container-form").innerHTML = html;
  addTaskFormMethods();
}

function renderFilterForm() {
  const html = createFilterForm();
  document.querySelector(".container-filter").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  store.subscribe(renderTodoList);
  renderAddTaskForm();
  addTaskFormMethods();
  renderTodoList();
  renderFilterForm();
  filterFormMethods();
  const tasksContainer = document.querySelector(".container-tasks");
  tasksContainer.addEventListener("click", (e) => {
    if (!e.target.matches(".task-item__delete")) return;
    const item = e.target.closest(".task-item");
    if (!item) return;
    store.delete(item.dataset.id);
  });
});
