import { project, orderPair, categoryFor, recordLabel, canonicalComparison } from './project.js';
import { copy, documentationLanguage } from './copy.js';
import {
  readSelection, selectionHref, getView, switchScreen, explanationFor,
  previewHref, prototypeSelection,
} from './navigation.js';
import { loadDocument } from './documents.js';
import { createMobileReview } from './mobile-review.js';

const el = (id) => document.getElementById(id);
const review = el('review-workspace');
const docs = el('document-content');
const cards = el('features');
const formats = project.formats;
const features = project.features;
const screens = project.screens;
const scenarios = features.flatMap(feature => feature.scenarios);
const defaultFormat = formats[0].id;
const documentTabs = ['spec', 'design', 'fa'];
let current;
let activeDocumentType;
let activeDocumentLanguage;
let activeExample;
let frame = el('preview');
let pinnedDocument;
let pendingDocument;
let copyReset;
let deferredPassage;

const mobileReview = createMobileReview({
  parts: [
    [el('screen'), el('mobile-screen-field')],
    [el('format'), el('mobile-format-field')],
    [document.querySelector('.review-aside'), el('mobile-review-content')],
    [el('overview-link'), el('mobile-review-links')],
    [el('tutorial-link'), el('mobile-review-links')],
    [el('language-link'), el('mobile-review-links')],
    [el('copy-link'), el('mobile-review-share')],
    [el('share-fallback'), el('mobile-review-share')],
  ],
  onLayout: () => {
    fitPreview();
    revealDeferredPassage();
  },
  onOpen: revealDeferredPassage,
});

function pretty(id) {
  return copy.labels[id] ?? id;
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

function documentHref(base, type) {
  const url = new URL(base);
  if (type) url.searchParams.set('doc', type);
  else url.searchParams.delete('doc');
  if (type !== 'output') url.searchParams.delete('example');
  return url.href;
}

function addDocumentLinks(nav, selection) {
  for (const type of documentTabs) {
    const anchor = textElement('a', copy[type]);
    anchor.dataset.doc = type;
    if (selection) anchor.href = documentHref(selectionHref(location.href, selection), type);
    else anchor.id = type === 'fa' ? 'open-explanation' : 'open-' + type;
    nav.append(anchor);
  }
}

function setBranding() {
  for (const item of document.querySelectorAll('[data-text]')) {
    item.textContent = copy[item.dataset.text];
  }
  for (const item of document.querySelectorAll('[data-aria]')) {
    item.setAttribute('aria-label', copy[item.dataset.aria]);
  }
  el('project-name').textContent = project.title;
  el('overview-title').textContent = project.title;
  document.title = project.title + ' · ' + copy.review;
  for (const id of ['home', 'overview-link', 'recover']) {
    el(id).dataset.reviewRoute = '';
  }
}

function makeOverview() {
  el('project-summary').textContent = copy.summary;

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
      anchor.href = documentHref(selectionHref(location.href, start), null);
      anchor.dataset.reviewRoute = '';
      anchor.setAttribute('aria-label', scenario.label);
      const cover = document.createElement('img');
      cover.className = 'scenario-cover';
      cover.alt = '';
      cover.src = './shop/assets/family-ride.webp';
      cover.width = 1152;
      cover.height = 768;
      anchor.append(cover);
      anchor.append(textElement('span', scenario.label, 'card-name'));
      if (scenario.description) {
        anchor.append(textElement('span', scenario.description, 'card-description'));
      }
      anchor.append(textElement('span', pretty(start.role) + ' · ' + pretty(start.state), 'card-foot'));
      const item = document.createElement('li');
      const documentNav = document.createElement('nav');
      documentNav.className = 'overview-docs';
      documentNav.setAttribute('aria-label', copy.documentation + ' · ' + scenario.label);
      documentNav.append(textElement('strong', copy.documentation));
      addDocumentLinks(documentNav, start);
      item.append(anchor, documentNav);
      list.append(item);
    }
    section.append(heading, list);
    cards.append(section);
  }
}

