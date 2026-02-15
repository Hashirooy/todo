function initState() {
  const saved = JSON.parse(localStorage.getItem("todos"));
  if (saved && Array.isArray(saved)) return saved;
  return [];
}

const subscribers = [];

let filter = { status: "all", priority: "all" };

export const store = {
  state: initState(),
  get() {
    return this.state;
  },

  setFilter(status, priority) {
    filter = { status: status || "all", priority: priority || "all" };
    subscribers.forEach((component) => component());
  },
  set(data) {
    this.state = data;
    localStorage.setItem("todos", JSON.stringify(data));
    subscribers.forEach((component) => component());
  },
  subscribe(component) {
    subscribers.push(component);
  },
  delete(id) {
    const tasks = this.get();
    const newTasks = tasks.filter((task) => String(task.id) !== String(id));
    this.set(newTasks);
  },

  getFilteredTasks() {
    const tasks = this.get();
    const { status, priority } = filter;
    return tasks.filter((task) => {
      const matchStatus = status === "all" || task.status === status;
      const matchPriority = priority === "all" || task.priority === priority;
      return matchStatus && matchPriority;
    });
  },
};

if (!localStorage.getItem("todos")) {
  store.set(initState());
}
