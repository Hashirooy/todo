export function createModalWindow(content) {
  return `
    <div class="modal-window">
      <div class="modal-window__content">
        <div class="modal-window__body">${content}</div>
        <button type="button" class="modal-window__button_close">Закрыть</button>
      </div>
    </div>
  `;
}