function go(href, revealDocument = false) {
  if (location.href !== href) history.pushState(null, '', href);
  render(revealDocument);
}

function choose(selection) {
  go(selectionHref(location.href, { ...selection, pair: orderPair(selection, current) }));
}

function fitPreview() {
  if (!current) return;
  if (mobileReview.active) {
    frame.style.width = frame.style.height = '100%';
    frame.style.transform = 'none';
    el('frame-size').style.width = el('frame-size').style.height = '100%';
    return;
  }
  const format = formats.find(item => item.id === current.format);
  const available = el('frame-area').clientWidth;
  if (!available || !format) return;
  // On a real phone, let the shop reflow at the available width so its touch controls keep their size.
  const width = format.id === 'phone' ? Math.min(available, format.width) : format.width;
  const scale = Math.min(1, available / width);
  frame.style.width = width + 'px';
  frame.style.height = format.height + 'px';
  frame.style.transform = 'scale(' + scale + ')';
  el('frame-size').style.width = width * scale + 'px';
  el('frame-size').style.height = format.height * scale + 'px';
  el('dimensions').textContent = width + ' × ' + format.height + ' px';
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
  const screen = screens.find(item => item.id === current.screen);
  const paths = { spec: screen.spec, fa: screen.fa, design: screen.design, output: project.output };
  for (const link of docs.querySelectorAll('a[data-document-url]')) {
    const target = new URL(link.dataset.documentUrl);
    const passage = target.hash.slice(1);
    target.hash = '';
    const type = Object.keys(paths).find(key => previewHref(paths[key].split('#')[0], document.baseURI) === target.href);
    if (!type) continue;
    let destination = current;
    if ((type === 'fa' || type === 'design') && screens.some(item => item.id === passage)) {
      destination = switchScreen(project, current, passage);
    }
    const href = new URL(documentHref(selectionHref(location.href, destination), type));
    if (type === 'output' && project.examples.includes(passage)) href.searchParams.set('example', passage);
    else href.searchParams.delete('example');
    link.dataset.doc = type;
    link.href = href.href;
  }
  for (const link of docs.querySelectorAll('a[data-prototype-link]')) {
    const next = prototypeSelection(project, link.dataset.prototypeLink, current);
    if (next) link.href = selectionHref(location.href, next);
    else link.removeAttribute('href');
  }
}

function showPassage(hash) {
  // A closed dialog has no layout. Align the heading once its scroll container is visible.
  if (!docs.clientHeight) {
    deferredPassage = hash;
    return;
  }
  deferredPassage = undefined;
  docs.scrollTop = 0;
  if (!hash) return;
  let id;
  try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
  const passage = Array.from(docs.querySelectorAll('[id]')).find(node => node.id === id);
  if (passage) {
    docs.scrollTop += passage.getBoundingClientRect().top - docs.getBoundingClientRect().top - 14;
  } else {
    el('status').textContent = copy.missingHeading;
  }
}

function revealDeferredPassage() {
  if (deferredPassage !== undefined && docs.clientHeight) showPassage(deferredPassage);
}

function focusPanel(headingId) {
  const heading = el(headingId);
  heading.focus({ preventScroll: true });
  const block = matchMedia('(max-width: 840px)').matches ? 'start' : 'nearest';
  heading.closest('section').scrollIntoView({ block });
}

