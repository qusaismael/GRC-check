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

test('note-only Excel export stays pending and retains the note', async () => {
  const { document, window, note, exportExcel } = assessment();
  note('.note-input', 'draft note');
  let workbook;
  window.XLSX = {
    utils: {
      book_new: () => ({ sheets: {} }),
      aoa_to_sheet: rows => ({ rows }),
      book_append_sheet: (book, sheet, name) => { book.sheets[name] = sheet; }
    },
    writeFile: book => { workbook = book; }
  };
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
  document.head.appendChild(script);
  await exportExcel();
  const rows = workbook.sheets['Complete Assessment'].rows;
  assert.equal(rows.find(row => row[0] === 'Questions Answered:')[1], 0);
  assert.equal(rows.find(row => row[0] === 'Pending Review:')[1], 24);
  const first = rows.find(row => row[0] === 'Article 3.A');
  assert.deepEqual(Array.from(first).slice(2), ['NOT ANSWERED', 'draft note', 'PENDING REVIEW']);
});

test('note-only PDF export does not list a compliant or non-compliant area', async () => {
  const { document, window, note, exportPdf } = assessment();
  note('.note-input', 'draft note');
  const lines = [];
  window.jspdf = { jsPDF: class {
    internal = { getNumberOfPages: () => 1 };
    setFontSize() {} setFont() {} setTextColor() {} setLineWidth() {}
    line() {} setPage() {} addPage() {} save() {}
    text(value) { lines.push(value); }
  } };
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  document.head.appendChild(script);
  await exportPdf();
  assert.ok(lines.includes('Final Score: 0%'));
  assert.ok(lines.includes('No items answered "Yes".'));
  assert.ok(lines.includes('No items answered "No".'));
  assert.equal(lines.some(line => line.includes('draft note')), false);
});

test('editing a choice returns it to pending without losing its note', () => {
  const { document, click, note, framework } = assessment();
  click('.yes-btn');
  note('.note-input', 'needs review');
  click('.edit-btn');
  assert.equal(document.querySelector('#answered-count').textContent, '0');
  assert.equal(document.querySelector('#score-text').textContent, '0%');
  assert.equal(document.querySelector('.note-input').value, 'needs review');
  framework('iso_27001');
  framework('jordan_law');
  assert.equal(document.querySelector('.yes-btn').classList.contains('answered'), false);
  assert.equal(document.querySelector('.note-input').value, 'needs review');
});

test('answer buttons expose their pressed state across edits and frameworks', () => {
  const { document, click, framework } = assessment();
  const pressed = selector => document.querySelector(selector).getAttribute('aria-pressed');
  assert.equal(pressed('.yes-btn'), 'false');
  assert.equal(pressed('.no-btn'), 'false');
  click('.yes-btn');
  assert.equal(pressed('.yes-btn'), 'true');
  assert.equal(pressed('.no-btn'), 'false');
  framework('iso_27001');
  framework('jordan_law');
  assert.equal(pressed('.yes-btn'), 'true');
  click('.no-btn');
  assert.equal(pressed('.yes-btn'), 'false');
  assert.equal(pressed('.no-btn'), 'true');
  click('.edit-btn');
  assert.equal(pressed('.no-btn'), 'false');
});

test('mobile score details stay hidden until opened', () => {
  const { document, click } = assessment();
  const button = document.querySelector('#floating-score-btn');
  const popup = document.querySelector('#floating-score-popup');
  assert.equal(button.getAttribute('aria-controls'), 'floating-score-popup');
  assert.equal(button.getAttribute('aria-expanded'), 'false');
  assert.equal(popup.hasAttribute('hidden'), true);
  click('#floating-score-btn');
  assert.equal(button.getAttribute('aria-expanded'), 'true');
  assert.equal(button.getAttribute('aria-label'), 'Hide compliance score details');
  assert.equal(popup.hasAttribute('hidden'), false);
  click('#popup-close');
  assert.equal(button.getAttribute('aria-expanded'), 'false');
  assert.equal(button.getAttribute('aria-label'), 'Show compliance score details');
  assert.equal(popup.hasAttribute('hidden'), true);
});
