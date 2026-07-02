# Changelog

Toutes les modifications notables de ce projet sont consignées ici.
Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).

## [0.3.0] — 2026-07-02

### Ajouté

- **Couverture de tests en CI** : reporters de couverture (`text`, `text-summary`,
  `json-summary`, `lcov`) et seuils dans `vite.config.ts`
  (lines/functions/statements ≥ 80 %, branches ≥ 75 %) — sous la couverture réelle,
  en marge de sécurité contre les régressions. Le workflow `ci.yml` lance
  `test:cov`, publie un tableau de couverture dans le résumé du job (`GITHUB_STEP_SUMMARY`)
  et archive le rapport `coverage/` en artefact.
- **Tests d'accessibilité unitaires** (Vitest + Testing Library) pour les composants
  d'en-tête : `ThemeToggle.a11y.test.tsx`, `ThemeSelector.a11y.test.tsx`,
  `LanguageSwitcher.a11y.test.tsx`. Ils vérifient rôles/nom accessible, attributs
  ARIA, application de `data-theme` / classe `dark`, persistance `localStorage` et
  navigation clavier. Helper réutilisable `src/test/a11y.tsx` (`renderA11y`, `htmlEl`)
  qui pose le STYLE de test a11y du socle.
- **Stories Storybook** pour les composants composites d'en-tête (section `App/`) :
  `ThemeSelector`, `ThemeToggle`, `LanguageSwitcher`.
- **Accessibilité automatisée e2e** : `@axe-core/playwright` intégré au smoke
  `tests/smoke.spec.ts` (scans WCAG 2.x A/AA en modes clair ET sombre, échec sur
  violations `serious`/`critical`) — pattern réutilisable via
  `scanSeriousA11yViolations`.
- **Lighthouse CI** : workflow `.github/workflows/lighthouse.yml` et budgets
  `lighthouserc.json` (`@lhci/cli` en `staticDistDir`, 3 runs, preset desktop).
  Accessibilité bloquante (`error` ≥ 0.9) ; performance / best-practices / SEO en
  `warn` (≥ 0.9) pour éviter une CI fragile.

## [0.2.0] — 2026-07-01

### Ajouté

- Design system interne `src/components/ui/` (`Button`, `Input`, `Textarea`,
  `Select`, `Checkbox`, `Badge`, `Callout`, `Panel`, `Accordion`, `CopyButton`),
  chacun avec sa story Storybook et son test — composants stylés uniquement via
  les tokens de thème.
- Composants `Checkbox` (case à cocher contrôlée) et `Callout` (notice d'état
  contextuelle, tons info/success/warning/danger).
- Hooks `useDebouncedValue` (valeur retardée pour calculs lourds) et
  `useCachedState` / `usePersistentBoolean` (cache opt-in en `localStorage`).
- Utilitaire `src/lib/readTextFile.ts` (lecture texte d'un `File` avec gestion d'erreur).
- Utilitaire `src/lib/cx.ts` (concaténation de classes conditionnelles).
- Token de couleur `--color-success` (états positifs / badges), décliné clair/sombre.
- Documentation agents `AGENTS.md` (stack, conventions, bonnes pratiques) ;
  `CLAUDE.md` et `.github/copilot-instructions.md` ne sont que des renvois vers
  elle. Références Claude Code et garde-fou `--no-verify`.
- **Hooks Git versionnés** (`.githooks/`, activés automatiquement par le script npm
  `prepare` à chaque `npm install`) : `commit-msg` (sujet conforme Conventional
  Commits), `pre-commit` (`npm run check`) et `pre-push` (`test:e2e` +
  `build-storybook`, parité CI).
- Dependabot : `.github/dependabot.yml` (npm + github-actions) et workflow
  `dependabot-auto-merge.yml`.

### Modifié

- PWA : précache de tous les assets buildés et nom de cache suffixé d'un hash de
  build (plugin `pwaPrecache` dans `vite.config.ts`) → vrai hors-ligne dès la
  première visite et invalidation automatique à chaque déploiement.
- Accessibilité : `CopyButton` annonce la confirmation via une région live
  `sr-only` dédiée ; `Input` et `Textarea` exposent leur message d'erreur en
  `role="alert"`.
- `src/test/setup.ts` : garde `typeof window` pour les tests en environnement `node`.
- **Fins de ligne normalisées en LF** via `.gitattributes` (`eol=lf`).

## [0.1.0] — Template initial

### Ajouté

- Stack React 19 + TypeScript 6 + Vite 8.
- Tailwind CSS v4 (config CSS-first, `@theme inline`).
- Système de thèmes au runtime : 4 identités (`default`, `atelier`, `blueprint`,
  `aurora`) × clair/sombre, persistées dans `localStorage`, avec script anti-flash.
- Internationalisation maison FR/EN (sans dépendance) + bouton de bascule.
- PWA : manifest installable + service worker (offline).
- Tests : Vitest + Testing Library (unitaires/composants), Playwright (e2e).
- Storybook 10 avec barre d'outils Thème/Mode.
- Qualité : ESLint 10 (flat config) + Prettier.
- CI/CD : GitHub Actions (qualité + tests, déploiement GitHub Pages).
- Page de démonstration câblant l'ensemble de l'infrastructure.
