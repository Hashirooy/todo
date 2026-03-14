import {
  deleteTask,
  editTask,
  closeModalWindow,
  saveTaskChange,
  getEditFormData,
} from "./modalWindowHandler.js";

const modalContainer = document.querySelector(".modal-container");

if (modalContainer) {
  modalContainer.addEventListener("click", (e) => {
    if (e.target.matches(".modal-window__button_delete")) {
      const item = e.target.closest("[data-id]");
      if (item) {
        deleteTask(item.dataset.id);
        closeModalWindow();
      }
      return;
    }
    if (e.target.matches(".modal-window__button_edit")) {
      const item = e.target.closest("[data-id]");
      if (item) editTask(item.dataset.id);
      return;
    }
    if (e.target.matches(".modal-window__button_cancel")) {
      e.preventDefault();
      closeModalWindow();
      return;
    }
    if (e.target.matches(".modal-window__button_close")) {
      e.preventDefault();
      e.stopPropagation();
      closeModalWindow();
    }
  });

  modalContainer.addEventListener("submit", (e) => {
    const form = e.target.closest(".modal-window__edit-form");
    if (!form) return;
    e.preventDefault();
    const wrapper = form.closest("[data-id]");
    if (!wrapper) return;
    const data = getEditFormData(form);
    if (!data.title) return;
    saveTaskChange(wrapper.dataset.id, data);
  });
}
