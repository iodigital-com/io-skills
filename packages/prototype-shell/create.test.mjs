import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const skill = new URL('../../skills/prototype-shell/', import.meta.url);
const script = fileURLToPath(new URL('scripts/create.mjs', skill));

test('create a runnable project copy and preserve edits on a second run', async t => {
  const temp = await mkdtemp(join(tmpdir(), 'prototype-shell-'));
  t.after(() => rm(temp, { recursive: true, force: true }));
  const destination = join(temp, 'review');
  const run = () => spawnSync(process.execPath, [script, destination], { encoding: 'utf8' });
  const created = run();
  assert.equal(created.status, 0, created.stderr);
  for (const file of ['index.html', 'project.js', 'demo/index.html', 'demo/requests-fa.md']) {
    const source = await readFile(new URL('assets/starter/' + file, skill), 'utf8');
    assert.equal(await readFile(join(destination, file), 'utf8'), source);
  }
  const config = join(destination, 'project.js');
  await writeFile(config, '// Project-owned changes\n');
  assert.equal(run().status, 1);
  assert.equal(await readFile(config, 'utf8'), '// Project-owned changes\n');
});
