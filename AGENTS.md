# AGENTS.md — Node Template

Guide pour agents IA. Ce dépôt est un **template** de démarrage pour applications web
**statiques** (React + TS + Vite, hébergeables sur GitHub Pages), sans logique métier :
il fournit l'infrastructure et l'outillage. Pour un vrai projet, on remplace la page de
démonstration (`src/App.tsx`).

## Commandes

| Commande            | Effet                                                              |
| ------------------- | ------------------------------------------------------------------ |
| `npm run dev`       | Serveur de dev (HMR).                                              |
| `npm run check`     | **À lancer avant de conclure** : format + lint + typecheck + test. |
| `npm run build`     | `tsc -b` + build Vite.                                             |
| `npm run test`      | Vitest (unitaires/composants).                                     |
| `npm run test:e2e`  | Playwright (e2e).                                                  |
| `npm run storybook` | Storybook (port 6006).                                             |

Après une modif : `npm run format` puis `npm run check`. Tout doit être vert.

## Stack

Vite · React 19 + TypeScript (strict, `noUnusedLocals`/`noUnusedParameters`) ·
Tailwind v4 (CSS-first, `@theme inline`) · Vitest + Testing Library · Playwright ·
Storybook 10 · ESLint (flat) + Prettier · PWA (manifest + service worker offline) ·
CI/CD GitHub Actions (qualité + tests, déploiement Pages) · Dependabot + auto-merge.

Dépendances runtime volontairement minimales : `react`, `react-dom`. Tout le reste en
`devDependencies`.

## Structure

```
src/
├─ components/
│  ├─ ui/           Design system (Button, Input, Textarea, Select, Checkbox, Badge, Callout, Panel, Accordion, CopyButton) + stories + tests
│  └─ …             ThemeToggle, ThemeSelector, LanguageSwitcher
├─ hooks/           useTheme (identité + clair/sombre), useDebouncedValue, useCachedState (cache opt-in)
├─ i18n/            I18nProvider + messages (FR/EN)
├─ lib/             cx (utilitaire de classes), readTextFile
├─ App.tsx          page de démo — À REMPLACER
├─ theme.ts         déclaration des thèmes
└─ index.css        tokens des thèmes (variables CSS)
tests/              specs Playwright
```

## Thèmes — règle absolue

Deux axes **indépendants**, runtime, persistés dans localStorage : l'**identité**
(`default`/`atelier`/`blueprint`/`aurora`, via `data-theme`) et le **mode clair/sombre**
(classe `dark`). 8 combinaisons valides.

**Toujours utiliser les tokens** (`bg-canvas`, `bg-surface`, `text-fg`, `text-fg-muted`,
`bg-accent`/`text-accent-fg`, `accent-strong`, `text-danger`, `text-warning`,
`text-success`, `rounded-card`/`rounded-control`, `shadow-card`/`shadow-btn`).
**Jamais de couleur Tailwind en dur** (`text-red-500`…) : elle casserait dans une des 8
combinaisons. Tokens dans `src/index.css` ; `theme.ts` + `hooks/useTheme.ts` appliquent
et gèrent l'anti-flash (cohérent avec le script de `index.html`).

**Ajouter un thème** : nom dans `THEMES` (`theme.ts`), tokens clairs+sombres dans
`index.css`, libellé dans `theme.names` (`i18n/messages.ts`).

## Design system (`src/components/ui/`)

Composants partagés, **sans i18n** (libellés en props → réutilisables en Storybook),
stylés uniquement via les tokens. **Storybook est la source de vérité** : un composant
partagé a sa story (variants, états, a11y) et son test. Helper : `src/lib/cx.ts`.

## i18n

Maison, sans dépendance. `t('a.b.c')` résout une clé pointée. L'interface `Messages`
garantit que `fr` et `en` ont la même structure (clé manquante = erreur TS).
**Ajouter une chaîne** : étendre `Messages` puis renseigner `fr` ET `en`.

## Accessibilité

Navigation clavier, focus visible (`:focus-visible` global dans `index.css`), ARIA
pertinent, lien d'évitement. Garder ce niveau dans tout nouveau composant.

## Déploiement

`base: './'` (chemins relatifs) → compatible sous-chemin Pages
(`https://<user>.github.io/<repo>/`). Workflow `deploy.yml` à chaque push sur `main`.
Activer Pages (source : GitHub Actions).
