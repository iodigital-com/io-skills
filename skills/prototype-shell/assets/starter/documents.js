import { prototypeSelection, previewHref, readSelection, selectionHref } from './navigation.js';

function documentLink(label, target, context) {
  const isPrototype = /^prototype:/i.test(target);
  const current = readSelection(context.project, context.shellUrl).selection;
  const selection = isPrototype ? prototypeSelection(context.project, target, current) : null;
  const href = isPrototype
    ? selection && selectionHref(context.shellUrl, selection)
    : previewHref(target, context.documentUrl);

  if (!href) {
    const note = document.createElement('span');
    note.textContent = `${label} (${isPrototype ? 'preview unavailable' : 'link unavailable'})`;
    return note;
  }
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.textContent = label;
  if (isPrototype) anchor.dataset.prototypeLink = target;
  return anchor;
}

function appendInline(element, text, context) {
  const inline = /\[([^\]\n]+)\]\(([^\s)]+)\)|\*\*([^*\n]+)\*\*|`([^`\n]+)`/g;
  let previous = 0;
  for (const match of text.matchAll(inline)) {
    element.append(text.slice(previous, match.index));
    const [, label, target, strong, code] = match;
    if (label !== undefined) {
      element.append(documentLink(label, target, context));
    } else {
      const token = document.createElement(strong === undefined ? 'code' : 'strong');
      token.textContent = strong ?? code;
      element.append(token);
    }
    previous = match.index + match[0].length;
  }
  element.append(text.slice(previous));
}

function cells(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(value => value.trim());
}

function appendRow(section, values, context, header = false) {
  const row = section.insertRow();
  for (const value of values) {
    const cell = document.createElement(header ? 'th' : 'td');
    if (header) cell.scope = 'col';
    appendInline(cell, value, context);
    row.append(cell);
  }
}

// The shell reads the shared subset used by specs and FAs. All source content is
// inserted as text nodes, including raw HTML and unsupported markup.
export function renderDocument(source, context) {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const fragment = document.createDocumentFragment();
  const ids = new Set();
  let paragraph, list;
  for (let index = 0; index < lines.length; index++) {
    const raw = lines[index];
    const line = raw.trim();
    const item = /^(?:([-*+])|(\d+)\.)\s+(.+)$/.exec(line);
    if (!item) list = null;
    if (!line) {
      paragraph = null;
      continue;
    }
    if (line.startsWith('```')) {
      const content = [];
      while (index + 1 < lines.length && lines[++index].trim() !== '```') {
        content.push(lines[index]);
      }
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = content.join('\n');
      pre.append(code);
      fragment.append(pre);
    } else if (line.startsWith('|') && lines[index + 1]?.trim().startsWith('|')
        && cells(lines[index + 1]).every(cell => /^:?-{3,}:?$/.test(cell))) {
      const table = document.createElement('table');
      appendRow(table.createTHead(), cells(line), context, true);
      const body = table.createTBody();
      index++;
      while (lines[index + 1]?.trim().startsWith('|')) {
        appendRow(body, cells(lines[++index]), context);
      }
      fragment.append(table);
    } else if (item) {
      const tag = item[1] ? 'ul' : 'ol';
      if (list?.localName !== tag) {
        list = document.createElement(tag);
        if (tag === 'ol') list.start = Number(item[2]);
        fragment.append(list);
      }
      const li = document.createElement('li');
      appendInline(li, item[3], context);
      list.append(li);
    } else if (/^#{1,6}\s/.test(line)) {
      const [marks, title] = line.split(/\s+(.+)/);
      const heading = document.createElement(`h${marks.length}`);
      appendInline(heading, title, context);
      const slug = heading.textContent.trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s+/g, '-');
      let id = slug || 'section';
      for (let n = 2; ids.has(id); n++) id = `${slug || 'section'}-${n}`;
      heading.id = id;
      ids.add(id);
      fragment.append(heading);
    } else if (/^-{3,}$/.test(line)) {
      fragment.append(document.createElement('hr'));
    } else {
      if (!paragraph) {
        paragraph = document.createElement('p');
        fragment.append(paragraph);
      } else {
        paragraph.append(' ');
      }
      appendInline(paragraph, line, context);
      if (/ {2}$/.test(raw)) paragraph.append(document.createElement('br'));
      continue;
    }
    paragraph = null;
  }
  return fragment;
}

export async function loadDocument(url, { signal, project, shellUrl }) {
  const href = previewHref(url, shellUrl);
  if (!href) throw new Error('The document needs a valid HTTP or HTTPS address.');
  const response = await fetch(href, { signal });
  if (!response.ok) throw new Error(`Document request failed (${response.status}).`);
  return renderDocument(await response.text(), { project, shellUrl, documentUrl: response.url });
}
