import { createTaskItem } from "./todoItem.js";

const KANBAN_STATUSES = ["new", "in progress", "done"];

function groupTasksByStatus(tasks) {
  const groups = {};
  KANBAN_STATUSES.forEach((status) => {
    groups[status] = tasks.filter((task) => task.status === status);
  });
  return groups;
}

function getColumnTitle(status) {
  const titles = {
    new: "Новые",
    "in progress": "В работе",
    done: "Готово",
  };
  return titles[status] ?? status;
}

export function createTodoList(tasks) {
  const byStatus = groupTasksByStatus(tasks);
  const columnsHtml = KANBAN_STATUSES.map(
    (status) => `
    <div class="kanban-column" data-status="${status}">
      <h3 class="kanban-column__title">${getColumnTitle(status)}</h3>
      <div class="kanban-column__list">
        ${(byStatus[status] || []).map(createTaskItem).join("")}
      </div>
    </div>
  `
  ).join("");

  return `
    <div class="kanban-board">
      ${columnsHtml}
    </div>
  `;
}
