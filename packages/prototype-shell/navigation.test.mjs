import assert from 'node:assert/strict';
import test from 'node:test';
import { project } from '../../skills/prototype-shell/assets/starter/project.js';
import {
  explanationFor, getView, prototypeSelection, readSelection, selectionHref, switchScreen,
} from '../../skills/prototype-shell/assets/starter/navigation.js';

const base = 'https://review.example/team/prototype/?lang=en';
const applicant = {
  screen: 'request-detail', role: 'applicant', state: 'returned', record: '104', format: 'phone',
};

test('every example scenario links directly to a registered view', () => {
  assert.deepEqual(readSelection(project, base), { kind: 'overview' });
  for (const feature of project.features) {
    for (const scenario of feature.scenarios) {
      const selection = { ...scenario.start, scenario: scenario.id, format: project.formats[0].id };
      const href = selectionHref(base, selection);
      assert.deepEqual(readSelection(project, href), { kind: 'preview', selection });
      assert.equal(selectionHref(href, null), base);
    }
  }
});

test('sharing the same view under different scenarios restores the intended FA passage', () => {
  for (const [scenario, passage] of [
    ['improve-returned', 'improve-a-returned-request'],
    ['verify-return-reason', 'check-the-return-reason'],
  ]) {
    const { selection } = readSelection(project, selectionHref(base, { ...applicant, scenario }));
    assert.equal(explanationFor(project, selection), './demo/requests-fa.md#' + passage);
  }
  assert.equal(explanationFor(project, applicant), './demo/requests-fa.md#read-a-request');
});

test('switching screens preserves the entire supported tuple or selects the destination start', () => {
  const reviewer = { ...applicant, role: 'reviewer', record: '105', scenario: 'improve-returned' };
  const history = switchScreen(project, reviewer, 'request-history');
  assert.deepEqual(history, { ...reviewer, screen: 'request-history' });
  assert.equal(explanationFor(project, history), './demo/requests-fa.md#read-the-history');
  const list = switchScreen(project, history, 'request-list');
  assert.deepEqual(list, {
    screen: 'request-list', role: 'applicant', state: 'populated', record: 'queue',
    format: 'phone', scenario: reviewer.scenario,
  });
  assert.equal(explanationFor(project, list), null);
});

test('stale and incomplete links cannot silently select another record, persona or scenario', () => {
  const valid = selectionHref(base, applicant);
  for (const changes of [
    { record: 'deleted' }, { format: 'deleted' }, { scenario: 'deleted' },
    { role: 'reviewer', state: 'draft' }, { role: '' },
  ]) {
    assert.equal(readSelection(project, selectionHref(base, { ...applicant, ...changes })).kind, 'invalid');
  }
  assert.equal(readSelection(project, valid + '&record=105').kind, 'invalid');
  assert.equal(getView(project, { ...applicant, role: 'reviewer', state: 'draft' }), null);
});

test('document links resolve against the current scenario and format and require an unambiguous record', () => {
  const current = { ...applicant, scenario: 'verify-return-reason' };
  const target = 'prototype:request-detail?role=reviewer&state=returned';
  assert.equal(prototypeSelection(project, target, current), null);
  assert.deepEqual(prototypeSelection(project, target + '&record=105', current), {
    ...current, role: 'reviewer', record: '105',
  });
  assert.deepEqual(prototypeSelection(project, 'prototype:request-list?role=applicant&state=empty', current), {
    ...current, screen: 'request-list', state: 'empty', record: 'queue',
  });
});
