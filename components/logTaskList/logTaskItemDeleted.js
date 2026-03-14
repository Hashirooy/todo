import { validateField } from "../../shared/helper/fieldValidation.js";

export function createLogTaskItemDeleted(oldTask) {
  return `
    <div class="log-task-item log-task-item_deleted">
      <div class="log-task-item__reason">Удалена задача</div>
      <span class="log-task-item__title">${validateField(oldTask.title ?? "")}</span>
      <span class="log-task-item__description">${validateField(oldTask.description ?? "")}</span>
      <span class="log-task-item__date">${validateField(oldTask.date ?? "")}</span>
      <span class="log-task-item__status">${validateField(oldTask.status ?? "")}</span>
      <span class="log-task-item__priority">${validateField(oldTask.priority ?? "")}</span>
    </div>
  `;
}
