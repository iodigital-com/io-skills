// Call after a project action reaches an addressable situation. The project
// owns its data and supplies a URL that can restore that situation on its own.
export function navigatePreview({ screen, role, state, record }, shellOrigin) {
  if (window.parent === window) return false;
  const source = shellOrigin || document.referrer;
  if (!source) return false;
  const url = new URL(source);
  if (!['https:', 'http:'].includes(url.protocol)) return false;
  window.parent.postMessage({ type: 'io-prototype:navigate', screen, role, state, record }, url.origin);
  return true;
}
