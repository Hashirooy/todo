import { store } from "../../store/store.js";

export function deleteTask(id) {
  store.delete(id);
}
