import { navigatePreview } from '../preview-bridge.js';
import { categories, comparisonPairs, labels as t, products } from './catalog.js';

const params = new URLSearchParams(location.search);
const screen = params.get('screen') || 'store';
const record = params.get('record') || (screen === 'store' ? 'categories' : 'lights');
const product = products.find(item => item.id === record);
const pairRecord = screen === 'compare' && record === 'lights' ? 'stad-400~route-800' : record;
const comparison = screen === 'compare' && comparisonPairs.includes(pairRecord)
  ? products.filter(item => pairRecord.split('~').includes(item.id))
  : [];
const emptyRecords = { none: 'lights', 'none-bags': 'bags', 'none-locks': 'locks' };
const emptyCategory = screen === 'basket' && Object.hasOwn(emptyRecords, record) ? emptyRecords[record] : null;
const categoryId = product?.category || comparison[0]?.category || emptyCategory || record;
const category = categories.find(item => item.id === categoryId);
const categoryProducts = products.filter(item => item.category === categoryId);
const returnPair = params.get('pair');
const productPairs = product ? comparisonPairs.filter(pair => pair.split('~').includes(product.id)) : [];
const purchasePair = productPairs.includes(returnPair) ? returnPair : productPairs[0];
const mount = document.getElementById('store');

const symbols = {
  arrow: '<path d="M4 12h15m-5-5 5 5-5 5"/>',
  compare:
    '<rect x="3" y="5" width="7" height="14" rx="1.4"/><rect x="14" y="5" width="7" height="14" rx="1.4"/>',
  bag: '<path d="M4.5 7.5h15l1 13h-17zM8.5 8V6a3.5 3.5 0 0 1 7 0v2"/>',
  check: '<path d="m5 12 4 4 10-10"/>',
  back: '<path d="m13 5-7 7 7 7M7 12h14"/>',
};

function icon(name) {
  return `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7">${symbols[name]}</svg>`;
}

function situation(nextScreen, nextRecord) {
  return {
    screen: nextScreen,
    role: 'cyclist',
    state: nextScreen === 'basket' && Object.hasOwn(emptyRecords, nextRecord) ? 'empty' : 'ready',
    record: nextRecord,
  };
}

function urlFor(nextScreen, nextRecord) {
  const query = new URLSearchParams(situation(nextScreen, nextRecord));
  if (['basket', 'checkout', 'confirmation'].includes(nextScreen) && !Object.hasOwn(emptyRecords, nextRecord)) {
    const pair = screen === 'compare' ? pairRecord : purchasePair;
    if (pair) query.set('pair', pair);
  }
  if (screen === 'compare' && nextScreen === 'catalog') query.set('pair', pairRecord);
  return './index.html?' + query;
}

function link(nextScreen, nextRecord, content, cssClass = '') {
  return `<a href="${urlFor(nextScreen, nextRecord)}" data-screen="${nextScreen}" data-record="${nextRecord}" class="${cssClass}">${content}</a>`;
}

function button(nextScreen, nextRecord, content, accessibleLabel = '') {
  const label = accessibleLabel ? ` aria-label="${accessibleLabel}"` : '';
  return `<button type="button" class="button primary" data-screen="${nextScreen}" data-record="${nextRecord}"${label}>${content}</button>`;
}

function photo(item) {
  return `<img src="./assets/${item.id}.webp" class="product-photo" width="600" height="450" alt="">`;
}

function stock() {
  return `<span class="in-stock">${t.available}</span>`;
}

function heading(title, description = '') {
  return `<header class="page-heading"><h1>${title}</h1>${description ? `<p>${description}</p>` : ''}</header>`;
}

