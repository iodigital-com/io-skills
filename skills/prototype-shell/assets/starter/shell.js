import { project } from './project.js';
import {
  readSelection, selectionHref, getView, switchScreen, explanationFor,
  previewHref, prototypeSelection,
} from './navigation.js';
import { loadDocument } from './documents.js';

const el = (id) => document.getElementById(id);
const docs = el('document-content');
const cards = el('features');
const formats = project.formats;
const features = project.features;
const screens = project.screens;
const scenarios = features.flatMap(feature => feature.scenarios);
const defaultFormat = formats[0].id;
let current;
let frame = el('preview');
let pinnedDocument;
let pendingDocument;
let copyReset;

function pretty(id) {
  const words = id.replace(/[-_]/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function textElement(tag, content, className) {
  const element = document.createElement(tag);
  element.textContent = content;
  if (className) element.className = className;
  return element;
}

function options(id, values, selected) {
  const select = el(id);
  select.replaceChildren(...values.map(([value, label]) => new Option(label, value)));
  select.value = selected ?? '';
  select.disabled = values.length === 0;
}

function setBranding() {
  el('project-name').textContent = project.title;
  el('overview-title').textContent = project.title;
  document.title = project.title + ' · Prototype review';
  if (project.accent && CSS.supports('color', project.accent)) {
    document.documentElement.style.setProperty('--accent', project.accent);
  }
  const logoUrl = project.logo && previewHref(project.logo, document.baseURI);
  if (logoUrl) {
    el('logo').src = logoUrl;
    el('logo').hidden = false;
    el('brand-mark').hidden = true;
  }
  for (const id of ['home', 'overview-link', 'recover']) {
    el(id).href = selectionHref(location.href, null);
    el(id).dataset.reviewRoute = '';
  }
}

function makeOverview() {
  const count = (n, noun) => n + ' ' + noun + (n === 1 ? '' : 's');
  el('project-summary').textContent = [
    count(features.length, 'feature'), count(scenarios.length, 'scenario'),
  ].join(' · ');

  for (const feature of features) {
    const section = document.createElement('section');
    section.className = 'feature';
    const heading = textElement('h2', feature.label);
    heading.id = 'feature-' + feature.id;
    section.setAttribute('aria-labelledby', heading.id);
    const list = document.createElement('ul');
    list.className = 'scenarios';
    for (const scenario of feature.scenarios) {
      const start = { ...scenario.start, format: defaultFormat, scenario: scenario.id };
      const anchor = document.createElement('a');
      anchor.className = 'scenario-card';
      anchor.href = selectionHref(location.href, start);
      anchor.dataset.reviewRoute = '';
      anchor.setAttribute('aria-label', scenario.label);
      anchor.append(textElement('span', scenario.label, 'card-name'));
      if (scenario.description) {
        anchor.append(textElement('span', scenario.description, 'card-description'));
      }
      anchor.append(textElement('span', pretty(start.role) + ' · ' + pretty(start.state), 'card-foot'));
      const item = document.createElement('li');
      item.append(anchor);
      list.append(item);
    }
    section.append(heading, list);
    cards.append(section);
  }
}

function go(href, enterScenario = false) {
  if (location.href !== href) history.pushState(null, '', href);
  render(enterScenario);
}

function choose(selection) {
  go(selectionHref(location.href, selection));
}

function fitPreview() {
  if (!current) return;
  const format = formats.find(item => item.id === current.format);
  const available = el('frame-area').clientWidth;
  if (!available || !format) return;
  const scale = Math.min(1, available / format.width);
  frame.style.width = format.width + 'px';
  frame.style.height = format.height + 'px';
  frame.style.transform = 'scale(' + scale + ')';
  el('frame-size').style.width = format.width * scale + 'px';
  el('frame-size').style.height = format.height * scale + 'px';
  el('dimensions').textContent = format.width + ' × ' + format.height + ' px';
}

function showPreview(source, title) {
  // A new browsing context avoids inserting the frame's old URL into shell history.
  // A format or scenario-only change to the same view preserves local edits.
  if (frame.getAttribute('src') !== source) {
    const next = document.createElement('iframe');
    next.id = 'preview';
    next.title = title;
    next.src = source;
    frame.replaceWith(next);
    frame = next;
  }
  frame.title = title;
  fitPreview();
}

function syncDocumentLinks() {
  if (!current) return;
  for (const link of docs.querySelectorAll('a[data-prototype-link]')) {
    const next = prototypeSelection(project, link.dataset.prototypeLink, current);
    if (next) link.href = selectionHref(location.href, next);
    else link.removeAttribute('href');
  }
}

function showPassage(hash) {
  docs.scrollTop = 0;
  if (!hash) return;
  let id;
  try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
  const passage = Array.from(docs.querySelectorAll('[id]')).find(node => node.id === id);
  if (passage) {
    docs.scrollTop += passage.getBoundingClientRect().top - docs.getBoundingClientRect().top - 14;
  } else {
    el('status').textContent = 'The referenced passage was not found in this document.';
  }
}

async function openDocument(path) {
  if (!path) return;
  const href = previewHref(path, document.baseURI);
  if (!href) return;
  const url = new URL(href);
  const passage = url.hash;
  url.hash = '';
  pendingDocument?.abort();
  if (pinnedDocument === url.href && !docs.hasAttribute('aria-busy')) {
    showPassage(passage);
    return;
  }
  const request = new AbortController();
  pendingDocument = request;
  docs.setAttribute('aria-busy', 'true');
  pinnedDocument = null;
  docs.textContent = 'Loading document…';
  try {
    const content = await loadDocument(url.href, {
      signal: request.signal, project, shellUrl: location.href,
    });
    if (request.signal.aborted) return;
    docs.replaceChildren(content);
    pinnedDocument = url.href;
    syncDocumentLinks();
    showPassage(passage);
  } catch {
    if (request.signal.aborted) return;
    const retry = textElement('button', 'Retry', 'secondary');
    retry.type = 'button';
    retry.addEventListener('click', () => openDocument(path));
    docs.replaceChildren(textElement('p', 'The document could not be loaded.'), retry);
  } finally {
    if (!request.signal.aborted) {
      pendingDocument = null;
      docs.removeAttribute('aria-busy');
    }
  }
}

function render(enterScenario = false) {
  const result = readSelection(project, location.href);
  const view = result.kind === 'preview' && getView(project, result.selection);
  const source = view && previewHref(view.url, document.baseURI);
  const valid = Boolean(source);
  const entering = !current;
  current = valid ? result.selection : null;

  el('overview').hidden = result.kind !== 'overview';
  el('unavailable').hidden = result.kind === 'overview' || valid;
  el('review').hidden = !valid;
  el('screen').value = current?.screen ?? '';
  el('share-fallback').hidden = true;
  clearTimeout(copyReset);
  el('copy-link').textContent = 'Copy situation link';
  if (!valid) return;

  const screen = screens.find(item => item.id === current.screen);
  const scenario = scenarios.find(item => item.id === current.scenario);
  el('scenario-name').textContent = scenario?.label ?? 'Screen preview';
  el('review-title').textContent = screen.label;
  el('record').textContent = current.record;

  const matchingRecord = screen.views.filter(item => item.record === current.record);
  const roles = matchingRecord.filter(item => item.state === current.state).map(item => item.role);
  const states = matchingRecord.filter(item => item.role === current.role).map(item => item.state);
  options('role', [...new Set(roles)].map(id => [id, pretty(id)]), current.role);
  options('state', [...new Set(states)].map(id => [id, pretty(id)]), current.state);
  options('format', formats.map(item => [item.id, item.label]), current.format);
  const title = [screen.label, pretty(current.role), pretty(current.state), current.record].join(' · ');
  showPreview(source, title);

  const explanation = explanationFor(project, current);
  el('open-explanation').disabled = !explanation;
  el('open-spec').hidden = !screen.spec;
  // Ordinary navigation never replaces or scrolls the document the reviewer is reading.
  if (explanation && (enterScenario || (entering && !pinnedDocument && !pendingDocument))) {
    openDocument(explanation);
  }
  syncDocumentLinks();
  el('status').textContent = 'Showing ' + title + '.';
}

setBranding();
makeOverview();
options('screen', [['', 'Quick screen picker'], ...screens.map(screen => [screen.id, screen.label])], '');
el('screen').options[0].disabled = true;
el('screen').addEventListener('change', event => {
  const id = event.target.value;
  if (current) {
    choose(switchScreen(project, current, id));
  } else {
    const screen = screens.find(item => item.id === id);
    const { role, state, record } = screen.views[0];
    choose({ screen: id, role, state, record, format: defaultFormat });
  }
});
for (const key of ['role', 'state', 'format']) {
  el(key).addEventListener('change', event => choose({ ...current, [key]: event.target.value }));
}

document.addEventListener('click', event => {
  const anchor = event.target.closest('a');
  if (!anchor || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  if (anchor.hasAttribute('data-review-route')) {
    event.preventDefault();
    go(anchor.href, cards.contains(anchor));
    el('main').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  } else if (current && anchor.hasAttribute('data-prototype-link')) {
    event.preventDefault();
    const next = prototypeSelection(project, anchor.dataset.prototypeLink, current);
    if (next) choose(next);
  }
});

window.addEventListener('popstate', () => render());
window.addEventListener('message', event => {
  if (!current || event.source !== frame.contentWindow || !frame.src) return;
  if (event.origin !== new URL(frame.src).origin) return;
  const message = event.data;
  if (message?.type !== 'io-prototype:navigate') return;
  const { screen, role, state, record } = message;
  if (![screen, role, state, record].every(value => typeof value === 'string')) return;
  const next = { ...current, screen, role, state, record };
  if (getView(project, next)) choose(next);
});

el('open-explanation').addEventListener('click', () => openDocument(explanationFor(project, current)));
el('open-spec').addEventListener('click', () => {
  const screen = screens.find(item => item.id === current.screen);
  openDocument(screen.spec);
});
el('copy-link').addEventListener('click', async () => {
  const href = selectionHref(location.href, current);
  try {
    await navigator.clipboard.writeText(href);
    el('status').textContent = 'Situation link copied.';
    el('copy-link').textContent = 'Link copied';
    clearTimeout(copyReset);
    copyReset = setTimeout(() => { el('copy-link').textContent = 'Copy situation link'; }, 1800);
  } catch {
    el('share-fallback').hidden = false;
    const input = el('share-url');
    input.value = href;
    input.focus();
    input.select();
    el('status').textContent = 'Select and copy the situation link.';
  }
});

new ResizeObserver(fitPreview).observe(el('frame-area'));
render();
