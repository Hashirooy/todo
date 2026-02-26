function initState() {
  const saved = JSON.parse(localStorage.getItem("todos"));
  if (saved && Array.isArray(saved)) return saved;
  return [];
}

function initLogChange() {
  const saved = JSON.parse(localStorage.getItem("todosLogChange"));
  if (saved && Array.isArray(saved)) return saved;
  return [];
}

const subscribers = [];

let filter = { status: "all", priority: "all" };

export const store = {
  state: initState(),
  log: initLogChange(),
  get() {
    return this.state;
  },
  getLog() {
    return this.log;
  },
  addTask(task) {
    const tasks = this.get();

    const newTask = { ...task };
    this.set([...tasks, newTask]);
  },

  addLogTask(logItem) {
    const tasks = this.getLog();
    this.setLog([...tasks, logItem]);
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
  setLog(data) {
    this.log = data;
    localStorage.setItem("todosLogChange", JSON.stringify(data));
    subscribers.forEach((component) => component());
  },
  subscribe(component) {
    subscribers.push(component);
  },
  delete(id) {
    const tasks = this.get();
    const deletedTask = tasks.find((task) => String(task.id) === String(id));
    if (!deletedTask) return;
    const newTasks = tasks.filter((task) => String(task.id) !== String(id));
    this.addLogTask({
      reason: "deleted",
      oldTask: deletedTask,
    });
    this.set(newTasks);
  },

  changeTask(id, data) {
    const tasks = this.get();
    const task = tasks.find((t) => String(t.id) === String(id));
    if (!task) return;
    const oldTask = { ...task };
    const updatedTask = { ...task, ...data };
    const newTasks = tasks.map((t) =>
      String(t.id) === String(id) ? updatedTask : t,
    );
    this.set(newTasks);
    this.addLogTask({
      reason: "changed",
      oldTask,
      newTask: updatedTask,
    });
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

if (!localStorage.getItem("todosLogChange")) {
  store.setLog(initLogChange());
}
