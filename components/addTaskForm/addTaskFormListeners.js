import { addTask } from "./addTaskFormHandlers.js";
import { getFormData } from "./addTaskFormHandlers.js";

export function attachAddTaskFormListeners() {
  const form = document.querySelector(".container-form form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = getFormData();
    addTask(formData);
    form.reset();
  });
}
