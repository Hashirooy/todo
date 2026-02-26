import { store } from "../../store/store.js";

export function addTask(formData) {
  const { title, description, date, status, priority } = formData;
  if (!title) return;
  const tasks = store.get();
  const newId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  store.addTask({
    id: newId,
    title,
    description,
    date,
    status,
    priority,
    done: false,
  });
}

export function getFormData() {
  const form = document.querySelector(".container-form form");
  if (!form) return null;
  const title = form.querySelector("input[name='title']").value.trim();
  const description = form
    .querySelector("input[name='description']")
    .value.trim();
  const date = form.querySelector("input[name='date']").value;
  const statusSelect = form.querySelector("select[name='time']");
  const status = statusSelect.options[statusSelect.selectedIndex].text;
  const prioritySelect = form.querySelector("select[name='priority']");
  const priority = prioritySelect.options[prioritySelect.selectedIndex].text;
  return { title, description, date, status, priority };
}
