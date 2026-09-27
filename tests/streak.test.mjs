import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { streak } from '../lib/streak.mjs';
test('counts consecutive days', () => {
  const entries = [{ createdAt: '2026-09-26T12:00:00Z' }, { createdAt: '2026-09-27T12:00:00Z' }];
  assert.equal(streak(entries, '2026-09-27T14:00:00Z', 'UTC'), 2);
});
