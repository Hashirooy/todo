import { store } from "./store/store.js";
import { createTodoList } from "./components/todoList/todoList.js";
import { attachTodoListListeners } from "./components/todoList/todoListListeners.js";
import { createAddTaskForm } from "./components/addTaskForm/addTaskForm.js";
import { attachAddTaskFormListeners } from "./components/addTaskForm/addTaskFormListeners.js";
import { createFilterForm } from "./components/filterForm/filterForm.js";
import { attachFilterFormListeners } from "./components/filterForm/filterFormListeners.js";
import "./components/modalWindow/modalWindowListener.js";
import { createLogTaskList } from "./components/logTaskList/logTaskList.js";

function setContentFromHTML(container, html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const nodes = Array.from(doc.body.childNodes);
  container.replaceChildren();
  container.append(...nodes);
}

function renderTodoList() {
  const tasks = store.getFilteredTasks();
  const html = createTodoList(tasks);
  const container = document.querySelector(".container-tasks");
  setContentFromHTML(container, html);
}

function renderAddTaskForm() {
  const html = createAddTaskForm();
  const container = document.querySelector(".container-form");
  setContentFromHTML(container, html);
  attachAddTaskFormListeners();
}

function renderLogTaskList() {
  const tasks = store.getLog();
  const html = createLogTaskList(tasks);
  const container = document.querySelector(".container-log-tasks");
  setContentFromHTML(container, html);
}

function renderFilterForm() {
  const html = createFilterForm();
  const container = document.querySelector(".container-filter");
  setContentFromHTML(container, html);
}

document.addEventListener("DOMContentLoaded", () => {
  store.subscribe(renderTodoList);
  store.subscribe(renderLogTaskList);
  renderAddTaskForm();
  renderTodoList();
  renderFilterForm();
  renderLogTaskList();
  attachFilterFormListeners();
  attachTodoListListeners();
});
