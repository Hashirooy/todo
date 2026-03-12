import { applyFilter, resetFilter } from "./filterFormHandlers.js";

export function attachFilterFormListeners() {
  const form = document.querySelector(".container-filter__form");
  if (!form) return;

  const applyBtn = form.querySelector(".form-field__button_filter");
  const statusSelect = form.querySelector("select[name='status']");
  const prioritySelect = form.querySelector("select[name='priority']");
  const resetBtn = form.querySelector(".form-field__button_reset");

  resetBtn.addEventListener("click", () => {
    statusSelect.value = "all";
    prioritySelect.value = "all";
    resetFilter();
  });
  applyBtn.addEventListener("click", () => {
    applyFilter(statusSelect.value, prioritySelect.value);
  });
}
