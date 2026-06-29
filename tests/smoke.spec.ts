import { test, expect } from '@playwright/test';

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
