import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const shellRoot = new URL('../../../skills/prototype-shell/assets/starter/', import.meta.url);
const rootPath = '/review/';
const contentTypes = { html: 'text/html', js: 'application/javascript', css: 'text/css' };

function view(record, role, state) {
  const params = new URLSearchParams({ record, role, state });
  return { record, role, state, url: `./fixture.html?${params}` };
}

const project = {
  title: 'Review workspace',
  formats: [
    { id: 'desktop', label: 'Desktop', width: 1200, height: 800 },
    { id: 'phone', label: 'Phone', width: 390, height: 844 }
  ],
  features: [{ id: 'requests', label: 'Equipment requests', scenarios: [{
    id: 'correct-return', label: 'Correct a returned request',
    start: { screen: 'request', record: '407', role: 'applicant', state: 'returned' },
    fa: { request: './correct-return.md' }
  }] }],
  screens: [{
    id: 'request', label: 'Request detail', fa: './general.md',
    views: [
      view('406', 'applicant', 'draft'), view('406', 'reviewer', 'returned'),
      view('407', 'applicant', 'returned'), view('407', 'reviewer', 'returned')
    ]
  }]
};

// Supply a small project and its screen at a test origin. Shell assets are
// read directly from the deliverable, so both browser sessions run the real UI.
export async function createFixtureSite(framework, origin) {
  const bundle = await build({
    entryPoints: [fileURLToPath(new URL(`./fixtures/${framework}.js`, import.meta.url))],
    bundle: true, write: false, minify: true, format: 'esm',
    define: {
      'process.env.NODE_ENV': '"production"', __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false', __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    }
  });
  const responses = new Map([
    ['project.js', ['application/javascript', `export const project = ${JSON.stringify(project)};`]],
    ['fixture.js', ['application/javascript', bundle.outputFiles[0].text]],
    ['fixture.html', ['text/html', '<!doctype html><html lang="en"><title>Request preview</title><main id="app"></main><script type="module" src="./fixture.js"></script></html>']],
    ['correct-return.md', ['text/markdown', '# Correcting the returned request\nCheck the room number.']],
    ['general.md', ['text/markdown', '# About requests\nOpen your equipment requests here.']]
  ]);

  return async function attach(context) {
    await context.route(`${origin}/**`, async route => {
      const path = new URL(route.request().url()).pathname;
      if (!path.startsWith(rootPath)) return route.fulfill({ status: 404, body: 'Unknown path' });
      const name = path.slice(rootPath.length);
      const response = responses.get(name);
      if (response) return route.fulfill({ contentType: response[0], body: response[1] });
      // Only serve shell modules, CSS and the entry point from the package root.
      const asset = /^([a-z0-9-]+)\.(html|css|js)$/.exec(name);
      if (!asset) return route.fulfill({ status: 404, body: 'Unknown asset' });
      try {
        const body = await readFile(new URL(name, shellRoot));
        await route.fulfill({ contentType: contentTypes[asset[2]], body });
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        await route.fulfill({ status: 404, body: 'Missing asset' });
      }
    });
  };
}
