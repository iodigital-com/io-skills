import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { chromium } from 'playwright';
import { createFixtureSite } from './fixture-site.js';

let browser;
before(async () => {
  browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
});
after(async () => { await browser?.close(); });

async function checkRestoredView(page) {
  const frame = page.frameLocator('#preview');
  await frame.getByRole('heading', { name: 'Equipment request 407', exact: true }).waitFor();
  for (const text of ['Reviewer workspace', 'Returned for changes', 'A room number is missing.']) {
    await frame.getByText(text, { exact: true }).waitFor();
  }
  assert.equal(await page.locator('#role').inputValue(), 'reviewer');
  assert.equal(await page.locator('#state').inputValue(), 'returned');
  assert.equal(await page.locator('#format').inputValue(), 'phone');
  assert.equal(await frame.locator('html').evaluate(() => window.innerWidth), 390);
  await page.locator('#open-explanation').click();
  await page.locator('#document-content')
    .getByRole('heading', { name: 'Correcting the returned request', exact: true }).waitFor();
}

for (const framework of ['react', 'vue']) {
  test(`${framework}: a fresh reviewer can reopen the copied situation`, async t => {
    // HTTPS exercises the Clipboard API. HTTP also exercises the copyable-text
    // fallback in a browser context where navigator.clipboard is unavailable.
    const secure = framework === 'react';
    const origin = `${secure ? 'https' : 'http'}://review.test`;
    const attach = await createFixtureSite(framework, origin);
    const sender = await browser.newContext();
    t.after(() => sender.close());
    if (secure) await sender.grantPermissions(['clipboard-read', 'clipboard-write'], { origin });
    await attach(sender);
    const source = await sender.newPage();
    source.setDefaultTimeout(6000);
    await source.goto(`${origin}/review/index.html`);
    await source.getByRole('link', { name: 'Correct a returned request', exact: true }).click();
    await source.locator('#role').selectOption('reviewer');
    await source.locator('#format').selectOption('phone');
    await checkRestoredView(source);
    await source.locator('#copy-link').click();
    let shared;
    if (secure) {
      await source.getByRole('button', { name: 'Link copied', exact: true }).waitFor();
      shared = await source.evaluate(() => navigator.clipboard.readText());
    } else {
      const fallback = source.locator('#share-url');
      await fallback.waitFor();
      shared = await fallback.inputValue();
    }
    const url = new URL(shared);
    assert.equal(url.origin, origin);
    assert.equal(url.searchParams.get('scenario'), 'correct-return');
    assert.equal(url.searchParams.get('record'), '407');

    const recipient = await browser.newContext();
    t.after(() => recipient.close());
    await attach(recipient);
    const reopened = await recipient.newPage();
    reopened.setDefaultTimeout(6000);
    await reopened.goto(shared);
    await checkRestoredView(reopened);
  });
}
