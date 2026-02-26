export function createLogTaskList(logItems) {
  return `
    <div class="log-task-list">
      <h2>Log Task List</h2>
      ${logItems
        .map((log) => {
          if (log.reason === "changed" && log.oldTask && log.newTask) {
            const { oldTask, newTask } = log;
            return `
              <div class="log-task-item log-task-item_changed">
                <div class="log-task-item__reason">Изменена задача #${oldTask.id}</div>
                <div class="log-task-item__pair">
                  <div class="log-task-item__block log-task-item__block_old">
                    <h3>Было</h3>
                    <span class="log-task-item__title">${oldTask.title ?? ""}</span>
                    <span class="log-task-item__description">${oldTask.description ?? ""}</span>
                    <span class="log-task-item__date">${oldTask.date ?? ""}</span>
                    <span class="log-task-item__status">${oldTask.status ?? ""}</span>
                    <span class="log-task-item__priority">${oldTask.priority ?? ""}</span>
                  </div>
                  <div class="log-task-item__block log-task-item__block_new">
                    <h3>Стало</h3>
                    <span class="log-task-item__title">${newTask.title ?? ""}</span>
                    <span class="log-task-item__description">${newTask.description ?? ""}</span>
                    <span class="log-task-item__date">${newTask.date ?? ""}</span>
                    <span class="log-task-item__status">${newTask.status ?? ""}</span>
                    <span class="log-task-item__priority">${newTask.priority ?? ""}</span>
                  </div>
                </div>
              </div>
            `;
          }

          if (log.reason === "deleted" && log.oldTask) {
            const { oldTask } = log;
            return `
              <div class="log-task-item log-task-item_deleted">
                <div class="log-task-item__reason">Удалена задача #${oldTask.id}</div>
                <span class="log-task-item__title">${oldTask.title ?? ""}</span>
                <span class="log-task-item__description">${oldTask.description ?? ""}</span>
                <span class="log-task-item__date">${oldTask.date ?? ""}</span>
                <span class="log-task-item__status">${oldTask.status ?? ""}</span>
                <span class="log-task-item__priority">${oldTask.priority ?? ""}</span>
              </div>
            `;
          }
          return `
            <div class="log-task-item">
              <span class="log-task-item__title">${log.title ?? ""}</span>
              <span class="log-task-item__description">${log.description ?? ""}</span>
              <span class="log-task-item__date">${log.date ?? ""}</span>
              <span class="log-task-item__status">${log.status ?? ""}</span>
              <span class="log-task-item__priority">${log.priority ?? ""}</span>
              <span class="log-task-item__reason">reason: ${log.reason ?? ""}</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}
