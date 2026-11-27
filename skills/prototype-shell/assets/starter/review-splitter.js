const handle = document.querySelector('.review-splitter');
const grid = handle.parentElement;
grid.dataset.resizable = '';

let fraction = 0.3;
let drag = null;

function stopDrag() {
  if (!drag) return;
  const { id } = drag;
  drag = null;
  grid.classList.remove('is-resizing');
  if (handle.hasPointerCapture(id)) handle.releasePointerCapture(id);
}

function size(requestedWidth) {
  if (!handle.offsetWidth) {
    stopDrag();
    return;
  }
  const available = grid.clientWidth - handle.offsetWidth;
  const maximum = Math.max(0, available - 320);
  const minimum = Math.min(288, maximum);
  const width = Math.round(Math.max(minimum, Math.min(maximum, requestedWidth ?? fraction * available)));
  if (requestedWidth !== undefined && available > 0) fraction = width / available;
  grid.style.setProperty('--review-document-width', width + 'px');
  handle.setAttribute('aria-valuemin', minimum);
  handle.setAttribute('aria-valuemax', maximum);
  handle.setAttribute('aria-valuenow', width);
  handle.setAttribute('aria-valuetext', width + ' pixels');
}

handle.addEventListener('pointerdown', event => {
  if (event.button !== 0 || !event.isPrimary || drag) return;
  handle.focus({ preventScroll: true });
  handle.setPointerCapture(event.pointerId);
  drag = { id: event.pointerId, x: event.clientX, width: Number(handle.getAttribute('aria-valuenow')) };
  grid.classList.add('is-resizing');
});
handle.addEventListener('pointermove', event => {
  if (drag?.id === event.pointerId) size(drag.width + drag.x - event.clientX);
});
for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) {
  handle.addEventListener(name, event => {
    if (drag?.id === event.pointerId) stopDrag();
  });
}

handle.addEventListener('keydown', event => {
  const current = Number(handle.getAttribute('aria-valuenow'));
  let next;
  switch (event.key) {
    case 'ArrowLeft': next = current + 24; break;
    case 'ArrowRight': next = current - 24; break;
    case 'Home': next = Number(handle.getAttribute('aria-valuemin')); break;
    case 'End': next = Number(handle.getAttribute('aria-valuemax')); break;
    default: return;
  }
  event.preventDefault();
  size(next);
});

new ResizeObserver(() => size()).observe(grid);
size();
