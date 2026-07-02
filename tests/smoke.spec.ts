import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Test de fumée end-to-end : la page se charge et l'infrastructure de thème
 * fonctionne (bascule clair/sombre via le bouton `ThemeToggle`).
 */
test('la page de démo se charge en français', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Node Template', level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Bienvenue sur le template' })).toBeVisible();
});

test('le bouton de thème bascule en mode sombre', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).not.toHaveClass(/dark/);

  await page.getByRole('button', { name: 'Activer le mode sombre' }).click();
  await expect(html).toHaveClass(/dark/);
});

/**
 * Accessibilité automatisée (axe-core) — PATTERN RÉUTILISABLE.
 *
 * On scanne la page avec les jeux de règles WCAG 2.x A + AA et on n'échoue que
 * sur les violations `serious` / `critical` : ce seuil attrape les vrais blocages
 * (contraste, nom accessible, ARIA cassé) sans transformer chaque avertissement
 * mineur en test rouge. `analyze()` renvoie toutes les violations ; on filtre par
 * `impact`. Pour un nouveau projet : dupliquer ce test, adapter le `goto`.
 */
async function scanSeriousA11yViolations(page: import('@playwright/test').Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  return results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
}

test("l'app n'a pas de violation a11y sérieuse/critique (clair)", async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Node Template', level: 1 })).toBeVisible();
  expect(await scanSeriousA11yViolations(page)).toEqual([]);
});

test("l'app n'a pas de violation a11y sérieuse/critique (sombre)", async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Activer le mode sombre' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await scanSeriousA11yViolations(page)).toEqual([]);
});
