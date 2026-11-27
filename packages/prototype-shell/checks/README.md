# Shared-link checks

Run from this directory using Node.js 22 or newer and pnpm.

```sh
pnpm install --ignore-workspace --frozen-lockfile
pnpm exec playwright install chromium
pnpm test
```

To use an existing Google Chrome installation, run `PLAYWRIGHT_CHANNEL=chrome pnpm test`.

To check the phone review panel and the desktop divider in both examples, start the documentation site with `pnpm dev` and the starter with `pnpm prototype` from the project root. Run `pnpm run test:layout` from this directory. Use `SHOP_BASE_URL` and `STARTER_BASE_URL` to test other local addresses.

For the bike shop worked example, start the documentation site with `pnpm dev` from the project root. In this checks directory, run `pnpm run test:shop`. Set `SHOP_BASE_URL` if the site is running at a different origin from `http://127.0.0.1:3000`. The tests cover the nine possible same-category pairs across lights, bags and locks, an order for every model, switching categories and recovery from an empty basket. Each shopping journey opens the English storefront from both the Dutch and English new-project tutorials. The Dutch tutorial covers phone width and the English tutorial also covers desktop width.

The tests load the packaged review shell in Chromium. A small test project supplies one actual React screen and one Vue screen. Each test switches to a different persona and viewport, copies the current situation and opens it in a separate browser context. It compares the rendered request, return reason, persona, state, frame width and scenario-specific FA. The HTTPS case exercises clipboard copying, and the HTTP case exercises the selectable link fallback. Test-only dependencies and the fixture screens stay outside the distributed skill.
