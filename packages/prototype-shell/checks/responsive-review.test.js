import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { chromium } from 'playwright';

const starter = new URL(process.env.STARTER_BASE_URL || 'http://127.0.0.1:4319/');
starter.search = new URLSearchParams({
  screen: 'request-detail', role: 'applicant', state: 'returned', record: '104',
  format: 'desktop', scenario: 'improve-returned',
});
const shop = new URL('/prototypes/bike-shop/index.html', process.env.SHOP_BASE_URL || 'http://127.0.0.1:3000');
shop.search = new URLSearchParams({
  lang: 'nl', screen: 'store', role: 'cyclist', state: 'ready', record: 'categories',
  format: 'desktop', scenario: 'buy-light',
});

let browser;
before(async () => {
  browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
});
after(async () => { await browser?.close(); });

async function openReview(t, url, phone) {
  const viewport = phone ? { width: 375, height: 812 } : { width: 1440, height: 900 };
  const page = await browser.newPage({ viewport, isMobile: phone, hasTouch: phone });
  page.setDefaultTimeout(6000);
  t.after(() => page.close());
  await page.goto(url.href);
  await page.frameLocator('#preview').locator('main').waitFor();
  return page;
}

for (const [name, situation] of [['starter', starter], ['bike shop', shop]]) {
  test(name + ' fills the phone and keeps the preview mounted while reviewing', async t => {
    const page = await openReview(t, situation, true);
    const toggle = page.getByRole('button', { name: /prototype/i });
    const frame = page.locator('#preview');
    const bounds = await frame.boundingBox();
    assert.deepEqual(bounds, { x: 0, y: 0, ...page.viewportSize() });
    const preview = page.frameLocator('#preview');
    assert.equal(await preview.locator('html').evaluate(() => innerWidth), 375);
    await preview.locator('html').evaluate(() => { window.reviewTestMarker = 'mounted'; });

    if (name === 'starter') {
      await preview.locator('#edit-label').click();
      await preview.locator('#correction').fill('Room 8C');
    }
    await toggle.tap();
    const panel = page.getByRole('dialog');
    await panel.waitFor();
    assert.ok(await panel.evaluate(node => node.matches(':modal')));
    assert.ok(await panel.locator('#state').isVisible());
    await panel.locator('#open-spec').click();
    await panel.locator('#document-content h1').waitFor();
    const readingPosition = await panel.locator('#document-content').evaluate(node => {
      node.scrollTop = 94;
      return node.scrollTop;
    });
    assert.ok(readingPosition > 0);
    await page.keyboard.press('Escape');
    await panel.waitFor({ state: 'hidden' });
    assert.ok(await toggle.evaluate(node => node === document.activeElement));
    assert.equal(await preview.locator('html').evaluate(() => window.reviewTestMarker), 'mounted');
    if (name === 'starter') assert.equal(await preview.locator('#correction').inputValue(), 'Room 8C');
    await toggle.tap();
    assert.equal(await panel.locator('#document-content').evaluate(node => node.scrollTop), readingPosition);
    const state = name === 'starter' ? 'draft' : 'empty';
    if (name === 'bike shop') await panel.locator('#screen').selectOption('basket');
    await panel.locator('#state').selectOption(state);
    assert.equal(new URL(page.url()).searchParams.get('state'), state);
    await panel.locator('#mobile-review-close').tap();
    await page.setViewportSize({ width: 852, height: 393 });
    await toggle.waitFor();
    assert.deepEqual(await frame.boundingBox(), { x: 0, y: 0, ...page.viewportSize() });
    assert.equal(await preview.locator('html').evaluate(() => innerWidth), 852);
    assert.ok(await page.locator('.review-splitter').isHidden());
  });

  test(name + ' documentation resizes by pointer and keyboard', async t => {
    const page = await openReview(t, situation, false);
    const separator = page.getByRole('separator', { name: 'Documentation width' });
    const docs = page.locator('#document-content');
    const preview = page.frameLocator('#preview').locator('html');
    await preview.evaluate(() => { window.reviewTestMarker = 'mounted'; });
    const href = page.url();
    const before = (await docs.boundingBox()).width;
    const handle = await separator.boundingBox();
    const x = handle.x + handle.width / 2;
    const y = handle.y + Math.min(40, handle.height / 2);
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x - 160, y, { steps: 6 });
    await page.mouse.up();
    const wider = (await docs.boundingBox()).width;
    assert.ok(wider > before + 100, `drag: ${before} to ${wider}`);
    await separator.press('ArrowRight');
    assert.ok((await docs.boundingBox()).width < wider);
    await separator.press('End');
    const widest = (await docs.boundingBox()).width;
    await separator.press('Home');
    assert.ok((await docs.boundingBox()).width < widest);
    assert.equal(await preview.evaluate(() => window.reviewTestMarker), 'mounted');
    assert.equal(page.url(), href);
    await page.setViewportSize({ width: 390, height: 844 });
    await separator.waitFor({ state: 'hidden' });
  });
}

test('a phone tutorial link opens its document in the chosen language', async t => {
  const url = new URL(shop);
  url.searchParams.set('doc', 'output');
  url.searchParams.set('example', 'briefing');
  const page = await openReview(t, url, true);
  const panel = page.getByRole('dialog');
  await panel.locator('#document-content[lang="nl"] #briefing').waitFor();
  await panel.locator('#document-content [data-prototype-link]').first().click();
  await panel.waitFor({ state: 'hidden' });
  assert.ok(await page.getByRole('button', { name: /prototype/i }).isVisible());
});
