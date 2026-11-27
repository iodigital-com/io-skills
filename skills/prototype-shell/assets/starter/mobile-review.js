// Move the existing review controls, never the iframe. Reparenting an iframe
// would reload the project and discard any edits the reviewer is trying out.
export function createMobileReview({ parts, onLayout, onOpen }) {
  const handset = window.matchMedia('(max-width: 767px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)');
  const trigger = document.getElementById('mobile-review-toggle');
  const panel = document.getElementById('mobile-review-panel');
  const dismiss = document.getElementById('mobile-review-close');
  const readingPane = document.getElementById('document-content');
  const placements = parts.map(([element, slot]) => {
    const home = document.createComment('review control');
    element.before(home);
    return { element, slot, home };
  });
  let hasPreview = false;
  let active = false;
  let readingTop = 0;

  function rememberReadingPosition() {
    if (readingPane.getClientRects().length) readingTop = readingPane.scrollTop;
  }

  function open() {
    if (!active || panel.open) return;
    panel.showModal();
    trigger.setAttribute('aria-expanded', 'true');
    readingPane.scrollTop = readingTop;
    onOpen?.();
  }

  function close() {
    if (!panel.open) return;
    rememberReadingPosition();
    panel.close();
    trigger.setAttribute('aria-expanded', 'false');
    if (active) trigger.focus({ preventScroll: true });
  }

  function layout() {
    const next = hasPreview && handset.matches;
    if (next === active) return;
    rememberReadingPosition();
    active = next;
    if (!active) close();
    document.body.classList.toggle('mobile-review-active', active);
    trigger.hidden = !active;
    for (const { element, slot, home } of placements) {
      if (active) slot.append(element);
      else home.after(element);
    }
    if (!active && readingPane.getClientRects().length) readingPane.scrollTop = readingTop;
    onLayout?.();
  }

  handset.addEventListener('change', layout);
  trigger.addEventListener('click', open);
  dismiss.addEventListener('click', close);
  readingPane.addEventListener('scroll', rememberReadingPosition);
  panel.addEventListener('cancel', event => {
    event.preventDefault();
    close();
  });
  panel.addEventListener('click', event => {
    if (event.target !== panel) return;
    const rect = panel.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) close();
  });
  return {
    get active() { return active; },
    open, close,
    update(valid) { hasPreview = Boolean(valid); layout(); },
  };
}
