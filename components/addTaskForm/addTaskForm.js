export function createAddTaskForm() {
  return `
  <h1>TODO LIST</h1>
  <form action="">
    <div class="form-field">
      <label for="field-title">Title</label>
      <input id="field-title" type="text" name="title" required placeholder="Add title">
    </div>
    <div class="form-field">
      <label for="field-description">Description</label>
      <input id="field-description" type="text" name="description" placeholder="Add description">
    </div>
    <div class="form-field">
      <label for="field-date">Deadline</label>
      <input id="field-date" type="date" name="date">
    </div>
    <div class="form-field">
    </div>
    <div class="form-field">
      <label for="field-priority">Priority</label>
      <select id="field-priority" name="priority" required>
        <option value="1">low</option>
        <option value="2">medium</option>
        <option value="3">high</option>
      </select>
    </div>
    <div class="form-field form-field_full">
      <button type="submit">Add</button>
    </div>
  </form>`;
}