function storePage() {
  return `<div class="store-hero">${heading(t.landing, t.storeIntro)}
    <img class="family-ride" src="./assets/family-ride.webp" width="1152" height="768" alt="A child and parent ride together, with an apple tucked into the child’s bike basket." fetchpriority="high">
  </div><div class="category-grid">${categories.map(department => {
    const name = department.name;
    const cover = products.find(item => item.id === department.cover);
    const card = `<div class="product-shot">${photo(cover)}</div>
      <div class="category-name"><h2>${name}</h2>${icon('arrow')}</div>`;
    return link('catalog', department.id, card, 'category-card');
  }).join('')}</div>`;
}

const metricValues = {
  price: item => '€' + item.price,
  brightness: item => item.lumens + ' ' + t.lumens,
  runtime: item => item.hours + ' ' + t.hoursOnHigh,
  capacity: item => item.liters + ' L',
  mount: item => t[item.mount],
  lockType: item => t[item.lockType],
  length: item => item.cm + ' cm',
  stock,
};

function shortDescription(item) {
  const keys = item.category === 'lights' ? ['brightness'] : category.metrics;
  return keys.map(key => metricValues[key](item)).join(' · ');
}

function productCard(item) {
  return `<article class="product-card">
    <div class="product-shot">${photo(item)}</div>
    <div class="product-info">
      <div class="product-title"><h2>${item.name}</h2><span class="price">€${item.price}</span></div>
      <p class="strength">${shortDescription(item)}</p>
      ${stock()}
      <label class="select-product"><input type="checkbox" value="${item.id}"><span>${t.compareLabel}<span class="sr-only"> · ${item.name}</span></span></label>
    </div>
  </article>`;
}

function catalogPage() {
  return (
    heading(category.name, t.catalogIntro) +
    `<div class="product-grid">${categoryProducts.map(productCard).join('')}</div>
    <div class="selection-actions"><div role="status"><span id="selection-count">0 ${t.selected}</span>
      <span id="selection-hint" hidden>${t.changeSelection}</span></div>
      <button type="button" id="compare-action" class="button primary" data-screen="compare" disabled>${icon('compare')}${t.compareAction[categoryId]}</button>
    </div>`
  );
}

function comparisonPage() {
  const title = t.compare[categoryId];
  const metrics = ['price', ...category.metrics, 'stock'];
  const rows = metrics.map(key => `<tbody>
    <tr><th id="metric-${key}" scope="rowgroup" colspan="2">${t[key]}</th></tr>
    <tr>${comparison.map(item => `<td headers="head-${item.id} metric-${key}">${metricValues[key](item)}</td>`).join('')}</tr>
  </tbody>`).join('');
  return heading(title, t.compareIntro[categoryId]) + `<table class="comparison">
    <caption class="sr-only">${title}</caption>
    <thead><tr>${comparison.map(item => `<th scope="col" id="head-${item.id}"><div class="product-shot">${photo(item)}</div><span class="comparison-name">${item.name}</span></th>`).join('')}</tr></thead>
    ${rows}
    <tfoot><tr>${comparison.map(item => `<td headers="head-${item.id}">${button('basket', item.id, t.add, t.add + ' · ' + item.name)}</td>`).join('')}</tr></tfoot>
  </table>${link('catalog', categoryId, icon('back') + t.browse[categoryId], 'text-link')}`;
}

function lineItem(item) {
  return `<div class="line-item"><div class="line-image">${photo(item)}</div><div class="item-details"><h2>${item.name}</h2>
    <p>${shortDescription(item)}</p><p>${t.quantity} · 1</p></div><strong class="item-price">€${item.price}</strong></div>`;
}

function totals(item) {
  return `<dl class="totals">
    <div><dt>${t.subtotal}</dt><dd>€${item.price}</dd></div>
    <div><dt>${t.pickup}</dt><dd>${t.free}</dd></div>
    <div class="grand-total"><dt>${t.total}</dt><dd>€${item.price}</dd></div>
  </dl>`;
}

