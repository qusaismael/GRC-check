const { test } = require('node:test');
const assert = require('node:assert/strict');
const { assessment } = require('./support/dom.cjs');

test('framework answers and notes survive switching independently', () => {
  const { document, click, note, framework } = assessment();
  click('.yes-btn');
  note('.note-input', 'review note');
  framework('iso_27001');
  click('.no-btn');
  framework('jordan_law');
  assert.equal(document.querySelector('.yes-btn').classList.contains('answered'), true);
  assert.equal(document.querySelector('.note-input').value, 'review note');
  assert.equal(document.querySelector('#answered-count').textContent, '1');
  framework('iso_27001');
  assert.equal(document.querySelector('.no-btn').classList.contains('answered'), true);
});
