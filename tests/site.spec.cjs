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
