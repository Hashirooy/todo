import { store } from "../store/store.js";

export function addTaskFormMethods() {
  const form = document.querySelector(".container-form form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = form.querySelector("input[name='title']").value.trim();
    const description = form.querySelector("input[name='description']").value.trim();
    const date = form.querySelector("input[name='date']").value;
    const statusSelect = form.querySelector("select[name='time']");
    const status = statusSelect.options[statusSelect.selectedIndex].text;
    const prioritySelect = form.querySelector("select[name='priority']");
    const priority = prioritySelect.options[prioritySelect.selectedIndex].text;
    if (!title) return;
    const tasks = store.get();
    const newId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    tasks.push({
      id: newId,
      title,
      description,
      date,
      status,
      priority,
      done: false,
    });
    store.set(tasks);
    form.reset();
  });
}
