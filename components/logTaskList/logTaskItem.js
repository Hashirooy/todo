import { validateField } from "../../shared/helper/fieldValidation.js";

export function createLogTaskItem(log) {
  return `
    <div class="log-task-item">
      <span class="log-task-item__title">${validateField(log.title ?? "")}</span>
      <span class="log-task-item__description">${validateField(log.description ?? "")}</span>
      <span class="log-task-item__date">${validateField(log.date ?? "")}</span>
      <span class="log-task-item__status">${validateField(log.status ?? "")}</span>
      <span class="log-task-item__priority">${validateField(log.priority ?? "")}</span>
      <span class="log-task-item__reason">reason: ${validateField(log.reason ?? "")}</span>
    </div>
  `;
}
