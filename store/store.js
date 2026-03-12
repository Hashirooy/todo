import {
  safeParseArray,
  normalizeTask,
} from "../shared/helper/fieldValidation.js";

function initState() {
  const saved = safeParseArray("todos");
  const normalized = saved
    .map((task) => normalizeTask(task))
    .filter((task) => task !== null);
  return normalized;
}

function initLogChange() {
  const saved = safeParseArray("todosLogChange");
  if (!saved.length) return [];
  return saved.filter((item) => item && typeof item === "object");
}

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

    const newTask = normalizeTask(task);
    if (!newTask) return;
    this.set([...tasks, newTask]);
  },

  addLogTask(logItem) {
    const tasks = this.getLog();
    this.setLog([...tasks, logItem]);
  },

  setFilter(status, priority) {
    filter = { status: status || "all", priority: priority || "all" };
  },
  resetFilter() {
    filter = { status: "all", priority: "all" };
  },
  set(data) {
    this.state = data;
    localStorage.setItem("todos", JSON.stringify(data));
  },
  setLog(data) {
    this.log = data;
    localStorage.setItem("todosLogChange", JSON.stringify(data));
    ё;
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
    const merged = { ...task, ...data };
    const updatedTask = normalizeTask(merged) ?? oldTask;
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
