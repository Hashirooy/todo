export function handleTaskItemClick(event) {
  const taskItem = event.target.closest(".task-item");
  if (!taskItem) return;
  const taskId = taskItem.dataset.id;
  const task = store.get().find((t) => String(t.id) === String(taskId));
  if (!task) return;
  store.changeTask(taskId, { done: !task.done });
}
