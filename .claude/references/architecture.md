# Architecture

Site web **statique** (GitHub Pages), **100% client-side**. Complète l'`AGENTS.md`
du dépôt (qui fait foi). Volontairement court.

## Stack commune

Vite · React + TypeScript strict · Tailwind CSS (CSS-first, `@theme inline`) ·
Vitest + Testing Library · Playwright · Storybook · ESLint (flat) + Prettier ·
PWA (offline) · CI/CD GitHub Actions (qualité + tests → déploiement Pages).

> Versions exactes : voir `package.json` (ne pas les figer ici pour éviter l'obsolescence).

## Principes transverses

- Dépendances runtime minimales (`react`, `react-dom` + libs domaine justifiées, isolées).
- Thèmes runtime à 2 axes indépendants : identité (`data-theme`) × clair/sombre (`dark`).
- i18n maison FR/EN typée (`src/i18n/`).
- Déploiement : `deploy.yml` à chaque push sur `main` ; `base: './'` (sous-chemin Pages).

## Ce dépôt : NodeTemplate (socle)

**Template** d'infrastructure sans logique métier : on part de là pour un vrai projet
en remplaçant la page de démo (`src/App.tsx`). C'est le socle dont dérivent DevToolbox,
QrCodeGenerator et 3DExperiment.

```
src/
├─ components/ui/   Design system (Button, Input, Select, Badge, Panel, Accordion, CopyButton…) + stories + tests
├─ components/      ThemeToggle, ThemeSelector, LanguageSwitcher
├─ hooks/           useTheme, useDebouncedValue, useCachedState
├─ i18n/            I18nProvider + messages (FR/EN)
├─ lib/             cx (classes), readTextFile
├─ App.tsx          page de démo — À REMPLACER
├─ theme.ts         déclaration des thèmes
└─ index.css        tokens des thèmes (variables CSS)
tests/              specs Playwright
```
