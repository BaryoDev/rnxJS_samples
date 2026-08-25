// Smoke tests for the playground.
//
// The point of this file is that "it works" stops being something a person
// eyeballs. Every page is loaded in a real browser on both channels, and a
// page counts as broken if it logs an error or fails to render the components
// it exists to demonstrate.
//
// BASE_URL selects what to test:
//   http://localhost:8080             the local dist/ build (CI default)
//   https://playground.baryo.dev/rnxjs the deployed site
// The base carries the path prefix, so the tests do not care where it is served.
import { test, expect } from '@playwright/test';

const BASE = (process.env.BASE_URL || 'http://localhost:8080').replace(/\/$/, '');

// Each channel serves the same pages. A difference between them is a
// difference in the library, which is the whole reason both exist.
const CHANNELS = [
  { name: 'released', path: '' },
  { name: 'main', path: '/next' },
];

// path, and what has to be on screen for the page to have done its job
const PAGES = [
  ['index.html', 'a.demo', 9],
  ['dashboard.html', '.metric', 4],
  ['datatable.html', '.metric', 4],
  ['forms.html', '.field', 8],
  ['shop.html', '.part', 8],
  ['tasks.html', '.task', 8],
  ['chat.html', '.msg', 5],
  ['settings.html', '.field', 4],
];

/** Console errors, and failed requests, collected for one page load. */
function watch(page) {
  const problems = [];
  page.on('console', (m) => {
    const text = m.text();
    // The favicon is served by the host, not this site.
    if (/favicon/i.test(text)) return;

    if (m.type() === 'error') {
      problems.push(`console: ${text}`);
      return;
    }
    // rnxJS warns about an unknown variant or a missing component rather than
    // throwing. Ten buttons shipped rendering bare because nothing read these.
    if (m.type() === 'warning' && /\[rnxJS\]/.test(text)) {
      problems.push(`rnxJS warning: ${text}`);
    }
  });
  page.on('pageerror', (e) => problems.push(`uncaught: ${e.message}`));
  page.on('requestfailed', (r) => {
    if (/favicon/i.test(r.url())) return;
    problems.push(`request failed: ${r.url()}`);
  });
  return problems;
}

for (const channel of CHANNELS) {
  test.describe(`${channel.name} channel`, () => {
    for (const [file, selector, atLeast] of PAGES) {
      test(`${file} loads clean and renders`, async ({ page }) => {
        const problems = watch(page);

        const response = await page.goto(`${BASE}${channel.path}/${file}`, {
          waitUntil: 'networkidle',
        });
        expect(response?.status(), 'HTTP status').toBe(200);

        // Components render on a microtask, so wait for the thing itself
        // rather than for a fixed delay.
        await expect(page.locator(selector).first()).toBeVisible({ timeout: 5000 });
        expect(await page.locator(selector).count()).toBeGreaterThanOrEqual(atLeast);

        expect(problems, `${file} logged problems`).toEqual([]);

        // settings.html once had a self-closing <Textarea />. HTML parses that
        // as the raw-text <textarea>, which swallowed the rest of the page
        // including the script tag. Nothing errored; the page just stopped.
        expect(await page.evaluate(() => typeof window.rnx), 'rnx did not load').toBe('object');
        expect(
          await page.evaluate(() =>
            document.querySelectorAll('CONTAINER,ROW,COLUMN,CARD,BUTTON[data-bind]').length),
          'unrendered rnxJS tags left in the DOM',
        ).toBe(0);
      });
    }

    test('names the build it is running', async ({ page }) => {
      await page.goto(`${BASE}${channel.path}/`, { waitUntil: 'networkidle' });
      const stamp = await page.locator('html').getAttribute('data-rnx-version');

      expect(stamp, 'build stamp missing').toBeTruthy();
      if (channel.name === 'main') {
        expect(stamp).toMatch(/^main@[0-9a-f]{7,}$/);
      } else {
        expect(stamp).toMatch(/^\d+\.\d+\.\d+$/);
      }

      // The stamp is only useful if the page cannot be served a stale bundle.
      const src = await page.locator('script[src*="rnx.global.js"]').getAttribute('src');
      expect(src, 'bundle is not cache-busted').toMatch(/\?v=[0-9a-f]{8}$/);
    });

    test('the hero DataTable actually works', async ({ page }) => {
      await page.goto(`${BASE}${channel.path}/`, { waitUntil: 'networkidle' });

      const roleHeader = page.locator('[data-ref="stage"] th[data-column="role"]');
      const roles = () =>
        page.locator('[data-ref="stage"] tbody tr td:nth-child(3)').allTextContents();

      await expect(roleHeader).toBeVisible();
      await roleHeader.click();
      await expect(roleHeader).toHaveAttribute('aria-sort', 'ascending');
      const asc = (await roles()).map((s) => s.trim());

      await roleHeader.click();
      await expect(roleHeader).toHaveAttribute('aria-sort', 'descending');
      const desc = (await roles()).map((s) => s.trim());

      expect(desc, 'sorting did not reverse the rows').toEqual([...asc].reverse());
    });

    test('switching stack swaps the template but not the component', async ({ page }) => {
      await page.goto(`${BASE}${channel.path}/`, { waitUntil: 'networkidle' });

      const filename = page.locator('[data-ref="filename"]');
      const rows = page.locator('[data-ref="stage"] tbody tr');

      await expect(filename).toHaveText(/list\.html$/);
      const before = await rows.count();

      await page.getByRole('button', { name: 'Laravel' }).click();

      await expect(filename).toHaveText(/\.blade\.php$/);
      await expect(page.locator('[data-ref="code"]')).toContainText('@rnxScripts');
      // The claim being made is that the component does not change.
      await expect(rows).toHaveCount(before);
    });
  });
}
