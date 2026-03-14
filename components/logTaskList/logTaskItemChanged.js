import { validateField } from "../../shared/helper/fieldValidation.js";

function createTaskBlock(label, task) {
  return `
    <div class="log-task-item__block log-task-item__block_${label === "Было" ? "old" : "new"}">
      <h3>${label}</h3>
      <span class="log-task-item__title">${validateField(task.title ?? "")}</span>
      <span class="log-task-item__description">${validateField(task.description ?? "")}</span>
      <span class="log-task-item__date">${validateField(task.date ?? "")}</span>
      <span class="log-task-item__status">${validateField(task.status ?? "")}</span>
      <span class="log-task-item__priority">${validateField(task.priority ?? "")}</span>
    </div>
  `;
}

export function createLogTaskItemChanged(oldTask, newTask) {
  return `
    <div class="log-task-item log-task-item_changed">
      <div class="log-task-item__reason">Изменена задача</div>
      <div class="log-task-item__pair">
        ${createTaskBlock("Было", oldTask)}
        ${createTaskBlock("Стало", newTask)}
      </div>
    </div>
  `;
}
