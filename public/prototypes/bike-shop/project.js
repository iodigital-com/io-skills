import { documentationLanguage, copy } from './copy.js';
import { categories, products, comparisonPairs } from './shop/catalog.js';

const legacyPair = 'stad-400~route-800';
const productById = new Map(products.map(product => [product.id, product]));
const emptyRecord = category => category === 'lights' ? 'none' : 'none-' + category;
export const canonicalComparison = record => record === 'lights' ? legacyPair : record;

export function categoryFor(record) {
  return productById.get(record.split('~')[0])?.category
    ?? categories.find(category => category.id === record || emptyRecord(category.id) === record)?.id;
}

export function recordLabel(screen, record) {
  if (screen === 'compare') return canonicalComparison(record).split('~').map(id => productById.get(id).name).join(' + ');
  const category = categories.find(item => item.id === categoryFor(record));
  if (category && record === emptyRecord(category.id)) return copy.labels.none + ' · ' + category.name;
  return productById.get(record)?.name ?? category?.name ?? copy.labels[record];
}

export function orderPair(selection, context) {
  const pair = context?.screen === 'compare' ? canonicalComparison(context.record) : context?.pair;
  if (!comparisonPairs.includes(pair)) return undefined;
  if (selection.screen === 'catalog') {
    const restoringSelection = !context.screen || ['compare', 'catalog'].includes(context.screen);
    return restoringSelection && categoryFor(pair) === selection.record ? pair : undefined;
  }
  return pair.split('~').includes(selection.record) ? pair : undefined;
}

function relatedRecord(current, destination) {
  if (destination === current.screen) return current.record;
  if (destination === 'store') return 'categories';
  const category = categoryFor(current.record) ?? categories[0].id;
  if (destination === 'catalog') return category;
  const pairs = comparisonPairs.filter(pair => categoryFor(pair) === category);
  const previousPair = current.screen === 'compare' && current.record !== 'lights' ? current.record : current.pair;
  const pair = previousPair ?? pairs.find(value => value.split('~').includes(current.record)) ?? pairs[0];
  if (destination === 'compare') return pair;
  return productById.has(current.record) ? current.record : pair.split('~')[0];
}

function view(screen, record, state = 'ready') {
  const role = 'cyclist';
  const query = new URLSearchParams({ screen, role, state, record });
  return { role, state, record, url: './shop/index.html?' + query };
}

function screen(id, views) {
  return {
    id,
    label: copy.labels[id],
    views,
    get fa() { return './docs/' + documentationLanguage() + '/guide.md#' + id; },
    design: './docs/en/design.md#' + id,
    spec: './docs/en/spec.md',
  };
}

export const project = {
  title: copy.title,
  relatedRecord,
  get output() { return './docs/' + documentationLanguage() + '/outputs.md'; },
  examples: [
    'briefing', 'context', 'review-decision', 'plan-new', 'plan-existing', 'test-compare',
    'test-order', 'test-existing', 'review', 'handover', 'release',
  ],
  formats: [
    { id: 'phone', label: copy.labels.phone, width: 390, height: 780 },
    { id: 'desktop', label: copy.labels.desktop, width: 1120, height: 820 },
  ],
  features: [{
    id: 'shopping',
    label: copy.feature,
    scenarios: [{
      id: 'buy-light',
      label: copy.scenario,
      description: copy.description,
      start: { screen: 'store', role: 'cyclist', state: 'ready', record: 'categories' },
    }],
  }],
  screens: [
    screen('store', [view('store', 'categories')]),
    screen('catalog', categories.map(({ id }) => view('catalog', id))),
    screen('compare', [...comparisonPairs.map(pair => view('compare', pair)), view('compare', 'lights')]),
    screen('basket', [
      ...products.map(({ id }) => view('basket', id)),
      ...categories.map(({ id }) => view('basket', emptyRecord(id), 'empty')),
    ]),
    ...['checkout', 'confirmation'].map(id => screen(id, products.map(product => view(id, product.id)))),
  ],
};
