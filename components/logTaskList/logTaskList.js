import { createLogTaskItemChanged } from "./logTaskItemChanged.js";
import { createLogTaskItemDeleted } from "./logTaskItemDeleted.js";
import { createLogTaskItem } from "./logTaskItem.js";

function renderLogItem(log) {
  switch (log.reason) {
    case "changed":
      if (log.oldTask && log.newTask) {
        return createLogTaskItemChanged(log.oldTask, log.newTask);
      }
      break;
    case "deleted":
      if (log.oldTask) {
        return createLogTaskItemDeleted(log.oldTask);
      }
      break;
  }
  return createLogTaskItem(log);
}

export function createLogTaskList(logItems) {
  return `
    <div class="log-task-list">
      <h2>Log Task List</h2>
      ${logItems.map(renderLogItem).join("")}
    </div>
  `;
}
