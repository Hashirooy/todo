export function createTaskItem(task) {
  return `
    <div class="task-item" data-id="${task.id}">
        <span class="task-item__title">${task.title}</span>
        <span class="task-item__description">${task.description}</span>
        <span class="task-item__date">${task.date}</span>
        <span class="task-item__status">${task.status}</span>
        <span class="task-item__priority">${task.priority}</span>
        <button class="task-item__delete">×</button>
    </div>
    `;
}
