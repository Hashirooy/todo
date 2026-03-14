export function createFilterForm() {
  return `
    <h2 class="container-filter__title">Filter</h2>
    <form class="container-filter__form" action="">
      <select id="field-status" name="status">
        <option value="all">all</option>
        <option value="new">new</option>
        <option value="in progress">in progress</option>
        <option value="done">done</option>
      </select>
      <select id="field-priority" name="priority">
        <option value="all">all</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <button type="button" class="form-field__button_filter">Apply</button>
      <button type="button" class="form-field__button_reset">Reset</button>
    </form>
  `;
}
