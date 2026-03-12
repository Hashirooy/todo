import { store } from "../../store/store.js";
import { createModalWindow } from "./modalWindow.js";
import { validateField } from "../../shared/helper/fieldValidation.js";
import { renderHTML } from "../../shared/helper/renderHTML.js";
import { createTodoList } from "../todoList/todoList.js";
import { createLogTaskList } from "../logTaskList/logTaskList.js";

export function deleteTask(id) {
  store.delete(id);
  const tasks = store.getFilteredTasks();
  const html = createTodoList(tasks);
  renderHTML(".container-tasks", html);
  const log = store.getLog();
  const logHtml = createLogTaskList(log);
  renderHTML(".container-log-tasks", logHtml);
}

export function editTask(id) {
  const task = store.get().find((t) => String(t.id) === String(id));
  if (!task) return;
  openModalWindow(createTaskEditFormContent(task));
}

export function saveTaskChange(id, data) {
  store.changeTask(id, data);
  closeModalWindow();
  const tasks = store.getFilteredTasks();
  const html = createTodoList(tasks);
  renderHTML(".container-tasks", html);
  const log = store.getLog();
  const logHtml = createLogTaskList(log);
  renderHTML(".container-log-tasks", logHtml);
}

export function getEditFormData(form) {
  if (
    !form ||
    !form.querySelector("[name='title']") ||
    !form.querySelector("[name='description']") ||
    !form.querySelector("[name='date']") ||
    !form.querySelector("[name='status']") ||
    !form.querySelector("[name='priority']")
  )
    return null;
  return {
    title: validateField(form.querySelector("[name='title']").value.trim()),
    description: validateField(
      form.querySelector("[name='description']").value.trim(),
    ),
    date: validateField(form.querySelector("[name='date']").value),
    status: validateField(form.querySelector("[name='status']").value),
    priority: validateField(form.querySelector("[name='priority']").value),
  };
}

export function createTaskEditFormContent(task) {
  const id = task.id;
  const title = validateField(task.title ?? "").replace(/"/g, "&quot;");
  const description = validateField(task.description ?? "").replace(
    /"/g,
    "&quot;",
  );
  const date = validateField(task.date ?? "");
  const status = task.status ?? "";
  const priority = task.priority ?? "";
  const sel = (field, value) => (field === value ? ' selected="selected"' : "");
  const today = new Date().toISOString().split("T")[0];
  return `
    <div class="modal-window__task modal-window__edit" data-id="${id}">
      <h2 class="modal-window__title">Редактировать задачу</h2>
      <form class="modal-window__edit-form">
        <div class="form-field">
          <label>Название</label>
          <input type="text" name="title" value="${title}" required placeholder="Название">
        </div>
        <div class="form-field">
          <label>Описание</label>
          <input type="text" name="description" value="${description}" placeholder="Описание">
        </div>
        <div class="form-field">
          <label>Срок</label>
          <input type="date" name="date" value="${date}" min="${today}">
        </div>
        <div class="form-field">
          <label>Статус</label>
          <select name="status">
            <option value="new"${sel("new", status)}>new</option>
            <option value="in progress"${sel("in progress", status)}>in progress</option>
            <option value="done"${sel("done", status)}>done</option>
          </select>
        </div>
        <div class="form-field">
          <label>Приоритет</label>
          <select name="priority">
            <option value="low"${sel("low", priority)}>low</option>
            <option value="medium"${sel("medium", priority)}>medium</option>
            <option value="high"${sel("high", priority)}>high</option>
          </select>
        </div>
        <div class="modal-window__actions">
          <button type="submit" class="modal-window__button_save">Сохранить</button>
          <button type="button" class="modal-window__button_cancel">Отмена</button>
        </div>
      </form>
    </div>
  `;
}

export function closeModalWindow() {
  const container = document.querySelector(".modal-container");
  if (!container) return;
  const modalWindow = container.querySelector(".modal-window");
  if (!modalWindow) return;
  modalWindow.classList.remove("modal-window_active");
  document.body.classList.remove("modal-window_active");
  renderHTML(".modal-container", "");
}

export function openModalWindow(content) {
  const container = document.querySelector(".modal-container");
  if (!container) return;
  const html = createModalWindow(content);
  const doc = new DOMParser().parseFromString(html, "text/html");
  container.replaceChildren(...Array.from(doc.body.childNodes));
  const modalEl = container.querySelector(".modal-window");
  modalEl.classList.add("modal-window_active");
  document.body.classList.add("modal-window_active");
}

export function createTaskModalContent(task) {
  const id = task.id;
  const title = validateField(task.title ?? "");
  const description = validateField(task.description ?? "");
  const date = validateField(task.date ?? "");
  const status = validateField(task.status ?? "");
  const priority = validateField(task.priority ?? "");
  return `
    <div class="modal-window__task" data-id="${id}">
      <h2 class="modal-window__title">${title}</h2>
      <p><strong>Описание:</strong> ${description}</p>
      <p><strong>Срок:</strong> ${date}</p>
      <p><strong>Статус:</strong> ${status}</p>
      <p><strong>Приоритет:</strong> ${priority}</p>
      <div class="modal-window__actions">
        <button type="button" class="modal-window__button_delete">Удалить</button>
        <button type="button" class="modal-window__button_edit">Редактировать</button>
      </div>
    </div>
  `;
}
