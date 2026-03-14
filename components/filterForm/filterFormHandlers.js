import { store } from "../../store/store.js";
import { createTodoList } from "../todoList/todoList.js";
import { createLogTaskList } from "../logTaskList/logTaskList.js";
import { renderHTML } from "../../shared/helper/renderHTML.js";

export function applyFilter(status, priority) {
  store.setFilter(status || "all", priority || "all");
  const tasks = store.getFilteredTasks();
  const html = createTodoList(tasks);
  renderHTML(".container-tasks", html);
  const log = store.getLog();
  const logHtml = createLogTaskList(log);
  renderHTML(".container-log-tasks", logHtml);
}

export function resetFilter() {
  store.resetFilter();
  const tasks = store.getFilteredTasks();
  const html = createTodoList(tasks);
  renderHTML(".container-tasks", html);
  const log = store.getLog();
  const logHtml = createLogTaskList(log);
  renderHTML(".container-log-tasks", logHtml);
}
