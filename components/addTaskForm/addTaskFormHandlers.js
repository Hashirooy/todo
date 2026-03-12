import { store } from "../../store/store.js";
import { validateField } from "../../shared/helper/fieldValidation.js";
import { createTodoList } from "../todoList/todoList.js";
import { createLogTaskList } from "../logTaskList/logTaskList.js";
import { renderHTML } from "../../shared/helper/renderHTML.js";

export function addTask(formData) {
  if (!formData) return;
  const { title, description, date, status, priority } = formData;
  if (!title || !description || !date || !status || !priority) return;
  const newId = crypto.randomUUID();
  store.addTask({
    id: newId,
    title,
    description,
    date,
    status,
    priority,
    done: false,
  });
  const tasks = store.getFilteredTasks();
  const html = createTodoList(tasks);
  renderHTML(".container-tasks", html);
  const log = store.getLog();
  const logHtml = createLogTaskList(log);
  renderHTML(".container-log-tasks", logHtml);
}

export function getFormData() {
  const form = document.querySelector(".container-form form");
  if (!form) return null;
  const title = validateField(
    form.querySelector("input[name='title']").value.trim(),
  );
  const description = validateField(
    form.querySelector("input[name='description']").value.trim(),
  );
  const date = validateField(form.querySelector("input[name='date']").value);
  const statusSelect = form.querySelector("select[name='time']");
  const status = validateField(
    statusSelect.options[statusSelect.selectedIndex].text,
  );
  const prioritySelect = form.querySelector("select[name='priority']");
  const priority = validateField(
    prioritySelect.options[prioritySelect.selectedIndex].text,
  );
  return { title, description, date, status, priority };
}
