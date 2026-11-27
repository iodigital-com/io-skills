import { orderPair } from './project.js';

const viewKeys = ['role', 'state', 'record'];
const linkKeys = ['screen', ...viewKeys, 'format', 'scenario'];

function findScreen(project, id) {
  return project.screens.find(screen => screen.id === id);
}

function findScenario(project, id) {
  for (const feature of project.features) {
    const scenario = feature.scenarios.find(item => item.id === id);
    if (scenario) return scenario;
  }
  return null;
}

export function getView(project, selection) {
  const screen = findScreen(project, selection.screen);
  const matches = screen?.views.filter(view => viewKeys.every(key => view[key] === selection[key]));
  return matches?.length === 1 ? matches[0] : null;
}

function validSelection(project, selection) {
  return Boolean(getView(project, selection)
    && project.formats.some(format => format.id === selection.format)
    && (!selection.scenario || findScenario(project, selection.scenario)));
}

export function readSelection(project, href) {
  const params = new URL(href).searchParams;
  if (!linkKeys.some(key => params.has(key))) return { kind: 'overview' };
  const selection = {};
  for (const key of linkKeys) {
    const values = params.getAll(key);
    if (values.length === 0 && key === 'scenario') continue;
    if (values.length !== 1 || !values[0]) return { kind: 'invalid' };
    selection[key] = values[0];
  }
  if (!validSelection(project, selection)) return { kind: 'invalid' };
  const pair = orderPair(selection, { pair: params.get('pair') });
  if (pair) selection.pair = pair;
  return { kind: 'preview', selection };
}

export function selectionHref(baseHref, selection) {
  const url = new URL(baseHref);
  for (const key of linkKeys) {
    url.searchParams.delete(key);
    if (selection?.[key]) url.searchParams.set(key, selection[key]);
  }
  if (selection?.pair) url.searchParams.set('pair', selection.pair);
  else url.searchParams.delete('pair');
  url.hash = '';
  return url.href;
}

export function switchScreen(project, current, screenId) {
  const views = findScreen(project, screenId)?.views;
  if (!views?.length) return null;
  const record = project.relatedRecord(current, screenId);
  const view = views.find(view => view.record === record) ?? views[0];
  const next = { ...current, screen: screenId, role: view.role, state: view.state, record: view.record };
  next.pair = orderPair(next, current);
  return next;
}

export function explanationFor(project, selection) {
  const override = findScenario(project, selection.scenario)?.fa?.[selection.screen];
  return override || findScreen(project, selection.screen)?.fa || null;
}

export function previewHref(value, baseHref) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value, baseHref);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

// A document can outlive the selection that opened it. Resolve its links against
// the current situation at the moment the reader follows them.
export function prototypeSelection(project, rawTarget, current) {
  let target;
  try {
    target = new URL(rawTarget);
    if (target.protocol !== 'prototype:' || target.host || target.hash) return null;
    const screen = decodeURIComponent(target.pathname);
    const selection = { screen, format: current?.format ?? project.formats[0]?.id };
    if (current?.scenario) selection.scenario = current.scenario;
    for (const [key, value] of target.searchParams) {
      if (!linkKeys.includes(key) || key === 'screen' || !value || target.searchParams.getAll(key).length !== 1) return null;
      selection[key] = value;
    }
    if (!selection.role || !selection.state) return null;
    if (!selection.record) {
      const matches = findScreen(project, screen)?.views.filter(view =>
        view.role === selection.role && view.state === selection.state);
      if (matches?.length !== 1) return null;
      selection.record = matches[0].record;
    }
    return validSelection(project, selection) ? selection : null;
  } catch {
    return null;
  }
}

