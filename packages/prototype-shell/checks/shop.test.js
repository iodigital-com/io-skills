import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { chromium } from 'playwright';

const origin = process.env.SHOP_BASE_URL || 'http://127.0.0.1:3000';
function model(id, name, price, attributes) {
  return { id, name, price, attributes };
}
const categories = {
  lights: {
    metricKeys: ['brightness', 'runtime'],
    models: [
      model('stad-400', 'Stad 400', 39, ['400 lumens', '2 hours on the highest setting']),
      model('route-800', 'Route 800', 69, ['800 lumens', '3 hours on the highest setting']),
      model('trail-1200', 'Trail 1200', 99, ['1200 lumens', '4 hours on the highest setting']),
    ],
  },
  bags: {
    metricKeys: ['capacity', 'mount'],
    models: [
      model('frame-2', 'Frame 2', 29, ['2 L', 'Frame']),
      model('stuur-5', 'Stuur 5', 49, ['5 L', 'Handlebar']),
      model('tour-18', 'Tour 18', 79, ['18 L', 'Rear rack']),
    ],
  },
  locks: {
    metricKeys: ['length', 'lockType'],
    models: [
      model('kabel-90', 'Kabel 90', 19, ['90 cm', 'Cable']),
      model('ketting-110', 'Ketting 110', 49, ['110 cm', 'Chain']),
      model('beugel-23', 'Beugel 23', 59, ['23 cm', 'U-lock']),
    ],
  },
};
let browser;
before(async () => {
  browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
});
after(async () => { await browser?.close(); });

async function openStore(t, lang, format = 'phone') {
  const viewport = format === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 1000 };
  const page = await browser.newPage({ viewport });
  t.after(() => page.close());
  await page.goto(new URL('/' + lang + '/guides/new-project/', origin).href);
  await page.locator('a[href*="/prototypes/bike-shop/index.html?"][href*="screen=store"]').first().click();
  if (format === 'desktop') await page.locator('#format').selectOption(format);
  const frame = page.frameLocator('#preview');
  await frame.getByRole('heading', { name: 'Bike accessories' }).waitFor();
  assert.equal(await frame.locator('.shop-mark').innerText(), 'Wobble Wheel');
  assert.equal(await frame.locator('html').getAttribute('lang'), 'en');
  return { page, frame };
}

async function visitCategory(frame, id) {
  await frame.locator('main a[data-screen="catalog"][data-record="' + id + '"]').click();
  await frame.getByRole('checkbox').first().waitFor();
}

async function checkValues(frame, product, metricKeys) {
  await frame.getByRole('columnheader', { name: product.name, exact: true }).waitFor();
  const expected = { price: '€' + product.price };
  metricKeys.forEach((key, index) => { expected[key] = product.attributes[index]; });
  for (const [key, value] of Object.entries(expected)) {
    const selector = 'tbody td[headers~="head-' + product.id + '"][headers~="metric-' + key + '"]';
    assert.equal(await frame.locator(selector).innerText(), value, product.name + ' · ' + key);
  }
}

async function checkOrder(frame, model, region) {
  await frame.locator(region).waitFor();
  const item = frame.locator('.line-item');
  assert.equal(await item.count(), 1);
  assert.equal(await item.getByRole('heading').innerText(), model.name);
  assert.equal(await item.locator('.item-price').innerText(), '€' + model.price);
  assert.equal(await item.getByText('Quantity · 1').count(), 1);
  assert.equal(await frame.locator('.grand-total dd').innerText(), '€' + model.price);
}

for (const lang of ['nl', 'en']) {
  for (const [categoryId, category] of Object.entries(categories)) {
    // Exercise all pairs in the example data and order each example model once.
    for (const [first, second] of [[0, 1], [1, 2], [2, 0]]) {
      const chosen = category.models[first];
      const other = category.models[second];
      test(lang + ' guide: compare ' + chosen.name + ' with ' + other.name + ' and order ' + chosen.name, async t => {
        const { page, frame } = await openStore(t, lang, lang === 'nl' ? 'phone' : 'desktop');
        await visitCategory(frame, categoryId);
        const compare = frame.locator('#compare-action');
        const select = model => frame.getByRole('checkbox', { name: new RegExp(model.name) });
        assert.equal(await compare.isDisabled(), true);
        await select(chosen).check();
        assert.equal(await compare.isDisabled(), true);
        await select(other).check();
        assert.equal(await compare.isEnabled(), true);
        for (const remaining of await frame.getByRole('checkbox', { checked: false }).all()) {
          assert.equal(await remaining.isDisabled(), true);
        }
        await select(other).uncheck();
        for (const option of await frame.getByRole('checkbox').all()) {
          assert.equal(await option.isEnabled(), true);
        }
        await select(other).check();
        await compare.click();
        await frame.getByRole('table').waitFor();
        assert.equal(await frame.getByRole('columnheader').count(), 2);
        await checkValues(frame, chosen, category.metricKeys);
        await checkValues(frame, other, category.metricKeys);
        const pair = [first, second].sort((a, b) => a - b).map(i => category.models[i].id).join('~');
        assert.equal(new URL(page.url()).searchParams.get('record'), pair);
        await frame.locator('main a[data-screen="catalog"]').click();
        await select(chosen).waitFor();
        assert.equal(await select(chosen).isChecked(), true);
        assert.equal(await select(other).isChecked(), true);
        await compare.click();
        await frame.getByRole('button', { name: 'Add to basket · ' + chosen.name }).click();
        await checkOrder(frame, chosen, '.order-product');
        assert.equal(new URL(page.url()).searchParams.get('pair'), pair);
        await frame.getByRole('link', { name: 'Continue to test checkout' }).click();
        await checkOrder(frame, chosen, '.checkout-details');
        await frame.getByRole('button', { name: 'Place test order' }).click();
        await checkOrder(frame, chosen, '.confirmation-order');
        await frame.locator('main a[data-screen="catalog"]').click();
        await select(chosen).waitFor();
        assert.equal(await frame.locator('input:checked').count(), 0);
      });
    }
  }

  test(lang + ' guide: switching categories and emptying the basket', async t => {
    const { frame } = await openStore(t, lang);
    await visitCategory(frame, 'lights');
    await frame.getByRole('checkbox', { name: /Trail 1200/ }).check();
    await frame.locator('a[data-screen="store"]').first().click();
    await visitCategory(frame, 'bags');
    assert.equal(await frame.locator('input:checked').count(), 0);
    assert.equal(await frame.locator('#compare-action').isDisabled(), true);
    await frame.getByRole('checkbox', { name: /Frame 2/ }).check();
    await frame.getByRole('checkbox', { name: /Tour 18/ }).check();
    await frame.locator('#compare-action').click();
    await frame.getByRole('button', { name: /Tour 18/ }).click();
    await frame.locator('.remove').click();
    await frame.locator('.empty-state a').click();
    await frame.getByRole('checkbox', { name: /Tour 18/ }).waitFor();
    assert.equal(await frame.locator('input:checked').count(), 0);
  });
}
