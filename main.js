import { store } from "./store/store.js";
import { createTodoList } from "./components/todoList/todoList.js";
import { attachTodoListListeners } from "./components/todoList/todoListListeners.js";
import { createAddTaskForm } from "./components/addTaskForm/addTaskForm.js";
import { attachAddTaskFormListeners } from "./components/addTaskForm/addTaskFormListeners.js";
import { createFilterForm } from "./components/filterForm/filterForm.js";
import { attachFilterFormListeners } from "./components/filterForm/filterFormListeners.js";
import "./components/modalWindow/modalWindowListener.js";
import { createLogTaskList } from "./components/logTaskList/logTaskList.js";
import { renderHTML } from "./shared/helper/renderHTML.js";

function renderTodoList() {
  const tasks = store.getFilteredTasks();
  const html = createTodoList(tasks);
  renderHTML(".container-tasks", html);
}

function renderAddTaskForm() {
  const html = createAddTaskForm();
  renderHTML(".container-form", html);
  attachAddTaskFormListeners();
}

function renderLogTaskList() {
  const tasks = store.getLog();
  const html = createLogTaskList(tasks);
  renderHTML(".container-log-tasks", html);
}

function renderFilterForm() {
  const html = createFilterForm();
  renderHTML(".container-filter", html);
}

document.addEventListener("DOMContentLoaded", () => {
  renderAddTaskForm();
  renderTodoList();
  renderFilterForm();
  renderLogTaskList();
  attachFilterFormListeners();
  attachTodoListListeners();
});
