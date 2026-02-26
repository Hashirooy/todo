import { store } from "../../store/store.js";

export function applyFilter(status, priority) {
  store.setFilter(status || "all", priority || "all");
}

export function resetFilter() {
  store.setFilter("all", "all");
}
