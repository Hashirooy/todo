export function validateField(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function safeParseArray(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function normalizeTask(task) {
  if (!task || typeof task !== "object") return null;
  const id = task.id ?? crypto.randomUUID?.() ?? String(Date.now());
  const title = validateField(String(task.title ?? "").trim());
  const description = validateField(String(task.description ?? "").trim());
  const date = validateField(String(task.date ?? ""));
  const status = validateField(String(task.status ?? "new"));
  const priority = validateField(String(task.priority ?? "low"));

  if (!title || !description || !date) return null;

  return {
    id,
    title,
    description,
    date,
    status,
    priority,
    done: Boolean(task.done),
  };
}