function basketPage() {
  if (emptyCategory) {
    return (
      heading(t.basket) +
      `<div class="empty-state"><span class="feature-icon">${icon('bag')}</span><p>${t.empty}</p>
      ${link('catalog', categoryId, t.browse[categoryId], 'button primary')}</div>`
    );
  }
  return (
    heading(t.basket) +
    `<div class="order-layout"><div class="order-product">${lineItem(product)}
    ${link('basket', categoryId === 'lights' ? 'none' : 'none-' + categoryId, t.remove + `<span class="sr-only"> · ${product.name}</span>`, 'text-link remove')}</div>
    <section class="order-summary"><h2>${t.summary}</h2>${totals(product)}${link('checkout', record, t.checkoutAction, 'button primary')}</section></div>
    ${link('compare', purchasePair, icon('back') + t.compareAgain[categoryId], 'text-link')}`
  );
}

function checkoutPage() {
  return (
    heading(t.checkout, t.testHint) +
    `<div class="order-layout">
    <section class="checkout-details"><h2>${t.contact}</h2><dl class="customer">
      <div><dt>${t.name}</dt><dd>${t.customer}</dd></div>
      <div><dt>${t.email}</dt><dd>demo@example.test</dd></div>
      <div><dt>${t.method}</dt><dd>${t.pickup}</dd></div></dl></section>
    <section class="order-summary"><h2>${t.summary}</h2>${lineItem(product)}${totals(product)}
      ${button('confirmation', record, t.place)}</section></div>
    ${link('basket', record, icon('back') + t.back, 'text-link')}`
  );
}

function confirmationPage() {
  return (
    `<span class="feature-icon success">${icon('check')}</span>` +
    heading(t.confirmation, t.success) +
    `<div class="confirmation-order"><h2>${t.receipt[categoryId]}</h2>${lineItem(product)}${totals(product)}</div>` +
    link('catalog', categoryId, t.restart, 'button primary')
  );
}

const pages = {
  store: record === 'categories' && storePage,
  catalog: categories.some(item => item.id === record) && catalogPage,
  compare: comparison.length === 2 && comparisonPage,
  basket: (emptyCategory || product) && basketPage,
  checkout: product && checkoutPage,
  confirmation: product && confirmationPage,
};
const page = Object.hasOwn(pages, screen) && pages[screen];
const mast = `<span class="shop-mark"><img src="./assets/wobble-bike.svg" height="48" width="64" alt=""><span>${t.store}</span></span>`;
mount.innerHTML = `<a class="skip" href="#main">${t.skip}</a>
  <header class="mast"><div class="mast-inner">${mast}
    ${screen === 'store' && page ? '' : link('store', 'categories', t.categories, 'shop-home')}</div></header>
  <main id="main" tabindex="-1" data-category="${category?.id || ''}">${page ? page() : heading(t.invalid) + link('store', 'categories', t.categories, 'button primary')}</main>`;
document.title = mount.querySelector('h1').textContent + ' · ' + t.store;

function updateComparison() {
  const inputs = [...mount.querySelectorAll('.select-product input')];
  const selected = inputs.filter(input => input.checked).map(input => input.value);
  const full = selected.length === 2;
  inputs.forEach(input => { input.disabled = full && !input.checked; });
  mount.querySelector('#selection-count').textContent = selected.length + ' ' + t.selected;
  mount.querySelector('#selection-hint').hidden = !full;
  const action = mount.querySelector('#compare-action');
  action.disabled = !full;
  if (full) action.dataset.record = selected.join('~');
  else delete action.dataset.record;
}

if (screen === 'catalog' && page) {
  if (comparisonPairs.includes(returnPair)) {
    for (const input of mount.querySelectorAll('.select-product input')) {
      input.checked = returnPair.split('~').includes(input.value);
    }
  }
  updateComparison();
  mount.addEventListener('change', updateComparison);
  window.addEventListener('pageshow', updateComparison);
}

mount.addEventListener('click', (event) => {
  const control = event.target.closest('[data-screen][data-record]');
  if (
    !control ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  )
    return;
  event.preventDefault();
  const next = situation(control.dataset.screen, control.dataset.record);
  if (!navigatePreview(next)) location.assign(urlFor(next.screen, next.record));
});
