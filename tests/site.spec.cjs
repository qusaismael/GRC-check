const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort());
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#consent-checkbox').check();
  await page.locator('#consent-agree').click();
  await expect(page.locator('#consent-modal')).toBeHidden();
});

test('framework answers survive switching', async ({ page }) => {
  await page.locator('.yes-btn').first().click();
  await page.locator('.note-input').first().fill('review note');
  await page.locator('#checklist-select').selectOption('iso_27001');
  await page.locator('.no-btn').first().click();
  await page.locator('#checklist-select').selectOption('jordan_law');
  await expect(page.locator('.yes-btn').first()).toHaveClass(/answered/);
  await expect(page.locator('.note-input').first()).toHaveValue('review note');
  await expect(page.locator('#answered-count')).toHaveText('1');
  await expect(page.locator('#score-text')).toHaveText('4%');
  await page.locator('#checklist-select').selectOption('iso_27001');
  await expect(page.locator('.no-btn').first()).toHaveClass(/answered/);
});

test('notes render as literal text', async ({ page }) => {
  const note = '</textarea><img src=x onerror="window.noteExecuted=1">';
  await page.locator('.note-input').first().fill(note);
  await page.locator('#checklist-select').selectOption('iso_27001');
  await page.locator('#checklist-select').selectOption('jordan_law');
  await expect(page.locator('.note-input').first()).toHaveValue(note);
  await expect(page.locator('.question-card img')).toHaveCount(0);
  expect(await page.evaluate(() => window.noteExecuted)).toBeUndefined();
});

test('note-only entries stay pending', async ({ page }) => {
  await page.locator('.note-input').first().fill('not answered yet');
  await page.locator('.question-card').nth(1).locator('.yes-btn').click();
  await expect(page.locator('#answered-count')).toHaveText('1');
  await expect(page.locator('#score-text')).toHaveText('4%');
});

test('note-only Excel export stays pending', async ({ page }) => {
  await page.route('**/xlsx.full.min.js', route => route.fulfill({
    contentType: 'application/javascript',
    body: `window.XLSX = {
      utils: {
        book_new: () => ({ sheets: {} }),
        aoa_to_sheet: rows => ({ rows }),
        book_append_sheet: (book, sheet, name) => { book.sheets[name] = sheet; }
      },
      writeFile: book => { window.exportedRows = book.sheets['Complete Assessment'].rows; }
    };`
  }));
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.locator('.note-input').first().fill('draft note');
  await page.evaluate(() => document.querySelector('#export-excel').click());
  await expect.poll(() => page.evaluate(() => window.exportedRows)).toBeTruthy();
  const rows = await page.evaluate(() => window.exportedRows);
  expect(rows.find(row => row[0] === 'Questions Answered:')[1]).toBe(0);
  expect(rows.find(row => row[0] === 'Pending Review:')[1]).toBe(24);
  expect(rows.find(row => row[0] === 'Article 3.A').slice(2))
    .toEqual(['NOT ANSWERED', 'draft note', 'PENDING REVIEW']);
  expect(errors).toEqual([]);
});
