export function renderHTML(containerSelector, html) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const doc = new DOMParser().parseFromString(html, "text/html");
  const nodes = Array.from(doc.body.childNodes);
  container.replaceChildren();
  container.append(...nodes);
}
