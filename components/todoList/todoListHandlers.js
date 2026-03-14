import { store } from "../../store/store.js";
import { createTodoList } from "./todoList.js";
import { createLogTaskList } from "../logTaskList/logTaskList.js";
import { renderHTML } from "../../shared/helper/renderHTML.js";

export function deleteTask(id) {
  store.delete(id);
  const tasks = store.getFilteredTasks();
  const html = createTodoList(tasks);
  renderHTML(".container-tasks", html);
  const log = store.getLog();
  const logHtml = createLogTaskList(log);
  renderHTML(".container-log-tasks", logHtml);
}
