import { createTaskItem } from "./todoItem.js";

export function createTodoList(tasks) {
  return `
    <div class="todo-list">
        ${tasks.map(createTaskItem).join("")}
    </div>
  `;
}
