import {
  deleteTask,
  editTask,
  closeModalWindow,
  saveTaskChange,
  getEditFormData,
} from "./modalWindowHandler.js";

document.addEventListener("click", (e) => {
  if (!e.target.matches(".modal-window__button_delete")) return;
  const item = e.target.closest("[data-id]");
  if (!item) return;
  deleteTask(item.dataset.id);
  closeModalWindow();
});

document.addEventListener("click", (e) => {
  if (!e.target.matches(".modal-window__button_edit")) return;
  const item = e.target.closest("[data-id]");
  if (!item) return;
  editTask(item.dataset.id);
});

document.addEventListener("click", (e) => {
  if (!e.target.matches(".modal-window__button_cancel")) return;
  e.preventDefault();
  closeModalWindow();
});

document.addEventListener("submit", (e) => {
  const form = e.target.closest(".modal-window__edit-form");
  if (!form) return;
  e.preventDefault();
  const wrapper = form.closest("[data-id]");
  if (!wrapper) return;
  const data = getEditFormData(form);
  if (!data.title) return;
  saveTaskChange(wrapper.dataset.id, data);
});

document.addEventListener("click", (e) => {
  if (!e.target.matches(".modal-window__button_close")) return;
  e.preventDefault();
  e.stopPropagation();
  closeModalWindow();
});

