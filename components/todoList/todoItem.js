import { validateField } from "../../shared/helper/fieldValidation.js";

export function createTaskItem(task) {
  return `
    <div class="task-item" data-id="${task.id}">
        <span class="task-item__title">${validateField(task.title)}</span>
        <span class="task-item__description">${validateField(task.description)}</span>
        <span class="task-item__date">${validateField(task.date)}</span>
        <span class="task-item__status">${validateField(task.status)}</span>
        <span class="task-item__priority">${validateField(task.priority)}</span>
        <button class="task-item__delete">×</button>
    </div>
    `;
}