async function openDocument(path, language, resultId = null) {
  if (!path) return;
  const href = previewHref(path, document.baseURI);
  if (!href) return;
  const url = new URL(href);
  const passage = url.hash;
  url.hash = '';
  pendingDocument?.abort();
  const documentKey = resultId ? url.href + '#' + resultId : url.href;
  if (pinnedDocument === documentKey && !docs.hasAttribute('aria-busy')) {
    showPassage(passage);
    return;
  }
  const request = new AbortController();
  pendingDocument = request;
  docs.setAttribute('aria-busy', 'true');
  pinnedDocument = null;
  docs.lang = 'en';
  docs.textContent = copy.loading;
  try {
    const content = await loadDocument(url.href, {
      signal: request.signal, project, shellUrl: location.href, resultId,
    });
    if (request.signal.aborted) return;
    docs.lang = language;
    docs.replaceChildren(content);
    pinnedDocument = documentKey;
    syncDocumentLinks();
    showPassage(passage);
  } catch {
    if (request.signal.aborted) return;
    const retry = textElement('button', copy.retry, 'secondary');
    retry.type = 'button';
    retry.addEventListener('click', () => openDocument(path, language, resultId));
    docs.replaceChildren(textElement('p', copy.loadError), retry);
  } finally {
    if (!request.signal.aborted) {
      pendingDocument = null;
      docs.removeAttribute('aria-busy');
    }
  }
}

function updateLanguageLinks(language) {
  const alternate = new URL(location.href);
  const other = language === 'nl' ? 'en' : 'nl';
  alternate.searchParams.set('lang', other);
  const switcher = el('language-link');
  switcher.href = alternate.href;
  switcher.textContent = 'Docs · ' + other.toUpperCase();
  switcher.setAttribute('aria-label', 'Read documentation in ' + (other === 'en' ? 'English' : 'Dutch'));
  const params = alternate.searchParams;
  const tutorial = params.get('tutorial') === 'existing-project' ? 'existing-project' : 'new-project';
  const prompt = params.get('prompt');
  const fragment = /^(?:[1-9]|1[01])$/.test(prompt) ? '#prompt-' + prompt : '';
  el('tutorial-link').href = '/' + language + '/guides/' + tutorial + '/' + fragment;
  el('tutorial-link').hreflang = language;
  for (const id of ['home', 'overview-link', 'recover']) {
    el(id).href = documentHref(selectionHref(location.href, null), null);
  }
  for (const link of cards.querySelectorAll('a[href]')) {
    const url = new URL(link.href);
    url.searchParams.set('lang', language);
    link.href = url;
  }
}

