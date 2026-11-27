import { project } from '../project.js';
import { navigatePreview } from '../preview-bridge.js';
import { requests } from './records.js';

const el = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
const selection = params.size
  ? Object.fromEntries(params)
  : project.features[0].scenarios[0].start;
const { screen, role, state, record } = selection;
const request = requests.find(item => item.id === record);

function viewUrl(target) {
  const screenEntry = project.screens.find(entry => entry.id === target.screen);
  const view = screenEntry?.views.find(entry =>
    entry.role === target.role && entry.state === target.state && entry.record === target.record);
  return view && new URL('../' + view.url, import.meta.url).href;
}

function makeLink(anchor, target) {
  anchor.href = viewUrl(target);
  anchor.addEventListener('click', (event) => {
    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
        && navigatePreview(target)) event.preventDefault();
  });
}

function draftText() {
  try {
    return sessionStorage.getItem('workplace-draft-' + record) || request.draftValue;
  } catch {
    return request.draftValue;
  }
}

function showDetails() {
  el('detail').hidden = false;
  el('return-note').hidden = state === 'draft';
  el('reason').textContent = request.reason;
  el('description').textContent = request.description;
  el('item').textContent = request.item;
  el('field-label').textContent = request.field;
  el('field-value').textContent = state === 'draft' ? draftText() : 'Not provided';
  el('submitted').textContent = request.date;
  if (role !== 'applicant') return;

  const editor = el('editor');
  const field = el('correction');
  editor.hidden = false;
  el('edit-label').textContent = 'Edit ' + request.field.toLowerCase();
  el('input-label').textContent = request.field;
  field.value = state === 'draft' ? draftText() : '';
  field.addEventListener('input', () => field.setCustomValidity(''));
  editor.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const text = field.value.trim();
    if (!text) {
      field.setCustomValidity('Enter a value to save this draft.');
      field.reportValidity();
      return;
    }
    // A tab keeps its saved correction. A new review session starts with the
    // project's fixed draft fixture. Form contents never enter the share URL.
    try { sessionStorage.setItem('workplace-draft-' + record, text); } catch { /* Storage is optional. */ }
    if (state === 'draft') {
      el('field-value').textContent = draftText();
      field.value = draftText();
      editor.open = false;
      el('edit-label').focus();
      el('saved').textContent = 'Draft saved.';
    } else {
      const target = { screen, role, state: 'draft', record };
      if (!navigatePreview(target)) location.assign(viewUrl(target));
    }
  });
}

function showHistory() {
  el('history').hidden = false;
  const events = [
    ['Request submitted', 'Equipment request ' + record + ' was sent for review.'],
    ['Returned for changes', request.reason],
  ];
  if (state === 'draft') events.push(['Draft saved', 'The applicant updated the ' + request.field.toLowerCase() + '.']);
  for (const [title, detail] of events.reverse()) {
    const li = document.createElement('li');
    const heading = document.createElement('strong');
    const text = document.createElement('p');
    heading.textContent = title;
    text.textContent = detail;
    li.append(heading, text);
    el('events').append(li);
  }
}

function showRequest() {
  el('request').hidden = false;
  el('request-number').textContent = 'Request ' + record;
  el('request-title').textContent = request.title;
  el('status').textContent = state === 'draft' ? 'Draft' : 'Returned';
  el('status').dataset.state = state;
  makeLink(el('all-requests'), { screen: 'request-list', role, state: 'populated', record: 'queue' });
  makeLink(el('detail-link'), { screen: 'request-detail', role, state, record });
  makeLink(el('history-link'), { screen: 'request-history', role, state, record });
  const isDetail = screen === 'request-detail';
  el(isDetail ? 'detail-link' : 'history-link').setAttribute('aria-current', 'page');
  if (isDetail) showDetails();
  else showHistory();
}

function showList() {
  el('list').hidden = false;
  el('list-title').textContent = role === 'applicant' ? 'My requests' : 'Requests for review';
  if (state === 'error') {
    el('error').hidden = false;
    makeLink(el('retry'), { screen, role, state: 'populated', record });
  } else if (state === 'empty') {
    el('empty').hidden = false;
  } else {
    for (const item of requests) {
      const link = document.createElement('a');
      link.className = 'request-row';
      const number = document.createElement('small');
      const name = document.createElement('strong');
      const badge = document.createElement('span');
      number.textContent = 'Request ' + item.id;
      name.textContent = item.title;
      badge.className = 'badge';
      badge.textContent = 'Returned';
      link.append(number, name, badge);
      makeLink(link, { screen: 'request-detail', role, state: 'returned', record: item.id });
      el('rows').append(link);
    }
  }
}

if (!viewUrl(selection)) {
  el('unavailable').hidden = false;
} else {
  el('perspective').textContent = role === 'reviewer' ? 'Reviewer workspace' : 'Applicant workspace';
  if (screen === 'request-list') showList();
  else showRequest();
}
