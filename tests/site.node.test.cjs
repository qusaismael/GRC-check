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

test('notes render as literal text on framework return', () => {
  const { document, note, framework } = assessment();
  const literal = '</textarea><img src=x onerror="window.noteExecuted=1">';
  note('.note-input', literal);
  framework('iso_27001');
  framework('jordan_law');
  assert.equal(document.querySelector('.note-input').value, literal);
  assert.equal(document.querySelectorAll('.question-card img').length, 0);
});

test('note-only entries stay pending in the answered count', () => {
  const { document, note, click, framework } = assessment();
  note('.note-input', 'not answered yet');
  click('.question-card:nth-child(2) .yes-btn');
  assert.equal(document.querySelector('#answered-count').textContent, '1');
  assert.equal(document.querySelector('#score-text').textContent, '4%');
  framework('iso_27001');
  assert.equal(document.querySelector('#answered-count').textContent, '0');
  framework('jordan_law');
  assert.equal(document.querySelector('#answered-count').textContent, '1');
});