function render(revealDocument = false) {
  const language = documentationLanguage();
  updateLanguageLinks(language);
  const result = readSelection(project, location.href);
  const view = result.kind === 'preview' && getView(project, result.selection);
  const source = view && previewHref(view.url, document.baseURI);
  const valid = Boolean(source);
  const previous = current;
  current = valid ? result.selection : null;

  el('overview').hidden = result.kind !== 'overview';
  el('unavailable').hidden = result.kind === 'overview' || valid;
  review.hidden = !valid;
  mobileReview.update(valid);
  el('screen').value = current?.screen ?? '';
  el('share-fallback').hidden = true;
  clearTimeout(copyReset);
  el('copy-link').textContent = copy.copy;
  if (!valid) return;

  const screen = screens.find(item => item.id === current.screen);
  const scenario = scenarios.find(item => item.id === current.scenario);
  el('scenario-name').textContent = scenario?.label ?? copy.screenPreview;
  el('review-title').textContent = screen.label;
  const matchingRecord = screen.views.filter(item => item.record === current.record);
  const roles = matchingRecord.filter(item => item.state === current.state).map(item => item.role);
  const roleViews = screen.views.filter(item => item.role === current.role);
  const states = roleViews.map(item => item.state);
  const records = roleViews.filter(item => item.state === current.state && !(current.screen === 'compare' && item.record === 'lights'));
  const selected = current.screen === 'compare' ? canonicalComparison(current.record) : current.record;
  options('record', records.map(({ record }) => [record, recordLabel(current.screen, record)]), selected);
  options('role', [...new Set(roles)].map(id => [id, pretty(id)]), current.role);
  options('state', [...new Set(states)].map(id => [id, pretty(id)]), current.state);
  options('format', formats.map(item => [item.id, item.label]), current.format);
  const title = [screen.label, pretty(current.role), pretty(current.state), recordLabel(current.screen, current.record)].join(' · ');
  const preview = new URL(source);
  if (current.pair) preview.searchParams.set('pair', current.pair);
  showPreview(preview.href, title);

  const params = new URL(location.href).searchParams;
  const requested = params.get('doc');
  const example = requested === 'output' && project.examples.includes(params.get('example'))
    ? params.get('example') : null;
  const type = example || documentTabs.includes(requested) ? requested : 'fa';
  const paths = {
    fa: explanationFor(project, current), design: screen.design, spec: screen.spec,
    output: project.output,
  };
  for (const link of review.querySelectorAll('#review-documents a, #design-shortcut')) {
    link.href = documentHref(location.href, link.dataset.doc);
    if (link.dataset.doc === type) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
  // The design follows the screen. Keep the FA's reading position until its link is chosen again.
  const contentLanguage = type === 'fa' || type === 'output' ? language : 'en';
  if (revealDocument && mobileReview.active) mobileReview.open();
  if (revealDocument || !previous || activeDocumentType !== type || activeDocumentLanguage !== contentLanguage
      || (type === 'design' && previous.screen !== current.screen) || (type === 'output' && activeExample !== example)) {
    openDocument(paths[type], contentLanguage, example);
  }
  activeDocumentLanguage = contentLanguage;
  activeDocumentType = type;
  activeExample = example;
  syncDocumentLinks();
  el('status').textContent = copy.showing + ' · ' + title;
  if (revealDocument) focusPanel('docs-heading');
}

setBranding();
makeOverview();
addDocumentLinks(el('review-documents'));
el('controls').open = !matchMedia('(min-width: 768px) and (max-width: 840px)').matches;
options('screen', [['', copy.quickPick], ...screens.map(screen => [screen.id, screen.label])], '');
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
for (const key of ['role', 'record', 'format']) {
  el(key).addEventListener('change', event => choose({ ...current, [key]: event.target.value }));
}
el('state').addEventListener('change', event => {
  const screen = screens.find(item => item.id === current.screen);
  const state = event.target.value;
  const views = screen.views.filter(view => view.role === current.role && view.state === state);
  const next = views.find(view => categoryFor(view.record) === categoryFor(current.record)) ?? views[0];
  choose({ ...current, state, record: next.record });
});

document.addEventListener('click', event => {
  const anchor = event.target.closest('a');
  if (!anchor || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  if (anchor.hasAttribute('data-doc')) {
    event.preventDefault();
    go(anchor.href, true);
  } else if (anchor.id === 'language-link') {
    event.preventDefault();
    go(anchor.href);
  } else if (anchor.hasAttribute('data-review-route')) {
    event.preventDefault();
    go(anchor.href);
    el('main').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  } else if (current && anchor.hasAttribute('data-prototype-link')) {
    event.preventDefault();
    const next = prototypeSelection(project, anchor.dataset.prototypeLink, current);
    if (next) {
      choose(next);
      if (mobileReview.active) mobileReview.close();
      else if (matchMedia('(max-width: 840px)').matches) focusPanel('preview-heading');
    }
  }
});

window.addEventListener('popstate', () => {
  const docRequested = new URL(location.href).searchParams.has('doc');
  if (!docRequested && mobileReview.active) mobileReview.close();
  render(docRequested);
});
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

el('copy-link').addEventListener('click', async () => {
  const href = location.href;
  try {
    await navigator.clipboard.writeText(href);
    el('status').textContent = copy.copied;
    el('copy-link').textContent = copy.copied;
    clearTimeout(copyReset);
    copyReset = setTimeout(() => { el('copy-link').textContent = copy.copy; }, 1800);
  } catch {
    el('share-fallback').hidden = false;
    const input = el('share-url');
    input.value = href;
    input.focus();
    input.select();
    el('status').textContent = copy.copyFallback;
  }
});

new ResizeObserver(fitPreview).observe(el('frame-area'));
render(new URL(location.href).searchParams.has('doc'));
