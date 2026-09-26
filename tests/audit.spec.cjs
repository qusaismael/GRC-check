const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const label = process.env.SITE_AUDIT_LABEL;
for (const [width, height] of [[1440, 900], [390, 844], [320, 568]]) {
  test(`capture page and assessment at ${width}px`, async ({ page }) => {
    test.skip(!label, 'Run with SITE_AUDIT_LABEL=old or new for visual audit');
    await page.setViewportSize({ width, height });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort());
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#consent-modal')).toHaveClass(/show/);
    fs.mkdirSync(path.join(process.cwd(), 'preview'), { recursive: true });
    if (width === 390) await page.screenshot({ path: `preview/${label}-${width}-consent.png` });
    await page.locator('#consent-checkbox').check();
    await page.locator('#consent-agree').click();
    await expect(page.locator('#consent-modal')).toBeHidden();
    await page.screenshot({ path: `preview/${label}-${width}-top.png` });
    const metrics = await page.evaluate(() => {
      const box = selector => {
        const element = document.querySelector(selector);
        const { width, height, left, right } = element.getBoundingClientRect();
        return { width, height, left, right, visible: getComputedStyle(element).visibility };
      };
      return {
        scrollHeight: document.documentElement.scrollHeight,
        overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        images: Array.from(document.images).map(image => ({ src: image.currentSrc, decoded: image.complete && image.naturalWidth > 0 })),
        framework: box('#checklist-select'), export: box('#export-btn'),
        yes: box('.yes-btn'), no: box('.no-btn'),
        sidebar: box('.score-sidebar'), floatingScore: box('#floating-score-btn'),
        popupClose: box('#popup-close'),
        selectedPressed: document.querySelector('.yes-btn').getAttribute('aria-pressed'),
        consentRole: document.querySelector('#consent-modal').getAttribute('role')
      };
    });
    await page.locator('.question-card').first().scrollIntoViewIfNeeded();
    await page.screenshot({ path: `preview/${label}-${width}-question.png` });
    fs.writeFileSync(`preview/${label}-${width}-metrics.json`, JSON.stringify({ ...metrics, errors }, null, 2) + '\n');
    console.log(`${label} ${width}px: ${JSON.stringify({ ...metrics, errors })}`);
  });
}
