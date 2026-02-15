import { store } from "../store/store.js";

export function filterFormMethods() {
  const form = document.querySelector(".container-filter__form");
  if (!form) return;

  const applyBtn = form.querySelector(".form-field__button_filter");
  const statusSelect = form.querySelector("select[name='status']");
  const prioritySelect = form.querySelector("select[name='priority']");
  const resetBtn = form.querySelector(".form-field__button_reset");
  resetBtn.addEventListener("click", () => {
    store.setFilter("all", "all");
  });

  applyBtn.addEventListener("click", () => {
    const status = statusSelect.value;
    const priority = prioritySelect.value;
    store.setFilter(status, priority);
  });
}
