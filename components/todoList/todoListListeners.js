import { store } from "../../store/store.js";
import { deleteTask } from "./todoListHandlers.js";
import {
  openModalWindow,
  createTaskModalContent,
} from "../modalWindow/modalWindowHandler.js";

export function attachTodoListListeners() {
  const tasksContainer = document.querySelector(".container-tasks");
  if (!tasksContainer) return;
  tasksContainer.addEventListener("click", (e) => {
    if (!e.target.matches(".task-item__delete")) return;
    const item = e.target.closest(".task-item");
    if (!item) return;
    deleteTask(item.dataset.id);
  });
  tasksContainer.addEventListener("dblclick", (e) => {
    const item = e.target.closest(".task-item");
    if (!item) return;
    const id = item.dataset.id;
    const task = store.get().find((t) => String(t.id) === String(id));
    if (!task) return;
    openModalWindow(createTaskModalContent(task));
  });
}
